@echo off
rem Backup Windows launcher (use it if antivirus blocks "Startup Company.exe"). Double-click it.
setlocal
title Startup Company launcher

set "APP_DIR=%~dp0..\..\resources\app"
set "ELECTRON_EXE=%APP_DIR%\node_modules\electron\dist\electron.exe"

echo.
echo   Startup Company - Windows launcher
echo   ----------------------------------
echo.

rem 1. Node.js and npm
where node >nul 2>nul
if errorlevel 1 (
    echo [x] Node.js not found. Install it from https://nodejs.org, then double-click this file again.
    pause
    exit /b 1
)
for /f "delims=" %%v in ('node --version') do echo [ok] Node.js %%v

where npm >nul 2>nul
if errorlevel 1 (
    echo [x] npm not found. Reinstall Node.js from https://nodejs.org.
    pause
    exit /b 1
)

rem 2. Electron (first run only)
if not exist "%ELECTRON_EXE%" (
    echo [!] First run: installing Electron ^(needs internet^)...
    pushd "%APP_DIR%"
    call npm install --force --ignore-scripts --silent
    call node node_modules\electron\install.js
    popd
)
if not exist "%ELECTRON_EXE%" (
    echo [x] Electron did not install. From the repo folder, try: cd game\resources\app ^&^& npm install --force --ignore-scripts ^&^& node node_modules\electron\install.js
    pause
    exit /b 1
)
echo [ok] Electron installed

rem 3. Launch and let this window close
echo.
echo   Launching Startup Company...
start "" "%ELECTRON_EXE%" "%APP_DIR%"
exit /b 0
