# Event Certificate & Report Generator

A MERN stack platform for generating event certificates and structured academic event reports with live preview, templates, photo support, PDF export, ZIP export, and record management.

## Modules

### 1. Event Certificate Generator
Features:
- Single certificate generation
- 24+ certificate templates
- Image background templates
- Live certificate preview
- PDF download
- Bulk certificate generation
- CSV participant upload
- ZIP download
- Draft, edit, delete, and manage records
- Authorized signature support

### 2. Event Report Generator
Features:
- Structured event report form
- Mentor-format report preview
- Event details, outline, objectives, outcomes
- Photo upload
- Two-page report preview
- A4 portrait PDF export
- Save draft
- View, edit, delete report records

## Tech Stack

### Frontend
- **React.js**: Library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **html2canvas**: Screenshot/canvas capture utility
- **jsPDF**: Client-side PDF generation
- **JSZip**: ZIP archive creation and downloading

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Minimal and flexible Node.js web application framework
- **MongoDB**: NoSQL database for document storage
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **Multer**: Middleware for handling `multipart/form-data` file uploads

## Folder Structure

The project is split into two primary folders:

*   **`client/`**: The frontend React application. Contains the UI components, pages, templates, utilities, style sheets, and configuration files.
*   **`server/`**: The backend Express API. Contains the database configuration, Mongoose models, Express routes, controllers, file upload setup, and business logic.

## Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server` directory and define the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`client/.env`)
Create a `.env` file in the `client` directory and define the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

## How to Run Locally

### Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install the client dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Build Frontend

To compile the React project into highly optimized static production files, run:
```bash
cd client
npm run build
```

## Screenshots

<!-- Screenshots will be added after final deployment. -->
- **Dashboard**: *[Screenshot to be added after deployment]*
- **Create Certificate**: *[Screenshot to be added after deployment]*
- **Certificate Preview**: *[Screenshot to be added after deployment]*
- **Bulk Generate**: *[Screenshot to be added after deployment]*
- **Create Event Report**: *[Screenshot to be added after deployment]*
- **Event Report PDF Preview**: *[Screenshot to be added after deployment]*

## Final Testing Checklist

- [ ] Dashboard loads successfully
- [ ] Certificate generation works
- [ ] Certificate PDF download works
- [ ] Bulk ZIP download works
- [ ] Event report generation works
- [ ] Event report photo upload works
- [ ] Event report PDF download works
- [ ] View/edit/delete records work
- [ ] Frontend build succeeds
- [ ] Backend server starts successfully

## Project Ownership

This project is designed and developed by **Pritkumar Koradiya**.

Unauthorized copying, redistribution, or reuse of this project without proper credit is not allowed.

© 2026 Pritkumar Koradiya. All Rights Reserved.
