# Blog Platform - Frontend Architecture Documentation

## 🏗️ Project Structure

This project follows a **feature-based + layered architecture** designed for scalability and maintainability.

```
src/
├── app/                      # Application core
│   ├── App.tsx              # Root component
│   ├── router.tsx           # Route configuration
│   ├── components/          # App-level components
│   │   └── RequireAuth.tsx  # Protected route wrapper
│   └── providers/           # App-level providers
│       └── AuthProvider.tsx # Auth context export
│
├── features/                 # Feature modules (domain-driven)
│   ├── auth/                # Authentication feature
│   │   ├── api/             # Auth API calls
│   │   ├── context/         # Auth context provider
│   │   ├── hooks/           # Auth custom hooks
│   │   ├── pages/           # Auth pages (Login, Register)
│   │   └── types/           # Auth type definitions
│   │
│   └── blogs/               # Blog management feature
│       ├── api/             # Blog API calls
│       ├── components/      # Blog-specific components
│       ├── hooks/           # Blog custom hooks
│       ├── pages/           # Blog pages
│       └── types/           # Blog type definitions
│
├── shared/                   # Shared/common code
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Alert.tsx
│   │   ├── Loader.tsx
│   │   └── Navbar.tsx
│   │
│   ├── layouts/             # Layout components
│   │   ├── MainLayout.tsx   # Authenticated pages layout
│   │   └── AuthLayout.tsx   # Auth pages layout
│   │
│   ├── lib/                 # Third-party library configs
│   │   ├── axios.ts         # Axios instance & interceptors
│   │   └── token.ts         # Token management utility
│   │
│   ├── hooks/               # Shared custom hooks
│   └── utils/               # Utility functions
│       └── index.ts         # Date formatting, validation, etc.
│
├── types/                    # Global type definitions
│   └── api.ts               # API response types
│
├── constants/                # Application constants
│   └── index.ts             # API endpoints, routes, etc.
│
└── main.tsx                 # Application entry point
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**
- Each feature (auth, blogs) is self-contained
- Easy to add/remove features without affecting others
- Clear boundaries and responsibilities

### 2. **Separation of Concerns**
- **API Layer**: All HTTP calls isolated in `api/` folders
- **State Management**: Context API for auth, custom hooks for data fetching
- **UI Layer**: Components are pure and presentational
- **Business Logic**: Encapsulated in hooks and context providers

### 3. **Type Safety**
- Strict TypeScript mode enabled
- No `any` types used
- Centralized type definitions in `types/api.ts`

### 4. **Reusability**
- Shared components library
- Common utilities and hooks
- Layout components for consistent UI

## 🔐 Authentication Flow

1. **Login/Register** → API call → Receive JWT token
2. **Token Storage** → Stored in localStorage (via token utility)
3. **Axios Interceptor** → Automatically attaches token to all requests
4. **Profile Fetch** → On app mount, fetch user profile if token exists
5. **Protected Routes** → `RequireAuth` wrapper checks authentication
6. **Auto Logout** → 401 response triggers token removal and redirect

## 📡 API Layer Architecture

### Axios Instance (`shared/lib/axios.ts`)
```typescript
- Base URL from environment variables
- Request interceptor: Attach JWT token
- Response interceptor: Handle 401 (logout), 403, 500
- Custom event dispatch for auth state changes
```

### Feature-Specific APIs
```typescript
features/auth/api/auth.api.ts    → login, register, getProfile
features/blogs/api/blogs.api.ts  → getBlogs, createBlog, etc.
```

## 🎨 UI Component System

### Design Tokens
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#4b5563)
- **Success**: Green (#16a34a)
- **Danger**: Red (#dc2626)
- **Muted**: Gray-50 background

### Component Patterns
- All components use Tailwind CSS (no inline styles)
- Consistent sizing: `sm`, `md`, `lg`
- Proper accessibility (labels, ARIA attributes, focus states)
- Loading states for async operations
- Error handling with user-friendly messages

## 🔄 State Management Strategy

### Context API (Auth)
```typescript
AuthContext provides:
- user: User | null
- isAuthenticated: boolean
- isLoading: boolean
- error: string | null
- login(), register(), logout()
```

### Custom Hooks (Data Fetching)
```typescript
useBlogs()    → Fetch all blogs
useBlog(id)   → Fetch single blog
useMyBlogs()  → Fetch user's blogs
```

Benefits:
- Encapsulates loading/error states
- Reusable across components
- Easy to test

## 🛣️ Routing Structure

```typescript
Public Routes:
/                → HomePage
/login           → LoginPage
/register        → RegisterPage
/blogs           → BlogsPage (list)
/blogs/:id       → BlogDetailPage

Protected Routes (RequireAuth):
/blogs/create    → CreateBlogPage
/my-blogs        → MyBlogsPage
```

## 🚀 Future-Ready Features

The architecture supports easy addition of:

1. **Comments System**
   - Create `features/comments/` module
   - Add API, hooks, and components
   - No changes needed to existing features

2. **Likes/Reactions**
   - Add to blogs feature module
   - Optimistic UI updates supported

3. **Pagination**
   - Modify API hooks to accept page params
   - Update components to show pagination controls

4. **Search**
   - Add search hook in blogs feature
   - Debounced input component already in utilities

5. **Role-Based Access**
   - Extend User type with `role` field
   - Create `RequireRole` wrapper component
   - Add role checks in API layer

6. **SSR (Next.js Migration)**
   - Feature modules are framework-agnostic
   - Can be imported directly into Next.js app
   - Only routing layer needs adaptation

## 🛠️ Development Guidelines

### Adding a New Feature
1. Create folder in `features/`
2. Add `api/`, `hooks/`, `components/`, `pages/`, `types/`
3. Register routes in `app/router.tsx`
4. Update constants if needed

### Creating a Component
1. Start with TypeScript interface for props
2. Use Tailwind classes (utility-first)
3. Add proper accessibility attributes
4. Handle loading/error states if applicable
5. Export from index file if reusable

### Making API Calls
1. Define types in `types/api.ts`
2. Create API function in feature's `api/` folder
3. Use axios instance from `shared/lib/axios.ts`
4. Wrap in custom hook for component usage
5. Handle errors gracefully

## 📦 Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🧪 Testing Strategy (Recommended)

```typescript
Unit Tests:
- Utility functions (formatDate, truncateText, etc.)
- API functions (mock axios)
- Custom hooks (using @testing-library/react-hooks)

Integration Tests:
- User flows (login → create blog → view blog)
- Protected routes
- Error handling

E2E Tests (Playwright/Cypress):
- Critical user journeys
- Cross-browser testing
```

## 📚 Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling (utility-first)
- **Axios** - HTTP client
- **React Router v7** - Routing
- **Context API** - State management
- **Vite** - Build tool

## 🎓 Code Quality Standards

✅ **Strong typing everywhere** (no `any`)
✅ **Separation of concerns** (API, UI, State)
✅ **Reusable components**
✅ **Custom hooks for logic**
✅ **Error boundaries and fallbacks**
✅ **Accessible UI** (ARIA, semantic HTML)
✅ **Consistent naming conventions**
✅ **Comments for complex logic**

---

**Built with senior engineering principles for production-ready scalability.**
