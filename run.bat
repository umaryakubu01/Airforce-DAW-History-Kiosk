@echo off
setlocal
set "APP=%~dp0index.html"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" (echo Microsoft Edge was not found. & pause & exit /b 1)
start "" "%EDGE%" --kiosk "file:///%APP:\=/%" --edge-kiosk-type=fullscreen --no-first-run
