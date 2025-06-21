# 📝 Blogging Platform

A full-stack modern blogging platform built with **NestJS** (backend) and **React** (frontend). Create, read, update, and delete blog posts with a beautiful, responsive interface.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### Backend (NestJS)

- 🏗️ **RESTful API** with full CRUD operations
- 🗄️ **PostgreSQL** database integration with TypeORM
- ✅ **Data validation** and error handling
- 🔧 **Environment configuration** support
- 📚 **Comprehensive JSDoc documentation**
- 🧪 **Unit and E2E testing setup**

### Frontend (React)

- 🎨 **Modern, responsive UI** with Tailwind CSS
- ⚡ **TypeScript** for type safety
- 🔄 **Real-time API integration**
- 📱 **Mobile-friendly design**
- 🚀 **React Router** for navigation
- 🎯 **Component-based architecture**

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

## 🚀 Quick Start

### Option A: Automated Setup (Recommended)

Use our automated setup script to configure PostgreSQL:

```bash
# Run the automated database setup script
./scripts/setup-database.sh
```

This script will:

- ✅ Check PostgreSQL installation
- ✅ Start PostgreSQL service
- ✅ Create the `postgres` user (if needed)
- ✅ Create the `blog_db` database
- ✅ Generate a `.env` file with correct configuration
- ✅ Verify the setup

### Option B: Manual Setup

If you prefer manual setup, follow these steps:

```bash
# Start PostgreSQL service (macOS with Homebrew)
brew services start postgresql

# Or on Ubuntu/Debian
sudo systemctl start postgresql

# Create database and user
createdb blog_db
createuser -s postgres  # Creates postgres user if it doesn't exist

# Or using PostgreSQL command line
psql -U postgres
CREATE DATABASE blog_db;
CREATE USER blog_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;
\q
```

### 1. Environment Configuration (Optional)

If you used the manual setup, create a `.env` file in the root directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=blog_db

# Application Configuration
NODE_ENV=development
PORT=3000
```

**Note:** The automated setup script creates this file automatically.

### 2. Backend Setup

```bash
# Install dependencies
yarn install

# Start the backend in development mode
yarn start:dev
```

The backend will be available at **http://localhost:3000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will be available at **http://localhost:3001**

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method   | Endpoint    | Description            | Request Body                           |
| -------- | ----------- | ---------------------- | -------------------------------------- |
| `GET`    | `/blog`     | Get all blog posts     | -                                      |
| `GET`    | `/blog/:id` | Get specific blog post | -                                      |
| `POST`   | `/blog`     | Create new blog post   | `{ title: string, content: string }`   |
| `PUT`    | `/blog/:id` | Update blog post       | `{ title?: string, content?: string }` |
| `DELETE` | `/blog/:id` | Delete blog post       | -                                      |

### Example Requests

#### Create a Blog Post

```bash
curl -X POST http://localhost:3000/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post!"
  }'
```

#### Get All Posts

```bash
curl http://localhost:3000/blog
```

#### Update a Post

```bash
curl -X PUT http://localhost:3000/blog/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Blog Post Title"
  }'
```

## 🏗️ Project Structure

```
blogging-platform/
├── src/                          # NestJS Backend
│   ├── blog/                     # Blog module
│   │   ├── blog.controller.ts    # API endpoints
│   │   ├── blog.service.ts       # Business logic
│   │   ├── blog.module.ts        # Module configuration
│   │   └── entities/
│   │       └── blog-post.entity.ts  # Database entity
│   ├── app.module.ts             # Main app module
│   └── main.ts                   # Application entry point
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   └── App.tsx               # Main app component
│   └── public/                   # Static assets
├── test/                         # E2E tests
├── package.json                  # Backend dependencies
└── README.md                     # This file
```

## 🧪 Testing

### Backend Tests

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov

# Watch mode
yarn test:watch
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🛠️ Available Scripts

### Backend Scripts

```bash
yarn start          # Start in production mode
yarn start:dev      # Start in development mode (recommended)
yarn start:debug    # Start in debug mode
yarn build          # Build for production
yarn lint           # Run ESLint
yarn format         # Format code with Prettier
```

### Frontend Scripts

```bash
npm start           # Start development server
npm build           # Build for production
npm test            # Run tests
npm eject           # Eject from Create React App
```

## 🔧 Configuration

### Backend Environment Variables

| Variable      | Description       | Default     |
| ------------- | ----------------- | ----------- |
| `DB_HOST`     | Database host     | `localhost` |
| `DB_PORT`     | Database port     | `5432`      |
| `DB_USERNAME` | Database username | `postgres`  |
| `DB_PASSWORD` | Database password | `password`  |
| `DB_NAME`     | Database name     | `blog_db`   |
| `PORT`        | Server port       | `3000`      |

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:3000`.

To change the API URL, update `API_BASE_URL` in `frontend/src/services/api.ts`.

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: role "postgres" does not exist
```

**Solution:**

```bash
# Create the postgres user
createuser -s postgres

# Or create with password
createuser -P postgres
```

#### 2. Port Already in Use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

#### 3. Database Does Not Exist

```bash
# Create the database
createdb blog_db

# Or using psql
psql -U postgres -c "CREATE DATABASE blog_db;"
```

#### 4. CORS Errors

- Ensure the backend is running before starting the frontend
- Check that the API URL in the frontend matches the backend URL

## 🚀 Deployment

### Backend Deployment

1. **Build the application:**

   ```bash
   yarn build
   ```

2. **Set production environment variables**

3. **Start the production server:**
   ```bash
   yarn start:prod
   ```

### Frontend Deployment

1. **Build the application:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the existing [Issues](../../issues)
3. Create a new issue if your problem isn't covered

## 🔗 Links

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://reactjs.org/docs)
- [TypeORM Documentation](https://typeorm.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
