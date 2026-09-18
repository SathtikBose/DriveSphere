# DriveSphere

## Product Requirements Document (PRD)

**Product:** DriveSphere **Type:** Car Marketplace Web Application **Version:** 1.0 **Status:** Development Specification

---

# 1. Product Overview

**DriveSphere** is a modern web-based car marketplace where users can discover cars, view detailed vehicle information, create their own car listings, purchase vehicles securely, and manage their orders and profile.

The platform will support two primary marketplace actions:

- **Buy cars** from available listings.
- **Sell cars** by creating vehicle listings.

The application will provide a dashboard showing marketplace/sales information, a searchable marketplace, vehicle detail pages, listing creation, Stripe-powered payments, order management, invoice downloads, and profile/settings management.

The application will be designed using **Stitch** and implemented as a modern responsive web application.

---

# 2. Goals

## Primary Goals

1. Allow authenticated users to browse available cars.
2. Allow users to create and publish car listings.
3. Allow users to purchase listed cars through Stripe.
4. Store vehicle information and marketplace data securely.
5. Allow sellers to upload up to **4 vehicle images**.
6. Provide users with an overview dashboard.
7. Provide order history and downloadable invoices.
8. Provide profile and application settings.
9. Create a clean, responsive, production-ready UI.
10. Deploy the frontend and backend independently.

## Secondary Goals

- Make the marketplace easy to understand for first-time users.
- Keep the buying flow short and straightforward.
- Make listing creation simple while collecting sufficient vehicle information.
- Build the system in independently testable phases.

---

# 3. Non-Goals — Version 1

The following features are outside the initial MVP:

- Real-time chat between buyer and seller.
- Auction functionality.
- Vehicle financing.
- Insurance integration.
- Dealer-specific accounts.
- Advanced recommendation/AI system.
- Vehicle inspection service.
- Delivery/logistics management.
- Multiple currencies.
- Mobile native applications.
- Seller verification/KYC workflow.

These can be considered for future versions.

---

# 4. Technology Stack

## Frontend

- **React**
- **Vite**
- **Tailwind CSS**

Responsibilities:

- UI rendering
- Routing
- Marketplace interactions
- Forms
- Dashboard
- Profile/settings
- API communication
- Stripe checkout integration
- Authentication state handling

---

## Backend

- **Python**
- **Django**
- Django REST API

Responsibilities:

- Business logic
- Car listings
- Orders
- Sales/earnings calculations
- API endpoints
- Authorization
- Invoice generation
- Stripe webhook handling
- Database interaction

---

## Authentication

**Clerk**

Responsibilities:

- User registration
- Login
- Logout
- Session management
- User identity
- User profile information
- Authentication state

The backend should validate the authenticated user's identity before performing protected operations.

---

## Database

**Supabase / PostgreSQL**

Primary application data:

- Users/application profiles
- Cars
- Car images/Cloudinary references
- Orders
- Payments
- Sales information
- Invoice information

---

## Payments

**Stripe**

Responsibilities:

- Checkout
- Payment processing
- Payment confirmation
- Payment status
- Stripe webhooks
- Order payment synchronization

The backend must treat Stripe webhook/payment confirmation as the authoritative payment confirmation mechanism rather than trusting only the frontend.

---

## Image Storage

**Cloudinary**

Used for:

- Car listing images
- Up to 4 images per listing

The database should store Cloudinary URLs/public identifiers rather than image binary data.

---

## UI Design

**Stitch**

Stitch will be used for designing **all application screens** before/while implementing the UI.

The implementation should follow the approved Stitch designs rather than independently inventing screen layouts during development.

---

## Deployment

### Frontend

**Vercel**

React + Vite application.

### Backend

**Render**

Django application/API.

---

# 5. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + Vite        │
                    │ Tailwind CSS        │
                    │ Frontend            │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        ┌───────────────┐             ┌───────────────┐
        │ Clerk         │             │ Django REST   │
        │ Authentication│             │ API           │
        └───────────────┘             └───────┬───────┘
                                              │
                           ┌──────────────────┼──────────────────┐
                           │                  │                  │
                           ▼                  ▼                  ▼
                    ┌────────────┐      ┌────────────┐     ┌────────────┐
                    │ Supabase   │      │ Cloudinary │     │ Stripe     │
                    │ PostgreSQL │      │ Images     │     │ Payments   │
                    └────────────┘      └────────────┘     └────────────┘
```

---

# 6. User Roles

## 6.1 Authenticated User

Every registered user can:

- Browse cars
- View car details
- Create listings
- Purchase cars
- View orders
- Download invoices
- Edit their profile
- Change password
- Change application theme
- Logout

A user can therefore act as both:

- Buyer
- Seller

No separate seller account is required for MVP.

---

# 7. Application Navigation

Primary navigation:

```text
DriveSphere
│
├── Home
├── Marketplace
├── Create Listing
└── Profile
```

Depending on screen size, navigation may be presented as:

- Desktop sidebar/top navigation
- Mobile navigation menu/bottom navigation

The exact UI should follow the Stitch design.

---

# 8. Application Flow

```text
                    START
                      │
                      ▼
                Login / Sign Up
                      │
                      ▼
                 Home Dashboard
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      Marketplace           Profile / Settings
          │
          ▼
      Car Listings
          │
          ▼
      Car Details
          │
       ┌──┴──┐
       │     │
       ▼     ▼
     Buy    Back
       │
       ▼
    Stripe
    Checkout
       │
       ▼
 Payment Confirmation
       │
       ▼
      Order
       │
       ▼
 Invoice Available
```

Seller flow:

```text
Marketplace
     │
     ▼
+ Add Car
     │
     ▼
Create Listing
     │
     ▼
Enter Vehicle Information
     │
     ▼
Upload 1–4 Images
     │
     ▼
Validate Listing
     │
     ▼
Publish
     │
     ▼
Marketplace
```

---

# 9. Screen Requirements

All screens must first be designed using **Stitch**.

---

## 9.1 Authentication

### Purpose

Allow users to securely register and authenticate.

### Provider

Clerk.

### Requirements

- Sign up
- Login
- Logout
- Session persistence
- Protected application routes
- Redirect unauthenticated users to authentication
- Redirect authenticated users to Home

Clerk's UI can be integrated according to the final Stitch design where practical.

---

# 10. Home Dashboard

## Purpose

Give users a quick overview of their marketplace activity.

### Dashboard Metrics

At minimum:

- Total Earnings
- Cars Listed
- Orders

Additional metrics can be added if useful without cluttering the MVP.

### Sales Overview

A simple sales chart should display:

- Sales/revenue over time
- Time filter such as:
  - This week
  - This month
  - This year

The initial dashboard should remain simple rather than becoming a complex analytics system.

### Example

```text
Good morning, User

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total        │ │ Cars         │ │ Orders       │
│ Earnings     │ │ Listed       │ │              │
│ $12,450      │ │ 8            │ │ 5            │
└──────────────┘ └──────────────┘ └──────────────┘

Sales Overview

       ╭──────────────╮
       │     ╱╲       │
       │ ╱╲╱  ╲╱╲    │
       │╱          ╲  │
       └──────────────┘
```

---

# 11. Marketplace

## Purpose

Allow users to discover available vehicles.

### Features

- Car listing grid
- Search
- Basic filtering
- Sorting
- Car cards
- Add Car button
- Empty state
- Loading state
- Error state

### Car Card

Each card should show relevant information such as:

- Main image
- Car title
- Brand
- Price
- Year
- Mileage
- Fuel type
- Location, if implemented
- Listing status

### Actions

```text
View Details
```

and:

```text
+ Add Car
```

---

# 12. Search & Filtering

MVP search should support searching relevant vehicle information.

Potential searchable fields:

- Brand
- Model
- Title

Basic filters:

- Price range
- Brand
- Fuel type
- Transmission
- Year

Sorting options:

- Price: Low → High
- Price: High → Low
- Newest listings
- Oldest listings

The exact filter set can be adjusted during Stitch design and implementation based on UI complexity.

---

# 13. Car Details

## Purpose

Display complete information about a vehicle and allow a buyer to purchase it.

### Image Gallery

- Up to 4 images
- Main image
- Thumbnail navigation
- Image counter

Example:

```text
        ┌─────────────────────────────┐
        │                             │
        │         CAR IMAGE           │
        │                             │
        └─────────────────────────────┘

             1 / 4
```

### Vehicle Information

Required information should include:

- Title
- Brand
- Model
- Year
- Price
- Mileage
- Fuel type
- Transmission
- Vehicle description

Additional fields can be included during final schema design.

### Seller Information

Display basic seller information where appropriate.

Do not expose private authentication information.

### Actions

```text
Buy Now
```

Optional:

```text
Contact Seller
```

should only be implemented if a messaging/contact mechanism is actually included in the MVP.

---

# 14. Create Car Listing

## Purpose

Allow users to sell their vehicle through DriveSphere.

### Required Information

At minimum:

- Car title
- Brand
- Model
- Year
- Price
- Mileage
- Fuel type
- Transmission
- Description
- Images

### Image Requirements

- Minimum: 1 image
- Maximum: 4 images
- Supported formats should be validated
- Image size should be validated
- Images uploaded to Cloudinary
- Cloudinary references saved in database

### Listing Flow

```text
Enter Details
      ↓
Upload Images
      ↓
Validate
      ↓
Preview
      ↓
Publish Listing
```

### Validation

Frontend validation should provide immediate feedback.

Backend validation must always be performed as well.

The backend must never trust frontend validation.

---

# 15. Listing Ownership

Each listing must have an owner.

Example relationship:

```text
User
 │
 ├── Car Listing
 ├── Car Listing
 └── Car Listing
```

Users should only be allowed to modify/delete their own listings.

A user must not be able to modify another user's vehicle through manually manipulated API requests.

---

# 16. Listing Lifecycle

Recommended listing states:

```text
DRAFT
ACTIVE
SOLD
INACTIVE
```

### DRAFT

Listing is being created and is not visible in the marketplace.

### ACTIVE

Vehicle is available for purchase.

### SOLD

Vehicle has successfully been purchased.

### INACTIVE

Listing is no longer available.

Only `ACTIVE` listings should be purchasable.

---

# 17. Purchase Flow

## Buyer Flow

```text
Car Details
     │
     ▼
 Buy Now
     │
     ▼
Create Checkout Session
     │
     ▼
Stripe Checkout
     │
     ▼
Payment
     │
     ▼
Stripe Webhook
     │
     ▼
Verify Payment
     │
     ▼
Create / Update Order
     │
     ▼
Mark Car SOLD
     │
     ▼
Generate Invoice
```

### Important

Payment completion should be confirmed server-side through Stripe's webhook system.

The frontend success page alone must not mark an order as paid.

---

# 18. Preventing Double Purchase

A car should only be sold once.

The backend must protect against two users attempting to purchase the same vehicle simultaneously.

Possible implementation:

- Check listing status before creating checkout.
- Re-check status when processing payment/webhook.
- Use database transaction/locking where appropriate.
- Ensure only one successful order can be associated with a listing.

Once an order is confirmed:

```text
Car.status = SOLD
```

Further purchases must be rejected.

---

# 19. Orders

## My Orders

Users can see purchases associated with their account.

Each order should display:

- Order ID
- Car
- Car image
- Purchase date
- Amount
- Payment status
- Order status

Example:

```text
My Orders

┌────────────────────────────────────┐
│ Toyota Camry                       │
│ Order #DS1001                      │
│ Aug 10, 2026                       │
│ $18,500                            │
│ Completed                          │
│                                    │
│          Download Invoice          │
└────────────────────────────────────┘
```

---

# 20. Invoice

After a successful purchase, the user should be able to download an invoice.

Invoice should contain:

- DriveSphere name
- Invoice number
- Order ID
- Purchase date
- Buyer information
- Seller information, where appropriate
- Vehicle information
- Vehicle price
- Payment amount
- Payment status
- Total amount

Invoice generation should happen server-side.

The invoice should not expose unnecessary private information.

---

# 21. Profile

## Profile Screen

The profile screen should provide access to:

- User information
- Edit Profile
- Change Password
- App Theme
- My Orders
- Logout

---

# 22. Edit Profile

Users can edit:

- Username/display name
- Profile icon/avatar

Authentication-sensitive identity fields should remain managed by Clerk where applicable.

The application should avoid maintaining duplicate authentication logic.

---

# 23. Change Password

Password changes should be handled through Clerk.

The application should not store passwords in the DriveSphere database.

---

# 24. App Theme

Users should be able to select:

- Light
- Dark
- System

If the final Stitch design only specifies Light/Dark, System can be deferred.

Theme preference should persist between sessions.

---

# 25. Logout

Logout should:

1. Clear the Clerk session.
2. Return the user to the authentication screen or public home page.
3. Prevent access to protected routes.

---

# 26. Database Model

A conceptual schema:

```text
User/Profile
│
├── id
├── clerk_user_id
├── username
├── avatar_url
├── created_at
└── updated_at


Car
│
├── id
├── seller_id
├── title
├── brand
├── model
├── year
├── price
├── mileage
├── fuel_type
├── transmission
├── description
├── status
├── created_at
└── updated_at


CarImage
│
├── id
├── car_id
├── cloudinary_url
├── cloudinary_public_id
├── display_order
└── created_at


Order
│
├── id
├── buyer_id
├── seller_id
├── car_id
├── amount
├── currency
├── status
├── stripe_payment_id
├── stripe_checkout_session_id
├── created_at
└── updated_at


Invoice
│
├── id
├── order_id
├── invoice_number
├── invoice_url / generated document reference
└── created_at
```

The final database schema should be normalized appropriately during backend implementation.

---

# 27. API Structure

Suggested API structure:

```text
/api/auth/
/api/cars/
/api/cars/<id>/
/api/cars/create/
/api/cars/<id>/update/
/api/cars/<id>/delete/

/api/orders/
/api/orders/<id>/

/api/payments/create-checkout/
/api/payments/webhook/

/api/invoices/
/api/invoices/<id>/download/

/api/dashboard/
```

Exact endpoint naming can be refined during Django implementation.

---

# 28. API Requirements

Every protected API endpoint must verify authentication.

Example:

```text
Request
   ↓
Authenticate Clerk User
   ↓
Resolve Application User
   ↓
Authorize Action
   ↓
Execute Business Logic
   ↓
Return Response
```

Authorization must be implemented server-side.

---

# 29. Security Requirements

The application must:

- Never store passwords directly.
- Validate all backend input.
- Validate uploaded images.
- Restrict listing ownership.
- Protect payment endpoints.
- Verify Stripe webhook signatures.
- Prevent unauthorized order access.
- Prevent users from modifying other users' listings.
- Prevent purchasing inactive/sold cars.
- Keep secret API keys on the backend.
- Use environment variables for secrets.
- Configure CORS correctly.
- Use HTTPS in production.
- Avoid exposing sensitive backend configuration to the frontend.

---

# 30. Environment Variables

### Frontend

Examples:

```text
VITE_CLERK_PUBLISHABLE_KEY
VITE_API_BASE_URL
VITE_STRIPE_PUBLISHABLE_KEY
```

### Backend

Examples:

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

Actual variable names can be finalized during implementation.

Secrets must never be committed to Git.

---

# 31. Responsive Design

DriveSphere must work across:

- Desktop
- Laptop
- Tablet
- Mobile

Important responsive areas:

- Navigation
- Dashboard cards
- Marketplace grid
- Car details
- Image gallery
- Create listing form
- Profile
- Orders
- Payment flow

Mobile should not simply be a compressed desktop UI.

The Stitch designs should define responsive behavior where possible.

---

# 32. UI/UX Principles

The interface should be:

- Clean
- Modern
- Minimal
- Automotive-focused
- Easy to navigate
- Visually consistent
- Responsive
- Accessible

Important UX states must be designed:

### Loading

Show skeleton/loading states when fetching data.

### Empty

Example:

```text
No cars found
Try changing your search or filters.
```

### Error

Provide actionable error messages.

### Success

Clearly confirm:

- Listing published
- Payment completed
- Profile updated
- Invoice available

---

# 33. Stitch Design Requirement

**Stitch is the source of truth for the application's visual design.**

Before implementing each phase's UI:

1. Design the required screens in Stitch.
2. Review layout.
3. Review responsive behavior.
4. Confirm component hierarchy.
5. Implement the approved design in React.
6. Test the implementation against the Stitch design.
7. Fix visual inconsistencies.

Screens requiring Stitch designs include:

- Login
- Sign Up
- Home Dashboard
- Marketplace
- Search/filter states
- Car Details
- Create Listing
- Listing preview
- Payment-related screens
- Order History
- Invoice state
- Profile
- Edit Profile
- Change Password
- Theme Settings
- Logout confirmation
- Loading states
- Empty states
- Error states

---

# 34. Development Methodology

The project must follow a strict:

**Build → Test → Proceed**

workflow.

No phase should be considered complete until its stable build has been tested.

---

# 35. Phase-Based Development

## Phase 0 — Project Setup

### Tasks

- Create repository.
- Initialize React + Vite.
- Configure Tailwind CSS.
- Initialize Django.
- Configure Django REST Framework.
- Configure environment variables.
- Configure Git.
- Establish frontend/backend directory structure.
- Establish development documentation.

### Exit Criteria

- Frontend starts successfully.
- Backend starts successfully.
- Basic API endpoint responds.
- Git repository is working.
- Environment configuration is documented.

### Test

```text
Frontend → PASS
Backend → PASS
```

### Git

Create initial stable commit.

---

# 36. Phase 1 — Stitch Design System & Authentication

### Tasks

- Design authentication screens in Stitch.
- Design application shell.
- Implement Clerk.
- Configure login.
- Configure signup.
- Configure logout.
- Configure protected routes.
- Establish application layout.

### Testing

Frontend:

- Login
- Signup
- Logout
- Protected route behavior
- Responsive UI

Backend:

- Authentication integration
- Authenticated API request

### Exit Criteria

A user can successfully authenticate and enter the application.

### Git

Commit stable build.

---

# 37. Phase 2 — Dashboard

### Tasks

- Design Dashboard in Stitch.
- Build dashboard layout.
- Create dashboard API.
- Implement metrics.
- Implement sales overview.
- Implement loading/error/empty states.

### Metrics

- Earnings
- Cars listed
- Orders

### Testing

Frontend:

- Dashboard rendering
- Responsive behavior
- Loading/error states

Backend:

- Dashboard API
- Authentication
- Correct calculations

### Git

Commit stable build.

---

# 38. Phase 3 — Marketplace

### Tasks

- Design marketplace in Stitch.
- Create Car database model.
- Create car APIs.
- Build marketplace grid.
- Build car cards.
- Add search.
- Add filtering.
- Add sorting.
- Add pagination if required.

### Testing

Frontend:

- Listing rendering
- Search
- Filters
- Sorting
- Empty states
- Mobile layout

Backend:

- CRUD/read APIs
- Authentication
- Filtering
- Authorization
- Validation

### Git

Commit stable build.

---

# 39. Phase 4 — Create Listing

### Tasks

- Design create listing flow in Stitch.
- Build listing form.
- Implement validation.
- Configure Cloudinary.
- Implement image upload.
- Enforce maximum 4 images.
- Create listing API.
- Implement preview.
- Implement publish.

### Testing

Frontend:

- Form validation
- Image selection
- Image limits
- Upload UI
- Preview
- Responsive design

Backend:

- Validation
- Ownership
- Cloudinary references
- Database persistence
- Authorization

### Git

Commit stable build.

---

# 40. Phase 5 — Car Details

### Tasks

- Design car details screen in Stitch.
- Build image gallery.
- Display vehicle details.
- Display seller information.
- Implement Buy Now.
- Handle sold/inactive states.

### Testing

Frontend:

- Image gallery
- Data rendering
- Loading/error states
- Responsive design

Backend:

- Car detail API
- Authorization where required
- Listing status handling

### Git

Commit stable build.

---

# 41. Phase 6 — Stripe Payments

### Tasks

- Design purchase/payment flow in Stitch.
- Configure Stripe.
- Create checkout session API.
- Implement Stripe checkout.
- Implement success/cancel flows.
- Implement Stripe webhook.
- Create order after verified payment.
- Mark car as sold.
- Prevent double purchase.

### Testing

Frontend:

- Buy flow
- Success page
- Cancel flow
- Error states

Backend:

- Checkout session
- Webhook signature
- Payment status
- Order creation
- Sold state
- Duplicate purchase protection

### Critical Requirement

Test Stripe using test mode before production deployment.

### Git

Commit stable build.

---

# 42. Phase 7 — Orders & Invoices

### Tasks

- Design orders screen in Stitch.
- Create orders API.
- Display purchase history.
- Create invoice generation.
- Add invoice download.

### Testing

Frontend:

- Orders list
- Order details
- Download action
- Empty state

Backend:

- Order authorization
- Invoice generation
- Invoice access protection

### Git

Commit stable build.

---

# 43. Phase 8 — Profile & Settings

### Tasks

- Design profile screens in Stitch.
- Implement profile.
- Edit username.
- Edit avatar.
- Change password through Clerk.
- Theme selection.
- My Orders navigation.
- Logout.

### Testing

Frontend:

- Profile editing
- Avatar
- Theme
- Navigation
- Logout

Backend:

- Profile persistence
- Authorization
- Validation

### Git

Commit stable build.

---

# 44. Phase 9 — Integration & Hardening

### Tasks

- Connect all modules.
- Test complete buyer flow.
- Test complete seller flow.
- Fix authorization issues.
- Improve validation.
- Improve loading states.
- Improve error handling.
- Test responsive layouts.
- Test API failures.
- Test payment edge cases.

### Full Buyer Flow

```text
Login
 ↓
Dashboard
 ↓
Marketplace
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
```

### Full Seller Flow

```text
Login
 ↓
Marketplace
 ↓
Add Car
 ↓
Enter Details
 ↓
Upload Images
 ↓
Preview
 ↓
Publish
 ↓
Listing Appears
```

### Git

Commit stable integration build.

---

# 45. Phase 10 — Production Deployment

## Frontend

Deploy to:

**Vercel**

Configure:

- Production environment variables
- Build command
- Output configuration
- API URL
- Clerk production configuration

## Backend

Deploy to:

**Render**

Configure:

- Python environment
- Django production settings
- Database
- Environment variables
- CORS
- Allowed hosts
- Static files
- HTTPS

## External Services

Configure production:

- Clerk
- Supabase
- Stripe
- Cloudinary

---

# 46. Testing Strategy

Testing is mandatory after every development phase.

## Frontend Testing

At minimum:

- Application builds successfully.
- Routes work.
- Components render.
- Forms validate.
- API states work.
- Responsive layouts work.
- Authentication flows work.
- Payment flows work.
- Error states work.

## Backend Testing

At minimum:

- Django server starts.
- API endpoints respond correctly.
- Authentication works.
- Authorization works.
- Database operations work.
- Validation works.
- Payment webhooks work.
- Invoice generation works.

---

# 47. Stable Build Definition

A phase is considered **stable** only when:

```text
Frontend Build       ✓
Backend Build        ✓
Frontend Tests       ✓
Backend Tests        ✓
Integration Test     ✓
Responsive Check     ✓
No Critical Errors   ✓
```

Only after these conditions are satisfied should development proceed to the next phase.

---

# 48. Git Strategy

Git commits are required after every stable build.

Recommended format:

```text
feat: initialize DriveSphere project
feat: add Clerk authentication
feat: build dashboard
feat: add marketplace
feat: add car listing creation
feat: add car details
feat: integrate Stripe payments
feat: add orders and invoices
feat: add profile settings
test: complete integration testing
chore: prepare production deployment
```

Each commit should represent a working/stable state.

Do not commit:

- `.env`
- API secrets
- Stripe secret keys
- Cloudinary API secrets
- Clerk secret keys
- Database passwords
- Temporary/debug files

---

# 49. Definition of Done

DriveSphere MVP is complete when:

### Authentication

- [ ] Sign up works
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes work

### Dashboard

- [ ] Earnings displayed
- [ ] Cars listed displayed
- [ ] Orders displayed
- [ ] Sales overview displayed

### Marketplace

- [ ] Cars displayed
- [ ] Search works
- [ ] Filters work
- [ ] Sorting works
- [ ] Car details accessible

### Listings

- [ ] User can create listing
- [ ] Required fields validated
- [ ] Up to 4 images supported
- [ ] Cloudinary upload works
- [ ] Listing published successfully
- [ ] Listing ownership enforced

### Payments

- [ ] Stripe checkout works
- [ ] Payment status verified server-side
- [ ] Webhook works
- [ ] Order created
- [ ] Car marked SOLD
- [ ] Duplicate purchase prevented

### Orders

- [ ] Orders displayed
- [ ] Order information correct
- [ ] Invoice generated
- [ ] Invoice downloadable

### Profile

- [ ] Username editable
- [ ] Avatar editable
- [ ] Password change works through Clerk
- [ ] Theme setting works
- [ ] Orders accessible
- [ ] Logout works

### Quality

- [ ] All screens designed in Stitch
- [ ] All screens implemented
- [ ] Frontend tested
- [ ] Backend tested
- [ ] Integration tested
- [ ] Mobile tested
- [ ] Production environment configured
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render

---

# 50. Future Roadmap

Potential post-MVP features:

## V2

- Favorites/wishlist
- Saved searches
- Seller ratings
- Reviews
- Advanced filters
- Seller dashboard
- Listing management
- Edit/delete listings
- Better sales analytics

## V3

- Buyer/seller messaging
- Notifications
- Email notifications
- Price alerts
- Vehicle recommendations
- Dealer accounts
- Verification system

## V4

- Financing
- Insurance
- Vehicle inspection
- Delivery tracking
- Mobile application

---

# 51. Final Product Structure

The final DriveSphere application should conceptually contain:

```text
DriveSphere
│
├── Authentication
│   ├── Login
│   └── Sign Up
│
├── Home
│   └── Dashboard
│       ├── Earnings
│       ├── Cars Listed
│       ├── Orders
│       └── Sales Overview
│
├── Marketplace
│   ├── Search
│   ├── Filters
│   ├── Sort
│   ├── Car Grid
│   ├── Car Details
│   └── Create Listing
│
├── Purchase
│   ├── Buy Now
│   ├── Stripe Checkout
│   ├── Success
│   └── Payment Failure/Cancel
│
├── Orders
│   ├── My Orders
│   └── Download Invoice
│
└── Profile
    ├── Edit Profile
    ├── Change Password
    ├── App Theme
    ├── My Orders
    └── Logout
```

---

# 52. Product Success Criteria

The MVP should provide a complete, reliable loop:

**User → Authenticate → Discover → View → List → Buy → Pay → Order → Invoice → Manage Profile**

The most important technical principle is that the frontend, backend, database, authentication, image storage, and payments should operate as one coherent system rather than as isolated features.

Every development phase must follow:

**Stitch Design → Build → Test Frontend → Test Backend → Integration Test → Stable Build → Git Commit → Next Phase**
