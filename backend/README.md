# UBER Backend API Documentation

## User Registration Endpoint

### POST `/users/register`

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
POST /users/register
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

### POST `/users/login`

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
POST /users/login
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

---

## User Profile Endpoint

### GET `/users/profile`

Retrieves the authenticated user's profile information.

#### Description

This is a protected endpoint that returns the profile information of the currently authenticated user. The user must provide a valid JWT token to access this endpoint.

#### Authentication Required

This endpoint requires authentication. Include the JWT token in one of the following ways:

1. **Cookie**: `token=<JWT_TOKEN>`
2. **Authorization Header**: `Authorization: Bearer <JWT_TOKEN>`

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

OR

```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Request

```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBhMTIzNDU2Nzg5MGFiY2RlZjEyMzQiLCJpYXQiOjE3MjkwMDAwMDB9.xYz123AbC456DeF789GhI012JkL345MnO678PqR901StU
```

#### Response

##### Success Response (200 OK)

```json
{
  "_id": "670a12345678990abcdef1234",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "__v": 0
}
```

**Response Fields:**

- `_id`: MongoDB ObjectId of the user
- `fullname`: Object containing user's first and last name
- `email`: User's email address
- `socketId`: Socket ID for real-time communication (null if not connected)
- `__v`: MongoDB version key

##### Error Response (401 Unauthorized)

When no token is provided:

```json
{
  "message": "Access denied. No token provided."
}
```

When token is invalid:

```json
{
  "message": "Access denied. Invalid token."
}
```

When token is blacklisted:

```json
{
  "message": "Access denied. Token is blacklisted."
}
```

#### Status Codes

| Status Code                 | Description                                   |
| --------------------------- | --------------------------------------------- |
| `200 OK`                    | Profile retrieved successfully                |
| `401 Unauthorized`          | No token, invalid token, or blacklisted token |
| `500 Internal Server Error` | Server error during profile retrieval         |

#### Notes

- The token must be valid and not blacklisted
- The user information is retrieved from the decoded JWT token
- Password field is not included in the response for security

---

## User Logout Endpoint

### GET `/users/logout`

Logs out the authenticated user by blacklisting their JWT token.

#### Description

This is a protected endpoint that logs out the currently authenticated user. It blacklists the user's JWT token, preventing it from being used for future requests. The token is stored in a blacklist collection with a TTL (Time To Live) of 24 hours.

#### Authentication Required

This endpoint requires authentication. Include the JWT token in one of the following ways:

1. **Cookie**: `token=<JWT_TOKEN>`
2. **Authorization Header**: `Authorization: Bearer <JWT_TOKEN>`

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

OR

```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Request

```http
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBhMTIzNDU2Nzg5MGFiY2RlZjEyMzQiLCJpYXQiOjE3MjkwMDAwMDB9.xYz123AbC456DeF789GhI012JkL345MnO678PqR901StU
```

#### Response

##### Success Response (200 OK)

```json
{
  "message": "User logged out successfully"
}
```

##### Error Response (401 Unauthorized)

When no token is provided:

```json
{
  "message": "Access denied. No token provided."
}
```

When token is invalid:

```json
{
  "message": "Access denied. Invalid token."
}
```

When token is already blacklisted:

```json
{
  "message": "Access denied. Token is blacklisted."
}
```

#### Status Codes

| Status Code                 | Description                                   |
| --------------------------- | --------------------------------------------- |
| `200 OK`                    | User logged out successfully                  |
| `401 Unauthorized`          | No token, invalid token, or blacklisted token |
| `500 Internal Server Error` | Server error during logout process            |

#### Notes

- The JWT token is added to a blacklist collection in MongoDB
- The token cookie is cleared from the client
- Blacklisted tokens are automatically removed from the database after 24 hours using MongoDB TTL index
- Once logged out, the same token cannot be used again for authentication
- The user will need to login again to get a new token

---

## Captain Registration Endpoint

### POST `/captains/register`

Creates a new captain account in the system.

#### Description

This endpoint allows new captains (drivers) to register by providing their full name, email, password, and vehicle information. The password is automatically hashed before being stored in the database. Upon successful registration, the captain receives a JWT authentication token that expires in 24 hours.

#### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "string"
  }
}
```

#### Field Requirements

| Field                 | Type   | Required | Validation                                     |
| --------------------- | ------ | -------- | ---------------------------------------------- |
| `fullname.firstname`  | String | Yes      | Minimum 3 characters                           |
| `fullname.lastname`   | String | Yes      | Minimum 3 characters                           |
| `email`               | String | Yes      | Must be a valid email format                   |
| `password`            | String | Yes      | Minimum 6 characters                           |
| `vehicle.color`       | String | Yes      | Minimum 3 characters                           |
| `vehicle.plate`       | String | Yes      | Minimum 3 characters, must be unique           |
| `vehicle.capacity`    | Number | Yes      | Minimum value of 1                             |
| `vehicle.vehicleType` | String | Yes      | Must be one of: "car", "motorcycle", or "auto" |

#### Example Request

```json
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response

##### Success Response (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBhMTIzNDU2Nzg5MGFiY2RlZjEyMzQiLCJpYXQiOjE3MjkwMDAwMDAsImV4cCI6MTcyOTA4NjQwMH0.xYz123AbC456DeF789GhI012JkL345MnO678PqR901StU",
  "captain": {
    "_id": "670a12345678990abcdef1234",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 0,
      "lng": 0
    },
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token valid for 24 hours
- `captain._id`: MongoDB ObjectId of the newly created captain
- `captain.fullname`: Object containing captain's first and last name
- `captain.email`: Registered email address (stored in lowercase)
- `captain.status`: Captain's current status ("active" or "inactive", defaults to "inactive")
- `captain.vehicle`: Object containing vehicle details
  - `color`: Vehicle color
  - `plate`: Vehicle license plate (must be unique)
  - `capacity`: Number of passengers the vehicle can accommodate
  - `vehicleType`: Type of vehicle ("car", "motorcycle", or "auto")
- `captain.location`: Current location coordinates (defaults to 0, 0)
  - `lat`: Latitude
  - `lng`: Longitude
- `captain.__v`: MongoDB version key

##### Error Response (400 Bad Request)

When validation fails:

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

When captain already exists:

```json
{
  "error": "Captain with this email already exists"
}
```

##### Error Response (500 Internal Server Error)

When server error occurs:

```json
{
  "error": "Error message details"
}
```

#### Status Codes

| Status Code                 | Description                                |
| --------------------------- | ------------------------------------------ |
| `201 Created`               | Captain successfully registered            |
| `400 Bad Request`           | Validation error or captain already exists |
| `500 Internal Server Error` | Server error during registration process   |

#### Notes

- The password is hashed using bcrypt with a salt rounds of 10 before storage
- Email addresses are automatically converted to lowercase
- Email addresses must be unique in the system
- Vehicle plate numbers must be unique in the system
- A JWT token with 24-hour expiration is generated upon successful registration
- The captain's initial status is set to "inactive"
- The captain's initial location is set to coordinates (0, 0)
- The token should be stored by the client and included in subsequent requests for authentication
- Vehicle types are restricted to: "car", "motorcycle", or "auto"
