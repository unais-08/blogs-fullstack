# Blog API - Request Examples

## Authentication Examples

### 1. Register New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Save the token from the response for authenticated requests:**

```bash
export TOKEN="your-jwt-token-here"
```

### 3. Get Profile (Protected)

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

## Blog Examples

### 4. Create Blog (Protected)

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post. It contains valuable information about building REST APIs."
  }'
```

### 5. Get All Blogs (Public)

```bash
curl -X GET http://localhost:3000/api/blogs
```

### 6. Get Blog by ID (Public)

```bash
curl -X GET http://localhost:3000/api/blogs/BLOG_ID_HERE
```

### 7. Get My Blogs (Protected)

```bash
curl -X GET http://localhost:3000/api/blogs/my/blogs \
  -H "Authorization: Bearer $TOKEN"
```

### 8. Health Check

```bash
curl -X GET http://localhost:3000/health
```

## Testing Flow

1. **Register a new user** and get the token
2. **Create a blog post** using the token
3. **Get all blogs** to see your post publicly
4. **Get your blogs** to see only your posts
5. **Register another user** and create more blogs
6. **Get all blogs** to see posts from multiple authors
