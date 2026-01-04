# RR Nation – Event & Community Platform

A modern, scalable web platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, featuring **role-based authentication**, **dashboards**, and a **CMS-style public website**.

---

## 🚀 Project Overview

RR Nation is a full-featured event and community management platform that supports:

* Public-facing website (events, services, blogs, gallery)
* Role-based user system (User, Member, Partner, Admin)
* Separate dashboards and profiles per role
* Admin panel for full system management

The project is designed with **scalability, maintainability, and performance** in mind.

---

## ✨ Key Features

### 🌐 Public Website

* Home page with dynamic sections
* Events listing & event details
* Services & service details
* Blog with dynamic routing
* Gallery & team pages
* Contact page

### 🔐 Authentication & Roles

* User registration
* Member registration
* Partner registration
* Secure login/logout
* Role-based access control (RBAC)

### 📊 Dashboards

* User dashboard + profile
* Member dashboard + profile
* Partner dashboard + profile
* Admin dashboard

  * Manage users
  * Manage members
  * Manage partners
  * Application settings

---

## 🧱 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React hooks / Context API
* **Authentication:** JWT / NextAuth (planned)
* **Version Control:** Git & GitHub

---

## 📁 Project Structure (Simplified)

```txt
src/
├── app/            # Routing (App Router)
├── components/     # Reusable UI & sections
├── lib/            # Auth, fetchers, helpers
├── types/          # TypeScript types
├── utils/          # Utility functions
├── styles/         # Tailwind component layers
└── middleware.ts   # Route protection
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TRISHAN00/rr-nation.git
cd rr-nation
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file based on the example:

```bash
cp .env.example .env.local
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=
DATABASE_URL=
JWT_SECRET=
```

> ⚠️ Never commit `.env` files to GitHub

---

## 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🧠 Development Workflow

* `main` → Production-ready code only
* `develop` → Active development
* `feature/*` → New features
* `fix/*` → Bug fixes

All features are developed via pull requests.

---

## 📌 Roadmap

* [ ] Authentication (NextAuth / JWT)
* [ ] Admin CRUD modules
* [ ] CMS integration
* [ ] Payment integration
* [ ] Email notifications

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`feature/your-feature-name`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is currently **private / proprietary**.

---

## 👤 Author

**Trishan Saha**
Frontend & WordPress Developer

* GitHub: [https://github.com/TRISHAN00](https://github.com/TRISHAN00)

---

> Built with ❤️ using Next.js & Tailwind CSS
