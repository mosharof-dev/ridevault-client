# 🚗 RideVault — Premium Car Rental Platform (Client)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern, full-stack car rental web application where users can browse, book, and manage premium vehicles with a seamless experience.**

🔗 **[Live Site](https://ridevault-client.vercel.app)** &nbsp; | &nbsp; 🔗 **[Server Repo](https://github.com/mosharof-dev/ridevault-server)** &nbsp; | &nbsp; 🔗 **[Server Live](https://ridevault-server.vercel.app)**

</div>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🏠 **Dynamic Homepage** | Hero banner, featured vehicles slider, how it works, testimonials, and CTA sections |
| 🔍 **Explore Cars** | Browse all cars with real-time search, category filter (Sedan/SUV/Luxury/Hatchback), and sorting |
| 📝 **Add Vehicle** | Authenticated users can list their cars with a premium form (model, price, features, images) |
| 📋 **My Added Cars** | View, edit, and delete your own listed vehicles from a personal dashboard |
| 📅 **Booking System** | Book any available car with a confirmation modal and instant toast notifications |
| 📦 **My Bookings** | Track all your booked vehicles in one place |
| 🔐 **Authentication** | Secure login/register with Email & Password + Google OAuth via Better Auth |
| 🛡️ **JWT Protected Routes** | Private API routes secured with JWKS-based token verification |
| 📱 **Fully Responsive** | Pixel-perfect design across mobile, tablet, and desktop devices |
| ⚡ **Optimized Performance** | Server-side rendering, lazy loading, and debounced search |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Component Library:** [HeroUI](https://heroui.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Slider:** [Swiper.js](https://swiperjs.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Font:** Geist Sans & Geist Mono

### Authentication
- **[Better Auth](https://www.better-auth.com/)** — Email/Password + Google OAuth
- **JWT Plugin** — Token-based API authorization

### Backend
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Serverless)

---

## 📁 Project Structure

```
ridevault-client/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── add-car/                # Add new vehicle form
│   │   ├── explore-cars/           # Browse & filter all cars
│   │   ├── my-added-cars/          # User's listed vehicles dashboard
│   │   ├── my-bookings/            # User's booking history
│   │   ├── login/                  # Login page
│   │   ├── register/               # Registration page
│   │   ├── api/auth/[...all]/      # Better Auth API route handler
│   │   ├── layout.js               # Root layout (Navbar + Footer + Toaster)
│   │   ├── page.js                 # Homepage
│   │   ├── loading.jsx             # Global loading spinner
│   │   └── not-found.jsx           # Custom 404 page
│   ├── components/
│   │   ├── home/                   # Homepage sections
│   │   │   ├── Banner.jsx          # Hero banner with CTA
│   │   │   ├── FeaturedCars.jsx    # Featured vehicles Swiper slider
│   │   │   ├── HowItWorks.jsx      # Step-by-step guide
│   │   │   ├── WhyChooseUs.jsx     # Trust & value propositions
│   │   │   ├── Testimonials.jsx    # Customer reviews
│   │   │   └── CallToAction.jsx    # Final CTA section
│   │   ├── Car/                    # Car-related components
│   │   │   ├── BookingModal.jsx    # Booking confirmation modal
│   │   │   ├── EditModal.jsx       # Edit car details modal
│   │   │   ├── Delete.jsx          # Delete confirmation
│   │   │   └── ExploreCar.jsx      # Single car card component
│   │   └── shared/                 # Shared/global components
│   │       ├── NavBer.jsx          # Navigation bar
│   │       └── Footer.jsx          # Footer
│   └── lib/
│       ├── auth.js                 # Better Auth server config
│       └── auth-client.js          # Better Auth client config
├── public/                         # Static assets
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mosharof-dev/ridevault-client.git
   cd ridevault-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Better Auth
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Backend Server URL
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📸 Pages Overview

| Page | Route | Auth Required |
|---|---|---|
| 🏠 Homepage | `/` | ❌ No |
| 🔍 Explore Cars | `/explore-cars` | ❌ No |
| 🚗 Car Details | `/car/:id` | ❌ No |
| ➕ Add Car | `/add-car` | ✅ Yes |
| 📋 My Added Cars | `/my-added-cars` | ✅ Yes |
| 📅 My Bookings | `/my-bookings` | ✅ Yes |
| 🔑 Login | `/login` | ❌ No |
| 📝 Register | `/register` | ❌ No |

---

## 🌐 API Endpoints Used

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/car` | ❌ | Get all cars (supports `?search=` & `?category=`) |
| `GET` | `/car/:id` | ❌ | Get single car details |
| `GET` | `/featuredCars` | ❌ | Get featured cars for homepage |
| `POST` | `/car` | ✅ | Add a new car |
| `GET` | `/my-cars` | ✅ | Get user's own listed cars |
| `PATCH` | `/my-cars/:id` | ✅ | Update a car |
| `DELETE` | `/my-cars/:id` | ✅ | Delete a car |
| `POST` | `/booking` | ✅ | Create a booking |
| `GET` | `/booking?email=` | ✅ | Get user's bookings |

---

## 🧑‍💻 Author

**Mosharof Hossain**

- GitHub: [@mosharof-dev](https://github.com/mosharof-dev)
- Email: md.mosharof.dev@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
