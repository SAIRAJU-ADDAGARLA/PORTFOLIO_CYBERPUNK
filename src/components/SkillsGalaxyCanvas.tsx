'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  color: string;
  pos: THREE.Vector3;
  targetPos: THREE.Vector3;
  scale: number;
}

const skillsData = [
  { name: 'Java', color: '#f89820', x: -2.8, y: 1.2, z: 0.2 },
  { name: 'Python', color: '#3776ab', x: 2.5, y: 1.5, z: 0.6 },
  { name: 'React', color: '#61dafb', x: 0, y: 0.2, z: 0.5 },
  { name: 'Node.js', color: '#339933', x: -1.8, y: -1.2, z: -0.4 },
  { name: 'AI / ML', color: '#FF003C', x: 2.2, y: -1.0, z: -0.8 },
  { name: 'LLM Apps', color: '#00E5FF', x: 0.8, y: 2.2, z: -0.2 },
  { name: 'Firebase', color: '#ffca28', x: -3.2, y: -0.5, z: 0.8 },
  { name: 'MongoDB', color: '#47a248', x: 3.2, y: 0.2, z: -0.6 },
  { name: 'GitHub', color: '#F5F5F3', x: -0.8, y: 2.8, z: 0.4 },
  { name: 'UI / UX', color: '#BD00FF', x: 1.2, y: -2.4, z: 0.7 },
];

function GalaxyScene() {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Initialize node coordinate vector states
  useEffect(() => {
    const list = skillsData.map((s) => ({
      name: s.name,
      color: s.color,
      pos: new THREE.Vector3(s.x, s.y, s.z),
      targetPos: new THREE.Vector3(s.x, s.y, s.z),
      scale: 1,
    }));
    setNodes(list);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (nodes.length === 0) return;

    // 1. Update node physics (subtle float + magnetic pull on hover)
    nodes.forEach((node, i) => {
      // Basic organic hover float
      const wobbleX = Math.sin(time + i) * 0.003;
      const wobbleY = Math.cos(time * 0.8 + i) * 0.003;
      const wobbleZ = Math.sin(time * 0.5 + i) * 0.002;

      node.targetPos.set(
        skillsData[i].x + wobbleX,
        skillsData[i].y + wobbleY,
        skillsData[i].z + wobbleZ
      );

      // Spring physics: pull neighbors closer when a node is hovered
      if (hoveredIndex !== null && hoveredIndex !== i) {
        const hoveredNode = nodes[hoveredIndex];
        const dist = node.pos.distanceTo(hoveredNode.pos);
        if (dist < 4.0) {
          // Calculate directional vector towards hovered node and pull in
          const dir = new THREE.Vector3()
            .subVectors(hoveredNode.pos, node.pos)
            .normalize();
          node.targetPos.addScaledVector(dir, 0.45); // Spring force offset
        }
      }

      // Smoothly interpolate current position towards target using lerp
      node.pos.lerp(node.targetPos, 0.08);

      // Interpolate scales based on hover
      const targetScale = hoveredIndex === i ? 1.6 : 1.0;
      node.scale = THREE.MathUtils.lerp(node.scale, targetScale, 0.12);
    });

    // 2. Re-draw constellation lines connecting nearby nodes
    if (lineRef.current) {
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].pos.distanceTo(nodes[j].pos);
          
          // Connect nodes within specific distance range
          if (dist < 3.8) {
            linePositions.push(
              nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
              nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
            );

            // Blend colors based on connecting node characteristics
            const c1 = new THREE.Color(nodes[i].color);
            const c2 = new THREE.Color(nodes[j].color);
            
            lineColors.push(
              c1.r, c1.g, c1.b,
              c2.r, c2.g, c2.b
            );
          }
        }
      }

      // Update line buffer geometries dynamically
      const lineGeom = lineRef.current.geometry;
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeom.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      lineGeom.computeBoundingSphere();
      lineGeom.computeBoundingBox();
    }
  });

  return (
    <>
      {/* 3D Constellation Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.35} linewidth={1} />
      </lineSegments>

      {/* 3D Nodes */}
      {nodes.map((node, index) => (
        <group key={node.name} position={node.pos}>
          {/* Main Sphere Node */}
          <mesh
            onPointerOver={() => setHoveredIndex(index)}
            onPointerOut={() => setHoveredIndex(null)}
            scale={[node.scale * 0.25, node.scale * 0.25, node.scale * 0.25]}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={hoveredIndex === index ? node.color : '#222222'}
              emissive={node.color}
              emissiveIntensity={hoveredIndex === index ? 0.8 : 0.05}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Glowing Aura Ring during Hover */}
          {hoveredIndex === index && (
            <mesh scale={[node.scale * 0.35, node.scale * 0.35, node.scale * 0.35]}>
              <ringGeometry args={[0.9, 1.0, 32]} />
              <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>
          )}

          {/* Crisp, Camera-Facing HTML Label */}
          <Html
            distanceFactor={4.5}
            position={[0, 0.45, 0]}
            center
            style={{
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
              transform: `scale(${hoveredIndex === index ? 1.15 : 1})`,
            }}
          >
            <div
              className={`px-3 py-1 rounded-md font-mono text-[9px] uppercase tracking-wider border select-none whitespace-nowrap transition-all duration-300 ${
                hoveredIndex === index
                  ? 'bg-pure-black border-warm-white text-warm-white shadow-[0_0_15px_rgba(245,245,243,0.3)]'
                  : 'bg-pure-black/90 border-warm-white/10 text-warm-white/60'
              }`}
            >
              {node.name}
            </div>
          </Html>
        </group>
      ))}

      {/* Orbit Controls */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </>
  );
}

export default function SkillsGalaxyCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00E5FF" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#BD00FF" />
      <GalaxyScene />
    </Canvas>
  );
}
