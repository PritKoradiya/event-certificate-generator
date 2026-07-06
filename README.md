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
        CertificatePreview.jsx
        Navbar.jsx
        Sidebar.jsx
        StatCard.jsx
      data/
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

- Bulk certificate generation
- Upload student list manually or using CSV
- Generate multiple certificates from list
- Download multiple certificates
- Same category/template for all students
- Different category/template support later
- Bulk certificate generation from student list
