# 🎬 Stream.ly

A full-stack video platform built with Next.js featuring authentication, video uploads, and browsing. Deployed using Docker on Render.

## 🚀 Features

* 🔐 **Auth via NextAuth**
  Supports Credentials, Google, Discord, and GitHub.

* 📤 **Upload Videos**
  Upload functionality powered by **ImageKit**.

* 🎥 **Browse Videos**
  Discover uploaded content in a sleek UI.

* 🐳 **Dockerized Deployment**
  Easily deployable on platforms like **Render**.

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/shahfaiz-07/streamly
cd streamly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file (check `env.example` file):

```env
MONGO_URI=your_mongodb_connection_string          # Your MongoDB connection URI

NEXTAUTH_SECRET=random_generated_secret_key       # Used to sign NextAuth JWT tokens

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_pub_key      # Public API key from ImageKit
NEXT_PUBLIC_IMAGEKIT_ENDPOINT=your_imagekit_url_endpoint   # ImageKit URL endpoint

GOOGLE_AUTH_CLIENT=your_google_client_id          # Google OAuth Client ID
GOOGLE_AUTH_SECRET=your_google_client_secret      # Google OAuth Client Secret

GITHUB_AUTH_CLIENT=your_github_client_id          # GitHub OAuth Client ID
GITHUB_AUTH_SECRET=your_github_client_secret      # GitHub OAuth Client Secret

DISCORD_AUTH_CLIENT=your_discord_client_id        # Discord OAuth Client ID
DISCORD_AUTH_SECRET=your_discord_client_secret    # Discord OAuth Client Secret

NEXTAUTH_URL=http://localhost:3000                # Base URL for your app (e.g., localhost or deployed URL)

```

### 4. Run the app

```bash
npm run dev
```

App will be live on `http://localhost:3000`

---

## 🐳 Running with Docker

### 1. Build the Docker image

```bash
docker build -t streamly .
```

### 2. Run the container

```bash
docker run -p 3000:3000 --env-file .env --rm streamly
```

Now open `http://localhost:3000` in your browser.

---

## 📦 Deployment

Deployed on [Render](https://render.com) with Docker. Check the [live demo](https://streamly-q7cg.onrender.com/)!
