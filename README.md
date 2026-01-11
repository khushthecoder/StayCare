# StayCare – Hostel Management System

StayCare is a full-stack web app made to make hostel life easier for students and wardens. Students can raise complaints and give feedback on mess food, while wardens can view and solve issues from one place.

## Main Features

* **Two Roles**: Separate access for Students and Wardens
* **Complaints**: Students can report Electricity, Water, or WiFi problems
* **Food Feedback**: Daily mess food feedback with like option
* **Secure System**: Only allowed users can do admin work

## Tech Used

* **Frontend**: React (Vite) with a modern glass-style design
* **Backend**: Node.js and Express with clean route and controller setup
* **Database**: MySQL using Prisma ORM

## Project Structure

### Backend (`/BACKEND`)

* **controllers**: Handles all logic like solving complaints
* **routes**: Manages API paths
* **prisma**: Database schema and migrations
* **index.js**: Main backend file

### Frontend (`/FRONTEND`)

* **components**: UI parts like Warden view, Food board, Login forms
* **App.jsx**: Main app flow and login handling
* **index.css**: Styles and animations

## How to Run

**Backend**

```
cd BACKEND
npm install
npm run dev
```

**Frontend**

```
cd FRONTEND
npm install
npm run dev
```
