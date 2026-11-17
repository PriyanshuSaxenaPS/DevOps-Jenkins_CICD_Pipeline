# Jenkins CI/CD Pipeline - Full-Stack Deployment on AWS EC2

This repository documents the complete **TuteDude DevOps** Jenkins CI/CD assignment. It demonstrates hosting a **Python/Flask** backend and a **Node.js/Express** frontend on a single **AWS EC2 (Ubuntu 24.04)** instance and automating deployments using **Jenkins**, **GitHub Webhooks**, **systemd**, and custom deployment scripts.

## 🏗️ Architecture Overview

```text
GitHub Repositories (flask-backend & express-frontend)
        │
        ▼  [GitHub Webhooks on Push]
Jenkins CI/CD Server (Port 8080 on AWS EC2)
        │
        ▼  [Automated Deployment Scripts via sudoers]
AWS EC2 Ubuntu Server
 ├── Flask Backend  (Gunicorn + systemd) ──▶ Port 5000 (/opt/flask-app)
 └── Express Frontend (Node + systemd)   ──▶ Port 3000 (/opt/express-app)
```

---

## 🔗 Linked Source Repositories
* **Flask Backend:** `https://github.com/PriyanshuSaxenaPS/DevOps-Flask-Backend`
* **Express Frontend:** `https://github.com/PriyanshuSaxenaPS/DevOps-Express-Frontend`

---

## 🛠️ Tech Stack & Server Configuration
* **Cloud Compute:** AWS EC2 (`t3.micro`, Ubuntu 24.04 LTS)
* **Backend:** Python 3.12, Flask, Gunicorn (`flask-app.service` on port `5000`)
* **Frontend:** Node.js v18, Express.js (`express-app.service` on port `3000`)
* **CI/CD & Automation:** Jenkins (`openjdk-21-jre`, port `8080`), GitHub Webhooks, Bash (`rsync`), `systemd`

---

## 🚀 Deployment & Automation Process

### Part 1: EC2 Application & Systemd Setup
1. Provisioned an Ubuntu 24.04 EC2 instance and opened inbound TCP ports `22` (SSH), `3000` (Express), `5000` (Flask), and `8080` (Jenkins).
2. Installed Python 3, Node.js, Git, OpenJDK 21, and Jenkins.
3. Created a dedicated non-login system user (`deploy`) and deployed applications under `/opt/flask-app` and `/opt/express-app`.
4. Configured persistent `systemd` unit files (`/etc/systemd/system/flask-app.service` and `/etc/systemd/system/express-app.service`) so both services auto-start on boot and restart on failure.

### Part 2: Jenkins CI/CD & Webhook Automation
1. Created two independent Jenkins Pipeline jobs (`Flask-CI-CD` and `Express-CI-CD`) linked to their respective GitHub repositories and `Jenkinsfile` scripts.
2. Configured secure deployment scripts (`/usr/local/bin/deploy-flask` and `/usr/local/bin/deploy-express`) with restricted `sudoers` privileges (`/etc/sudoers.d/jenkins-deploy`) to sync workspace files via `rsync`, update dependencies, and restart `systemd` services.
3. Configured GitHub Webhooks (`http://<EC2_PUBLIC_IP>:8080/github-webhook/`) to trigger builds automatically on every `git push`.

---

## 📂 Submission Folder Structure
```text
Jenkins_CICD_Priyanshu/
├── flask-backend/                  # Flask application source code and Jenkinsfile
├── express-frontend/               # Express application source code and Jenkinsfile
├── Jenkins_CICD_Documentation.docx # Step-by-step screenshots, commands, and logs
├── GitHub_Repositories.txt         # Links to both GitHub repositories
└── README.md                       # Complete deployment and CI/CD pipeline guide
```
