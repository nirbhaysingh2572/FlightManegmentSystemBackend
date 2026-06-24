# AuthService

**Executive Summary:** The **AuthService** is the authentication microservice of the Flight Booking Management System. It handles user registration, login, and token issuance using JSON Web Tokens (JWT). Passwords are never stored in plaintext; instead, they are securely hashed (e.g. with bcrypt). Upon successful login, the service generates a signed JWT containing user claims (like user ID and role) which the client uses for authenticated requests. The service ensures stateless, scalable authentication by verifying JWT signatures without storing session state on the server.

## Prerequisites

- **Node.js** (v14+ recommended) and **npm** installed.  
- **MySql**  running (the code likely uses a DB; adjust to your setup).  
- Basic tools: Git to clone the repo, and any code editor.  

## Installation

1. **Clone the repository** and navigate to the AuthService folder:
   ```bash
   git clone https://github.com/nirbhaysingh2572/FliteManegmentSystemBackend.git
   cd FliteManegmentSystemBackend/AuthService
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment configuration**: Create a `.env` file based on the example (see below) and fill in values.

## Environment Variables

AuthService relies on environment variables for configuration and secrets. Typically, these are defined in a `.env` file (which should **not** be checked into source control). Example keys include:

| Variable           | Type    | Description                                        | Example                       |
|--------------------|---------|----------------------------------------------------|-------------------------------|
| `PORT`             | Number  | Port on which AuthService listens                  | `3001`                        |
| `JWT_KEY`          | String  | used for encreption of password                    |    `randomkey`                |
| `saltRound`        | Number  | Salt rounds for bcrypt                             | `10`                          |

4. **DataBase configuration**: Create a `config.json` file at `src/config/` and write database configration there
for development environment

```json
   {
        "development":{
            "username": < your database user name >,
            "password": < your database password >,
            "database": "Auth_DB_dev",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }
```


5. **Start the server**:
   - with commond: `npm start`.  

   The service should now be running on the configured port .

## Dependencies

The AuthService is a Node.js/Express application. Key dependencies (in `package.json`) likely include:

- **express** – Web framework for creating REST APIs.  
- **jsonwebtoken** – Handling JWT creation and verification.  
- **bcrypt** (or **bcryptjs**) – Password hashing and verification.  
- **sequelize** (or another DB library) – MongoDB object modeling (if using MongoDB).  
- **dotenv** – Loading `.env` variables.  
- **(others)**: body-parser, and other


## Database Desine


## API Endpoints

The AuthService exposes RESTful endpoints for authentication. Below is a summary of the main endpoints:

| Method | Path               | Request Body                    |
| ------ | ------------------ | ------------------------------- |
| POST   | `/signup`          | `{ username, email, password }` |
| POST   | `/signin`          | `{ email, password }`           |
| GET    | `/:id`             | *None*                          |
| DELETE | `/:id`             | *None*                          |
| POST   | `/addRole`         | `{ userId, role }`              |
| GET    | `/isAuthenticated` | *None*                          |
| GET    | `/isAdmin/:id`     | *None*                          |

---

## Authentication Header

isAuthenticated routes require a JWT token in the request header:

```http id="d7ztm6"
req.headers['x-acess-token] = JWT_token;
```



**Request and Response Examples:**

- **signup:**  
  `POST /signup`  
  _Request Body:_  
  ```json
    { 
        "name": "Alice",
        "email": "alice@example.com", 
        "password": "securePass123" 
    }
  ```  
  _Response :_  statusCode and
  ```json
    { 
        "data": <userdata>,
        "success":"true or false",
        "message": "sucess or error message",
        "error": "detailed meaning ful errors"
    }
  ```  
 

**HTTP Status Codes:**  
- `200 OK` – Request succeeded.  
- `201 Created` – New resource created (e.g. after registration).  
- `400 Bad Request` – Missing/invalid data.  
- Other errors (e.g. `500 Internal Server Error`) may occur on server-side failures.





## Logging & Error Handling
    Error handaling were done using costom error classes and lagging from each layer independently.


## Contributing



**AuthService** is now ready for use in the Flight Booking Management System.  
