# Project Manager - Full-Stack Todo App ✅

**Project Manager** is a full-stack Todo application for desktops built with **Next.js**. It features a secure authentication system, RESTful API routes, and MongoDB integration using **Mongoose**. This project focusing on real-world app development.

## 🚀 Features

- 🧾 Add, edit, delete, and complete todos
- 🔐 User authentication using **NextAuth** (Credentials)
- 🗃️ MongoDB integration via **Mongoose**
- 🔑 Password hashing using **bcryptjs**
- 🔌 RESTful API routes (create, read, update, delete)
- 📂 Folder structure optimized for scalability

## 📁 Technologies

- Next.js
- React Icons
- Mongoose
- bcryptjs
- NextAuth.js
- MongoDB
- CSS Modules

## 📸 Screenshots

> ![Login Page]
<img width="398" height="546" alt="Todo Capture 018 -  -  localhost" src="https://github.com/user-attachments/assets/ee1c09b7-7430-4909-9669-9e995ba0e69b" />

> ![All Todos Page]
<img width="1920" height="1070" alt="Fullstack Todo Capture 01 -  -  Todos" src="https://github.com/user-attachments/assets/9528e4fd-9b80-4937-81b0-f63752765a35" />

> ![Edite Todo Page]
<img width="1920" height="952" alt="Fullstack Todo Capture 02 -  -  Edite Todo" src="https://github.com/user-attachments/assets/82c61695-4b53-4341-94d5-04fdcbc1f0ef" />

> ![Todo Details Page]
<img width="1920" height="776" alt="Fullstack Todo Capture 03 -  -  Details Todo" src="https://github.com/user-attachments/assets/4219ff89-d260-4e89-ac5c-b0cb7ef64892" />


## 🧠 What I Learned

* Implementing authentication with NextAuth (email/password)
* Hashing and validating passwords securely with bcryptjs
* Creating RESTful API routes with error handling
* Structuring a full-stack project using Next.js and MongoDB


## 🔗 Live Demo

👉 [Your Live Demo Link](https://boto-project-manager.vercel.app/)


## 📦 Installation

```bash
git clone https://github.com/springtofigh/project-manager
cd bototodo
npm install
npm run dev
````

## ⚙️ Environment Variables

Create a `.env.local` file based on the following:

```env
MONGODB_URI=your-mongodb-uri
MONGO_USER=your-mongodb-username
MONGO_PASS=your-mongodb-password
```

## 🧬 Mongoose Models

* **User Model**: Contains fields for `name`, `email`, `password`,`description`, and `Todos` contains `title`, `status`, `userId`, and timestamps

* Models are defined in `/models` and connected via a custom `/utils/dbConnect.js`

