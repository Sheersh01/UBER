# UBER Backend API Documentation

## User Registration Endpoint

### POST `/user/register`

Creates a new user account in the system.

#### Description

This endpoint allows new users to register by providing their full name, email, and password. The password is automatically hashed before being stored in the database. Upon successful registration, the user receives a JWT authentication token.

#### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Field Requirements

| Field                | Type   | Required | Validation                         |
| -------------------- | ------ | -------- | ---------------------------------- |
| `fullname.firstname` | String | Yes      | Minimum 3 characters               |
| `fullname.lastname`  | String | No       | Minimum 3 characters (if provided) |
| `email`              | String | Yes      | Must be a valid email format       |
| `password`           | String | Yes      | Minimum 6 characters               |

#### Example Request

```json
POST /user/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Response

##### Success Response (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBhMTIzNDU2Nzg5MGFiY2RlZjEyMzQiLCJpYXQiOjE3MjkwMDAwMDB9.xYz123AbC456DeF789GhI012JkL345MnO678PqR901StU",
  "user": {
    "_id": "670a12345678990abcdef1234",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token to be used for protected routes
- `user._id`: MongoDB ObjectId of the newly created user
- `user.fullname`: Object containing user's first and last name
- `user.email`: Registered email address
- `user.__v`: MongoDB version key

##### Error Response (400 Bad Request)

When validation fails:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Status Codes

| Status Code                 | Description                              |
| --------------------------- | ---------------------------------------- |
| `201 Created`               | User successfully registered             |
| `400 Bad Request`           | Validation error - Invalid input data    |
| `500 Internal Server Error` | Server error during registration process |

#### Notes

- The password is hashed using bcrypt with a salt rounds of 10 before storage
- A JWT token is generated upon successful registration for immediate authentication
- Email addresses must be unique in the system
- The token should be stored by the client and included in subsequent requests for authentication

---

## User Login Endpoint

### POST `/user/login`

Authenticates an existing user and returns a JWT token.

#### Description

This endpoint allows registered users to log in by providing their email and password. The endpoint validates the credentials against the stored user data and returns a JWT authentication token upon successful login.

#### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Field Requirements

| Field      | Type   | Required | Validation                   |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | String | Yes      | Must be a valid email format |
| `password` | String | Yes      | Minimum 6 characters         |

#### Example Request

```json
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Response

##### Success Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBhMTIzNDU2Nzg5MGFiY2RlZjEyMzQiLCJpYXQiOjE3MjkwMDAwMDB9.xYz123AbC456DeF789GhI012JkL345MnO678PqR901StU",
  "user": {
    "_id": "670a12345678990abcdef1234",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token to be used for protected routes
- `user._id`: MongoDB ObjectId of the authenticated user
- `user.fullname`: Object containing user's first and last name
- `user.email`: User's email address
- `user.socketId`: Socket ID for real-time communication (null if not connected)
- `user.__v`: MongoDB version key

##### Error Response (400 Bad Request)

When validation fails:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

##### Error Response (401 Unauthorized)

When credentials are incorrect:

```json
{
  "message": "invalid email or password"
}
```

#### Status Codes

| Status Code                 | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `200 OK`                    | User successfully authenticated                   |
| `400 Bad Request`           | Validation error - Invalid input data format      |
| `401 Unauthorized`          | Authentication failed - Invalid email or password |
| `500 Internal Server Error` | Server error during authentication process        |

#### Notes

- The password is compared with the stored hashed password using bcrypt
- The user document is queried with password field included (normally excluded by default)
- A new JWT token is generated for each successful login
- The token should be stored by the client and included in subsequent requests for authentication
- For security reasons, the error message doesn't specify whether the email or password was incorrect
