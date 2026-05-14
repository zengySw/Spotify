@echo off

:: Открываем фронт
start cmd /k "cd /d %~dp0front && npm install && npm run dev"

:: Открываем бэк
start cmd /k "cd /d %~dp0back && npm install && npm start"
