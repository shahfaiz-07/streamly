# 🎬 Stream.ly

A full-stack video platform built with Next.js featuring authentication, video uploads, and browsing. Deployed using Docker on Render.

## 🚀 Features

* 🔐 **Auth via NextAuth**  
  Supports Credentials, Google, Discord, and GitHub.

* 📤 **Upload Videos**  
  Upload functionality powered by **Cloudinary** (deployed version).  
  Easy switch to **ImageKit** if preferred — just toggle a few lines in the code (see below).

* 🎥 **Browse Videos**  
  Discover uploaded content in a sleek UI.

* 🐳 **Dockerized Deployment**  
  Easily deployable on platforms like **Render**.

---

## 🔄 Switching Between Cloudinary & ImageKit

This project supports both **Cloudinary** and **ImageKit** for video uploads.  
However, due to **ImageKit's limited free-tier token quota**, the deployed version uses **Cloudinary**.

If you’d like to use **ImageKit** instead:

- Clone the repo locally
- Follow the steps in the README to set up your `.env`
- Inside the upload form at `src/app/components/VideoComponent.tsx`:
  - **Uncomment** the line with `FileUpload` (ImageKit upload) - line **70**
    ```tsx
    {/* <FileUpload onSuccess={onSuccess} fileType='video' setLoading={setLoading} disabled={!session?.user.username} /> */}
    ```
  - **Comment** the line with `CloudinaryUpload` - line **72**
    ```tsx
    <CloudinaryUpload onSuccess={onSuccess} fileType='video' setLoading={setLoading} disabled={!session?.user.username}/>
    ```
- In the video upload logic:
  - **Uncomment** the ImageKit thumbnail logic: - line **28**
    ```ts
    // thumbnailUrl: `${videoUrl}/ik-thumbnail.jpg`
    ```
  - **Comment** the Cloudinary-based thumbnail line: - line **29**
    ```ts
    thumbnailUrl: videoUrl.replace(/\.mp4$/, ".jpg")
    ```

> 🔁 It's just a matter of toggling a few comments — no heavy config needed.

---

## 🛠️ Local Setup

Got you bro — we’ll split the `.env` setup section into two clear parts: **ImageKit** and **Cloudinary**, so users can configure whichever one they want.

Here's the **updated `.env` section** in your `README.md`:

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

Create a `.env` file in the root. You can reference `env.example` if needed.

#### 🔷 For **ImageKit** (optional)

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_ENDPOINT=your_imagekit_url_endpoint
```

#### 🔶 For **Cloudinary** (used in deployed version)

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ **Note:** Use either ImageKit or Cloudinary. You don't need both unless you're planning to switch dynamically.

#### 🔐 Common Variables (Required)

```env
MONGO_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=random_generated_secret_key

GOOGLE_AUTH_CLIENT=your_google_client_id
GOOGLE_AUTH_SECRET=your_google_client_secret

GITHUB_AUTH_CLIENT=your_github_client_id
GITHUB_AUTH_SECRET=your_github_client_secret

DISCORD_AUTH_CLIENT=your_discord_client_id
DISCORD_AUTH_SECRET=your_discord_client_secret

NEXTAUTH_URL=http://localhost:3000
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