# Event Certificate, Report & Attendance Management Platform

A full-stack MERN platform for generating professional event certificates, structured academic event reports, attendance sheets, and event posters with record management and frontend export tools.

This project includes three main academic document modules:

1. Event Certificate Generator  
2. Event Report Generator  
3. Attendance Sheet Generator

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

The Attendance Sheet Generator manages reusable student records and generates structured multipage attendance sheets with exact mentor formatting, continuous serial numbers, repeated page headers, blank signature columns, and automatic pagination.

#### Features

- Third platform main module (`/attendance-dashboard`)
- Student master-list management (`/student-list`)
- CSV Template Download (`attendance_student_template.csv`) with frontend Blob fallback
- Student CSV Roster Import (`studentCsv`, max 2MB) with duplicate and invalid row reporting table
- Department and class filtering (CE/IT, CSE, AIML, etc.)
- Fixed mentor-format SVG preview & rendering (A4 portrait `viewBox="0 0 1240 1754"`)
- Multipage A4 PDF Export (`jsPDF` vector image rendering, zero html2canvas dependency)
- Automatic multipage pagination (39 rows per full page)
- Continuous serial numbers across all pages
- Blank Sign column
- Event Coordinator placement on the final page only
- Repeated header on every page:
  - `School of Engineering, PPSU`
  - `[Department] Department`
  - `[Heading]`
  - `Attendance Sheet`
  - `Class- [Class]`
  - Bordered `Date` row
- Saved attendance sheet records management (`/attendance-records`)
- Direct PDF Download from saved records
- Student List Regeneration / Roster Refresh (`regenerateAttendanceSheet`)
- Duplicate Attendance Sheet as Draft (`duplicateAttendanceSheet`)
- Layout validation utility (`validateAttendanceSheetLayout`) before PDF generation

#### Frontend Routes

- `/attendance-dashboard` - Attendance Studio Workspace
- `/student-list` - Student Master Roster & CSV Import
- `/create-attendance-sheet` - Attendance Sheet Form & Multipage PDF Export
- `/attendance-records` - Attendance Records & PDF Download

#### Attendance Student API Summary

```txt
GET    /api/attendance-students/csv-template
POST   /api/attendance-students/import-csv
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
POST   /api/attendance-sheets/:id/regenerate
POST   /api/attendance-sheets/:id/duplicate
GET    /api/attendance-sheets
GET    /api/attendance-sheets/:id
PUT    /api/attendance-sheets/:id
DELETE /api/attendance-sheets/:id
```

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

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- SVG Multipage Canvas Renderer
- jsPDF (A4 Vector/JPEG rendering)
- html2canvas (Certificates/Posters)
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
│   ├── src/
│   │   ├── components/
│   │   │   ├── attendance/
│   │   │   │   ├── AttendanceSheetSvgPreview.jsx
│   │   │   │   ├── AttendanceSheetSvgPage.jsx
│   │   │   │   ├── AttendanceSheetTable.jsx
│   │   │   │   └── AttendanceSheetHeader.jsx
│   │   │   └── navigation/
│   │   │       ├── AttendanceNavigation.jsx
│   │   │       └── MobileModuleNavigation.jsx
│   │   ├── layouts/
│   │   │   └── AttendanceLayout.jsx
│   │   ├── pages/
│   │   │   ├── AttendanceDashboard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── CreateAttendanceSheet.jsx
│   │   │   └── AttendanceRecords.jsx
│   │   ├── services/
│   │   │   ├── attendanceStudentApi.js
│   │   │   └── attendanceSheetApi.js
│   │   ├── utils/
│   │   │   ├── downloadAttendanceSheetPdf.js
│   │   │   └── validateAttendanceSheetLayout.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   └── ...
├── README.md
├── LICENSE
└── .gitignore
```
