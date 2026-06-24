# MediCare Connect - Hospital Appointment & Healthcare Management System

## Project Overview

**MediCare Connect** is a modern hospital appointment and healthcare management system built with **Next.js**, **Node.js**, **Express.js**, **MongoDB**, **JWT**, and **Stripe**.

The main purpose of this platform is to connect patients, doctors, and administrators through a centralized online healthcare system. Patients can search doctors, book appointments, make payments, manage appointment history, and submit reviews. Doctors can manage schedules, accept or reject appointments, complete consultations, and create prescriptions. Admins can manage users, verify doctors, monitor appointments, view payment records, and analyze platform activities.

This project was developed as part of the **A10_CAT-016 Assignment**.

---

## Live Links

* **Live Site:** Add your live site link here
* **Client Repository:** Add your client GitHub repository link here
* **Server Repository:** Add your server GitHub repository link here

---

## Admin Credentials

```txt
Admin Email: add-admin-email-here
Admin Password: add-admin-password-here
```

---

## Key Features

### Public Features

* Responsive homepage with healthcare-themed banner
* Dynamic featured doctors section
* Medical specialization section
* Dynamic platform statistics
* Patient success stories from reviews
* About Us page
* Contact Us page
* Find Doctors page
* Advanced doctor search by name and specialization
* Sorting doctors by consultation fee, experience, and rating
* Doctor details page
* Pagination on Find Doctors page
* Login and registration system
* Google login support
* Custom loading page
* Custom 404 not found page

---

## Authentication Features

* Email and password registration
* Google authentication
* Strong password validation
* JWT authentication
* Protected private routes
* Role-based dashboard access
* Logged-in user remains authenticated after reload
* Error handling with notifications
* Environment variables used for sensitive credentials

---

## User Roles

### Patient

A patient can:

* Create an account
* Search doctors
* View doctor details
* Book appointments
* Pay consultation fees
* View appointment history
* Reschedule appointments
* Cancel appointments
* View payment history
* Add, update, and delete reviews

---

### Doctor

A doctor can:

* Create a professional profile
* Manage schedules
* Add, update, and remove available slots
* Accept appointment requests
* Reject appointment requests
* Mark appointments as completed
* Create prescriptions
* Update prescriptions
* Update profile information
* View reviews received from patients

---

### Admin

An admin can:

* View dashboard overview
* Manage users
* Delete users
* Suspend users
* Manage doctors
* Verify doctor profiles
* Reject doctor verification
* Cancel doctor verification
* View all appointments
* Monitor appointment status
* View payment records
* View analytics using Recharts

---

## Main Pages

### Public Pages

* Home
* Find Doctors
* Doctor Details
* About Us
* Contact Us
* Login
* Register

### Private Pages

* Dashboard
* Profile
* My Appointments
* Payment History
* My Reviews
* Manage Schedule
* Appointment Requests
* Prescription Management
* Manage Users
* Manage Doctors
* Manage Appointments
* Payment Management
* Analytics

---

## Dashboard Features

### Patient Dashboard

The patient dashboard includes:

* Upcoming appointments
* Appointment history
* Total payments
* Favorite doctors
* My profile
* My appointments
* Payment history
* Review management

---

### Doctor Dashboard

The doctor dashboard includes:

* Total patients
* Today's appointments
* Reviews received
* Manage schedule
* Appointment requests
* Prescription management
* Profile management

---

### Admin Dashboard

The admin dashboard includes:

* Total users
* Total patients
* Total doctors
* Total appointments
* Payment records
* Doctor performance analytics
* User management
* Doctor verification management
* Appointment monitoring
* Recharts-based analytics

---

## Technology Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* DaisyUI / HeroUI
* Framer Motion
* Recharts
* Lucide React Icons
* Axios / Fetch API

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe Payment Gateway
* CORS
* Dotenv

### Authentication

* Better Auth / Firebase Authentication / Google Authentication
* JWT token verification
* Role-based authorization

---

## Database Collections

### Users Collection

```js
{
  name,
  email,
  role,
  photo,
  phone,
  gender,
  createdAt,
  status
}
```

### Doctors Collection

```js
{
  doctorName,
  specialization,
  qualifications,
  experience,
  consultationFee,
  hospitalName,
  profileImage,
  availableDays,
  availableSlots,
  verificationStatus
}
```

### Appointments Collection

```js
{
  patientId,
  doctorId,
  appointmentDate,
  appointmentTime,
  appointmentStatus,
  symptoms,
  paymentStatus
}
```

### Reviews Collection

```js
{
  patientId,
  doctorId,
  rating,
  reviewText,
  createdAt
}
```

### Payments Collection

```js
{
  appointmentId,
  patientId,
  doctorId,
  amount,
  transactionId,
  paymentDate
}
```

### Prescriptions Collection

```js
{
  doctorId,
  patientId,
  appointmentId,
  diagnosis,
  medications,
  notes,
  createdAt
}
```

---

## API Features

The backend API includes:

* User management API
* Doctor management API
* Appointment management API
* Review management API
* Payment management API
* Prescription management API
* JWT token generation
* JWT token verification
* Role-based private API protection
* Stripe payment intent creation
* Pagination, search, and sorting support

---

## JWT Implementation

JWT is used to secure private routes and private APIs.

### JWT Flow

1. User logs in successfully.
2. Server creates a JWT token.
3. Token is stored securely on the client side.
4. Private API requests send the token with the request header.
5. Server verifies the token before sending protected data.
6. Role-based authorization checks whether the user is patient, doctor, or admin.

### Example Authorization Header

```txt
Authorization: Bearer your-jwt-token
```

---

## Role-Based Authorization

Role-based access is implemented to protect dashboard routes and APIs.

Examples:

* Patient can access only patient dashboard routes.
* Doctor can access only doctor dashboard routes.
* Admin can access only admin dashboard routes.
* Private APIs verify both JWT token and user role before allowing access.

---

## Payment System

Stripe payment gateway is integrated into the project.

Payment process:

1. Patient selects a doctor.
2. Patient books an appointment.
3. Stripe payment is created based on the doctor's consultation fee.
4. Patient completes payment.
5. Payment status is updated in the database.
6. Appointment is confirmed after successful payment.
7. Transaction record is stored in the payments collection.

---

## Challenge Requirements Implemented

### Challenge 1: Advanced Doctor Search

Users can search doctors by:

* Doctor name
* Specialization

---

### Challenge 2: Sorting Functionality

Doctors can be sorted by:

* Consultation fee
* Experience
* Highest rating

---

### Challenge 3: JWT Token Verification

Implemented:

* Private API protection
* Backend token verification
* Role-based authorization
* JWT documentation in README

---

### Challenge 4: Pagination

Pagination is implemented on:

* Find Doctors page

---

## Optional Features Implemented

The following optional features were added:

* Dark/Light theme toggle
* Doctor availability calendar
* Layout change option between table view and card view
* Email appointment reminder
* Responsive dashboard sidebar

---

## UI/UX Features

* Unique healthcare-themed design
* Responsive layout for mobile, tablet, and desktop
* Consistent typography
* Consistent button design
* Equal card sizes
* Proper spacing and alignment
* Dashboard full-width layout
* User profile dropdown
* Responsive sidebar
* Loading page for route and data loading
* Custom 404 error page with illustration and back home button
* Toast/SweetAlert notifications
* Framer Motion animations in multiple sections

---

## Environment Variables

### Client Side `.env.local`

```env
NEXT_PUBLIC_API_URL=your_server_api_url

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

### Server Side `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=your_client_live_url
```

---

## Installation and Setup

### Client Side Setup

```bash
git clone your-client-repository-link
cd client-folder-name
npm install
npm run dev
```

---

### Server Side Setup

```bash
git clone your-server-repository-link
cd server-folder-name
npm install
npm run dev
```

---

## Deployment Notes

The project was deployed following these requirements:

* No CORS issues
* No 404 errors
* No 504 errors
* Server works properly in production
* Private routes work after page refresh
* Live site remains functional
* Logged-in users remain authenticated after reload
* Environment variables are configured properly
* API base URL is correctly connected with the frontend

---

## Responsive Design

The website is fully responsive and supports:

* Mobile devices
* Tablets
* Desktop devices

The dashboard, navbar, cards, forms, tables, and charts are optimized for different screen sizes.

---

## Security Measures

* Environment variables used for sensitive data
* JWT token verification
* Role-based API protection
* Protected private routes
* Strong password validation
* Secure payment flow using Stripe
* Admin-only doctor verification system
* User status management

---

## NPM Packages Used

### Client

```bash
next
react
react-dom
tailwindcss
daisyui
framer-motion
lucide-react
recharts
axios
sweetalert2
stripe
```

### Server

```bash
express
cors
dotenv
mongodb
jsonwebtoken
stripe
nodemon
```

---

## Project Structure

### Client Side Structure

```txt
medicare-connect-client/
├── public/
│   ├── Images/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── analytics/
│   │   │   │   ├── appointments/
│   │   │   │   ├── doctors/
│   │   │   │   ├── payments/
│   │   │   │   ├── users/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── doctor/
│   │   │   │   ├── appointments/
│   │   │   │   ├── prescriptions/
│   │   │   │   ├── schedule/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── patient/
│   │   │   │   ├── appointments/
│   │   │   │   ├── book-appointment/
│   │   │   │   ├── payment-success/
│   │   │   │   ├── payments/
│   │   │   │   ├── prescriptions/
│   │   │   │   ├── reviews/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── find-doctors/
│   │   │   ├── [id]/
│   │   │   └── page.jsx
│   │   │
│   │   ├── unauthorized/
│   │   ├── about-us/
│   │   ├── contact-us/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.jsx
│   │   ├── not-found.jsx
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── AdminAppointmentsList.jsx
│   │   ├── AdminDoctorsList.jsx
│   │   ├── AdminOverViewCards.jsx
│   │   ├── AdminPaymentsList.jsx
│   │   ├── AdminUsersList.jsx
│   │   ├── BookAppointmentForm.jsx
│   │   ├── DoctorAppointmentRequests.jsx
│   │   ├── DoctorOverviewCards.jsx
│   │   ├── DoctorPrescriptionsList.jsx
│   │   ├── DoctorProfilePreview.jsx
│   │   ├── DoctorReviews.jsx
│   │   ├── DoctorScheduleForm.jsx
│   │   ├── DoctorsCard.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── HomeTestimonials.jsx
│   │   ├── MedicalSpecializations.jsx
│   │   ├── Navbar.jsx
│   │   ├── PatientAppointmentsList.jsx
│   │   ├── PatientOverviewCards.jsx
│   │   ├── PatientPaymentList.jsx
│   │   ├── PatientPrescriptionsList.jsx
│   │   ├── PatientReviewsList.jsx
│   │   ├── PaymentSuccessContent.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── RoleGuerd.jsx
│   │   ├── ToastProvider.jsx
│   │   └── WhyChoose.jsx
│   │
│   └── lib/
│       ├── actions/
│       ├── api/
│       ├── core/
│       ├── auth-client.js
│       └── auth.js
│
├── .gitignore
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── postcss.config.mjs
```

---

### Server Side Structure

```txt
medicare-connect-server/
├── index.js
├── .gitignore
├── package-lock.json
└── package.json
```

---

### Server Side Note

The server is currently developed using a simple single-file Express.js structure. The main backend logic, MongoDB connection, API routes, JWT-related logic, and middleware setup are handled inside `index.js`.

For a larger production-level project, the server can be organized like this in the future:

```txt
medicare-connect-server/
├── index.js
├── routes/
│   ├── users.routes.js
│   ├── doctors.routes.js
│   ├── appointments.routes.js
│   ├── reviews.routes.js
│   ├── payments.routes.js
│   └── prescriptions.routes.js
│
├── middlewares/
│   ├── verifyToken.js
│   ├── verifyAdmin.js
│   └── verifyRole.js
│
├── controllers/
│   ├── users.controller.js
│   ├── doctors.controller.js
│   ├── appointments.controller.js
│   ├── reviews.controller.js
│   ├── payments.controller.js
│   └── prescriptions.controller.js
│
├── config/
│   └── db.js
│
├── utils/
│   └── stripe.js
│
├── .gitignore
├── package-lock.json
└── package.json
```


---

## Important Functionalities

* Home page dynamic doctor display
* Dynamic platform statistics
* Doctor search and filter
* Doctor sorting
* Doctor pagination
* Appointment booking
* Stripe payment
* Review CRUD
* Schedule CRUD
* Prescription CRUD
* Admin doctor verification
* Admin user management
* Admin analytics with Recharts
* JWT-secured backend APIs
* Role-based dashboards

---

## Commit Requirements

This project follows the assignment requirement:

* Minimum 20 meaningful commits on client side
* Minimum 12 meaningful commits on server side
* Meaningful commit messages used
* Professional README file included

---

## Future Improvements

Possible future improvements:

* Real-time appointment notification
* Video consultation system
* AI-based doctor recommendation
* Email and SMS reminder system
* Advanced analytics dashboard
* Multi-hospital support
* Medical report upload system

---

## Conclusion

MediCare Connect is a complete hospital appointment and healthcare management platform. It solves common problems of traditional appointment systems by digitizing doctor search, appointment booking, payment, prescription, review, and admin management. The platform provides separate dashboards for patients, doctors, and admins with secure authentication, JWT protection, role-based authorization, and a responsive modern healthcare UI.
