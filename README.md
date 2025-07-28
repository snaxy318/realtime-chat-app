# 📡 Real-Time Chat App (DevOps Project)

This is a full-stack real-time chat application integrated with a complete DevOps pipeline. It supports real-time messaging using WebSockets and includes containerization, CI/CD automation, cloud infrastructure provisioning, and server configuration.

---

## 📁 Project Structure

realtime-chat-app/
├── ansible/ # Ansible playbook to install Docker on EC2
├── backend/ # Node.js + Socket.IO backend server
├── ec2-terraform/ # Terraform scripts for AWS EC2 provisioning
├── frontend/ # React + Tailwind frontend client
├── monitoring/ # Prometheus & Grafana setup (optional)
├── docker-compose.yml # Compose file for full-stack deployment
├── Dockerfile.backend # Dockerfile for backend container
├── Dockerfile.frontend # Dockerfile for frontend container
├── Jenkinsfile # CI/CD pipeline script for Jenkins
├── LICENSE # Project license (MIT)
└── README.md # Project documentation


---

## 🚀 Features

- 💬 Real-time chat using **Socket.IO**
- ⚛️ Frontend built with **React** and **Tailwind CSS**
- 🚀 Backend using **Node.js** + **Express**
- 🐳 Dockerized deployment
- ☁️ EC2 provisioning using **Terraform**
- 🔧 Configuration management with **Ansible**
- 🔁 CI/CD pipeline via **Jenkins**
- 📈 Optional monitoring with **Prometheus** and **Grafana**

---

## ⚙️ Setup Instructions

### 1. 🌩 Provision EC2 Instance (Terraform)

```bash
cd ec2-terraform
terraform init
terraform apply

This will create an EC2 instance with Docker pre-installed using a user-data script.
2. 🧰 Configure EC2 with Ansible

Ensure your public IP is updated in ansible/inventory.ini and you have SSH access.

cd ansible
ansible-playbook -i inventory.ini playbook.yml

3. 🐳 Deploy with Docker Compose on EC2

SSH into your EC2 instance and run:

docker compose -f docker-compose.yml up --build

📦 CI/CD Pipeline (Jenkins)

The Jenkinsfile automates:

    Dependency installation

    Tests (if added)

    Docker image builds

    Image push to Docker Hub

    SSH deploy to EC2 with docker-compose

🧪 Run Locally (Dev Mode)

# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev

🌐 Domain (Optional Setup)

    Frontend: chatapp318.duckdns.org

    Backend: api-chatapp318.duckdns.org

Ensure DuckDNS and port forwarding (80/443) are correctly configured.
📝 License

This project is licensed under the MIT License.
👨‍💻 Author

Suryansh Tejas


---
