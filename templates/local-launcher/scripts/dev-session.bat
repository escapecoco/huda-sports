@echo off
title HUDA Sports - serveur
cd /d "%~dp0\.."

call npm run dev

echo.
echo Nettoyage des dependances (npm install sera refait au prochain lancement)...
rd /s /q node_modules 2>nul
echo Termine. Tu peux fermer cette fenetre.
pause >nul
