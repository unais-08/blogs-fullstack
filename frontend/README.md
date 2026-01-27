# 📝 Blog Platform - Frontend

A production-ready, modular, and scalable React + TypeScript frontend for a blog platform built with clean architecture principles.

## 🚀 Features

### ✅ Implemented

- **Authentication System**
  - User registration with validation
  - Login/logout functionality
  - JWT token management with secure storage
  - Auto-fetch user profile on app load
  - Protected routes with automatic redirect

- **Blog Management**
  - View all blogs (public)
  - Create new blogs (authenticated)
  - View blog details
  - My blogs dashboard (authenticated)
  - Rich blog content display

- **UI/UX**
  - Clean, minimal, professional design
  - Mobile-first responsive layout
  - Tailwind CSS utility-first styling
  - Loading states and error handling
  - Accessible components (ARIA, focus states)

### 🔮 Future-Ready Architecture

The codebase is designed to easily support:

- Comments system
- Likes/reactions
- Pagination
- Search functionality
- Role-based access control
- Server-side rendering (Next.js migration)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** (strict mode) - Type safety
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with interceptors
- **React Router v7** - Client-side routing
- **Context API** - State management
- **Vite** - Build tool & dev server

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd blog-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏗️ Project Structure

```
src/
├── app/                      # Application core
│   ├── App.tsx              # Root component
│   ├── router.tsx           # Route configuration
│   ├── components/          # App-level components
│   └── providers/           # Context providers
│
├── features/                 # Feature modules (domain-driven)
│   ├── auth/                # Authentication
│   │   ├── api/             # Auth API calls
│   │   ├── context/         # Auth state management
│   │   ├── hooks/           # Auth custom hooks
│   │   ├── pages/           # Login, Register pages
│   │   └── types/           # Auth types
│   │
│   └── blogs/               # Blog management
│       ├── api/             # Blog API calls
│       ├── components/      # Blog components
│       ├── hooks/           # Blog custom hooks
│       ├── pages/           # Blog pages
│       └── types/           # Blog types
│
├── shared/                   # Shared code
│   ├── components/          # Reusable UI components
│   ├── layouts/             # Page layouts
│   ├── lib/                 # Third-party configs
│   ├── hooks/               # Shared hooks
│   └── utils/               # Utility functions
│
├── types/                    # Global type definitions
├── constants/                # App constants
└── main.tsx                 # Entry point
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Type check + build for production

# Linting
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build
```

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor automatically attaches token to requests
5. User profile fetched on app load
6. Protected routes check authentication status
7. 401 responses trigger automatic logout

## 🎨 Component Library

### Shared Components

- **Button** - Multiple variants (primary, secondary, danger, success, outline)
- **Input** - Form input with validation states
- **Textarea** - Multi-line input with validation
- **Card** - Reusable card container
- **Alert** - Status messages (info, success, warning, error)
- **Loader** - Loading spinner with customizable sizes
- **Navbar** - Main navigation component

### Layouts

- **MainLayout** - Standard page layout with navbar
- **AuthLayout** - Authentication pages layout

## 📋 API Endpoints

### Authentication

```
POST   /api/auth/register    # Register new user
POST   /api/auth/login        # Login user
GET    /api/auth/profile      # Get user profile (protected)
POST   /api/auth/logout       # Logout user
```

### Blogs

```
GET    /api/blogs             # Get all blogs (public)
POST   /api/blogs             # Create blog (protected)
GET    /api/blogs/:id         # Get blog by ID
GET    /api/blogs/my/blogs    # Get current user's blogs (protected)
PUT    /api/blogs/:id         # Update blog (protected)
DELETE /api/blogs/:id         # Delete blog (protected)
```

## 🎯 Code Quality Standards

✅ **Strong typing everywhere** - No `any` types
✅ **Separation of concerns** - API, UI, State layers
✅ **Reusable components** - DRY principle
✅ **Custom hooks** - Business logic encapsulation
✅ **Error handling** - User-friendly error messages
✅ **Accessible UI** - ARIA attributes, semantic HTML
✅ **Consistent naming** - Clear, descriptive names
✅ **Documented code** - JSDoc comments for complex logic

## 🔄 State Management

### Context API

Used for global authentication state:

- User information
- Authentication status
- Login/logout operations

### Custom Hooks

Used for data fetching:

- `useBlogs()` - Fetch all blogs
- `useBlog(id)` - Fetch single blog
- `useMyBlogs()` - Fetch user's blogs
- `useAuth()` - Access auth context

## 🛡️ Security Features

- JWT token stored in localStorage (abstracted via utility)
- Automatic token attachment to requests
- 401 response handling (auto-logout)
- Protected routes with authentication checks
- Input validation on forms
- XSS protection via React's built-in escaping

## 🎨 Styling Guidelines

- **Tailwind CSS only** - No inline styles
- **Utility-first approach** - Composable classes
- **Responsive design** - Mobile-first breakpoints
- **Consistent spacing** - 4px/8px grid system
- **Accessible colors** - WCAG compliant contrasts

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist/ folder via Netlify dashboard or CLI
```

### Environment Variables

Make sure to set `VITE_API_BASE_URL` in your deployment platform.

## 📝 Adding New Features

### Example: Adding a Comments Feature

1. **Create feature module**

```
src/features/comments/
├── api/
│   └── comments.api.ts
├── components/
│   ├── CommentList.tsx
│   └── CommentForm.tsx
├── hooks/
│   └── useComments.ts
└── types/
    └── index.ts
```

2. **Define types**

```typescript
// types/api.ts
export interface Comment {
  id: string;
  content: string;
  blogId: string;
  authorId: string;
  author?: User;
  createdAt: string;
}
```

3. **Create API functions**

```typescript
// features/comments/api/comments.api.ts
export const commentsApi = {
  async getComments(blogId: string): Promise<Comment[]> { ... },
  async createComment(blogId: string, content: string): Promise<Comment> { ... },
};
```

4. **Create custom hook**

```typescript
// features/comments/hooks/useComments.ts
export const useComments = (blogId: string) => { ... };
```

5. **Use in components**

```typescript
import { useComments } from "@/features/comments/hooks/useComments";
```

No changes needed to existing features!

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.tmp
npm run build
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Router Docs](https://reactrouter.com)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using senior engineering principles for production-ready scalability.

---

**Note:** This is a frontend application. Make sure your backend API is running and accessible at the URL specified in `.env`.
