@echo off
REM SMT-Escape 서버 배포 스크립트 (Windows)
REM .claude 및 불필요한 파일 제외

echo === SMT-Escape Server Deployment ===
echo.

set SERVER_USER=ubuntu
set SERVER_IP=52.77.238.135
set SERVER_PATH=/var/www/html
set LOCAL_PATH=E:/Android/firebase_hosting/smt-escape/

REM 1단계: 서버 백업
echo 1. Creating server backup...
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
set BACKUP_NAME=html_backup_%mydate%_%mytime%.tar.gz

ssh %SERVER_USER%@%SERVER_IP% "cd /var/www && sudo tar -czf %BACKUP_NAME% html && ls -lh %BACKUP_NAME%"

if %errorlevel% neq 0 (
    echo ❌ Backup failed!
    exit /b 1
)

echo ✅ Backup created
echo.

REM 2단계: 권한 설정
echo 2. Setting upload permissions...
ssh %SERVER_USER%@%SERVER_IP% "sudo chown -R ubuntu:ubuntu %SERVER_PATH%"
echo.

REM 3단계: 파일 동기화
echo 3. Syncing files to server (excluding .claude, .git, etc.)...

REM rsync가 없으면 Git Bash의 rsync 사용
if exist "C:\Program Files\Git\usr\bin\rsync.exe" (
    "C:\Program Files\Git\usr\bin\rsync.exe" -av --delete --exclude=.claude --exclude=.git --exclude=.gitignore --exclude=node_modules --exclude=.env.local --exclude=.vscode --exclude=*.log --exclude=deploy.sh --exclude=deploy.bat --exclude=_e2e --exclude=_reports --exclude=waitfordel "%LOCAL_PATH%" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
) else (
    echo ❌ rsync not found! Please install Git for Windows or use Git Bash to run deploy.sh
    exit /b 1
)

if %errorlevel% neq 0 (
    echo ❌ Sync failed!
    exit /b 1
)

echo ✅ Files synced successfully
echo.

REM 4단계: 웹 서버 권한 복원
echo 4. Setting web server permissions...
ssh %SERVER_USER%@%SERVER_IP% "sudo chown -R www-data:www-data %SERVER_PATH% && sudo find %SERVER_PATH% -type d -exec chmod 755 {} \; && sudo find %SERVER_PATH% -type f -exec chmod 644 {} \; && sudo chmod -R 775 %SERVER_PATH%/uploads %SERVER_PATH%/backend"

if %errorlevel% neq 0 (
    echo ❌ Permission setting failed!
    exit /b 1
)

echo ✅ Permissions set successfully
echo.

echo ===================================
echo ✅ Deployment completed successfully!
echo ===================================
echo.
echo Backup location: /var/www/%BACKUP_NAME%
echo Server: www.smt-escape.com
echo.

pause
