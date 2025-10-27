@echo off
echo Cleaning up project...

REM Stop any running processes (you may need to close terminals manually)
echo Please close all running terminals (Ctrl+C in each terminal)
pause

REM Remove all node_modules directories
echo Removing node_modules...
if exist node_modules rmdir /s /q node_modules
if exist apps\backend\node_modules rmdir /s /q apps\backend\node_modules
if exist apps\frontend\node_modules rmdir /s /q apps\frontend\node_modules
if exist packages\shared\node_modules rmdir /s /q packages\shared\node_modules

REM Remove package-lock files
echo Removing package-lock files...
if exist package-lock.json del package-lock.json
if exist apps\backend\package-lock.json del apps\backend\package-lock.json
if exist apps\frontend\package-lock.json del apps\frontend\package-lock.json
if exist packages\shared\package-lock.json del packages\shared\package-lock.json

REM Install all dependencies
echo Installing dependencies...
call npm install

REM Build shared package
echo Building shared package...
call npm run build -w packages/shared

echo.
echo =====================================
echo Cleanup and installation complete!
echo =====================================
echo.
echo To start the applications:
echo 1. Terminal 1: npm run dev:backend
echo 2. Terminal 2: npm run dev:frontend
echo.
echo Access:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:3001/api/hello
echo - Swagger: http://localhost:3001/api-docs
echo.
pause