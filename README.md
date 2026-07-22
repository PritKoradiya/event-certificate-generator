# Event Certificate & Report Generator

A full-stack MERN platform for generating professional event certificates, structured academic event reports, and event posters with live preview, template selection, image support, export tools, and record management.

This project includes three major modules:

1. Event Certificate Generator  
2. Event Report Generator  
3. Event Poster Generator

The Event Report Generator follows the academic event report structure provided in the mentor format, including event details, outline, objectives, outcomes, photos, coordinator, and dean section. :contentReference[oaicite:0]{index=0}

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

### 3. Event Poster Generator

The Poster Generator backend stores poster content and design choices while the frontend handles poster preview and PNG/PDF export.

#### Backend Features

- Poster model with draft and generated statuses
- Poster create and draft APIs
- Poster records API
- Optional event image upload
- Optional organization logo upload
- Poster update and delete support

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
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
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
│   │   └── event-reports/
│   └── package.json
│
├── README.md
├── LICENSE
└── .gitignore
