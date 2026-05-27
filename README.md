   # StudyGo 📚⚖️

   A full-stack MERN-based study platform designed for law and judiciary students.  
   The platform allows users to explore courses, books, YouTube lecture series, and educational resources through a modern and responsive web application.

   The project includes authentication, admin dashboard, bookmarks system, profile management, notice board functionality, and cloud-based media handling.

   Built using AI-assisted development workflows combined with manual debugging, optimization, deployment, and feature refinement.

   ---

   ## 🚀 Features

   - JWT Authentication & Authorization
   - Admin Dashboard
   - Add & Manage Courses
   - Add & Manage Books
   - Add YouTube Playlist Series
   - Dynamic Notice Board
   - User Bookmarks
   - User Profile Management
   - Dark / Light Theme
   - Responsive UI
   - Cloudinary Media Integration
   - REST API Architecture
   - Protected Routes
   - Secure Backend Middleware

   ---

   ## 📚 Main Functionalities

   ### 🎥 Courses Section

   - Add courses using YouTube lecture links
   - Manage course details dynamically
   - Browse and bookmark courses

   ### 📖 Books Section

   - Add free or paid books
   - PDF & Hardcopy support
   - WhatsApp redirection for paid books

   ### 📺 Series Section

   - Add complete YouTube playlist series
   - Organized educational content

   ### 📢 Notice Board

   - Dynamic notices displayed on homepage
   - Admin-controlled announcements

   ### 👤 User Features

   - User Signup & Login
   - Profile Editing
   - Bookmarked Courses & Books
   - Personalized Dashboard

   ### 🌙 UI Features

   - Dark / Light Theme Toggle
   - Responsive Design
   - Modern Animated UI

   ---

   ## 🛠️ Tech Stack

   ### Frontend

   - React.js
   - Vite
   - Tailwind CSS
   - React Router DOM
   - Axios
   - Framer Motion
   - React Hot Toast
   - Lucide React Icons
   - TanStack React Query

   ### Backend

   - Node.js
   - Express.js

   ### Database

   - MongoDB
   - Mongoose

   ### Authentication & Security

   - JWT Authentication
   - bcryptjs
   - Helmet
   - Express Rate Limit

   ### File & Media Handling

   - Multer
   - Cloudinary
   - multer-storage-cloudinary

   ### Validation & Utilities

   - Express Validator
   - dotenv
   - Morgan
   - CORS

   ---

   ## 📂 Project Structure

   ```bash
   study-platform/
   │
   ├── client/
   │   ├── src/
   │   ├── public/
   │   ├── package.json
   │   └── ...
   │
   ├── server/
   │   ├── config/
   │   ├── middleware/
   │   ├── models/
   │   ├── routes/
   │   ├── package.json
   │   └── ...
   │
   └── README.md
   ```

   ---

   ## 🌐 Live Demo

   https://study-platform-4anp.onrender.com

   ---

   ## ⚡ Installation & Setup

   ### 1️⃣ Clone Repository

   ```bash
   git clone https://github.com/Himanshu-yarr/study-platform.git
   ```

   ### 2️⃣ Open Project Folder

   ```bash
   cd study-platform
   ```

   ---

   ## 📦 Install Frontend Dependencies

   ```bash
   cd client
   npm install
   ```

   ---

   ## 📦 Install Backend Dependencies

   ```bash
   cd ../server
   npm install
   ```

   ---

   ## 🔑 Setup Environment Variables

   Create `.env` file inside `server` folder.

   Example:

   ```env
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_jwt_secret

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   ---

   ## ▶️ Run Frontend

   ```bash
   cd client
   npm run dev
   ```

   ---

   ## ▶️ Run Backend

   ```bash
   cd server
   npm run dev
   ```

   ---

   ## 🔒 Security Features

   - JWT Authentication
   - Protected Routes
   - Role-Based Authorization
   - Secure Password Hashing
   - API Security using Helmet
   - Rate Limiting
   - Server-side Validation

   ---

   ## 📱 Responsive Design

   Implemented responsive behavior using:

   - Tailwind CSS
   - Flexbox
   - Grid Layout
   - Mobile-first Design Principles

   ---

   ## 🧠 Key Concepts Implemented

   ### MERN Stack Architecture

   Built using MongoDB, Express.js, React.js, and Node.js with separate frontend and backend architecture.

   ### Authentication & Authorization

   Implemented JWT-based authentication with protected routes and admin-only access controls.

   ### Cloudinary Integration

   Integrated Cloudinary for cloud-based media storage and management.

   ### Dynamic Content Management

   Created admin panel functionality for managing courses, books, playlists, and notices dynamically.

   ### State & Server Data Management

   Used React Query for efficient API state handling and caching.

   ---

   ## 🤖 AI-Assisted Development Workflow

   This project was developed using AI-assisted development tools including Claude Code and Antigravity Workshop.

   The development workflow involved:

   - Prompt engineering for feature generation
   - Debugging runtime and console errors
   - Fixing UI/UX inconsistencies
   - Improving backend logic
   - Resolving deployment issues
   - Testing full-stack workflows
   - Iteratively refining application features

   Although AI tools accelerated development, the project required continuous manual debugging, feature refinement, deployment configuration, database integration, and overall project stabilization.

   ---

   ## 🚀 Future Improvements

   - Payment Gateway Integration
   - Advanced Search & Filters
   - Student Progress Tracking
   - Real-time Notifications
   - AI-based Recommendations
   - Notes Upload System
   - Course Completion Tracking

   ---

   ## 👨‍💻 Author

   Himanshu Joshi

   B.Tech CSE Student  
   MERN Stack & Full Stack Development Enthusiast

   ---