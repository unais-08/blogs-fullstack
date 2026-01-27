# Blog Backend API

Production-grade REST API for a blogging platform built with Express.js, TypeScript, and PostgreSQL.

## 🏗️ Architecture

This application follows **Clean/Layered Architecture** with strict separation of concerns:

- **Controllers**: Handle HTTP layer only (requests/responses)
- **Services**: Contain all business logic
- **Repositories**: Exclusive database access using raw SQL
- **Validators**: Zod schemas for request validation
- **Middlewares**: Cross-cutting concerns (auth, errors, rate limiting)
- **Config**: Centralized configuration management
- **Utils**: Reusable helpers (hashing, JWT, logging)

## 📁 Folder Structure

```
src/
├── app.ts                      # Express app configuration
├── server.ts                   # Server entry point
├── config/
│   ├── env.ts                  # Environment validation (Zod)
│   ├── db.ts                   # PostgreSQL connection pool
│   └── jwt.ts                  # JWT configuration
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts  # HTTP handlers
│   │   ├── auth.service.ts     # Business logic
│   │   ├── auth.repository.ts  # Database queries
│   │   ├── auth.routes.ts      # Route definitions
│   │   ├── auth.schema.ts      # Zod validation schemas
│   │   └── auth.types.ts       # TypeScript interfaces
│   └── blog/
│       ├── blog.controller.ts
│       ├── blog.service.ts
│       ├── blog.repository.ts
│       ├── blog.routes.ts
│       ├── blog.schema.ts
│       └── blog.types.ts
├── middlewares/
│   ├── auth.middleware.ts      # JWT authentication
│   ├── error.middleware.ts     # Centralized error handling
│   ├── rateLimit.middleware.ts # Rate limiting
│   └── validate.middleware.ts  # Request validation
├── utils/
│   ├── errors.ts               # Custom error classes
│   ├── hash.ts                 # Password hashing (bcrypt)
│   ├── jwt.ts                  # JWT utilities
│   └── logger.ts               # Pino logger
└── types/
    └── express.d.ts            # Express type extensions
```

## 🚀 Features

### Authentication

- User registration with validation
- Login with JWT tokens
- Password hashing with bcrypt (12 rounds)
- Protected routes with JWT middleware
- Rate limiting on auth endpoints (5 attempts per 15 min)

### Blogs

- Create blog (authenticated users only)
- Get all blogs (public)
- Get blog by ID (public)
- Get logged-in user's blogs (authenticated)

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL (raw SQL)
- **Validation**: Zod
- **Authentication**: JWT
- **Password**: bcrypt
- **Logging**: Pino
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Installation

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- npm or yarn

### Setup Steps

1. **Clone and install dependencies**

```bash
npm install
```

2. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

3. **Set up database**

```bash
npm run db:setup
```

4. **Run migrations**

```bash
npm run db:migrate
```

5. **Start development server**

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-25T10:00:00.000Z"
    },
    "token": "jwt-token"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile (Protected)

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Blogs

#### Create Blog (Protected)

```http
POST /api/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post..."
}
```

#### Get All Blogs (Public)

```http
GET /api/blogs
```

#### Get Blog by ID (Public)

```http
GET /api/blogs/:id
```

#### Get My Blogs (Protected)

```http
GET /api/blogs/my/blogs
Authorization: Bearer <token>
```

## 🔒 Security Features

1. **Helmet**: Sets secure HTTP headers
2. **CORS**: Configurable cross-origin requests
3. **Rate Limiting**:
   - Global: 100 requests per 15 minutes
   - Auth endpoints: 5 attempts per 15 minutes
4. **Password Security**: bcrypt with 12 rounds
5. **JWT**: Signed tokens with expiration
6. **Input Validation**: Zod schemas on all endpoints
7. **SQL Injection Protection**: Parameterized queries
8. **Error Handling**: No sensitive data leaked

## 🧪 Scripts

```bash
# Development
npm run dev          # Start with hot reload

# Production
npm run build        # Compile TypeScript
npm start            # Run compiled code

# Database
npm run db:setup     # Create database
npm run db:migrate   # Run migrations

# Type checking
npm run type-check   # TypeScript validation
```

## 📝 Environment Variables

| Variable         | Description                    | Default       |
| ---------------- | ------------------------------ | ------------- |
| `NODE_ENV`       | Environment mode               | `development` |
| `PORT`           | Server port                    | `3000`        |
| `DB_HOST`        | PostgreSQL host                | `localhost`   |
| `DB_PORT`        | PostgreSQL port                | `5432`        |
| `DB_NAME`        | Database name                  | `blog_db`     |
| `DB_USER`        | Database user                  | `postgres`    |
| `DB_PASSWORD`    | Database password              | -             |
| `JWT_SECRET`     | JWT signing key (min 32 chars) | -             |
| `JWT_EXPIRES_IN` | Token expiration               | `7d`          |
| `BCRYPT_ROUNDS`  | Hashing rounds                 | `12`          |

## 🏭 Production Checklist

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Use environment-specific database credentials
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure logging aggregation
- [ ] Set up monitoring (health checks)
- [ ] Review rate limits for your use case
- [ ] Enable database connection pooling
- [ ] Set up database backups
- [ ] Use a process manager (PM2, Docker)

## 🤝 Contributing

This is a production-grade template. Feel free to extend with:

- Blog updates/deletion
- User profile updates
- Blog categories/tags
- Pagination
- Full-text search
- File uploads
- Comments system

## 📄 License

MIT
