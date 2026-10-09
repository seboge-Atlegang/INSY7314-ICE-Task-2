# INSY7314 Secure API

This Express backend supports **ICE Task 2** and **ICE Tasks 3 & 4**. Task 2 uses a `books` resource with six attributes (`id`, `title`, `author`, `genre`, `year`, and `isbn`). The Learning Unit 3 routes add registration, login, JWT authentication, role-based authorisation, gadget creation, and login rate limiting.

## Setup

1. Install Node.js 18 or later.
2. Open a terminal in this folder and run `npm install`.
3. Copy `.env.example` to `.env`.
4. Replace `JWT_SECRET` with a long random value.
5. Start the server with `npm start`.
6. Confirm that `http://localhost:4000/health` returns a healthy response.

All data is temporary and resets when the server restarts.

## ICE Task 2 routes

| Method | Route | Purpose | Expected status |
|---|---|---|---:|
| GET | `http://localhost:4000/` | Root route | 200 |
| GET | `http://localhost:4000/health` | Server health | 200 |
| GET | `http://localhost:4000/api/books` | Fetch all books | 200 |
| GET | `http://localhost:4000/api/books/b1` | Fetch a book by ID | 200 |
| POST | `http://localhost:4000/api/books` | Add a validated book | 201 |

### Five sample request bodies

Send each body separately to `POST http://localhost:4000/api/books` with `Content-Type: application/json`.

```json
{
  "id": "b2",
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "year": 1988,
  "isbn": "9780061122415"
}
```

```json
{
  "id": "b3",
  "title": "Born a Crime",
  "author": "Trevor Noah",
  "genre": "Memoir",
  "year": 2016,
  "isbn": "9780399588174"
}
```

```json
{
  "id": "b4",
  "title": "Purple Hibiscus",
  "author": "Chimamanda Ngozi Adichie",
  "genre": "Fiction",
  "year": 2003,
  "isbn": "9781616202415"
}
```

```json
{
  "id": "b5",
  "title": "Long Walk to Freedom",
  "author": "Nelson Mandela",
  "genre": "Biography",
  "year": 1994,
  "isbn": "9780316548182"
}
```

```json
{
  "id": "b6",
  "title": "Americanah",
  "author": "Chimamanda Ngozi Adichie",
  "genre": "Fiction",
  "year": 2013,
  "isbn": "9780307455925"
}
```

### Input validation evidence

Test at least the following negative cases and capture each Postman response:

- Missing `title` produces status 400.
- Empty `author` produces status 400.
- Invalid `year` produces status 400.
- Invalid `isbn` produces status 400.
- Duplicate `id` produces status 400.
- Unknown book ID produces status 404.
- Malformed JSON produces status 400 through Express and the central error handler.

## ICE Tasks 3 and 4 routes

| Method | Route | Security behaviour |
|---|---|---|
| POST | `/api/auth/register` | Creates a normal user; rejects missing password and duplicate email |
| POST | `/api/auth/login` | Returns a JWT; five failed attempts per minute are allowed before status 429 |
| GET | `/api/auth/profile` | Requires `Authorization: Bearer {{token}}` |
| POST | `/api/gadgets` | Requires a valid token |
| DELETE | `/api/gadgets/:id` | Requires a valid administrator token; a normal user receives 403 |

Import `SecureAPI Learning Unit 3 Tests.postman_collection.json` into Postman. Run the collection in its listed order, starting with a freshly restarted server. The successful login test stores the JWT in the active Postman environment as `token`.

## Project structure

```text
INSY7314_API/
|-- controllers/
|   |-- authController.js
|   |-- bookController.js
|   `-- gadgetController.js
|-- data/
|   `-- store.js
|-- middleware/
|   |-- authMiddleware.js
|   |-- errorMiddleware.js
|   |-- rateLimitMiddleware.js
|   `-- validationMiddleware.js
|-- routes/
|   |-- authRoutes.js
|   |-- bookRoutes.js
|   `-- gadgetRoutes.js
|-- .env.example
|-- .gitignore
|-- index.js
|-- package.json
`-- README.md
```

## Submission checklist

- Commit this backend folder to your personal GitHub repository.
- Add the accessible GitHub URL to the ICE Task 2 evidence document.
- Capture Postman screenshots of every Task 2 route and every validation check.
- Rename the completed evidence document to `INSY7314_ICE2_studentname` using your actual name.
- Submit the evidence Word/PDF and this `README.md` for ICE Task 2.
- Submit only the exported collection JSON for ICE Tasks 3 & 4.
