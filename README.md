# Real Estate CRM MVP

Production-style MVP for a Real Estate CRM focused only on authentication, a basic dashboard, and lead management.

## Project Structure

```text
backend/
frontend/
```

## Backend Features

- Basic JWT login
- Protected lead CRUD APIs
- Lead filtering by status
- Lead search by name
- Validation and centralized error handling

## Frontend Features

- Login page with protected routes
- Dashboard with lead counts and status breakdown
- Lead management page with add, search, filter, status update, and delete
- Responsive sidebar layout

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Credentials

Use the values from `backend/.env`:

- Email: `admin@example.com`
- Password: `admin123`

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/real-estate-crm
JWT_SECRET=supersecretjwtkey
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## API Documentation

### Auth

#### `POST /api/auth/login`

Request:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "jwt-token",
  "user": {
    "email": "admin@example.com"
  }
}
```

### Leads

All lead endpoints require:

```text
Authorization: Bearer <token>
```

#### `POST /api/leads`

```json
{
  "name": "Riya Sharma",
  "phone": "9876543210",
  "email": "riya@example.com",
  "budget": 4500000,
  "preferences": "2 BHK near metro",
  "status": "New"
}
```

#### `GET /api/leads`

Optional query params:

- `status=Qualified`
- `search=Riya`

#### `GET /api/leads/:id`

Fetch a single lead by id.

#### `PUT /api/leads/:id`

Example:

```json
{
  "status": "Contacted"
}
```

#### `DELETE /api/leads/:id`

Deletes the lead and returns a success message.
