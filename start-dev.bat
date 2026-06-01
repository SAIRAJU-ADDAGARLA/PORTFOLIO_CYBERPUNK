@echo off
title Sairaju Portfolio Launcher
echo ===================================================
echo   INITIALIZING SAIRAJU INTERACTIVE PORTFOLIO SERVER
echo ===================================================
echo.

:: Launch the Next.js development server in a new window
echo [SYSTEM] Starting dev server (npm run dev)...
start cmd /k "npm run dev"

:: Wait 4 seconds to let the server bind and start up
echo [SYSTEM] Waiting for local server to bind...
timeout /t 4 /nobreak > nul

:: Open the website automatically in the default browser
echo [SYSTEM] Opening http://localhost:3000 in your browser...
start http://localhost:3000

echo.
echo ===================================================
echo   PORTFOLIO SERVER LAUNCHED SUCCESSFUL.
echo   Press any key to exit this launcher window.
echo ===================================================
pause > nul
