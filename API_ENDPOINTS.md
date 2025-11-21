# Frontend API Endpoints Reference

This document lists all API endpoints that the frontend expects from the backend server.

## Base URL
The base URL is configured via `VITE_SERVER` environment variable.

## Authentication Endpoints

### User Authentication
- **POST** `/api/v1/users/sign-in` - Sign in user
  - Body: `{ inputValue: string, password: string }`
  - Returns: User object with cookies set

- **POST** `/api/v1/users/sign-up` - Sign up new user
  - Body: `{ inputValue: string, username: string, fullname: string, password: string, avatar: string }`
  - Returns: User object with cookies set

- **GET** `/api/v1/users/current-user` - Get current authenticated user
  - Requires: Authentication cookie
  - Returns: User object

- **GET** `/api/v1/users/google/auth` - Initiate Google OAuth
  - Redirects to Google authentication

- **GET** `/api/v1/users/google/callback` - Google OAuth callback
  - Handled by backend, redirects to frontend

### User Validation
- **GET** `/api/v1/users/unique-username?username={username}` - Check if username is available
  - Returns: `{ data: boolean }` (true if taken, false if available)

- **GET** `/api/v1/users/check-email?email={email}` - Check if email is available
  - Returns: `{ data: boolean }` (true if taken, false if available)

## Ad (Add) Endpoints

### Create & Update
- **POST** `/api/v1/adds/create-add` - Create new ad
  - Requires: Authentication
  - Body: `{ title: string, description: string, coverImage: string, category: string, subCategory: string, price: string, hashtags: array, media: array }`
  - Returns: Created ad object

- **PATCH** `/api/v1/adds/update-add` - Update existing ad
  - Requires: Authentication
  - Body: `{ _id: string, title: string, description: string, coverImage: string, category: string, subCategory: string, price: string, hashtags: array, media: array }`
  - Returns: Updated ad object

- **PATCH** `/api/v1/adds/update-add-coverImage` - Update only cover image
  - Requires: Authentication
  - Body: `{ _id: string, avatar: string }`

- **PATCH** `/api/v1/adds/remove-media-from-add` - Remove media from ad
  - Requires: Authentication
  - Body: `{ _id: string, media: array }`

- **DELETE** `/api/v1/adds/delete-add` - Delete ad
  - Requires: Authentication
  - Body: `{ _id: string, deleteStatus: string }`

### Read
- **GET** `/api/v1/adds/get-latest-adds?page={page}&limit={limit}&sort={sort}` - Get latest ads
  - Query params: page (number), limit (number), sort (string: "ASC" | "DSC")
  - Returns: Array of ads

- **GET** `/api/v1/adds/get-add?id={id}` - Get single ad by ID
  - Query params: id (string, 24 chars)
  - Returns: Single ad object with media and owner info

- **GET** `/api/v1/adds/get-user-adds` - Get logged-in user's ads
  - Requires: Authentication
  - Returns: Array of user's ads

- **GET** `/api/v1/adds/get-user-profile` - Get user profile with ads
  - Body: `{ _id: string }`
  - Returns: User profile with ads

- **GET** `/api/v1/adds/search-add` - Search ads
  - Body: `{ q: string, sort: string, page: number, limit: number }`
  - Returns: Search results

### AI Generation
- **GET** `/api/v1/adds/generate-description?title={title}` - Generate AI description
  - Requires: Authentication
  - Query params: title (string)
  - Returns: Generated description text

- **GET** `/api/v1/adds/generate-hashtags?title={title}` - Generate AI hashtags
  - Query params: title (string)
  - Returns: Array of hashtags

- **GET** `/api/v1/adds/generate-images` - Generate AI images
  - Requires: Authentication
  - Body: `{ title: string }`
  - Returns: Array of generated image URLs

### Status Management
- **PATCH** `/api/v1/adds/update-add-status` - Update ad status
  - Requires: Authentication
  - Body: `{ _id: string, status: string }`
  - Status values: "ENABLED" | "DISABLED" | "DELETED"

## Media Upload

### Cloudinary Upload
The frontend uploads images directly to Cloudinary:
- **POST** `https://api.cloudinary.com/v1_1/{CLOUDINARY_NAME}/image/upload`
  - Body: FormData with `file` and `upload_preset`
  - Returns: Cloudinary upload response with `secure_url`

## Response Format

All API responses follow this format:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

Error responses:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]
}
```

## Authentication

Most endpoints require authentication via HTTP-only cookies:
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token

Cookies are automatically sent with requests when `withCredentials: true` is set in axios.

## Notes

- All endpoints use `/api/v1` prefix
- Date formats: ISO 8601 strings
- Price should be sent as string (will be converted to number on backend)
- Media array format: `[{ mediaUrl: string, filename: string, mediaType: string }]`
- Hashtags array: Array of strings (e.g., `["#tag1", "#tag2"]`)

