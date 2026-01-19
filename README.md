![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

# Task Management API

A RESTful API for task management built with NestJS, PostgreSQL, TypeORM, and JWT authentication.

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Task Management**: Create, read, update, delete tasks
- **Categories**: Organize tasks with custom categories
- **Role-Based Access Control**: Admin and user roles
- **Data Validation**: Request validation with class-validator
- **Database Relations**: Proper relationships between users, tasks, and categories
- **User Isolation**: Users can only access their own data
- **Custom Error Messages**: User-friendly error responses

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **Password Hashing**: bcrypt

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL database**
   ```sql
   -- Connect to PostgreSQL
   psql -U postgres
   
   -- Create user and database
   CREATE USER task_manager WITH PASSWORD 'your_password';
   CREATE DATABASE task_management OWNER task_manager;
   GRANT ALL PRIVILEGES ON DATABASE task_management TO task_manager;
   ```

4. **Configure environment variables**
   
   Create `.env` file in the root directory:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=task_manager
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=task_management
   
   JWT_SECRET=your_super_secret_key_change_this_in_production
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

6. **API will be available at**: `http://localhost:3000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/profile` | Get current user | ✅ |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| DELETE | `/users/:id` | Delete user | ✅ |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create task | ✅ |
| GET | `/tasks` | Get all user's tasks | ✅ |
| GET | `/tasks?status=todo` | Filter tasks by status | ✅ |
| GET | `/tasks/overdue` | Get overdue tasks | ✅ |
| GET | `/tasks/:id` | Get task by ID | ✅ |
| PATCH | `/tasks/:id` | Update task | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/categories` | Create category | ✅ |
| GET | `/categories` | Get all categories | ✅ |
| GET | `/categories/:id` | Get category by ID | ✅ |
| PATCH | `/categories/:id` | Update category | ✅ |
| DELETE | `/categories/:id` | Delete category | ✅ |

## 📖 Usage Examples

### Register a new user
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Create a task (requires authentication)
```bash
POST http://localhost:3000/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete NestJS project",
  "description": "Build a task management API",
  "priority": "high",
  "status": "todo",
  "dueDate": "2025-01-25T10:00:00Z"
}
```

## 🗂️ Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/              # Data transfer objects
│   ├── guards/           # JWT and roles guards
│   ├── strategies/       # Passport strategies
│   └── decorators/       # Custom decorators
├── users/                # Users module
│   ├── dto/
│   ├── entities/
│   └── ...
├── tasks/                # Tasks module
│   ├── dto/
│   ├── entities/
│   └── ...
├── categories/           # Categories module
│   ├── dto/
│   ├── entities/
│   └── ...
└── app.module.ts         # Root module
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port | `5432` |
| `DATABASE_USER` | Database username | `task_manager` |
| `DATABASE_PASSWORD` | Database password | `your_password` |
| `DATABASE_NAME` | Database name | `task_management` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |

## 📝 Enum Values

### Task Status
- `todo`
- `in_progress`
- `done`

### Task Priority
- `low`
- `medium`
- `high`

### User Role
- `user` (default)
- `admin`

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

### Using Docker (optional)
```bash
# Build image
docker build -t task-management-api .

# Run container
docker run -p 3000:3000 --env-file .env task-management-api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [PostgreSQL](https://www.postgresql.org/)
- ORM by [TypeORM](https://typeorm.io/)