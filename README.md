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
        Navbar.jsx
        Sidebar.jsx
        StatCard.jsx
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
      routes/
        healthRoutes.js
      controllers/
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

- PDF download
- 20+ certificate designs
- Category based certificate generation
- Bulk certificate generation from student list
