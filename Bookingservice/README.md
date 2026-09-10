# 🎫 Bookingservice Microservice

[![Service](https://img.shields.io/badge/Service-Booking_Service-blue.svg)](https://expressjs.com/)
[![Port](https://img.shields.io/badge/Port-3002-brightgreen.svg)]()
[![ORM](https://img.shields.io/badge/ORM-Sequelize-52B0E7.svg)](https://sequelize.org/)
[![Database](https://img.shields.io/badge/Database-MySQL-4479A1.svg)](https://www.mysql.com/)
[![RabbitMQ](https://img.shields.io/badge/Message_Broker-RabbitMQ-FF6600.svg)](https://www.rabbitmq.com/)

The **Bookingservice** orchestrates ticket reservation workflows within the Flight Management System. Running on port **`3002`**, it coordinates synchronous flight validation with `FliteSearchService`, enforces seat availability quotas, persists reservations in MySQL, and triggers asynchronous notifications by publishing events to **RabbitMQ**.

---

## ⚡ Key Capabilities

- **Synchronous Availability Verification**: Calls `FliteSearchService` (`GET /api/v1/flight/:id`) to verify available seats before creating reservations.
- **Transactional State Management**: Tracks reservation statuses across distinct lifecycle states: `inProsess`, `success`, and `canceled`.
- **Asynchronous Event Publishing**: Emits `"booking completed"` messages to the RabbitMQ `REMINDER` exchange with routing key `booking` for downstream decoupling.
- **Seat Quota Validation**: Rejects booking requests when requested seats exceed remaining capacity.

---

## 🏗️ Booking Workflow & Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Client as 🌐 Client / Gateway
    participant BS as 🎫 Bookingservice (:3002)
    participant FS as 🛫 FliteSearchService (:3000)
    participant DB as 🗄️ MySQL (Booking_DB_dev)
    participant MQ as 🐇 RabbitMQ (Exchange: REMINDER)

    Client->>BS: POST /api/v1/booking { flightId, seats }
    BS->>FS: GET /api/v1/flight/:flightId
    FS-->>BS: Returns flight data (availbleSeats)
    alt Available Seats < Requested Seats
        BS-->>Client: 400 Bad Request ("seats unavalble !")
    else Seats Available
        BS->>DB: INSERT INTO Bookings (userId, flightId, seats, status='inProsess')
        DB-->>BS: Booking record created
        BS->>MQ: Publish "booking completed" (Exchange: REMINDER, Key: booking)
        BS-->>Client: 201 Created (Booking details)
    end
```

---

## 🗄️ Database Design

```mermaid
erDiagram
    Booking {
        int id PK
        int userId FK
        int flightId FK
        enum status "inProsess | success | canceled"
        int seats
        int price
        date createdAt
        date updatedAt
    }
```

---

## ⚙️ Configuration & Setup

### 1. Environment Variables (`.env`)
Create a `.env` file in the `Bookingservice/` directory:

```env
PORT=3002
FLIGHT_SERVICE_PATH=http://localhost:3000/api/v1
USER_SERVICE_PATH=http://localhost:3001/api/v1
AMPQ_URL=amqp://guest:guest@localhost:5672
```

| Variable | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | Port on which Bookingservice listens | `3002` |
| `FLIGHT_SERVICE_PATH` | URL | Target URL for FliteSearchService API | `http://localhost:3000/api/v1` |
| `USER_SERVICE_PATH` | URL | Target URL for AuthService API | `http://localhost:3001/api/v1` |
| `AMPQ_URL` | String | AMQP connection string for RabbitMQ | `amqp://guest:guest@localhost:5672` |

### 2. Database Configuration (`src/config/config.json`)
```json
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "Booking_DB_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 3. Migrations
```bash
# Create database in MySQL
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS Booking_DB_dev;"

# Run migrations to generate the Bookings table
npx sequelize db:migrate
```

---

## 🛣️ API Endpoints Reference

Base Path: `http://localhost:3002/api/v1`

| Method | Endpoint | Description | Request Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/booking` | Create flight booking & trigger notification | `{ flightId, seats }` *(Header: `x-user-id`)* |
| `GET` | `/booking/:id` | Get booking details by ID | Route param `:id` |
| `GET` | `/booking` | List all bookings | Query parameters |

---

## 📝 Request & Response Specifications

### Create Booking (`POST /api/v1/booking`)
**Request Headers:**
```http
Content-Type: application/json
x-user-id: 1
```

**Request Body:**
```json
{
  "flightId": 1,
  "seats": 2
}
```

**Success Response (`201 Created`):**
```json
{
  "data": {
    "id": 10,
    "userId": 1,
    "flightId": 1,
    "seats": 2,
    "price": 0,
    "status": "inProsess",
    "createdAt": "2026-09-10T16:00:00.000Z",
    "updatedAt": "2026-09-10T16:00:00.000Z"
  },
  "success": true,
  "message": "successfully created booking",
  "error": {}
}
```

**Insufficient Seats Error Response (`400 Bad Request`):**
```json
{
  "data": {},
  "success": false,
  "message": "seats unavalble !",
  "error": "1 seats availble only for Now !"
}
```

---

## 💻 cURL Testing Examples

```bash
# Create a booking
curl -X POST http://localhost:3002/api/v1/booking \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{
    "flightId": 1,
    "seats": 2
  }'

# Fetch booking by ID
curl -X GET http://localhost:3002/api/v1/booking/10
```

---

## 🛠️ Local Development

```bash
# Ensure RabbitMQ server is active
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# Install & start
npm install
npm start
```
