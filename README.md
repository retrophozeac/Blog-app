# Blog App

A full-stack blogging platform that allows users to create accounts, publish blog posts, and read content from other users.

## Project Overview

This Blog App is a modern web application built with a clean separation of concerns:

- **Frontend**: React-based UI for user interaction
- **Backend**: API server built with Hono.js running on Cloudflare Workers
- **Common**: Shared type definitions and validation schemas

The application features user authentication, blog post creation and management, and a responsive UI built with TailwindCSS.

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios for API requests

### Backend
- Hono.js (lightweight web framework)
- Cloudflare Workers (serverless)
- Prisma ORM with Prisma Accelerate
- PostgreSQL database
- JWT for authentication

### Common
- Zod for schema validation
- Shared type definitions

<!-- ## Project Structure

The project is organized as a monorepo with three main directories:

```
Blog-app/
├── frontend/       # React frontend application
├── backend/        # Hono.js API server
└── common/         # Shared types and validation schemas
```

### Frontend Structure

The frontend follows a standard React application structure:

- `src/components/`: Reusable UI components
- `src/pages/`: Page components for different routes
- `src/hooks/`: Custom React hooks for data fetching
- `src/assets/`: Static assets like images

### Backend Structure

The backend is organized around the Hono.js framework:

- `src/index.ts`: Main application entry point
- `src/routes/`: API route handlers
- `prisma/`: Database schema and migrations-->

## Setup and Installation 

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or use Prisma Accelerate as configured)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Blog-app
   ```

2. Install dependencies for all packages:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install common dependencies
   cd ../common
   npm install
   ```

3. Set up environment variables:
   - Backend: Create a `.env` file in the `backend` directory with:
     ```
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```

## Development

### Running the Backend

```bash
cd backend
npm run dev
```

This will start the backend server using Wrangler, Cloudflare's development tool.

### Running the Frontend

```bash
cd frontend
npm run dev
```

This will start the Vite development server, typically on http://localhost:5173.

## Deployment

### Backend Deployment

The backend is configured to deploy to Cloudflare Workers:

```bash
cd backend
npm run deploy
```

### Frontend Deployment

The frontend can be built and deployed to any static hosting service:

```bash
cd frontend
npm run build
```

This will generate optimized production files in the `dist` directory.

## API Documentation

### Authentication Endpoints

- `POST /api/v1/user/signup`: Create a new user account
  - Body: `{ email, password, name }`
  - Returns: JWT token

- `POST /api/v1/user/signin`: Sign in to an existing account
  - Body: `{ email, password }`
  - Returns: JWT token

### Blog Endpoints

All blog endpoints require authentication via JWT token in the Authorization header.

- `GET /api/v1/book/bulk`: Get all blog posts
  - Returns: Array of blog posts

- `GET /api/v1/book/:id`: Get a specific blog post by ID
  - Returns: Blog post details

- `POST /api/v1/book`: Create a new blog post
  - Body: `{ title, content }`
  - Returns: Created post ID

- `PUT /api/v1/book`: Update an existing blog post
  - Body: `{ id, title, content }`
  - Returns: Success message

- `DELETE /api/v1/book`: Delete all posts (admin only)
  - Returns: Success message

## Features

### User Authentication
- User registration and login
- JWT-based authentication
- Protected routes

### Blog Management
- Create, read, and update blog posts
- Rich text content
- Author attribution

### User Interface
- Responsive design with TailwindCSS
- Loading states with skeleton loaders
- Clean, modern UI

## Database Schema

### User Model
- id: Unique identifier
- email: User's email (unique)
- name: User's display name
- password: User's password (should be hashed in a production environment)

### Post Model
- id: Unique identifier
- title: Blog post title
- content: Blog post content
- published: Publication status
- authorId: Reference to the author (User)

## Future Improvements

- Add comment functionality
- Implement post categories/tags
- Add user profiles with avatars
- Implement rich text editor
- Add search functionality
- Implement pagination for blog listings
- Add social sharing options
