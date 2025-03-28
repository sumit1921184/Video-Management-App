# [Video-Management-App](https://video-management-app-wov3.vercel.app/)

## Overview
The **Video Management App** is a web application designed to manage videos efficiently. Users can upload, store, and organize video content, providing a seamless experience for content management.

## Deployed Link
- **Frontend:** [Video-Management-App](https://video-management-app-wov3.vercel.app/)
- **Backend:** [Backend](https://video-management-app-3.onrender.com/)

## Features
- Upload and manage videos
- Search and filter videos
- User-friendly interface
- Pagination
- Login and sigup
- Jwt for authentication and authorization
- User can access their own videos

## Technologies Used
- **Frontend:** React.js, ChakraUI, Tailwind css
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens) and bcrypt for hashing
- **Styling:** Tailwind CSS 

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB 

### Steps to Run the Project
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/sumit1921184/Video-Management-App.git
   cd Video-Management-App
   ```

2. **Install Dependencies:**
   - Navigate to the backend folder and install dependencies:
     ```sh
     cd backend
     npm install
     ```
   - Navigate to the frontend folder and install dependencies:
     ```sh
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables:**
   - In the `backend` folder, create a `.env` file and add the following:
     ```sh
     port = 8080
     mongoURL = mongodb+srv://Sumit:Jha@cluster0.5cmviez.mongodb.net/VideoManagement?retryWrites=true&w=majority&appName=Cluster0
     Key = Masai
     ```

4. **Start the Backend Server:**
   ```sh
   cd backend
   nodemon
   ```

5. **Start the Frontend:**
   ```sh
   cd ../frontend
   npm start
   ```

## Usage
- Sign up and log in to your account.
- Upload and manage videos.
- Organize videos into categories.
- Search and filter videos as needed.
