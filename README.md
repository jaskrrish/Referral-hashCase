This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Authentication Application

## Overview

This application provides user authentication features including registration, login, and password recovery. It is built using Next.js, MongoDB, Tailwind CSS, ShadCN for UI, and Resend for email services.

## Features

1. **User Registration**
2. **User Login**
3. **Forget Password**

## Technologies Used

- **Next.js**: Framework for React applications.
- **MongoDB**: NoSQL database for storing user data.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN**: UI components library.
- **Resend**: Service for sending emails.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Resend account for sending emails

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/authentication-app.git
   cd authentication-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   RESEND_API_KEY=your-resend-api-key
   TOKEN_SECRET=no-reply@yourdomain.com
   DOMAIN=http://localhost:3000
   ```

4. Run the application:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.
6. ![alt text](image.png)

## API Endpoints

### 1. User Registration

**Endpoint:** `/api/auth/register`

**Method:** `POST`

**Description:** Registers a new user using email, password, and username.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "username": "username"
  },
  "message": "User registration successful"
}
```

![alt text](image-1.png)

### 2. User Login

**Endpoint:** `/api/auth/login`

**Method:** `POST`

**Description:** Logs in a user using username and password.

**Request Body:**

```json
{
  "username": "username",
  "password": "password"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt-token"
  },
  "message": "User login successful"
}
```

![alt text](image-2.png)

### 3. Forget Password

**Step 1: Request Password Reset**

**Endpoint:** `/api/auth/forgot-password`

**Method:** `POST`

**Description:** Sends a verification code to the user's registered email to reset the password.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Verification code sent to email"
}
```

**Step 2: Reset Password**

**Endpoint:** `/api/auth/reset-password`

**Method:** `PUT`

**Description:** Resets the user's password using the verification code received via email.

**Request Body:**

```json
{
  "token": "verification-code",
  "password": "newpassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

![alt text](image-3.png)
![alt text](image-4.png)

## Usage

1. **User Registration:** Navigate to the registration page and fill out the form to create a new account.
2. **User Login:** Navigate to the login page and enter your username and password to log in.
3. **Forget Password:** Navigate to the forget password page, enter your registered email to receive a verification code, and use the code to reset your password.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [your-email@example.com](mailto:your-email@example.com).

---

Feel free to customize the README as needed for your specific application and requirements.
