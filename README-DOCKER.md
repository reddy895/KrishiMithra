# 🐳 Docker Setup Guide for CropCare / KrishiMithra

This project includes complete Docker support so you can run the WhatsApp Bot and Frontend web app on **any operating system** (Windows, macOS, Linux) without worrying about Puppeteer, Chromium dependencies, or WhatsApp session execution errors.

---

## 🚀 Quick Start with Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` to set your `OPENROUTER_API_KEY` (used for AI plant disease analysis).

### 2. Build and Start the Application
Run:
```bash
docker compose up --build
```
Or for detached (background) mode:
```bash
docker compose up -d --build
```

---

## 📱 Accessing the Application

- **Frontend App**: [http://localhost:8080](http://localhost:8080)
- **Backend Health Check**: [http://localhost:3001/health](http://localhost:3001/health)
- **WhatsApp QR Code View**: [http://localhost:3001/qr](http://localhost:3001/qr)

---

## 📲 Linking WhatsApp Bot

1. When the container starts, open [http://localhost:3001/qr](http://localhost:3001/qr) or check the terminal output for the QR code.
2. Open WhatsApp on your mobile phone:
   - Go to **Menu / Settings** > **Linked Devices**
   - Click **Link a Device**
   - Scan the QR code.
3. Once authenticated, the bot will show `✅ WhatsApp client is ready!` and session state will be stored safely in Docker volume `backend-auth`.

---

## 🧹 Resetting WhatsApp Session

If you need to re-scan a new QR code or generate a fresh session:
```bash
docker compose down -v
docker compose up
```
Or set `FORCE_NEW_QR_ON_START=true` in your `.env` file and restart.

---

## ⚙️ Running Locally (Without Docker)

If running outside Docker:
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

The backend code now includes automatic Puppeteer recovery & retry, avoiding `Execution context was destroyed` errors.
