# Event Certificate and Report Generator Tool

A full-stack MERN project for generating certificates and reports for college events.

The project has two main sections:

1. Event Certificate Generator
2. Event Report Generator

## Tech Stack

- React.js with Vite
- Tailwind CSS
- React Router DOM
- Node.js
- Express.js
- MongoDB ready structure with Mongoose

## Folder Structure

```text
event-certificate-generator/
  client/
    src/
      components/
        templates/
          AcademicSealTemplate.jsx
          BlueCorporateTemplate.jsx
          ClassicOrnateTemplate.jsx
          DarkLuxuryTemplate.jsx
          FloralCreativeTemplate.jsx
          GoldCornerTemplate.jsx
          MinimalElegantTemplate.jsx
          ModernWaveTemplate.jsx
          PlayfulAwardTemplate.jsx
          VintageBorderTemplate.jsx
        CertificatePreview.jsx
        Navbar.jsx
        Sidebar.jsx
        StatCard.jsx
      data/
        backgroundTemplateData.js
        posterData.js
        templateData.js
      services/
        certificateApi.js
      pages/
        Dashboard.jsx
        CreateCertificate.jsx
        Templates.jsx
        Categories.jsx
        BulkGenerate.jsx
        GeneratedCertificates.jsx
      App.jsx
      main.jsx
      index.css
    public/
      certificate-backgrounds/
        1.png
        2.png
        ...
    package.json
    vite.config.js
  server/
    src/
      config/
        db.js
      models/
        Certificate.js
        EventReport.js
      routes/
        certificateRoutes.js
        eventReportRoutes.js
        healthRoutes.js
      controllers/
        certificateController.js
        eventReportController.js
        healthController.js
      app.js
      server.js
    .env.example
    package.json
  README.md
```

## How to Run Frontend

```bash
cd client
npm install
npm run dev
```

## How to Run Backend

1. Open a terminal in the backend folder.
2. Install the backend dependencies.
3. Copy `.env.example` to `.env` and add your MongoDB connection string.
4. Start the development server.

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

For production, start the backend with:

```bash
cd server
npm start
```

### Backend Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

- `PORT`: Port used by the Express server.
- `MONGO_URI`: MongoDB connection string.
- `CLIENT_URL`: Frontend URL allowed by CORS. Set this to the deployed frontend URL in production.
- `NODE_ENV`: Use `development` locally and `production` when deployed.

### Backend API

The local API base URL is:

```text
http://localhost:5000/api
```

The health check endpoint is:

```text
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Event Certificate and Report Generator API is running",
  "modules": ["Certificate Generator", "Event Report Generator"],
  "environment": "development"
}
```

### Certificate APIs Summary

- `POST /api/certificates` - Generate and save one certificate.
- `POST /api/certificates/draft` - Save a certificate draft.
- `POST /api/certificates/bulk` - Generate and save certificates in bulk.
- `GET /api/certificates` - Get all certificates.
- `GET /api/certificates/:id` - Get one certificate.
- `PUT /api/certificates/:id` - Update one certificate.
- `DELETE /api/certificates/:id` - Delete one certificate.

### Event Report APIs Summary

- `POST /api/event-reports` - Create an event report. Send photos as `multipart/form-data` using the `photos` field.
- `POST /api/event-reports/draft` - Save an event report draft with optional photos.
- `GET /api/event-reports` - Get all event reports.
- `GET /api/event-reports/:id` - Get one event report.
- `PUT /api/event-reports/:id` - Update one event report and its photos.
- `DELETE /api/event-reports/:id` - Delete one event report and its saved photos.

Uploaded report photos are stored in `server/uploads/event-reports`. The upload folders remain in Git through `.gitkeep`, but uploaded images are ignored. A saved photo can be opened through a URL such as:

```text
http://localhost:5000/uploads/event-reports/filename.png
```

### Backend Checklist

- [ ] MongoDB connected
- [ ] Health API working
- [ ] Certificate API working
- [ ] Event Report API working
- [ ] Photo upload working
- [ ] Static upload files accessible

## Step 1 Completed Features

- Clean MERN project base structure
- Light theme dashboard layout
- Responsive sidebar navigation
- Top navbar with project name
- Placeholder pages for dashboard, certificate creation, templates, categories, bulk generation, and generated certificates
- Beginner-friendly Express API setup
- Health check route
- MongoDB connection file that skips connection when `MONGO_URI` is missing

## Step 2 Completed Features

- Working certificate form state
- Live certificate preview
- Category dropdown
- Template style dropdown
- Reset form functionality
- Placeholder buttons for save draft and generate certificate
- Improved template cards
- Improved category cards
- GitHub ready `.gitignore` file

## Step 3 Completed Features

- Working template selection
- Template data file
- 8 certificate templates
- Template based preview design
- Templates page connected with Create Certificate page
- `localStorage` selected template support
- Responsive form and preview layout

## Step 4 Completed Features

- Landscape certificate preview fix
- Certificate Mongoose model
- Certificate backend routes
- Save generated certificate data
- Fetch generated certificates
- Dynamic Generated Certificates page
- Frontend API service
- MongoDB-ready certificate storage

## Step 5 Completed Features

- Frontend PDF download
- `html2canvas` integration
- `jsPDF` integration
- A4 landscape PDF export
- Download PDF from Create Certificate page
- Download PDF from Generated Certificates page
- Certificate ID based PDF file naming
- Improved certificate print/export quality

## Step 6 Completed Features

- 24 certificate templates
- 12 poster design templates
- Template gallery tabs
- Template search
- Category filter
- Dynamic certificate design styling
- Improved dashboard stats
- Updated categories page
- PDF support for all certificate templates

## Step 6A Completed Features

- UI animations added
- Certificate preview layout polished
- Signature name to signature-style text feature
- PDF cutting issue fixed
- PDF size optimized using JPEG compression
- Improved Categories page design
- Categories page connected with template filter
- Better responsive UI

## Step 6B Completed Features

- Full UI scaling improved for 100% browser zoom
- Premium CSS and Tailwind animations added
- Dashboard redesigned with larger cards and progress section
- Create Certificate layout improved with larger form and preview area
- Certificate preview updated with export-safe A4 landscape layout
- PDF export fixed using hidden clone capture
- PDF cropping issue fixed
- PDF opacity/light output issue fixed
- PDF size optimized with JPEG compression
- Improved templates and categories UI

## Step 7 Completed Features

- Bulk certificate generation
- Manual participant list input
- CSV upload support
- Participant preview table
- Common certificate details form
- Bulk save to MongoDB
- Bulk generated certificate result table
- Sample live preview
- Individual PDF download for bulk certificates
- Generation type Single/Bulk

## Step 8 Completed Features

- Download all bulk certificates as ZIP
- JSZip integration
- CSV template download
- Editable participant table
- Bulk PDF export progress
- Generation type filter
- Improved bulk generation UI

## Step 9 Completed Features

- Save draft certificates
- View generated certificate details
- Edit generated certificate records
- Delete certificate records
- Status filter Draft/Generated
- Generation type filter Single/Bulk
- Improved generated certificate management UI
- Download PDF still supported after edit

## Step 10 Completed Features

- Premium original CSS/SVG certificate templates added
- No external copyrighted template images used
- Export-safe template component system
- Template selector supports premium designs
- Professional gallery-style mini previews for premium templates
- PDF and ZIP export compatibility preserved with A4 landscape templates

## Step 11 Completed Features

- Image background certificate templates support
- Local PNG background designs can be used from `client/public/certificate-backgrounds`
- Dynamic text overlay on background templates
- PDF export supports image templates
- Template gallery shows image-based templates
- For smaller PDF size, compress background images before placing them in the public folder

## Event Report Generator Backend Setup

- Event report model created
- Event report routes added
- Create report API
- Save draft API
- Get reports API
- Update report API
- Delete report API
- Event report photo upload support
- Multer image upload
- Static uploads folder available at `/uploads`
- Uploaded photos saved in MongoDB as local URL paths
- Maximum 4 photos supported per event report request

## Step ER-3A Completed Features

- Improved report update API
- Remove old photos support
- Delete report photos from server storage
- Safe objectives/outcomes parsing
- Better FormData support

## Step ER-4A Completed Features

- Dashboard stats API added
- Combined certificate and report stats
- Backend response cleanup
- Health API module info added

## Event Report Generator Frontend Setup

- Create Event Report page
- Event report form
- Live report preview
- Event Reports listing page
- API service added
- Dashboard module cards added

## Step ER-2B Completed Features

- Event report photo upload frontend (up to 4 photos)
- Live photo preview with premium thumbnail slots & remove option
- Two-page event report preview matching mentor PDF layout exactly
- A4 portrait PDF export using html2canvas and jsPDF
- Auto PDF download upon successful report generation
- Saved report PDF download from the Event Reports list page
- Asset URL resolver for local file blobs and backend stored images

## Step ER-3B Completed Features

- Event report records management page improved with search and status/date filters
- Interactive details view card for selected event reports
- Complete edit event report capabilities with modal form matching the builder layout
- Support for removing existing photos and uploading new ones during edit (up to 4 total photos)
- Dynamic and reliable deletion of event report records
- Polished event report PDF preview spacing, margins, exact headings, and fixed image cropping sizes
- High-quality export with `waitForImages` loading check and shadows/borders stripping before capturing
- Redesigned main dashboard with report metrics quick stats

## Step ER-4B Completed Features

- Redesigned and unified landing dashboard with platform hero section and module cards for both generators
- Created dashboard API service dynamically integrated with the MERN backend stats endpoint, with robust fallback states
- Grouped sidebar navigation links into Main, Certificate Tools, and Report Tools, following premium design principles
- Polished event report PDF format margins, spacing, text wrapping, exact labels, and auto font scaling for bullet lists
- Polished Page 2 photo width to 70%, with fixed cropping constraints and correct vertical alignment
- Updated footer branding to reflect the combined "Event Certificate & Report Generator" platform
- Cleaned up developer-oriented words from the application user interface (removed Step labels)


## GitHub Upload Instructions

```bash
git init
git add .
git commit -m "Initial Event Certificate Generator setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Next Planned Features

- Add certificate verification QR code
- Add public verification page
- Verify certificate using certificate ID
- Add QR code on certificate preview
- Improve authenticity of generated certificates
## Project Ownership

This project is designed and developed by **Pritkumar Koradiya**.

Unauthorized copying, redistribution, or reuse of this project without proper credit is not allowed.

© 2026 Pritkumar Koradiya. All Rights Reserved.
