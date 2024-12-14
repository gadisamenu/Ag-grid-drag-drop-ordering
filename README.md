# Project Setup and Run Guide

This document provides a step-by-step guide to set up and run the project, which includes:

- A **.NET 8.0.11 backend**
- A **React frontend** built with Node.js **v20.13.1**.

## Prerequisites

Ensure you have the following tools installed on your system:

1. **.NET SDK** (8.0.11)
   - [Download .NET SDK](https://dotnet.microsoft.com/download/dotnet)
2. **Node.js** (v20.13.1)
   - [Download Node.js](https://nodejs.org/)
3. **npm** (comes with Node.js)
4. **Git**
   - [Download Git](https://git-scm.com/)
5. **Entity Framework Core CLI**
   - Install globally by running:
     ```bash
     dotnet tool install --global dotnet-ef
     ```
   - Verify installation:
     ```bash
     dotnet ef --version
     ```
6. **PostgreSQL database**
   [Download PostgreSQL](https://www.postgresql.org/download/)

---

## Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the project:
   ```bash
   git clone https://github.com/gadisamenu/Ag-grid-drag-drop-ordering
   ```
3. Navigate to the project directory:
   ```bash
   cd Ag-grid-drag-drop-ordering
   ```

---

## Step 2: Backend Setup (.NET 8.0.11)

1. Navigate to the backend directory from root of the project:

   ```bash
   cd Backend/API
   ```

2. Restore the required NuGet packages:

   ```bash
   dotnet restore
   ```

3. Add and apply database migrations:

   - If migrations are not yet created:
     ```bash
     dotnet ef migrations add InitialCreate -p ../Persistance
     ```
   - Apply the migrations to the database:
     ```bash
     dotnet ef database update
     ```
     > Ensure the database connection string is correctly set in `appsettings.json`.

4. Run the backend project:
   ```bash
   dotnet run
   ```
5. By default, the backend API will be available at `http://localhost:5059` (or as configured).

---

## Step 3: Frontend Setup (React with Node.js v20.13.1)

1. Navigate to the frontend directory from root of the project:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the API URL:

   - Open `.env.local` file in the `frontend` directory (or create one if it doesn’t exist).
   - Add or update the following line to point to your backend:
     ```env
     NEXT_PUBLIC_BASE_URL=http://localhost:5059
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. The frontend application will be available at `http://localhost:3000` by default.

---

## Step 4: Full-Stack Integration

Ensure both the backend and frontend are running:

- **Backend**: `http://localhost:5059`
- **Frontend**: `http://localhost:3000`

The frontend will communicate with the backend via the API URL configured in the `.env.local` file.

---

## Troubleshooting

### Common Issues:

1. **Port Conflicts**:

   - If the default ports are in use, update the backend or frontend port settings.

2. **Environment Variables Not Loaded**:

   - Ensure the `.env.local` file is correctly configured in the frontend directory.

3. **Database Connection Issues**:
   - Verify the database connection string in `appsettings.json`.

---

## Step 5: Building for Production

### Backend:

1. Publish the .NET project:
   ```bash
   dotnet publish -c Release -o ./publish
   ```
2. Deploy the contents of the `publish` folder to your server.

### Frontend:

1. Build the React app:
   ```bash
   npm run build
   npm run start
   ```
2. Deploy the contents of the `build` folder to your web server.
