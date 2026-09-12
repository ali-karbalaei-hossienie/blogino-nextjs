# 📝 Blogino

**Blogino** is a modern blog management platform built with **Next.js** and **Material UI**.

The platform provides a complete blogging experience for users, including reading posts, liking, bookmarking, and commenting. It also includes a dedicated **Admin Panel** for managing posts and users.

The project focuses on authentication, protected user interactions, responsive UI, dark/light themes, and a clean modern architecture.

---

## ✨ Features

### 👤 User Features

- 🔐 User authentication with Sign In / Sign Up
- ❤️ Like posts
- 🔖 Bookmark posts
- 💬 Write comments
- ↩️ Reply to comments
- 📰 Browse and read blog posts
- 🗂️ Browse posts by category
- 👤 User profile
- 🌓 Dark & Light theme
- 📱 Responsive design

> 🔒 User interactions such as **like, bookmark, and commenting require authentication**.

Unauthenticated users can browse and read posts, but they cannot interact with them until they sign in.

---

### 🛠️ Admin Panel

Blogino includes a dedicated admin dashboard for managing the platform.

Administrators can:

- 📊 View dashboard information
- 📝 Create new posts
- ✏️ Manage and edit posts
- 🗑️ Delete posts
- 👥 Manage users
- 🔐 Control authenticated/admin-only sections
- 🗂️ Manage blog content and categories

The admin area is separated from the public blog and uses protected routes.

---

## 🎨 UI & Theme

Blogino supports both:

- ☀️ **Light Mode**
- 🌙 **Dark Mode**

The UI is built with **Material UI** and is designed with a responsive layout.

The application also supports **RTL (Right-to-Left)** layouts, making it suitable for Persian and other RTL languages.

---

## 🔐 Authentication & Authorization

Authentication is an important part of Blogino.

Users must be authenticated before accessing protected actions such as:

- ❤️ Liking a post
- 🔖 Bookmarking a post
- 💬 Writing comments
- ↩️ Replying to comments
- 👤 Accessing protected user pages

Protected routes are handled through authentication middleware, preventing unauthorized users from accessing restricted areas.

The admin panel also contains protected routes so that only authorized administrators can access management features.

---

## 💬 Comments

Blogino provides a nested comment system.

Users can:

- Write comments on posts
- Reply to existing comments
- View replies with indentation
- Participate in discussions

Replies are only available for posts where commenting/replying is enabled.

---

## 🧰 Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Material UI (MUI)**
- **React Hook Form**
- **Zod**
- **React Query**
- **Axios**

### Styling & UI

- Material UI
- Custom MUI Theme
- Dark / Light Mode
- RTL support
- Responsive layouts

### Architecture

- Next.js App Router
- Server Components
- Client Components
- Suspense & Skeleton Loading
- Route Protection / Middleware
- API Service Layer

---

## 📂 Project Structure

A simplified structure of the project:

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   │
│   ├── blogs/
│   │   ├── category/
│   │   └── [postSlug]/
│   │
│   ├── profile/
│   │
│   ├── admin/
│   │   └── ...
│   │
│   └── layout.tsx
│
├── components/
│   ├── Header/
│   ├── Blog/
│   ├── Category/
│   ├── Comments/
│   ├── Admin/
│   └── ...
│
├── services/
│   ├── postServices/
│   ├── userServices/
│   ├── categoryServices/
│   └── ...
│
├── contexts/
│   └── AuthContext/
│
├── theme/
│   └── ...
│
└── utils/
    └── ...
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ali-karbalaei-hossienie/blogino-nextjs.git
```

### 2. Navigate to the project

```bash
cd blogino-nextjs
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

Or using yarn:

```bash
yarn
```

### 4. Configure environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

Add any other environment variables required by your backend/API.

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The application should now be running locally.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

---

## 🔄 User Flow

A typical user flow in Blogino looks like this:

```text
Visitor
   │
   ├── Browse Blog
   │
   ├── Read Posts
   │
   └── Sign In / Sign Up
          │
          ▼
      Authenticated User
          │
          ├── ❤️ Like Posts
          ├── 🔖 Bookmark Posts
          ├── 💬 Comment
          ├── ↩️ Reply
          └── 👤 Profile
```

For administrators:

```text
Admin
  │
  ▼
Admin Panel
  │
  ├── 📊 Dashboard
  ├── 📝 Manage Posts
  ├── ➕ Create Posts
  ├── ✏️ Edit Posts
  ├── 🗑️ Delete Posts
  └── 👥 Manage Users
```

---

## 🛡️ Protected Features

| Feature           | Guest | Authenticated User | Admin |
| ----------------- | :---: | :----------------: | :---: |
| Read Posts        |  ✅   |         ✅         |  ✅   |
| Browse Categories |  ✅   |         ✅         |  ✅   |
| Like Posts        |  ❌   |         ✅         |  ✅   |
| Bookmark Posts    |  ❌   |         ✅         |  ✅   |
| Comment           |  ❌   |         ✅         |  ✅   |
| Reply to Comments |  ❌   |         ✅         |  ✅   |
| Profile           |  ❌   |         ✅         |  ✅   |
| Admin Panel       |  ❌   |         ❌         |  ✅   |
| Manage Posts      |  ❌   |         ❌         |  ✅   |
| Manage Users      |  ❌   |         ❌         |  ✅   |

---

## 📸 Screenshots

Screenshots of the application can be added here:

```text
Coming soon...
```

---

## 🔮 Future Improvements

Some features that can be added in future versions:

- 🔎 Advanced post search
- 🏷️ Advanced category management
- 📊 More detailed admin analytics
- 🔔 Notifications
- 📧 Email notifications
- 🖼️ Better media management
- 📄 Pagination / infinite scrolling
- 👤 More advanced profile management
- 💬 Improved comment moderation
- 🔐 More granular admin permissions

---

## 🌐 Repository

**GitHub Repository:**

https://github.com/ali-karbalaei-hossienie/blogino-nextjs

---

## 👨‍💻 Author

**Ali Karbalaei Hossienie**

GitHub:

https://github.com/ali-karbalaei-hossienie

---

## 📄 License

This project is created for learning and portfolio purposes.
