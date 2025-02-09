Shrinik Club Website
Project Overview
This is a dynamic club website where an authenticated admin can manage events, members, and the gallery. The admin has full control over content updates through CRUD operations. The website uses FreeSQLDatabase.com for database management and Cloudinary for image storage.

Tech Stack
Frontend: Next.js (React)
Backend: Node.js (Express)
Database: MySQL (FreeSQLDatabase.com)
Image Storage: Cloudinary
Authentication: Admin login for secure access
Features
✔ Admin Authentication – Only authorized users can access and modify content.
✔ Event Management – Create, read, update, and delete events dynamically.
✔ Member Management – Add, update, and remove team members.
✔ Gallery Management – Upload and delete images via Cloudinary.
✔ User-Friendly Interface – Simple and interactive UI for seamless management.

Installation Guide
Prerequisites
Ensure you have the following installed:

Node.js (v16 or later)
MySQL (or use FreeSQLDatabase.com)
Setup Instructions
Clone this repository:
sh
Copy
Edit
git clone https://github.com/Rishabh2534/shrinik-project.git
cd shrinik-project
Install dependencies:
sh
Copy
Edit
npm install
Create a .env file in the root directory and add your credentials:
ini
Copy
Edit
DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_PASS=<your-database-password>
DB_NAME=<your-database-name>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
Run the server:
sh
Copy
Edit
npm run dev
Database Schema
Events Table (events)
Column	Type	Description
id	INT (PK)	Unique event ID
title	VARCHAR	Event title
description	TEXT	Event details
venue	VARCHAR	Location of the event
date	DATETIME	Date of the event
imageUrl	TEXT	Cloudinary image URL
applicationLink	VARCHAR	Registration link (if any)
Gallery Table (gallery)
Column	Type	Description
id	INT (PK)	Unique image ID
imageUrl	TEXT	Cloudinary image URL
imageFor	VARCHAR	Purpose of the image
Members Table (members)
Column	Type	Description
id	INT (PK)	Unique member ID
name	VARCHAR	Member's name
team	VARCHAR	Role in the club
LinkedInUrl	TEXT	LinkedIn profile link
Admin Table (user)
Column	Type	Description
email	VARCHAR	Admin email (for login)
password	TEXT	Hashed password
name	VARCHAR	Admin name
username	VARCHAR	Admin username
phone	VARCHAR	Contact number
Usage Instructions
Admin Login
Navigate to the login page and enter credentials.
Manage Events
Add, edit, or remove events dynamically.
Manage Members
Update team members' details as required.
Manage Gallery
Upload images and remove outdated ones via Cloudinary.
Contributing
Contributions are welcome! If you'd like to improve this project, follow these steps:

Fork the repository.
Create a new branch (feature-branch).
Make your changes and commit them.
Push to your branch and submit a pull request.
License
This project is licensed under the MIT License.

