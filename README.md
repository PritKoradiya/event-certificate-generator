# Event Certificate, Report & Attendance Management Platform

A full-stack MERN platform for generating professional event certificates, structured academic event reports, attendance sheets, and event posters with record management and frontend export tools.

This project includes three main academic document modules:

1. Event Certificate Generator  
2. Event Report Generator  
3. Attendance Sheet Generator

The Event Report Generator follows the academic event report structure provided in the mentor format, including event details, outline, objectives, outcomes, photos, coordinator, and dean section.

---

## Developed By

**Pritkumar Koradiya**  
Full Stack MERN Developer

© 2026 Pritkumar Koradiya. All Rights Reserved.  
Unauthorized copying, redistribution, or reuse of this project without proper credit is not allowed.

---

## Project Modules

### 1. Event Certificate Generator

The Certificate Generator allows users to create and manage professional certificates for different events such as seminars, conferences, FDPs, expert talks, workshops, webinars, hackathons, competitions, and more.

#### Features

- Single certificate generation
- 24+ certificate templates
- Image background certificate templates
- Live certificate preview
- Template selection
- Category-based certificate generation
- Authorized signature name support
- Certificate PDF download
- Bulk certificate generation
- Manual participant list input
- CSV participant upload
- Download all certificates as ZIP
- Save draft certificates
- View generated certificates
- Edit certificate records
- Delete certificate records
- Manage single and bulk certificates

---

### 2. Event Report Generator

The Event Report Generator allows users to create structured academic event reports using event details, objectives, outcomes, photos, and signature details.

#### Features

- Create structured event report
- Mentor-format report preview
- Event details form
- Event outline section
- Objectives section
- Outcomes section
- Photo upload support
- Two-page report preview
- A4 portrait PDF export
- Save draft report
- View event reports
- Edit event reports
- Delete event reports
- Download report PDF
- Professional report management page

---

### 3. Attendance Sheet Generator

The Attendance Sheet Generator manages reusable student records and prepares stable attendance sheet data for frontend PDF rendering. Each generated record stores a snapshot of its selected students, so later student master changes do not alter existing sheets.

#### Features

- Master student list
- Department and class filtering
- Bulk student insertion with duplicate handling
- Automatic continuous serial numbers
- Blank signature column
- Dynamic multipage sheet data with 39 rows per full page
- Attendance sheet record management
- Event coordinator prepared for display on the final page
- Repeated reference header and table structure prepared for frontend PDF rendering
- Default school name: `School of Engineering, PPSU`
- Default document title: `Attendance Sheet`

#### Attendance Student API Summary

```txt
POST   /api/attendance-students
POST   /api/attendance-students/bulk
GET    /api/attendance-students
PUT    /api/attendance-students/:id
DELETE /api/attendance-students/class
DELETE /api/attendance-students/:id
```

#### Attendance Sheet API Summary

```txt
POST   /api/attendance-sheets
POST   /api/attendance-sheets/draft
GET    /api/attendance-sheets
GET    /api/attendance-sheets/:id
PUT    /api/attendance-sheets/:id
DELETE /api/attendance-sheets/:id
```

Attendance sheet PDFs are intentionally rendered by the frontend; the backend stores the normalized data and student snapshot only.

---

### Additional Event Poster Generator

The Event Poster Generator allows users to create engaging event promotional posters using customizable templates, live preview, optional event banner images, organization logos, and multi-format exports.

#### Features

- 12 event poster templates (Seminar, Conference, FDP, Expert Talk, Workshop, Webinar, Hackathon, Cultural, Sports, Technical, Project Exhibition, Training)
- Dynamic poster builder (`/create-poster`)
- Live poster preview canvas
- Event banner image upload support (Max 5MB)
- Organization logo upload support (Max 5MB)
- Save draft poster
- PNG image download (1080 x 1350 resolution)
- A4 portrait PDF download
- Poster records management page (`/poster-records`)
- View, search, filter, and delete saved poster records

#### Poster API Summary

```txt
POST   /api/posters
POST   /api/posters/draft
GET    /api/posters
GET    /api/posters/:id
PUT    /api/posters/:id
DELETE /api/posters/:id
```

---

## Frontend Routes

- `/` - Main Platform Landing Dashboard
- `/certificate-dashboard` - Certificate Studio Workspace
- `/create-certificate` - Certificate Builder
- `/templates` - Template & Poster Gallery
- `/categories` - Event Category Explorer
- `/bulk-generate` - Bulk Certificate Generator
- `/generated-certificates` - Certificate Records
- `/create-poster` - Event Poster Builder
- `/poster-records` - Poster Records
- `/report-dashboard` - Report Studio Workspace
- `/create-event-report` - Event Report Builder
- `/event-reports` - Event Report Records

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- html2canvas
- jsPDF
- JSZip

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- dotenv
- CORS

---

## Folder Structure

```txt
event-certificate-generator/
│
├── client/
│   ├── public/
│   │   └── certificate-backgrounds/
│   ├── src/
│   │   ├── components/
│   │   │   └── PosterPreview.jsx
│   │   ├── data/
│   │   │   └── posterData.js
│   │   ├── pages/
│   │   │   ├── CreatePoster.jsx
│   │   │   └── PosterRecords.jsx
│   │   ├── services/
│   │   │   └── posterApi.js
│   │   ├── utils/
│   │   │   └── downloadPoster.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   │   ├── event-reports/
│   │   └── posters/
│   └── package.json
│
├── README.md
├── LICENSE
└── .gitignore
```
