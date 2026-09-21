@echo off
title HUDA Sports - Lancement
cd /d "%~dp0"

echo Installation des dependances...
echo (ca peut prendre 1 a 2 minutes, a chaque lancement)
call npm install
if errorlevel 1 (
    echo.
    echo Une erreur est survenue pendant l'installation.
    echo Verifie que Node.js est bien installe : https://nodejs.org
    pause
    exit /b 1
)

echo Demarrage du serveur local (npm run dev)...
start "HUDA Sports - serveur" "%~dp0scripts\dev-session.bat"

echo Demarrage de la synchronisation automatique...
start "HUDA Sports - synchro auto" powershell -NoExit -ExecutionPolicy Bypass -File "%~dp0scripts\watch-updates.ps1"

echo Ouverture du site dans le navigateur...
timeout /t 4 /nobreak >nul
start "" "http://localhost:3000"

exit
