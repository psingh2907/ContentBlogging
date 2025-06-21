# Complete Blogging Platform Setup Guide

This guide will help you set up and run both the NestJS backend and React frontend for your blogging platform.

## 🏗️ Project Architecture

```
blogging-platform/
├── src/                    # NestJS Backend
│   ├── blog/              # Blog module (CRUD operations)
│   │   ├── blog.controller.ts  # API endpoints with JSDoc
│   │   ├── blog.service.ts     # Business logic with JSDoc
│   │   ├── blog.module.ts      # Module configuration
│   │   └── entities/
│   │       └── blog-post.entity.ts  # Database entity with JSDoc
│   ├── app.module.ts      # Main app module with TypeORM config
│   └── main.ts            # Application entry point
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── pages/         # Page Components
│   │   ├── services/      # API Services with JSDoc
│   │   │   └── api.ts     # Fully documented API service
│   │   └── App.tsx        # Main app component
│   └── public/
└── package.json           # Backend dependencies
```

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- A code editor like **VS Code**
- **Git** (optional, for version control)

## 🗄️ Database Setup (Critical!)

### Step 1: Install PostgreSQL

#### macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create a database superuser (if needed)
createuser -s postgres
```

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows

1. Download PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user

### Step 2: Create Database and User

Choose one of the following methods:

#### Method A: Using Command Line Tools (Recommended)

```bash
# Create the database
createdb blog_db

# Create user with password (if postgres user doesn't exist)
createuser -P postgres

# Or create user without password prompt
createuser -s postgres
```

#### Method B: Using PostgreSQL Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE blog_db;

# Create user with password
CREATE USER blog_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;

# Exit PostgreSQL
\q
```

### Step 3: Verify Database Connection

```bash
# Test connection to the database
psql -U postgres -d blog_db

# If successful, you should see:
# blog_db=#

# Exit with \q
```

## 🔧 Environment Configuration

Create a `.env` file in the root directory with the following content:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=blog_db

# Application Configuration
NODE_ENV=development
PORT=3000
```

**Important Notes:**

- Replace `your_password_here` with your actual PostgreSQL password
- If you created a different user, update `DB_USERNAME` accordingly
- Make sure the database name matches what you created

## 🚀 Quick Start

### Step 1: Backend Setup

```bash
# From the root directory (blogging-platform/)
yarn install

# Start the backend in development mode
yarn start:dev
```

**Expected Output:**

```
[Nest] 12345  - 12/01/2023, 2:30:45 PM     LOG [NestApplication] Nest application successfully started +2ms
```

If you see database connection errors, check the [Troubleshooting](#-troubleshooting) section below.

### Step 2: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will automatically open at **http://localhost:3001**

## 🔧 Detailed Setup Instructions

### Backend Setup (NestJS)

1. **Install Dependencies:**

   ```bash
   yarn install
   ```

2. **Available Scripts:**

   ```bash
   yarn start       # Start in production mode
   yarn start:dev   # Start in development mode (recommended)
   yarn start:debug # Start in debug mode
   yarn build       # Build for production
   yarn test        # Run unit tests
   yarn test:e2e    # Run end-to-end tests
   yarn lint        # Run ESLint
   yarn format      # Format code with Prettier
   ```

3. **API Endpoints Documentation:**
   All API endpoints are fully documented with JSDoc comments:
   - `GET /blog` - Get all blog posts
   - `GET /blog/:id` - Get specific blog post
   - `POST /blog` - Create new blog post
   - `PUT /blog/:id` - Update blog post
   - `DELETE /blog/:id` - Delete blog post

### Frontend Setup (React)

1. **Navigate to Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Available Scripts:**
   ```bash
   npm start        # Start development server
   npm build        # Build for production
   npm test         # Run tests
   npm eject        # Eject from Create React App
   ```

## 🌐 Testing the API

You can test the backend API using curl, Postman, or any HTTP client:

### Create a Blog Post

```bash
curl -X POST http://localhost:3000/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post. Welcome to my blog!"
  }'
```

### Get All Posts

```bash
curl http://localhost:3000/blog
```

### Get Specific Post

```bash
curl http://localhost:3000/blog/1
```

### Update a Post

```bash
curl -X PUT http://localhost:3000/blog/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Blog Post Title"
  }'
```

### Delete a Post

```bash
curl -X DELETE http://localhost:3000/blog/1
```

## 📱 Using the Frontend

Once both servers are running:

1. **Home Page** (http://localhost:3001)

   - View all blog posts in a beautiful grid layout
   - Click on any post to read the full content
   - Use the "Write Post" button to create new posts

2. **Create Post** (/create)

   - Fill in the title and content
   - Click "Create Post" to publish

3. **View Post** (/post/:id)

   - Read the full blog post
   - Edit or delete options available

4. **Edit Post** (/edit/:id)
   - Modify existing blog posts
   - Save changes and redirect to the post

## 🎨 Frontend Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with Tailwind CSS
- **Smooth Animations** - Loading states and transitions
- **Error Handling** - User-friendly error messages
- **TypeScript** - Full type safety throughout the application

## 🔧 Configuration

### Backend Configuration

- **Port:** 3000 (configured in `src/main.ts`)
- **CORS:** Enabled for frontend communication
- **Database:** PostgreSQL with TypeORM
- **Auto-sync:** Enabled in development (creates tables automatically)

### Frontend Configuration

- **Port:** 3001 (React default, can be changed in package.json)
- **API URL:** http://localhost:3000 (configured in `src/services/api.ts`)
- **TypeScript:** Fully typed components and services
- **Styling:** Tailwind CSS for modern UI

## 🛠️ Troubleshooting

### Database Connection Issues

#### 1. Role "postgres" does not exist

```
Error: role "postgres" does not exist
```

**Solutions:**

```bash
# Solution A: Create the postgres user
createuser -s postgres

# Solution B: Create with specific password
createuser -P postgres

# Solution C: Use existing system user
whoami  # Use your system username in DB_USERNAME
```

#### 2. Database does not exist

```
Error: database "blog_db" does not exist
```

**Solution:**

```bash
# Create the database
createdb blog_db

# Or using psql
psql -U postgres -c "CREATE DATABASE blog_db;"
```

#### 3. Authentication failed

```
Error: password authentication failed
```

**Solutions:**

1. Check your `.env` file has the correct password
2. Reset postgres password:

   ```bash
   # Connect as superuser
   sudo -u postgres psql

   # Change password
   ALTER USER postgres PASSWORD 'new_password';

   # Exit
   \q
   ```

#### 4. Connection refused

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**

```bash
# Start PostgreSQL service
# macOS:
brew services start postgresql

# Ubuntu/Debian:
sudo systemctl start postgresql

# Check if PostgreSQL is running
pg_isready
```

### Common Application Issues

#### 1. Port Already in Use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

#### 2. CORS Errors

- Ensure backend is running before starting frontend
- Check that API_BASE_URL in frontend matches backend URL

#### 3. Module Not Found

```bash
# Backend
rm -rf node_modules yarn.lock
yarn install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. TypeScript Compilation Errors

```bash
# Backend
yarn build

# Frontend
cd frontend
npm run build
```

## 📚 Documentation Features

This project includes comprehensive documentation:

### Backend Documentation (JSDoc)

- **BlogService**: All CRUD operations with examples
- **BlogController**: All HTTP endpoints with request/response examples
- **BlogPost Entity**: Database schema documentation
- **Interfaces**: Complete type definitions

### Frontend Documentation (JSDoc)

- **API Service**: All HTTP client methods with examples
- **TypeScript Interfaces**: Complete type safety
- **Component Structure**: Well-organized React components

### Generate API Documentation

```bash
# Install JSDoc globally
npm install -g jsdoc

# Generate documentation (run from root)
jsdoc src/**/*.ts -d docs
```

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Configuration:**

   ```bash
   # Set production environment variables
   NODE_ENV=production
   DB_HOST=your_production_db_host
   DB_USERNAME=your_production_user
   DB_PASSWORD=your_production_password
   ```

2. **Build and Start:**
   ```bash
   yarn build
   yarn start:prod
   ```

### Frontend Deployment

1. **Build the application:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting provider (Netlify, Vercel, etc.)

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

## 📊 Performance Tips

1. **Database Optimization:**

   - Add indexes for frequently queried fields
   - Use connection pooling for production
   - Disable `synchronize` in production

2. **Frontend Optimization:**
   - Enable React production build
   - Use lazy loading for routes
   - Optimize bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Add comprehensive JSDoc documentation for new functions
4. Write tests for new features
5. Ensure all tests pass: `yarn test && cd frontend && npm test`
6. Commit changes: `git commit -m 'Add feature with documentation'`
7. Push to branch: `git push origin feature-name`
8. Submit a pull request

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify your PostgreSQL installation and configuration
3. Ensure all environment variables are set correctly
4. Check that both backend and frontend are running on correct ports
5. Create an issue with detailed error logs

## 🔗 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://reactjs.org/docs)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JSDoc Documentation](https://jsdoc.app/)
