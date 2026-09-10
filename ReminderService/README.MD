# 📬 ReminderService Microservice

[![Service](https://img.shields.io/badge/Service-Reminder_Service-blue.svg)](https://expressjs.com/)
[![Port](https://img.shields.io/badge/Port-3004-brightgreen.svg)]()
[![RabbitMQ](https://img.shields.io/badge/Message_Broker-RabbitMQ-FF6600.svg)](https://www.rabbitmq.com/)
[![Email](https://img.shields.io/badge/Email-Nodemailer-007ACC.svg)](https://nodemailer.com/)

The **ReminderService** is an asynchronous, event-driven notification worker for the Flight Booking Management System. Running on port **`3004`**, it connects to **RabbitMQ**, consumes booking confirmation events from the message broker, and sends formatted email receipts to customers using **Nodemailer** over Google's SMTP service.

---

## ⚡ Key Capabilities

- **AMQP Consumer / Subscriber**: Implements the direct exchange publish/subscribe messaging pattern using `amqplib`.
- **Dynamic Queue Binding**: Dynamically asserts queues and binds them to the `REMINDER` exchange using the `booking` routing key.
- **Nodemailer SMTP Transporter**: Connects to `smtp.gmail.com` with TLS/app passwords to deliver real-time ticket confirmation messages.
- **Decoupled Architecture**: Allows the booking service to complete customer transactions without stalling for slow external email delivery APIs.

---

## 🏗️ Event Consumer Architecture

```mermaid
sequenceDiagram
    autonumber
    participant BS as 🎫 Bookingservice
    participant MQ as 🐇 RabbitMQ (Broker)
    participant RS as 📬 ReminderService (:3004)
    participant SMTP as 📧 Gmail SMTP Server
    participant User as 👤 Customer Inbox

    Note over RS,MQ: ReminderService starts up & asserts subscription to REMINDER exchange
    BS->>MQ: Publish 'booking completed' (Exchange: REMINDER, Key: booking)
    MQ->>RS: Push message to active consumer channel
    RS->>RS: Parse event payload (booking details)
    RS->>SMTP: Transmit email via transporter.sendMail(...)
    SMTP-->>User: Deliver Flight Booking Confirmation
```

---

## ⚙️ Configuration & Setup

### 1. Environment Variables (`.env`)
Create a `.env` file in the `ReminderService/` directory:

```env
PORT=3004
GMAIL=your_notification_email@gmail.com
GMAIL_PASS_KEY=your_google_app_password
AMPQ_URL=amqp://guest:guest@localhost:5672
```

| Variable | Type | Description |
| :--- | :--- | :--- |
| `PORT` | Number | Port on which the ReminderService HTTP health server runs (`3004`) |
| `GMAIL` | String | Sender Gmail address used for authenticating SMTP |
| `GMAIL_PASS_KEY` | String | 16-character Google App Password (generated via Google Account Security) |
| `AMPQ_URL` | String | AMQP connection string for the RabbitMQ broker |

> [!TIP]
> To generate a `GMAIL_PASS_KEY`:
> 1. Enable 2-Factor Authentication (2FA) on your Google Account.
> 2. Go to Google Account > Security > App Passwords.
> 3. Generate a new password for app name `TicketBooking`.
> 4. Copy the 16-character code (spaces optional) into `GMAIL_PASS_KEY`.

---

## 🐇 RabbitMQ Messaging Topologies

- **Exchange**: `REMINDER`
- **Exchange Type**: `direct`
- **Durable**: `false`
- **Routing / Binding Key**: `booking`
- **Queue**: Auto-generated exclusive queue asserting binding to `REMINDER` with `booking`.

---

## 📧 Email Transporter Details

Defined in `src/utils/nodemailer.js`:

```javascript
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: GMAIL,
        pass: GMAIL_PASS_KEY
    }
});
```

Dispatch helper signature:
```javascript
sendMail({
    from: "Flight Booking <no-reply@flightbooking.com>",
    to: "customer@example.com",
    subject: "Your Flight Booking is Confirmed!",
    text: "Your booking has been completed successfully.",
    html: "<b>Your booking has been completed successfully.</b>"
});
```

---

## 🛠️ Testing the Notification Flow

1. Start RabbitMQ:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```
2. Start ReminderService:
   ```bash
   cd ReminderService
   npm install
   npm start
   ```
   *Expected Console Output:*
   ```
   server started at 3004
   RabbitMQ connected Successfully !
   ```
3. When Bookingservice creates a new reservation, ReminderService logs:
   ```
   message received : booking completed
   message sent !
   ```

---

## 🛠️ Local Development

```bash
npm install
npm start
```
