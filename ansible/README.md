## 📦 Realtime Chat App Deployment with Ansible

This repository contains an **Ansible playbook** to automatically deploy the [Realtime Chat App](https://github.com/snaxy318/realtime-chat-app) on an Ubuntu-based EC2 instance, with backend and frontend served via NGINX and custom domain support via DuckDNS.

---

## 📁 Project Structure

```
ansible/
├── files/
│   ├── duck.sh                  # DuckDNS updater script
│   ├── nginx-chatapp318         # NGINX config for frontend
│   └── nginx-api-chatapp318     # NGINX config for backend
├── vars.yml                     # Variables (e.g., DuckDNS token, domain)
├── playbook.yml                 # Main deployment script
└── inventory                    # Ansible inventory file
```

---

## 🚀 What It Does

* Installs required packages (`nodejs`, `npm`, `nginx`, etc.)
* Clones the [realtime-chat-app](https://github.com/snaxy318/realtime-chat-app)
* Installs frontend/backend dependencies
* Builds the React frontend
* Sets file permissions for NGINX to serve the frontend
* Starts the backend server via `nohup`
* Configures NGINX for both backend and frontend
* Adds a cron job to update the DuckDNS IP every 5 minutes

---

## ⚙️ Prerequisites

* A remote Ubuntu EC2 instance (public IP)
* Ansible installed on your local machine
* Your EC2 IP added to `inventory`
* Ports 80 and 443 open in security group

---

## ⚙️ How to Use

1. **Clone this repository**

   ```bash
   git clone https://github.com/snaxy318/realtime-chat-app.git
   cd realtime-chat-app/ansible
   ```

2. **Edit `vars.yml`**

   ```yaml
   backend_domain: api-chatapp318.duckdns.org
   frontend_domain: chatapp318.duckdns.org
   duckdns_token: YOUR_DUCKDNS_TOKEN
   ```

3. **Edit `inventory`**

   ```ini
   [ec2]
   44.210.90.122 ansible_user=ubuntu
   ```

4. **Run the playbook**

   ```bash
   ansible-playbook -i inventory playbook.yml
   ```

---

## 🔒 Security Notes

* If you include secrets in `vars.yml`, encrypt it using Ansible Vault:

  ```bash
  ansible-vault encrypt vars.yml
  ```

* Use `--ask-vault-pass` when running the playbook.

---

## 🡩‍💻 Author

* **Suryansh Tejas** – [@snaxy318](https://github.com/snaxy318)
