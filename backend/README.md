# Task Board API

This backend is a RESTful API for managing users, boards, and tasks in a task management app. Below is full documentation of available routes, expected request formats, and returned responses.

---

## Authentication Routes (`/api/auth`)

### `POST /api/auth/signup`
- **Description**: Register a new user.
- **Body**:
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```
- **Response**: User info + token in cookie.

---

### `POST /api/auth/login`
- **Description**: Login existing user.
- **Body**:
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```
- **Response**: User info + token in cookie.

---

### `POST /api/auth/logout`
- **Description**: Logs the user out by clearing the cookie.

---

## Board Routes (`/api/boards`)

> ⚠️ All board routes require authentication (token in cookie)

### `GET /api/boards`
- **Query params**:
  - `page`: number (optional)
  - `limit`: number (optional)
- **Description**: Get paginated list of boards for the authenticated user.

---

### `POST /api/boards`
- **Body**:
```json
{
  "name": "Board name",
  "description": "Board description"
}
```
- **Description**: Create a new board.

---

### `GET /api/boards/:id`
- **Description**: Get a specific board by ID (must belong to the user).

---

### `PUT /api/boards/:id`
- **Body**:
```json
{
  "name": "Updated name",
  "description": "Updated description"
}
```
- **Description**: Update a board.

---

### `DELETE /api/boards/:id`
- **Description**: Delete a board and all associated tasks.

---

## Task Routes (`/api/tasks`)

> ⚠️ All task routes require authentication (token in cookie)

### `GET /api/tasks`
- **Query params**:
  - `boardId`: filter tasks by board
- **Description**: Get all tasks for the authenticated user.

---

### `POST /api/tasks`
- **Body**:
```json
{
  "name": "Task name",
  "status": "To Do | In Progress | Completed | Won't Do",
  "board": "boardId"
}
```
- **Description**: Create a new task for a board.

---

### `PUT /api/tasks/:id`
- **Body**:
```json
{
  "name": "New name",
  "status": "New status"
}
```
- **Description**: Update task by ID.

---

### `DELETE /api/tasks/:id`
- **Description**: Delete a task.

---

## Authentication

This API uses cookie-based authentication. After login/signup, a token is sent in an `httpOnly` cookie and should be included in subsequent requests automatically by the browser.

---

## Notes
- Backend is built with **Express.js**.
- MongoDB is used as the database.
- Input validation is handled using **Joi**.
