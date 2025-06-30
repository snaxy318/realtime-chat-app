#!/bin/bash

# Update package index
sudo apt update -y

# Install Node.js, npm, git
sudo apt install -y nodejs npm git

# Clone your chat app repo
cd /home/ubuntu
git clone https://github.com/snaxy318/realtime-chat-app.git

# Move into backend directory
cd realtime-chat-app/backend

# Install dependencies
npm install

# Start the backend server in the background (modify as needed)
nohup npm start &

# Optional: Enable firewall rules (if using UFW)
# sudo ufw allow 22
# sudo ufw allow 3000
# sudo ufw allow 5000
# sudo ufw --force enable
