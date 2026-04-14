@echo off
start cmd /k "cd /d %~dp0front && npm install && npm run dev"
start cmd /k "cd /d %~dp0back && npm install && npm start"
