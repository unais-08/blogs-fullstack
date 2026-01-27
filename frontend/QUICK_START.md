# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Backend API running (see backend repository)

## Setup (2 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your API URL
# VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Application will be available at: **http://localhost:5173**

## 📖 First Steps

### Register a New Account

1. Go to http://localhost:5173/register
2. Enter your details:
   - Full Name
   - Email
   - Password (min 6 characters)
3. Click "Create Account"

### Login

1. Go to http://localhost:5173/login
2. Enter your credentials
3. You'll be redirected to the home page

### Create Your First Blog

1. Click "Create Blog" in the navigation
2. Enter a title (min 5 characters)
3. Write your content (min 20 characters)
4. Click "Create Blog"

### View All Blogs

1. Click "Blogs" in the navigation
2. Browse all published blogs
3. Click on any blog to read it

### Manage Your Blogs

1. Click "My Blogs" in the navigation
2. See all your published blogs
3. Click on any blog to view details

## 🎨 Available Routes

| Route           | Description          | Auth Required |
| --------------- | -------------------- | ------------- |
| `/`             | Home page            | No            |
| `/login`        | Login page           | No            |
| `/register`     | Registration page    | No            |
| `/blogs`        | All blogs list       | No            |
| `/blogs/:id`    | Blog detail          | No            |
| `/blogs/create` | Create new blog      | Yes           |
| `/my-blogs`     | Your blogs dashboard | Yes           |

## 🔑 API Configuration

Make sure your backend API is running and accessible. The frontend expects these endpoints:

### Auth Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Blog Endpoints

- `GET /api/blogs` - Get all blogs (public)
- `POST /api/blogs` - Create blog (protected)
- `GET /api/blogs/:id` - Get blog details
- `GET /api/blogs/my/blogs` - Get user's blogs (protected)

## 🐛 Common Issues

### Port 5173 already in use

```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

### Cannot connect to API

1. Check if backend is running
2. Verify `VITE_API_BASE_URL` in `.env`
3. Check for CORS errors in browser console

### Build errors

```bash
# Clear cache and rebuild
rm -rf node_modules/.tmp dist
npm install
npm run build
```

## 📚 Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation
2. Explore the codebase starting from `src/app/App.tsx`
3. Check out shared components in `src/shared/components/`
4. Review feature modules in `src/features/`

## 💡 Development Tips

### Hot Module Replacement

Vite provides instant HMR. Changes reflect immediately without full page reload.

### TypeScript Errors

Enable "TypeScript errors in editor" in your IDE for real-time feedback.

### Tailwind IntelliSense

Install the "Tailwind CSS IntelliSense" VS Code extension for autocomplete.

### React DevTools

Install React DevTools browser extension to inspect component state.

## 🎯 Testing the Application

### Manual Testing Flow

1. **Registration** → Create a new account
2. **Login** → Sign in with credentials
3. **Create Blog** → Write and publish a blog
4. **View Blogs** → Browse all blogs (logged out)
5. **My Blogs** → Manage your blogs
6. **Logout** → Sign out
7. **Login Again** → Verify persistence

### Expected Behavior

- ✅ Redirects to login when accessing protected routes
- ✅ Token persists across page refreshes
- ✅ Auto-logout on 401 responses
- ✅ Loading states during API calls
- ✅ Error messages for failed operations
- ✅ Form validation before submission

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment.

## 📞 Support

For detailed documentation, see:

- [README.md](./README.md) - Full documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details

---

**Happy coding! 🎉**
