#!/bin/bash
# SMT-Escape 서버 배포 스크립트
# .claude 및 불필요한 파일 제외

echo "=== SMT-Escape Server Deployment ==="
echo ""

# 서버 정보
SERVER_USER="ubuntu"
SERVER_IP="13.215.208.204"
SERVER_PATH="/var/www/html"
LOCAL_PATH="E:/Android/firebase_hosting/smt-escape/"

# # 1단계: 서버 백업
# echo "1. Creating server backup..."
# BACKUP_NAME="html_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
# ssh ${SERVER_USER}@${SERVER_IP} "cd /var/www && sudo tar -czf ${BACKUP_NAME} html && ls -lh ${BACKUP_NAME}"

# if [ $? -eq 0 ]; then
#     echo "✅ Backup created: ${BACKUP_NAME}"
# else
#     echo "❌ Backup failed!"
#     exit 1
# fi

# echo ""

# # 2단계: 권한 설정 (업로드를 위해)
# echo "2. Setting upload permissions..."
# ssh ${SERVER_USER}@${SERVER_IP} "sudo chown -R ubuntu:ubuntu ${SERVER_PATH}"

# echo ""

# # 3단계: rsync로 파일 동기화 (.claude 제외)
# echo "3. Syncing files to server (excluding .claude, .git, etc.)..."
# rsync -av --delete \
#     --exclude='.claude' \
#     --exclude='.git' \
#     --exclude='.gitignore' \
#     --exclude='node_modules' \
#     --exclude='.env.local' \
#     --exclude='.vscode' \
#     --exclude='*.log' \
#     --exclude='deploy.sh' \
#     --exclude='_e2e' \
#     --exclude='_reports' \
#     --exclude='waitfordel' \
#     "${LOCAL_PATH}" ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

# if [ $? -eq 0 ]; then
#     echo "✅ Files synced successfully"
# else
#     echo "❌ Sync failed!"
#     exit 1
# fi

# echo ""

# 4단계: 웹 서버 권한 복원
echo "4. Setting web server permissions..."
ssh ${SERVER_USER}@${SERVER_IP} "
    sudo chown -R www-data:www-data ${SERVER_PATH} && \
    sudo find ${SERVER_PATH} -type d -exec chmod 755 {} \; && \
    sudo find ${SERVER_PATH} -type f -exec chmod 644 {} \; && \
    sudo chmod -R 775 ${SERVER_PATH}/uploads ${SERVER_PATH}/backend
"

if [ $? -eq 0 ]; then
    echo "✅ Permissions set successfully"
else
    echo "❌ Permission setting failed!"
    exit 1
fi

echo ""
echo "==================================="
echo "✅ Deployment completed successfully!"
echo "==================================="
echo ""
echo "Backup location: /var/www/${BACKUP_NAME}"
echo "Server: www.smpoc.site" 
echo ""
