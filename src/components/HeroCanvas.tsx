'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Custom GLSL Shader for Liquid Chrome
const LiquidChromeShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uVelocity: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uVelocity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simplex 3D Noise generator
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - D.yyy;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Calculate dynamic noise displacement based on mouse velocity and coordinates
      vec3 coords = position;
      float noise = snoise(coords * 1.5 + uTime * 0.6) * (0.15 + uVelocity * 0.35);
      
      // Distort slightly based on mouse proximity
      float mouseDist = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.12;
      
      vec3 displacedPosition = position + normal * (noise + mouseInfluence);
      vPosition = displacedPosition;
      
      vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Liquid reflection multiplier
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
      
      // Dynamic Chrome base color scheme (combining liquid white & mercury)
      vec3 chromeBase = vec3(0.08, 0.08, 0.08);
      vec3 reflectionColor = vec3(0.92, 0.94, 0.96);
      
      // Infuse digital glow accents: neon blue, deep purple, cyber green, japanese red
      vec3 neonBlue = vec3(0.0, 0.9, 1.0);
      vec3 neonPurple = vec3(0.74, 0.0, 1.0);
      vec3 cyberGreen = vec3(0.0, 1.0, 0.4);
      vec3 japaneseRed = vec3(1.0, 0.0, 0.23);

      // Blend glows based on geometry normals and coordinates
      float flowBlue = sin(vPosition.x * 2.0 + uTime) * 0.5 + 0.5;
      float flowPurple = cos(vPosition.y * 2.0 - uTime * 0.7) * 0.5 + 0.5;
      float flowGreen = sin(vPosition.z * 3.0 + uTime * 0.3) * 0.5 + 0.5;

      vec3 glow = mix(neonBlue, neonPurple, flowBlue) * flowPurple * 0.6;
      glow += mix(cyberGreen, japaneseRed, flowGreen) * fresnel * 0.4;
      
      // Inject chrome shine reflectiveness
      vec3 finalColor = mix(chromeBase, reflectionColor, fresnel * 0.8) + glow;
      
      // Highlight sparkles based on normals facing lights
      float spec = pow(max(dot(normal, vec3(1.0, 1.0, 1.0)), 0.0), 32.0);
      finalColor += vec3(1.0) * spec * 0.6;

      gl_FragColor = vec4(finalColor, 0.95);
    }
  `,
};

function BlobMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const velocityRef = useRef(0);
  const lastMouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.set(mx, my);

      // Speed calculations for velocity uniform
      const dx = mx - lastMouseRef.current.x;
      const dy = my - lastMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = velocityRef.current * 0.95 + dist * 0.05;

      lastMouseRef.current.set(mx, my);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      
      // Smoothly interpolate uniforms
      materialRef.current.uniforms.uMouse.value.lerp(mouseRef.current, 0.1);
      materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uVelocity.value,
        Math.min(velocityRef.current * 4, 1.5),
        0.1
      );
    }

    if (meshRef.current) {
      // Slowly rotate the mesh
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = time * 0.1;
      
      // Add subtle parallax position drift based on mouse
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseRef.current.x * 0.6, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseRef.current.y * 0.6, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <sphereGeometry args={[2.0, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={LiquidChromeShader.vertexShader}
        fragmentShader={LiquidChromeShader.fragmentShader}
        uniforms={LiquidChromeShader.uniforms}
        transparent={true}
        depthWrite={true}
      />
    </mesh>
  );
}

// Particle field representing drifting binary code networks in the parallax background
function FloatingParticles() {
  const count = 90;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<Array<{ pos: THREE.Vector3; speed: number; rot: number; scale: number }>>([]);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    // Generate static nodes
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2
        ),
        speed: 0.01 + Math.random() * 0.02,
        rot: Math.random() * Math.PI,
        scale: 0.03 + Math.random() * 0.08,
      });
    }
    particles.current = arr;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const tempObject = new THREE.Object3D();

    particles.current.forEach((p, i) => {
      // Drift upward slowly
      p.pos.y += p.speed;
      if (p.pos.y > 6) p.pos.y = -6;

      // Apply subtle mouse parallax push
      const finalX = p.pos.x + mouse.current.x * 0.5;
      const finalY = p.pos.y + mouse.current.y * 0.5;

      tempObject.position.set(finalX, finalY, p.pos.z);
      tempObject.rotation.set(p.rot, p.rot * 0.5, 0);
      tempObject.scale.setScalar(p.scale);
      tempObject.updateMatrix();

      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]} castShadow>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.35} wireframe />
    </instancedMesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 bg-pure-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]} // Optimize pixel ratios
        gl={{ alpha: false, antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Cinematic ambient background lighting to highlight contours */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#BD00FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00E5FF" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />

        <FloatingParticles />
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <BlobMesh />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
