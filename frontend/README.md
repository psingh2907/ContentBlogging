# Blog Frontend

A modern, responsive frontend for the blogging platform built with React, TypeScript, and Tailwind CSS.

## Features

- 📝 Create, read, update, and delete blog posts
- 🎨 Modern, responsive design with Tailwind CSS
- 🔄 Real-time interaction with NestJS backend
- 📱 Mobile-friendly interface
- ⚡ Fast and smooth user experience
- 🎯 TypeScript for type safety

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- The NestJS backend running on `http://localhost:3000`

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Development

1. Start the development server:

```bash
npm start
# or
yarn start
```

2. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload when you make edits. You will also see any lint errors in the console.

## Backend Connection

The frontend is configured to connect to the NestJS backend at `http://localhost:3000`. Make sure your backend is running before using the frontend.

If your backend is running on a different port, update the `API_BASE_URL` in `src/services/api.ts`.

## Build for Production

```bash
npm run build
# or
yarn build
```

Builds the app for production to the `build` folder. The build is minified and the filenames include the hashes.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   └── BlogCard.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── BlogPost.tsx
│   ├── CreatePost.tsx
│   └── EditPost.tsx
├── services/           # API services
│   └── api.ts
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
