@echo off
setlocal
set "SCRIPT=%~dp0run.bat"
set "DESKTOP=%USERPROFILE%\Desktop"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut('%DESKTOP%\DAW History Hall of Fame.lnk');$s.TargetPath='%SCRIPT%';$s.WorkingDirectory='%~dp0';$s.IconLocation='%~dp0assets\icons\app.ico';$s.Save()"
echo Shortcut created on Desktop.
pause
