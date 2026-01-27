# Backend-Frontend Type Mapping

This document shows how backend types map to frontend types.

## ✅ Types Synchronized

### User/Auth Types

#### Backend → Frontend Mapping

```typescript
// Backend (src/types/user.types.ts)
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
```

```typescript
// Frontend (src/types/api.ts)
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}
```

✅ **Status:** Fully synchronized

---

### Blog Types

#### Backend → Frontend Mapping

```typescript
// Backend (src/types/blog.types.ts)
export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogResponse {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  authorId: string;
}
```

```typescript
// Frontend (src/types/api.ts)
export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogResponse {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  authorId: string;
}
```

✅ **Status:** Fully synchronized

---

## 🔄 Date Handling

### Backend (Express/Node.js)

- Dates stored as `Date` objects in database
- Serialized to ISO strings in JSON responses
- Example: `"2026-01-27T10:30:00.000Z"`

### Frontend (React/TypeScript)

- Types define `Date` objects
- Axios automatically receives ISO strings
- Utility functions handle both:
  ```typescript
  export const formatDate = (date: string | Date): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  };
  ```

### In Practice

```typescript
// API Response (JSON over HTTP)
{
  "id": "123",
  "title": "My Blog",
  "createdAt": "2026-01-27T10:30:00.000Z"  // ISO string
}

// Frontend Type (TypeScript)
interface BlogResponse {
  id: string;
  title: string;
  createdAt: Date;  // Type as Date
}

// Usage in Components
<time dateTime={blog.createdAt instanceof Date ? blog.createdAt.toISOString() : blog.createdAt}>
  {formatDate(blog.createdAt)}  // Handles both string and Date
</time>
```

---

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register    → LoginResponse
POST   /api/auth/login        → LoginResponse
GET    /api/auth/profile      → UserResponse (protected)
```

### Blogs

```
GET    /api/blogs             → BlogResponse[]
POST   /api/blogs             → BlogResponse (protected)
GET    /api/blogs/:id         → BlogResponse
GET    /api/blogs/my/blogs    → BlogResponse[] (protected)
PUT    /api/blogs/:id         → BlogResponse (protected)
DELETE /api/blogs/:id         → void (protected)
```

---

## ✅ Type Safety Checklist

- ✅ **User types** match between frontend and backend
- ✅ **Blog types** match between frontend and backend
- ✅ **API request/response types** are consistent
- ✅ **Date handling** works for both Date objects and ISO strings
- ✅ **JWT token** flow properly typed
- ✅ **Error responses** have consistent structure
- ✅ **Protected endpoints** require authentication

---

## 🔧 Maintenance

### When Adding New Fields

1. **Update backend types** in `src/types/*.types.ts`
2. **Update frontend types** in `src/types/api.ts`
3. **Run build** to verify types match:

   ```bash
   # Backend
   npm run build

   # Frontend
   npm run build
   ```

### Type Generation (Future Enhancement)

Consider using tools like:

- **OpenAPI/Swagger** - Generate types from API spec
- **tRPC** - End-to-end type safety
- **GraphQL Code Generator** - For GraphQL APIs

---

## 📝 Notes

1. **Password field** never sent to frontend (excluded in `UserResponse`)
2. **Author details** embedded in `BlogResponse` (no separate API call needed)
3. **Dates** handled flexibly to support both JSON strings and Date objects
4. **Legacy types** deprecated with clear migration path

---

**Last Updated:** January 27, 2026
**Status:** ✅ Frontend and backend types are fully synchronized
