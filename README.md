# ✈️ Flight Management System Backend (Microservices Architecture)

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue.svg)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7.svg)](https://sequelize.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-AMQP-FF6600.svg)](https://www.rabbitmq.com/)
[![JWT](https://img.shields.io/badge/Authentication-JWT-orange.svg)](https://jwt.io/)

A distributed, enterprise-grade backend for an airline booking and flight operations management platform. Built using a decoupled **Microservices Architecture** in **Node.js** and **Express.js**, backed by **MySQL (Sequelize ORM)** and **RabbitMQ** for asynchronous event-driven messaging.

---

## 🏛️ System Architecture

The system is decomposed into 5 dedicated microservices communicating synchronously via REST HTTP and asynchronously via RabbitMQ:

```mermaid
flowchart TD
    Client(["🌐 Client Application / Postman"]) -->|HTTP Requests| Gateway["🚪 ApiGateway (Port 3005)"]
    
    subgraph Synchronous HTTP Communication
        Gateway -->|Verify Token / Auth Proxy| Auth["🔐 AuthService (Port 3001)"]
        Gateway -->|Flight & Airport Proxy| Search["🛫 FliteSearchService (Port 3000)"]
        Gateway -->|Booking Proxy| Booking["🎫 Bookingservice (Port 3002)"]
        Booking -->|Check Seat Availability| Search
    end

    subgraph Asynchronous Event Broker
        Booking -->|Publish 'booking completed'| RabbitMQ[("🐇 RabbitMQ Broker\nExchange: REMINDER\nBinding Key: booking")]
        RabbitMQ -->|Consume Event| Reminder["📬 ReminderService (Port 3004)"]
        Reminder -->|Send Email via SMTP| Gmail["📧 Gmail / User Inbox"]
    end

    subgraph Relational Persistence
        Auth --> AuthDB[("🗄️ MySQL: Auth_DB_dev")]
        Search --> SearchDB[("🗄️ MySQL: FliteSearchDBdev")]
        Booking --> BookingDB[("🗄️ MySQL: Booking_DB_dev")]
    end
```

---

## 📦 Microservices Breakdown

| Microservice | Port | Description & Responsibilities | Key Technologies |
| :--- | :---: | :--- | :--- |
| **[ApiGateway](file:///home/nirbhay-singh/Desktop/FliteManegmentSystemBackend/ApiGatway/README.md)** | `3005` | Reverse proxy and single entry point. Centralizes JWT verification, role-based authorization (`ADMIN`, `COSTOMER`), request sanitization, and routing. | `http-proxy-middleware`, `axios`, `express` |
| **[AuthService](file:///home/nirbhay-singh/Desktop/FliteManegmentSystemBackend/AuthService/README.MD)** | `3001` | User identity lifecycle, signup, signin, password hashing with bcrypt, JWT token generation, role assignments, and token validation. | `bcrypt`, `jsonwebtoken`, `sequelize`, `mysql2` |
| **[FliteSearchService](file:///home/nirbhay-singh/Desktop/FliteManegmentSystemBackend/FliteSearchService/README.md)** | `3000` | Catalog and flight schedule management. Handles airplanes, airports, cities, flight legs, and real-time seat availability tracking. | `sequelize`, `mysql2`, validation middlewares |
| **[Bookingservice](file:///home/nirbhay-singh/Desktop/FliteManegmentSystemBackend/Bookingservice/README.md)** | `3002` | Booking reservations lifecycle. Synchronously validates seat quotas with `FliteSearchService` and publishes booking events to RabbitMQ. | `amqplib`, `axios`, `sequelize`, `mysql2` |
| **[ReminderService](file:///home/nirbhay-singh/Desktop/FliteManegmentSystemBackend/ReminderService/README.MD)** | `3004` | Event-driven background notification service. Consumes messages from RabbitMQ and sends HTML/text ticket receipts to customer inboxes. | `amqplib`, `nodemailer` (Gmail SMTP) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher) and **npm**
- **MySQL Server** (v8.x or compatible) running locally
- **RabbitMQ Server** running locally with standard AMQP port `5672`
  - *Optional (via Docker):* `docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

### 1. Clone the Repository
```bash
git clone https://github.com/nirbhaysingh2572/FliteManegmentSystemBackend.git
cd FliteManegmentSystemBackend
```

### 2. Environment Configuration
Each microservice contains its own `.env` and Sequelize `src/config/config.json`. Populate the environment files for each service:

#### API Gateway (`ApiGatway/.env`)
```env
PORT=3005
FLIGHTSEARCH_SERVICE_PATH=http://localhost:3000
AUTH_SERVICE_PATH=http://localhost:3001
BOOKING_SERVICE_PATH=http://localhost:3002
REMINDER_SERVICE_PATH=http://localhost:3004
```

#### Auth Service (`AuthService/.env`)
```env
PORT=3001
saltRound=11
JWT_KEY=your_jwt_secret_key
```

#### Flight Search Service (`FliteSearchService/.env`)
```env
PORT=3000
```

#### Booking Service (`Bookingservice/.env`)
```env
PORT=3002
FLIGHT_SERVICE_PATH=http://localhost:3000/api/v1
USER_SERVICE_PATH=http://localhost:3001/api/v1
AMPQ_URL=amqp://guest:guest@localhost:5672
```

#### Reminder Service (`ReminderService/.env`)
```env
PORT=3004
GMAIL=your_email@gmail.com
GMAIL_PASS_KEY=your_gmail_app_password
```

---

### 3. Database Setup & Migrations

Create the required databases in your MySQL console:
```sql
CREATE DATABASE IF NOT EXISTS Auth_DB_dev;
CREATE DATABASE IF NOT EXISTS FliteSearchDBdev;
CREATE DATABASE IF NOT EXISTS Booking_DB_dev;
```

Run database migrations and seeders for each respective service:

```bash
# 1. AuthService
cd AuthService
npm install
npx sequelize db:migrate
npx sequelize db:seed:all # Seeds default roles (ADMIN, COSTOMER)
cd ..

# 2. FliteSearchService
cd FliteSearchService
npm install
npx sequelize db:migrate
npx sequelize db:seed:all # Seeds sample airplanes/cities/airports
cd ..

# 3. Bookingservice
cd Bookingservice
npm install
npx sequelize db:migrate
cd ..

# 4. ReminderService & ApiGatway
cd ReminderService && npm install && cd ..
cd ApiGatway && npm install && cd ..
```

---

### 4. Running the Microservices

Open separate terminal tabs or use a process manager to start each service:

```bash
# Terminal 1: API Gateway (Port 3005)
cd ApiGatway && npm start

# Terminal 2: Auth Service (Port 3001)
cd AuthService && npm start

# Terminal 3: Flight Search Service (Port 3000)
cd FliteSearchService && npm start

# Terminal 4: Booking Service (Port 3002)
cd Bookingservice && npm start

# Terminal 5: Reminder Service (Port 3004)
cd ReminderService && npm start
```

---

## 🛣️ Global API Gateway Directory (`http://localhost:3005/api/v1`)

All client requests must go through the **API Gateway** on port **`3005`**. The gateway inspects headers, handles JWT authentication, and proxies requests downstream.

### 🔐 User & Authentication Routes (`/api/v1/user`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Public | Registers a new user and assigns default `COSTOMER` role |
| `POST` | `/signin` | Public | Validates credentials and issues a signed JWT token |
| `GET` | `/:id` | Authenticated (Self) | Retrieves user profile by user ID |
| `DELETE` | `/:id` | Authenticated (Self) | Deletes user profile |
| `POST` | `/addRole` | Admin Only | Assigns a role (`ADMIN`, `COSTOMER`) to a user |

### 🛫 Flight Management Routes (`/api/v1/flight`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Admin Only | Creates a new flight schedule |
| `PATCH`| `/:id` | Admin Only | Updates flight schedule, timings, or pricing |
| `DELETE`| `/:id` | Admin Only | Deletes a flight record |
| `GET` | `/:id` | Public | Retrieves specific flight details |
| `GET` | `/` | Public | Lists flights with search/filter queries |

### 🏙️ Cities, Airports & Airplanes Routes
| Resource | Base Path | Public Read (`GET`) | Admin Write (`POST`, `PATCH`, `DELETE`) |
| :--- | :--- | :---: | :---: |
| **City** | `/api/v1/city` | ✅ Yes | ✅ Admin Only |
| **Airport** | `/api/v1/airport` | ✅ Yes | ✅ Admin Only |
| **Airplane**| `/api/v1/airplane` | 🔒 Admin Only | ✅ Admin Only |

### 🎫 Booking Routes (`/api/v1/booking`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Authenticated | Checks flight seat availability, reserves tickets, and publishes RabbitMQ event |
| `GET` | `/:id` | Authenticated | Retrieves booking details by booking ID |
| `GET` | `/` | Authenticated | Lists all bookings for the authenticated user |

---

## 🔑 Authentication Flow

1. Clients register via `POST /api/v1/user/signup` or login via `POST /api/v1/user/signin`.
2. Upon login, the client receives a signed JWT token.
3. For protected endpoints, attach the JWT token in the request header:
   ```http
   x-access-token: <your_jwt_token>
   ```
4. The API Gateway extracts `x-access-token`, contacts `AuthService`'s `/api/v1/user/isAuthenticated` endpoint, validates signature and expiration, and enriches headers with `x-user-id` and roles before proxying downstream.

---

## 📁 Repository Structure

```
FliteManegmentSystemBackend/
├── ApiGatway/              # Reverse proxy, auth middleware & route aggregator (Port 3005)
├── AuthService/            # User authentication, roles & JWT management (Port 3001)
├── Bookingservice/         # Reservation processing & RabbitMQ event publishing (Port 3002)
├── FliteSearchService/     # Flight, airplane, airport & city catalog (Port 3000)
├── ReminderService/        # RabbitMQ subscriber & Nodemailer email notifications (Port 3004)
├── README.md               # Master system documentation (this file)
└── task                    # Project roadmap and active development items
```

---

## 🔮 Roadmap & Future Enhancements

- [ ] Payment gateway integration (Stripe / Razorpay) for transaction settlement.
- [ ] Interactive seat selection map (window, aisle, emergency exit).
- [ ] Redis caching for frequently queried flight search routes.
- [ ] Automated end-to-end and unit test suites with Jest and Supertest.
- [ ] Docker Compose file for one-command orchestration (`docker-compose up`).

---

## 📄 License

This project is licensed for educational and developmental purposes.
