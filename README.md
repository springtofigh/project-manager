# Project Manager - Full-Stack Todo App ✅

**Project Manager** is a full-stack Todo application built with **Next.js**. It features a secure authentication system, RESTful API routes, and MongoDB integration using **Mongoose**. This project focusing on real-world app development.

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

<img width="398" height="546" alt="Todo Capture 018 -  -  localhost" src="https://github.com/user-attachments/assets/ee1c09b7-7430-4909-9669-9e995ba0e69b" />

## 🧠 What I Learned

* Implementing authentication with NextAuth (email/password)
* Hashing and validating passwords securely with bcryptjs
* Creating RESTful API routes with error handling
* Structuring a full-stack project using Next.js and MongoDB


## 🔗 Live Demo

👉 [Your Live Demo Link](https://your-deployment-url.com)


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

