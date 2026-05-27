# Study Go With Zeenat

A comprehensive Judiciary and LLB preparation platform built with the MERN stack.

## 🚀 Features

- **User Authentication:** Secure login and registration with JWT.
- **Courses:** Browse and watch curated video courses (YouTube integration).
- **Books & Resources:** Download PDF study materials and notes (Cloudinary integration).
- **Playlists:** Organized collections of video content for structured learning.
- **Admin Dashboard:** Manage courses, books, playlists, and users.
- **Responsive Design:** Mobile-first approach using Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- React Router v7
- React Query (TanStack Query)
- Framer Motion (Animations)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Cloudinary & Multer (File Uploads)

## 📦 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image and PDF uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Himanshu-yarr/study-platform.git
   cd study-platform
   ```

2. **Install Dependencies**
   You can install dependencies for both client and server from the root directory:
   ```bash
   npm run build
   ```
   *(This script runs `npm install` for both the client and server).*

3. **Environment Variables**
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   *If your frontend requires any environment variables (e.g., `VITE_API_URL`), add a `.env` file in the `client` directory as well.*

### Running the Application

To run both the frontend and backend concurrently from the root directory:

```bash
npm run dev
```

Alternatively, you can run them separately:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

## 🌐 Live URL
(Add your deployed URL here)

## 📄 License
This project is licensed under the ISC License.
