# DriveSphere 🚗

DriveSphere is a modern, high-performance marketplace platform for buying and selling cars securely. Built with a sleek glassmorphism UI and a robust backend, it connects auto enthusiasts globally with a seamless and secure transaction experience.

## ✨ Features

- **Authentication & Security:** Powered by [Clerk](https://clerk.dev/), ensuring robust user authentication, session management, and syncing.
- **Secure Payments:** Integrated with [Stripe](https://stripe.com/) Checkout and Webhooks. Payments are processed securely, and order statuses update instantly.
- **Modern UI:** Built with **React 19**, **Vite**, and **Tailwind CSS v4**. Features a responsive glassmorphism design that beautifully adapts to Dark and Light modes.
- **Real-Time Dashboard:** Sellers get comprehensive market insights, earnings tracking, and order history via a unified dashboard.
- **PostgreSQL Database:** Scalable data storage handled by [Supabase](https://supabase.com/), utilizing connection pooling for maximum performance.

## 🛠️ Tech Stack

### Frontend (Vercel)
- **Framework:** React (v19) + Vite
- **Styling:** Tailwind CSS v4, Lucide React (Icons)
- **Auth:** `@clerk/clerk-react`
- **Charts:** Recharts

### Backend (Render)
- **Framework:** Python, Django 6.1, Django REST Framework
- **Database:** Supabase (PostgreSQL) using psycopg2
- **Payments:** Stripe Python SDK
- **Architecture:** API-driven, CSRF-exempt webhooks

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Python (3.12+)
- Stripe CLI (for webhook testing)
- PostgreSQL / Supabase account
- Clerk account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/drivesphere.git
cd drivesphere
```

### 2. Setup the Backend
Navigate to the `backend` directory and set up a virtual environment:
```bash
cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder with the following variables:
```env
DATABASE_URL=postgresql://<user>:<password>@<supabase-pooler-url>:6543/postgres
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

Run migrations and start the server:
```bash
python manage.py migrate
python manage.py runserver
```

### 3. Setup the Frontend
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:8000/api/v1
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Stripe Webhook Forwarding (Testing Locally)
To test payments locally, use the Stripe CLI to forward events to your local Django server:
```bash
stripe listen --forward-to localhost:8000/api/v1/payments/webhook/
```
Copy the webhook secret provided by the CLI and set it as `STRIPE_WEBHOOK_SECRET` in your backend `.env`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the MIT License.
