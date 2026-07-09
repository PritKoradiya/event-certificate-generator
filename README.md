# Event Certificate Generator Tool

A full-stack MERN project base for generating certificates for college events. This first step includes the clean project structure, frontend routing, placeholder dashboard pages, and a basic backend API setup.

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
      routes/
        certificateRoutes.js
        healthRoutes.js
      controllers/
        certificateController.js
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

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

The backend health check route is:

```text
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Event Certificate Generator API is running"
}
```

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
