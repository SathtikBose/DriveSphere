# DriveSphere — Build Instructions

**Project:** DriveSphere **Document:** `BUILD_INSTRUCTION.md` **Version:** 1.0 **Status:** Development Master Instruction **Frontend:** React + Vite + Tailwind CSS **Backend:** Python + Django + Django REST Framework **Authentication:** Clerk **Database:** Supabase PostgreSQL **Payments:** Stripe **Image Storage:** Cloudinary **UI Design:** Stitch **Frontend Deployment:** Vercel **Backend Deployment:** Render

---

# 1. Purpose

This document defines the mandatory development workflow for building DriveSphere.

The project must be developed **phase by phase**.

The core rule is:

> **Design → Build → Test → Fix → Stable Build → Git Commit → Proceed**

Do not jump between unfinished phases.

Do not build the entire application first and test it at the end.

Do not proceed to the next phase while the current phase contains unresolved critical issues.

---

# 2. Non-Negotiable Development Rules

These rules apply throughout the entire project.

## Rule 1 — Always use Stitch for UI

Every application screen must have a Stitch design before implementation.

Do not independently invent the final UI in React.

```text
Requirement
    ↓
Stitch
    ↓
Approved Design
    ↓
React
```

---

## Rule 2 — Always build in phases

The project must be implemented in the following general order:

```text
Phase 0  → Project Setup
Phase 1  → Authentication
Phase 2  → Dashboard
Phase 3  → Marketplace
Phase 4  → Create Listing
Phase 5  → Car Details
Phase 6  → Stripe Payments
Phase 7  → Orders & Invoices
Phase 8  → Profile & Settings
Phase 9  → Integration & Hardening
Phase 10 → Deployment
```

A phase cannot be considered complete until its acceptance criteria pass.

---

## Rule 3 — Always test frontend AND backend

After every meaningful implementation milestone:

```text
Frontend Test
     +
Backend Test
     +
Integration Test
```

Testing only the frontend is not acceptable.

Testing only the API is not acceptable.

---

## Rule 4 — Always build before proceeding

Before moving to the next phase:

```text
npm run build
```

must succeed for the frontend.

The Django application must also pass its validation/tests.

---

## Rule 5 — Git commit after every stable build

Every completed phase must result in a Git commit.

Example:

```text
feat: add Clerk authentication
```

Never accumulate multiple completed phases without committing.

---

## Rule 6 — Never expose secrets

Never commit:

```text
.env
.env.local
.env.production
```

or any file containing:

- Clerk secret keys
- Stripe secret keys
- Stripe webhook secrets
- Cloudinary API secrets
- Supabase database credentials
- Django secret key

---

## Rule 7 — Backend is authoritative

Never trust the frontend for:

- Payment confirmation
- User authorization
- Listing ownership
- Car availability
- Price
- Order status
- Seller identity
- Image limits

The backend must validate all critical operations.

---

# 3. Repository Structure

Use a monorepo structure:

```text
drivesphere/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── config/
│   ├── apps/
│   │   ├── users/
│   │   ├── cars/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── invoices/
│   │   └── dashboard/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── docs/
│   ├── PRD.md
│   ├── UI_UX.md
│   └── BUILD_INSTRUCTION.md
│
├── .gitignore
└── README.md
```

The exact Django app structure can be adjusted if a simpler architecture is more appropriate, but responsibilities must remain clearly separated.

---

# 4. Frontend Architecture

Use React with feature-oriented organization.

Recommended structure:

```text
src/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── marketplace/
│   ├── cars/
│   ├── listings/
│   ├── payments/
│   ├── orders/
│   └── profile/
│
├── pages/
│   ├── Home/
│   ├── Marketplace/
│   ├── CarDetails/
│   ├── CreateListing/
│   ├── Orders/
│   └── Profile/
│
├── services/
│   ├── api.js
│   ├── cars.js
│   ├── orders.js
│   ├── payments.js
│   └── dashboard.js
│
├── hooks/
├── lib/
├── types/
└── utils/
```

Do not put all application logic inside `App.jsx`.

---

# 5. Backend Architecture

Django should be organized by domain.

Recommended:

```text
backend/
│
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
│
├── apps/
│   ├── users/
│   ├── cars/
│   ├── orders/
│   ├── payments/
│   ├── invoices/
│   └── dashboard/
│
└── manage.py
```

Each domain should contain only the logic relevant to that domain.

---

# 6. Backend API Architecture

Use Django REST Framework.

API routes should be versionable.

Recommended:

```text
/api/v1/
```

Example:

```text
/api/v1/cars/
/api/v1/cars/{id}/
/api/v1/orders/
/api/v1/payments/create-checkout/
/api/v1/payments/webhook/
/api/v1/dashboard/
/api/v1/invoices/{id}/download/
```

Do not mix unrelated responsibilities into a single endpoint.

---

# 7. Authentication Architecture

Clerk is the authentication provider.

Authentication flow:

```text
User
 ↓
Clerk
 ↓
Authenticated Session
 ↓
Frontend
 ↓
Django API
 ↓
Validate Clerk Identity
 ↓
Resolve Application User
 ↓
Authorize Request
```

The Django backend must not implement a separate password authentication system.

---

# 8. User Synchronization

The application needs an application-level user/profile representation so marketplace records can reference users.

Conceptually:

```text
Clerk User
     │
     │ clerk_user_id
     ▼
DriveSphere User/Profile
```

Store the Clerk user identifier in the application database.

Do not store the user's password.

---

# 9. Database Architecture

Supabase provides the PostgreSQL database.

Django should communicate with the PostgreSQL database using Django's database layer.

Do not build application logic around direct frontend-to-Supabase database access.

Preferred:

```text
React
 ↓
Django API
 ↓
PostgreSQL / Supabase
```

Not:

```text
React
 ↓
Direct database manipulation
```

The backend remains the primary application data layer.

---

# 10. Initial Database Entities

At minimum:

```text
UserProfile
Car
CarImage
Order
Invoice
```

Potential supporting entities:

```text
Payment
SalesRecord
```

Only create additional tables when they solve a concrete requirement.

---

# 11. Car Model Requirements

A car listing should contain at minimum:

```text
id
seller
title
brand
model
year
price
mileage
fuel_type
transmission
description
status
created_at
updated_at
```

Status:

```text
DRAFT
ACTIVE
SOLD
INACTIVE
```

---

# 12. Car Image Model

Each image should reference a car.

```text
Car
 │
 ├── Image 1
 ├── Image 2
 ├── Image 3
 └── Image 4
```

Fields:

```text
id
car
cloudinary_url
cloudinary_public_id
display_order
created_at
```

Backend must enforce:

```text
Maximum images = 4
```

Never rely solely on the frontend to enforce this.

---

# 13. Price Handling

Never use floating-point numbers for monetary values.

Use an appropriate decimal/money representation.

Example concept:

```text
Decimal
```

Stripe amounts should be converted to the smallest currency unit when creating payment requests.

Example:

```text
$18,500
    ↓
1850000 cents
```

for USD.

The actual currency must be defined consistently throughout the application.

---

# 14. Listing Ownership

Every car must have an owner.

When updating or deleting a car:

```text
Authenticated User
       ↓
Find Car
       ↓
Check seller == authenticated user
       ↓
Allow / Reject
```

Never trust a seller ID sent from the frontend.

The authenticated identity determines ownership.

---

# 15. Marketplace API

Marketplace should support:

```text
GET /api/v1/cars/
```

Potential query parameters:

```text
search
brand
model
min_price
max_price
min_year
max_year
fuel_type
transmission
ordering
page
```

Example:

```text
/api/v1/cars/?brand=Toyota&min_price=10000&max_price=30000
```

Only active listings should appear in the public marketplace unless an explicit administrative/owner view is implemented.

---

# 16. Create Listing API

Example:

```text
POST /api/v1/cars/
```

Required validation:

- Title
- Brand
- Model
- Year
- Price
- Mileage
- Fuel type
- Transmission
- Description
- Images

Backend must validate:

```text
Price > 0
Mileage >= 0
Valid year
Valid enum values
Image count <= 4
Authenticated seller
```

---

# 17. Cloudinary Integration

Image flow:

```text
User selects images
        ↓
Frontend validation
        ↓
Upload
        ↓
Cloudinary
        ↓
Receive URL/public ID
        ↓
Send references to Django
        ↓
Django stores references
        ↓
Car listing created
```

Do not store image binaries in PostgreSQL.

Use Cloudinary transformations for optimized delivery when appropriate.

---

# 18. Image Upload Rules

Maximum:

```text
4 images per car
```

The UI should reject the fifth image immediately.

The backend must also reject requests exceeding four images.

Validate:

- File type
- File size
- Upload result
- Cloudinary response

If one upload fails, the user should receive an actionable error.

---

# 19. Listing Creation Transaction

A listing should not be treated as successfully published until all required operations succeed.

Conceptually:

```text
Validate details
       ↓
Upload images
       ↓
Create car
       ↓
Create image references
       ↓
Return published listing
```

If a critical operation fails, the system should avoid leaving inconsistent records.

---

# 20. Car Details API

Example:

```text
GET /api/v1/cars/{id}/
```

Response should contain:

```text
Car information
+
Images
+
Seller public information
+
Availability/status
```

Never expose private account information.

---

# 21. Purchase Architecture

Purchase flow:

```text
User clicks Buy Now
        ↓
Frontend requests checkout
        ↓
Django validates:
    - authentication
    - car exists
    - car is ACTIVE
    - car isn't owned by buyer if prohibited
        ↓
Django creates Stripe Checkout Session
        ↓
Frontend redirects to Stripe
        ↓
Customer pays
        ↓
Stripe sends webhook
        ↓
Django verifies webhook signature
        ↓
Django verifies payment
        ↓
Create order
        ↓
Mark car SOLD
        ↓
Generate invoice
```

---

# 22. Stripe Rules

Never trust:

```text
?payment=success
```

or any frontend success redirect as proof of payment.

The authoritative flow is:

```text
Stripe
 ↓
Webhook
 ↓
Backend verification
 ↓
Order state
```

Stripe secret keys must only exist on the backend.

---

# 23. Double-Purchase Protection

A car can only have one successful purchase.

The backend must handle race conditions.

Before finalizing an order:

```text
Check car status
       ↓
Lock/revalidate record
       ↓
Confirm ACTIVE
       ↓
Create successful order
       ↓
Set SOLD
```

Database constraints should be considered to prevent multiple successful orders for the same car.

---

# 24. Order Model

Conceptually:

```text
Order
├── id
├── buyer
├── seller
├── car
├── amount
├── currency
├── status
├── stripe_checkout_session_id
├── stripe_payment_id
├── created_at
└── updated_at
```

Recommended status:

```text
PENDING
PAID
COMPLETED
FAILED
CANCELLED
```

The exact state machine should be finalized before payment implementation.

---

# 25. Order Authorization

A user may only retrieve orders where they are authorized.

Buyer:

```text
buyer == current_user
```

Seller views, if implemented:

```text
seller == current_user
```

Never expose another user's order through predictable IDs.

---

# 26. Invoice Architecture

Invoice generation should happen server-side.

Flow:

```text
Successful Order
      ↓
Generate Invoice
      ↓
Store invoice reference
      ↓
User requests download
      ↓
Verify ownership
      ↓
Generate/return invoice
```

Invoice must contain only appropriate information.

---

# 27. Dashboard Architecture

Dashboard API should calculate metrics from actual database records.

Example:

```text
GET /api/v1/dashboard/
```

Response concept:

```text
{
    earnings,
    cars_listed,
    orders,
    sales_overview
}
```

Do not hard-code dashboard numbers.

---

# 28. Earnings Definition

Define earnings consistently before implementation.

For MVP:

```text
Total Earnings =
sum of successful/completed sales
for cars sold by the authenticated user
```

Do not count:

- Failed payments
- Cancelled orders
- Unverified payments

The exact accounting treatment should be documented before production.

---

# 29. Frontend API Layer

Do not scatter raw `fetch()` calls throughout components.

Create a centralized API layer.

Example:

```text
services/
├── api.js
├── cars.js
├── dashboard.js
├── orders.js
└── payments.js
```

Components should call service functions rather than constructing API URLs everywhere.

---

# 30. Frontend State Management

Start with React state/context where sufficient.

Do not introduce a large state-management library unless the application genuinely requires it.

Separate:

```text
Server state
UI state
Form state
Authentication state
```

Keep state close to the feature that owns it.

---

# 31. Routing

Use a proper React routing solution.

Conceptual routes:

```text
/
 /login
 /signup

 /home
 /marketplace
 /cars/:id
 /cars/create

 /orders
 /orders/:id

 /profile
 /profile/edit
 /profile/password
 /profile/theme
```

Protected routes:

```text
/home
/marketplace
/cars/create
/orders
/profile
```

Public/private access should be explicitly defined.

---

# 32. Protected Route Behavior

If unauthenticated:

```text
Protected Route
       ↓
Redirect to Login
```

After successful authentication:

```text
Login
 ↓
Return to intended destination
```

Avoid redirect loops.

---

# 33. UI Implementation Rule

Use reusable components.

Example:

```text
Button
Input
Select
Card
CarCard
StatCard
StatusBadge
Modal
Toast
Skeleton
EmptyState
```

Do not duplicate Tailwind classes across dozens of components unnecessarily.

---

# 34. Tailwind CSS Rules

Use Tailwind for styling.

Avoid:

- Giant CSS files
- Inline styles everywhere
- Arbitrary pixel values without reason
- Duplicated component styling
- Inconsistent colors

Create reusable design tokens/classes where appropriate.

---

# 35. Stitch Implementation Process

For each screen:

### Step 1

Write the screen requirements.

### Step 2

Create the screen in Stitch.

### Step 3

Check:

- Desktop
- Tablet
- Mobile
- Loading
- Empty
- Error
- Success states

### Step 4

Implement in React.

### Step 5

Compare implementation with Stitch.

### Step 6

Fix visual differences.

### Step 7

Run tests.

### Step 8

Commit stable build.

---

# 36. Phase 0 — Project Initialization

## Objective

Create a clean working foundation.

### Frontend

Initialize:

```text
React
Vite
Tailwind CSS
React Router
Clerk
```

### Backend

Initialize:

```text
Python
Django
Django REST Framework
PostgreSQL configuration
```

### Setup

Configure:

- Git
- `.gitignore`
- Environment variables
- Development README
- Frontend/backend scripts

---

## Phase 0 Tests

Frontend:

```text
npm install
npm run build
npm run dev
```

Backend:

```text
python manage.py check
python manage.py test
```

Both must pass.

---

## Phase 0 Commit

```text
chore: initialize DriveSphere project
```

---

# 37. Phase 1 — Authentication

## Stitch

Design:

- Login
- Signup
- Application shell
- Protected route states

## Build

Implement:

- Clerk
- Login
- Signup
- Logout
- Auth state
- Protected routes
- User synchronization

## Test

Frontend:

- Login
- Signup
- Logout
- Protected routes

Backend:

- Authenticated API request
- Unauthenticated API rejection

Integration:

```text
Login
 ↓
Dashboard
 ↓
API request
```

---

## Phase 1 Commit

```text
feat: add Clerk authentication
```

Only commit after stable testing.

---

# 38. Phase 2 — Dashboard

## Stitch

Design:

- Dashboard
- Metric cards
- Sales chart
- Loading
- Empty
- Error

## Build

Backend:

```text
/dashboard/
```

Frontend:

```text
Dashboard
StatsGrid
SalesOverview
```

## Test

Verify:

- Correct earnings
- Correct listing count
- Correct order count
- Sales chart data
- Authentication
- Responsive layout

---

## Phase 2 Commit

```text
feat: build dashboard
```

---

# 39. Phase 3 — Marketplace

## Stitch

Design:

- Marketplace
- Car cards
- Search
- Filters
- Sorting
- Loading
- Empty
- Error

## Backend

Implement:

```text
Car model
CarImage model

GET /cars/
GET /cars/{id}/
```

Implement:

- Search
- Filters
- Sorting
- Pagination if required

## Frontend

Implement:

```text
Marketplace
SearchBar
FilterBar
CarGrid
CarCard
```

## Test

Backend:

- Query behavior
- Validation
- Pagination
- Only active listings
- Authentication rules

Frontend:

- Search
- Filters
- Sorting
- Responsive grid
- Loading/error/empty states

---

## Phase 3 Commit

```text
feat: add marketplace
```

---

# 40. Phase 4 — Create Listing

## Stitch

Design:

- Create listing
- Image uploader
- Validation states
- Preview
- Publish success
- Upload errors

## Backend

Implement:

```text
POST /cars/
```

Implement:

- Validation
- Ownership
- Cloudinary integration
- Image references
- Maximum 4 images

## Frontend

Implement:

- Listing form
- Image uploader
- Preview
- Validation
- Publish

## Test

Test:

```text
0 images
1 image
2 images
3 images
4 images
5 images
```

The fifth image must fail.

Also test:

- Invalid price
- Invalid year
- Missing fields
- Invalid image
- Cloudinary failure
- Unauthorized request

---

## Phase 4 Commit

```text
feat: add car listing creation
```

---

# 41. Phase 5 — Car Details

## Stitch

Design:

- Details page
- Gallery
- Seller information
- Specifications
- Buy button
- Sold state
- Unavailable state

## Build

Implement:

```text
GET /cars/{id}/
```

Frontend:

```text
CarDetails
ImageGallery
VehicleSpecs
SellerCard
```

## Test

Verify:

- Correct car data
- Correct images
- Correct seller
- Sold state
- Invalid car ID
- Responsive behavior

---

## Phase 5 Commit

```text
feat: add car details
```

---

# 42. Phase 6 — Stripe Payments

This is a critical phase.

## Stitch

Design:

- Purchase confirmation
- Checkout preparation
- Payment success
- Payment failure
- Payment cancelled
- Payment pending

## Backend

Implement:

```text
POST /payments/create-checkout/
POST /payments/webhook/
```

Configure:

- Stripe
- Checkout
- Webhooks
- Payment validation

## Frontend

Implement:

```text
Buy Now
Checkout Preparation
Success
Failure
Cancelled
```

---

# 43. Stripe Testing

Use Stripe test mode.

Test at minimum:

### Successful payment

```text
Car ACTIVE
 ↓
Checkout
 ↓
Successful payment
 ↓
Webhook
 ↓
Order created
 ↓
Car SOLD
```

### Failed payment

```text
Car remains ACTIVE
No completed order
```

### Cancelled checkout

```text
Car remains ACTIVE
```

### Duplicate purchase

```text
User A purchases
       ↓
Car SOLD
       ↓
User B attempts purchase
       ↓
Rejected
```

### Webhook

Test:

- Valid signature
- Invalid signature
- Duplicate webhook
- Unknown order/session

---

## Phase 6 Commit

```text
feat: integrate Stripe payments
```

Do not proceed until payment behavior is stable.

---

# 44. Phase 7 — Orders & Invoices

## Stitch

Design:

- Orders
- Order details
- Empty state
- Invoice action
- Download state
- Error state

## Backend

Implement:

```text
GET /orders/
GET /orders/{id}/
GET /invoices/{id}/download/
```

Implement invoice generation.

## Frontend

Implement:

```text
MyOrders
OrderCard
OrderDetails
DownloadInvoice
```

## Test

Verify:

- Buyer sees own orders
- Unauthorized users cannot access orders
- Correct order amount
- Correct vehicle
- Correct status
- Invoice downloads
- Invalid invoice access fails

---

## Phase 7 Commit

```text
feat: add orders and invoices
```

---

# 45. Phase 8 — Profile & Settings

## Stitch

Design:

- Profile
- Edit Profile
- Password
- Theme
- Orders
- Logout confirmation

## Build

Implement:

- Edit username
- Avatar
- Theme
- Orders navigation
- Clerk password management
- Logout

## Test

Frontend:

- Edit profile
- Theme switching
- Logout
- Responsive UI

Backend:

- Profile persistence
- Authorization
- Validation

---

## Phase 8 Commit

```text
feat: add profile and settings
```

---

# 46. Phase 9 — Full Integration

At this point all major features exist.

Run complete flows.

## Buyer Test

```text
Signup
 ↓
Login
 ↓
Dashboard
 ↓
Marketplace
 ↓
Search
 ↓
Filter
 ↓
Car Details
 ↓
Buy
 ↓
Stripe
 ↓
Payment
 ↓
Order
 ↓
Invoice
 ↓
Profile
 ↓
Logout
```

## Seller Test

```text
Login
 ↓
Add Car
 ↓
Enter Information
 ↓
Upload 4 Images
 ↓
Preview
 ↓
Publish
 ↓
Marketplace
 ↓
View Listing
```

---

# 47. Full Integration Edge Cases

Test:

### Authentication

- Invalid login
- Logout
- Expired session
- Unauthorized API request

### Marketplace

- No listings
- Search no results
- Invalid filter
- API failure
- Slow API

### Listing

- Missing fields
- Invalid values
- Five images
- Upload failure
- Unauthorized modification

### Payment

- Success
- Failure
- Cancel
- Duplicate purchase
- Webhook retry
- Webhook failure

### Orders

- No orders
- Invalid order
- Unauthorized order
- Invoice failure

---

# 48. Phase 9 Commit

```text
test: complete DriveSphere integration testing
```

Only create this commit after all critical integration issues are fixed.

---

# 49. Phase 10 — Production Preparation

Before deployment:

## Frontend

Run:

```text
npm run build
```

Confirm:

- No build errors
- No broken routes
- No missing environment variables
- No console-critical errors

## Backend

Run:

```text
python manage.py check
python manage.py test
```

Confirm:

- Production settings
- Database connection
- Static files
- CORS
- Allowed hosts
- Environment variables

---

# 50. Production Environment

## Vercel

Configure:

```text
VITE_CLERK_PUBLISHABLE_KEY
VITE_API_BASE_URL
VITE_STRIPE_PUBLISHABLE_KEY
```

Only public frontend variables should be exposed.

---

## Render

Configure:

```text
SECRET_KEY
DATABASE_URL
CLERK_SECRET_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
ALLOWED_HOSTS
CORS_ALLOWED_ORIGINS
```

Never expose these through React.

---

# 51. CORS

Production backend must explicitly allow the production frontend origin.

Do not use:

```text
CORS_ALLOW_ALL_ORIGINS = True
```

in production.

---

# 52. Django Production Security

Before deployment:

- `DEBUG = False`
- Secure secret key
- Proper `ALLOWED_HOSTS`
- Proper CORS
- HTTPS
- Secure cookies where applicable
- Proper CSRF configuration
- Production logging
- Static files configured
- Database credentials secured

---

# 53. Frontend Production Security

Check:

- No secrets in source code
- No secret environment variables using `VITE_`
- No exposed API credentials
- No debug data
- No test payment keys in production configuration
- No localhost API URLs

---

# 54. Deployment Architecture

Final:

```text
                    INTERNET
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        Vercel              Render
        React                Django
             │                   │
             │                   │
             └─────────┬─────────┘
                       │
          ┌────────────┼─────────────┐
          │            │             │
          ▼            ▼             ▼
      Clerk         Supabase      Cloudinary
   Authentication   PostgreSQL      Images
                       │
                       │
                    Stripe
                    Payments
```

---

# 55. Production Smoke Test

After deployment:

## Frontend

Check:

```text
Homepage
Login
Signup
Dashboard
Marketplace
Car Details
Create Listing
Profile
Orders
```

## Backend

Check:

```text
Health/API endpoint
Authentication
Cars API
Dashboard API
Orders API
Payment API
Webhook
```

## Payment

Run one controlled Stripe test transaction in the appropriate environment before considering payments production-ready.

---

# 56. Final Git Strategy

Use small, meaningful commits.

Recommended sequence:

```text
chore: initialize DriveSphere project

feat: add application shell

feat: add Clerk authentication

feat: add dashboard

feat: add marketplace

feat: add car listing creation

feat: add car details

feat: integrate Stripe payments

feat: add orders and invoices

feat: add profile and settings

test: complete integration testing

chore: prepare production deployment
```

Avoid commits such as:

```text
update
changes
final
new
test
stuff
```

Commit messages should describe the actual change.

---

# 57. Git Safety

Before every commit:

```text
git status
```

Check that no secrets or temporary files are staged.

Then:

```text
git diff
```

Review changes.

Then:

```text
git add .
git commit -m "..."
```

After commit:

```text
git status
```

The working tree should be clean unless intentionally carrying unfinished work.

---

# 58. Build Verification Checklist

Before declaring any phase stable:

```text
[ ] Frontend runs
[ ] Frontend production build succeeds
[ ] Backend runs
[ ] Django check succeeds
[ ] Backend tests pass
[ ] Frontend functionality tested
[ ] API functionality tested
[ ] Integration tested
[ ] Responsive layout checked
[ ] Error states checked
[ ] Loading states checked
[ ] No critical console errors
[ ] No secrets committed
[ ] Stitch design matches implementation
[ ] Git commit created
```

---

# 59. Debugging Order

When something breaks, follow this order:

```text
1. Reproduce the problem
       ↓
2. Identify frontend/backend boundary
       ↓
3. Check browser console
       ↓
4. Check network request
       ↓
5. Check API response
       ↓
6. Check Django logs
       ↓
7. Check database
       ↓
8. Check third-party service
       ↓
9. Fix root cause
       ↓
10. Retest
```

Do not randomly modify multiple files without identifying the failure.

---

# 60. API Debugging

For every failing API request check:

```text
URL
HTTP method
Headers
Authentication
Request body
Status code
Response body
Backend logs
Database state
```

Do not immediately assume the frontend is the problem.

---

# 61. Frontend Debugging

Check:

```text
Component rendering
Props
State
API request
API response
Loading state
Error state
Route parameters
Authentication state
```

Avoid hiding errors with empty fallback UI during development.

---

# 62. Third-Party Service Debugging

For:

### Clerk

Check:

- Publishable key
- Secret key
- Session
- User identity
- Production configuration

### Supabase

Check:

- PostgreSQL connection
- Credentials
- Migrations
- Schema

### Cloudinary

Check:

- Credentials
- Upload response
- Public ID
- URL

### Stripe

Check:

- Publishable key
- Secret key
- Checkout session
- Webhook secret
- Webhook delivery
- Payment status

---

# 63. Error Handling Standard

Backend errors should return structured responses.

Conceptually:

```text
{
    "error": {
        "code": "CAR_NOT_AVAILABLE",
        "message": "This car is no longer available."
    }
}
```

Frontend should map important backend errors into user-friendly messages.

Never display raw Django tracebacks.

---

# 64. Logging

Development logging may be verbose.

Production logging must:

- Avoid secrets
- Avoid passwords
- Avoid payment credentials
- Avoid sensitive user data
- Provide enough information to diagnose failures

---

# 65. Performance Rules

Avoid premature optimization.

Initially prioritize:

- Correctness
- Security
- Maintainability
- UX

Then optimize:

- Image delivery
- API response size
- Database queries
- Frontend bundle size
- Rendering

Use Cloudinary image transformations and lazy loading where beneficial.

---

# 66. Database Query Rules

Avoid N+1 query patterns.

When returning marketplace listings, efficiently load required related data.

Use appropriate Django ORM techniques such as:

```text
select_related
prefetch_related
```

where appropriate.

Do not optimize blindly; verify with actual query behavior.

---

# 67. API Pagination

Do not return an unlimited number of marketplace listings.

Implement pagination once the marketplace API is established.

The frontend must support:

```text
Loading next page
No more results
Page failure
```

The exact pagination approach can be finalized during Phase 3.

---

# 68. Form Handling

Every form must have:

```text
Initial
Editing
Submitting
Success
Error
```

Submit buttons must prevent accidental duplicate submissions.

---

# 69. Optimistic UI

Do not use optimistic UI for critical financial operations.

For example, do not immediately mark:

```text
Car = SOLD
```

on the frontend after clicking Buy.

Wait for authoritative backend/payment confirmation.

Optimistic updates can be used for low-risk preferences such as theme selection where appropriate.

---

# 70. Data Consistency

Critical state transitions must happen server-side.

Examples:

```text
Payment confirmed
      ↓
Order created
      ↓
Car SOLD
```

The frontend should reflect these states rather than determining them.

---

# 71. Accessibility Testing

For every major screen:

```text
[ ] Keyboard navigation
[ ] Focus states
[ ] Labels
[ ] Button names
[ ] Image alt text
[ ] Color contrast
[ ] Error messages
```

Do not rely exclusively on color for statuses.

---

# 72. Responsive Testing

At minimum test:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Check:

- Navigation
- Cards
- Forms
- Image gallery
- Dashboard
- Orders
- Profile
- Buttons

---

# 73. Browser Testing

Test the production build in modern:

- Chrome
- Edge
- Firefox

Safari compatibility should be considered if the final target audience requires it.

---

# 74. Definition of Stable Build

A build is **stable** only when:

```text
Frontend Build       PASS
Backend Check        PASS
Backend Tests        PASS
Feature Tests        PASS
Integration Tests    PASS
Responsive Check     PASS
Security Check       PASS
Stitch Comparison    PASS
No Critical Bugs     PASS
Git Commit           CREATED
```

Only then:

```text
PROCEED TO NEXT PHASE
```

---

# 75. Master Development Loop

This is the most important instruction in the entire document.

For every feature:

```text
┌─────────────────────────────┐
│       Define Feature        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Design in Stitch      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Review Design         │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Build Frontend        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│        Build Backend        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Test Frontend          │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Test Backend          │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Integration Test       │
└──────────────┬──────────────┘
               ↓
          ┌────┴────┐
          │         │
        FAIL       PASS
          │         │
          ↓         ↓
        FIX      UI QA
          │         │
          └────┐    ↓
               │  STABLE
               │    ↓
               │ GIT COMMIT
               │    ↓
               └→ NEXT FEATURE
```

---

# 76. Do Not Proceed If

Stop the phase and fix the problem if any of the following exists:

- Frontend build failure
- Backend check failure
- Critical API failure
- Authentication failure
- Authorization vulnerability
- Payment inconsistency
- Incorrect order state
- Incorrect car availability
- Data loss
- Broken responsive layout
- Major Stitch mismatch
- Unhandled critical error
- Secret accidentally committed

---

# 77. MVP Priority

When deciding implementation order or resolving scope conflicts, prioritize:

```text
1. Authentication
2. Marketplace
3. Car listings
4. Car details
5. Payments
6. Orders
7. Invoices
8. Dashboard
9. Profile/settings
10. Polish
```

The application must have a functioning buyer/seller transaction loop before optional enhancements are added.

---

# 78. Avoid Scope Creep

Do not add features such as:

- Chat
- Favorites
- Reviews
- Notifications
- AI recommendations
- Financing
- Insurance
- Dealer accounts

during MVP implementation unless the project requirements are explicitly changed.

Finish the core marketplace first.

---

# 79. Documentation Requirements

Keep these documents updated:

```text
docs/
├── PRD.md
├── UI_UX.md
└── BUILD_INSTRUCTION.md
```

If implementation decisions materially change the original requirements, update the relevant documentation.

---

# 80. Final Acceptance Flow

Before declaring DriveSphere complete:

```text
All Stitch Screens
       ↓
All React Screens
       ↓
All Django APIs
       ↓
Authentication
       ↓
Marketplace
       ↓
Listing Creation
       ↓
Cloudinary
       ↓
Car Details
       ↓
Stripe
       ↓
Orders
       ↓
Invoices
       ↓
Profile
       ↓
Full Integration
       ↓
Security Review
       ↓
Responsive Review
       ↓
Production Build
       ↓
Deployment
       ↓
Production Smoke Test
       ↓
FINAL STABLE BUILD
```

---

# 81. Final Rule

**Never optimize for speed by skipping validation.**

DriveSphere must be built incrementally.

The mandatory project rhythm is:

> **STITCH → BUILD → TEST FRONTEND → TEST BACKEND → INTEGRATE → QA → STABLE BUILD → GIT COMMIT → PROCEED**

A feature is not finished because the UI works.

A feature is not finished because the API works.

A feature is finished only when the complete feature works reliably across the frontend, backend, database, authentication, and required third-party services.
