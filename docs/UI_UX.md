# DriveSphere — UI/UX Specification

**Project:** DriveSphere **Document:** `UI_UX.md` **Version:** 1.0 **Status:** Design & Development Specification **UI Design Tool:** Stitch **Frontend:** React + Vite + Tailwind CSS

---

# 1. Design Vision

DriveSphere is a modern car marketplace designed around a simple principle:

> **Make buying and selling a car feel simple, trustworthy, and premium.**

The interface should feel:

- Modern
- Clean
- Premium
- Automotive
- Trustworthy
- Minimal
- Fast
- Easy to understand

The UI should avoid unnecessary decoration, excessive gradients, complicated navigation, and crowded dashboards.

The product should feel like a **modern automotive marketplace**, not a generic CRUD application.

---

# 2. Design Source of Truth

**Stitch is mandatory for all DriveSphere screens.**

No application screen should be implemented without a corresponding Stitch design.

The workflow is:

```text
Requirement
    ↓
Stitch Design
    ↓
Design Review
    ↓
React Implementation
    ↓
Visual Comparison
    ↓
Fix Differences
    ↓
Frontend Test
    ↓
Backend Test
    ↓
Stable Build
    ↓
Git Commit
```

Stitch should be used for:

- Page layouts
- Responsive layouts
- Components
- Forms
- Cards
- Navigation
- Empty states
- Loading states
- Error states
- Modals
- Confirmation dialogs
- Theme designs

---

# 3. Design Principles

## 3.1 Clarity First

Every screen should have one obvious primary action.

Example:

Marketplace:

```text
Browse Cars
        ↓
View Car
        ↓
Buy Now
```

Create Listing:

```text
Add Car
   ↓
Fill Details
   ↓
Upload Images
   ↓
Publish
```

---

## 3.2 Visual Hierarchy

Use hierarchy to make important information immediately visible.

For a car card:

```text
CAR IMAGE
──────────────
Toyota Camry
$18,500

2022  •  42,000 km  •  Petrol
```

The price and vehicle name should receive stronger visual emphasis than secondary metadata.

---

## 3.3 Minimal Interaction

Avoid unnecessary clicks.

A user should be able to:

- Search a car quickly.
- Open details quickly.
- Start selling quickly.
- Purchase quickly.
- Access orders quickly.

---

## 3.4 Consistency

Buttons, inputs, cards, typography, spacing, icons, and states must behave consistently throughout the application.

---

## 3.5 Trust

Because DriveSphere involves high-value transactions, the UI should communicate trust through:

- Clear pricing
- Clear vehicle information
- Seller information
- Secure payment messaging
- Order confirmation
- Invoice availability
- Consistent status indicators

Do not use fake ratings, fake reviews, fake verification badges, or fabricated trust signals.

---

# 4. Brand Direction

## Product Name

**DriveSphere**

## Brand Personality

- Confident
- Modern
- Technical
- Reliable
- Automotive
- Premium but accessible

## Suggested Brand Message

**Buy. Sell. Drive Better.**

This can be used in branding/marketing areas, but should not dominate the application interface.

---

# 5. Color System

The primary visual direction should use a **light neutral interface with blue as the primary action color**.

## Primary

```text
Primary Blue
Used for:
- Primary buttons
- Links
- Active navigation
- Focus states
- Important indicators
```

Suggested:

```text
#2563EB
```

---

## Primary Dark

```text
#1D4ED8
```

Used for:

- Hover states
- Active button states
- Strong emphasis

---

## Background

Main application background:

```text
#F8FAFC
```

Cards:

```text
#FFFFFF
```

---

## Text

Primary:

```text
#0F172A
```

Secondary:

```text
#475569
```

Muted:

```text
#94A3B8
```

---

## Borders

```text
#E2E8F0
```

Use subtle borders rather than heavy outlines.

---

## Semantic Colors

### Success

Used for:

- Successful payment
- Completed orders
- Active listings where appropriate

```text
#16A34A
```

### Warning

Used for:

- Pending status
- Warnings

```text
#F59E0B
```

### Error

Used for:

- Failed payment
- Validation errors
- Destructive actions

```text
#DC2626
```

---

# 6. Dark Mode

DriveSphere should support a dark theme.

Dark mode should use:

```text
Background:
#0F172A

Surface:
#1E293B

Secondary Surface:
#334155

Primary Text:
#F8FAFC

Secondary Text:
#CBD5E1

Border:
#334155
```

The exact colors should be refined through Stitch.

Dark mode should not simply invert the light theme.

---

# 7. Typography

Use a modern sans-serif typeface.

Recommended:

**Inter**

Fallback:

```text
system-ui
-apple-system
BlinkMacSystemFont
"Segoe UI"
sans-serif
```

---

# 8. Typography Scale

## Display

Used for major dashboard/page headings.

```text
32–40px
Weight: 700
```

## H1

```text
28–32px
Weight: 700
```

## H2

```text
22–24px
Weight: 600–700
```

## H3

```text
18–20px
Weight: 600
```

## Body

```text
14–16px
Weight: 400
```

## Small

```text
12–14px
```

---

# 9. Spacing System

Use a consistent spacing scale.

Preferred base unit:

```text
4px
```

Common values:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Avoid arbitrary spacing values unless required by the Stitch design.

---

# 10. Border Radius

Use moderately rounded components.

### Small

```text
6px
```

### Inputs

```text
8px
```

### Cards

```text
12px
```

### Large surfaces

```text
16px
```

Buttons should generally use:

```text
8px
```

The final values should follow Stitch.

---

# 11. Shadows

Use shadows sparingly.

Preferred approach:

- Cards → subtle shadow or border
- Modals → stronger shadow
- Dropdowns → subtle elevation
- Buttons → generally no heavy shadow

The design should remain clean and flat.

---

# 12. Application Layout

Desktop layout:

```text
┌─────────────────────────────────────────────────────────────┐
│                         DriveSphere                         │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│ Home         │                                              │
│ Marketplace  │              Main Content                    │
│ Add Car      │                                              │
│              │                                              │
│              │                                              │
│ Profile      │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

Recommended desktop structure:

```text
Sidebar
+
Main Content
```

Mobile:

```text
┌──────────────────────────┐
│ DriveSphere       ☰     │
├──────────────────────────┤
│                          │
│       Main Content       │
│                          │
│                          │
├──────────────────────────┤
│ Home Market Add Profile │
└──────────────────────────┘
```

The exact mobile navigation should be defined in Stitch.

---

# 13. Navigation

Primary navigation:

- Home
- Marketplace
- Add Car
- Profile

Active navigation should be visually obvious.

Example:

```text
▣ Home
▣ Marketplace
＋ Add Car
◉ Profile
```

Icons should remain secondary to labels.

---

# 14. Global Header

Desktop header can contain:

```text
DriveSphere

Search / page context

Notifications (future)
Profile
```

The MVP should avoid unnecessary header elements.

---

# 15. Authentication UI

Authentication is powered by Clerk.

## Login Screen

The Stitch design should provide a branded authentication experience.

Structure:

```text
          DriveSphere

      Welcome Back

  Continue with Google

  Continue with Apple

  ─────── or ───────

  Email

  Password

  [ Sign In ]

  Don't have an account?
  Create account
```

Authentication errors should be clear and concise.

---

# 16. Signup Screen

Structure:

```text
          DriveSphere

       Create Account

       Name

       Email

       Password

       Confirm Password

       [ Create Account ]

       Already have an account?
       Sign In
```

Clerk remains responsible for authentication logic.

---

# 17. Dashboard UX

## Page Header

```text
Good morning, Sathtik

Here's what's happening with your marketplace.
```

Avoid making the greeting occupy too much screen space.

---

## Metric Cards

Three primary cards:

```text
┌─────────────────┐
│ Total Earnings  │
│                 │
│ $12,450         │
│ +12.5%          │
└─────────────────┘

┌─────────────────┐
│ Cars Listed     │
│                 │
│ 8               │
└─────────────────┘

┌─────────────────┐
│ Orders          │
│                 │
│ 5               │
└─────────────────┘
```

Numbers should be visually dominant.

---

# 18. Sales Chart

Use a simple line/area chart.

Requirements:

- Clear labels
- No excessive decoration
- Responsive
- Tooltip on hover
- Time filter

Example:

```text
Sales Overview

[ Week ] [ Month ] [ Year ]

$20k ┤                   ╭──
     │              ╭────╯
$10k ┤        ╭─────╯
     │   ╭────╯
 $0  └────────────────────────
       Mon Tue Wed Thu Fri
```

---

# 19. Dashboard Empty State

If there are no sales:

```text
No sales yet

Once you start selling cars,
your sales activity will appear here.

[ Browse Marketplace ]
```

Do not show an empty chart with meaningless data.

---

# 20. Marketplace UX

## Page Header

```text
Marketplace

Find your next car.

                         [+ Add Car]
```

---

## Search

Search bar:

```text
🔍 Search by brand, model or car name
```

Search should be prominent.

---

## Filter Controls

Desktop:

```text
Search

Brand       Price       Year       Fuel       Transmission
```

Mobile:

```text
Search

[ Filters ]
```

Opening filters should use a drawer/modal.

---

# 21. Marketplace Grid

Desktop:

```text
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│     IMAGE     │ │     IMAGE     │ │     IMAGE     │
│               │ │               │ │               │
├───────────────┤ ├───────────────┤ ├───────────────┤
│ Toyota Camry  │ │ BMW X5        │ │ Honda Civic   │
│ $18,500       │ │ $45,000       │ │ $22,000       │
│ 2022 • 42k km │ │ 2023 • 28k km │ │ 2021 • 35k km │
└───────────────┘ └───────────────┘ └───────────────┘
```

The number of columns should adapt based on viewport width.

---

# 22. Car Card

Every car card should contain:

- Image
- Title
- Price
- Year
- Mileage
- Fuel type
- Optional transmission
- Status if applicable

Primary interaction:

```text
Click card → Car Details
```

Avoid putting too many buttons inside every card.

---

# 23. Marketplace Loading State

Use skeleton cards:

```text
┌───────────────┐
│ ████████████  │
│ ████████████  │
├───────────────┤
│ █████████     │
│ ██████        │
│ ████████      │
└───────────────┘
```

Skeleton dimensions should match the final card.

---

# 24. Marketplace Empty State

```text
No cars found

Try changing your search or filters.

[ Clear Filters ]
```

---

# 25. Car Details UX

Layout:

```text
┌───────────────────────┬──────────────────────────┐
│                       │ Toyota Camry             │
│                       │                          │
│     MAIN IMAGE        │ $18,500                  │
│                       │                          │
│                       │ 2022 • 42,000 km         │
│                       │ Petrol • Automatic       │
│                       │                          │
│                       │ [ Buy Now ]              │
│                       │                          │
└───────────────────────┴──────────────────────────┘

Vehicle Description

Seller Information
```

---

# 26. Image Gallery

Maximum:

**4 images**

Desktop:

```text
┌───────────────────────────────┐
│                               │
│          MAIN IMAGE           │
│                               │
└───────────────────────────────┘

[IMG 1] [IMG 2] [IMG 3] [IMG 4]
```

Mobile:

```text
┌─────────────────────┐
│                     │
│      MAIN IMAGE     │
│                     │
│        1 / 4        │
└─────────────────────┘
```

Use arrows/swipe where appropriate.

---

# 27. Vehicle Information

Use a structured specification grid.

```text
Brand          Toyota
Model          Camry
Year           2022
Mileage        42,000 km
Fuel           Petrol
Transmission   Automatic
```

This is easier to scan than a large paragraph.

---

# 28. Price Display

Price should be one of the most prominent elements on the details page.

Example:

```text
$18,500
```

Avoid ambiguous formatting.

Currency should be consistent across the application.

---

# 29. Seller Information

Show only relevant public information.

Example:

```text
Seller

[Avatar]

Alex Kumar
Member since 2026
```

Do not display:

- Password information
- Authentication IDs
- Private email unless intentionally exposed
- Private account data

---

# 30. Create Listing UX

The listing flow should feel like a guided form rather than a huge single-page form.

Preferred structure:

```text
1. Vehicle Details
       ↓
2. Pricing
       ↓
3. Images
       ↓
4. Description
       ↓
5. Preview
       ↓
6. Publish
```

If implemented as a single page, use visually separated sections.

---

# 31. Create Listing Form

## Section 1 — Vehicle

```text
Car Title
Brand
Model
Year
```

## Section 2 — Specifications

```text
Mileage
Fuel Type
Transmission
```

## Section 3 — Price

```text
Price
```

## Section 4 — Description

```text
Description
```

## Section 5 — Images

```text
Upload vehicle images

[ + ]

Maximum 4 images
```

---

# 32. Image Upload UX

Before upload:

```text
┌────────────────────────────┐
│                            │
│       Upload Images        │
│                            │
│       + Add Images         │
│                            │
│       Maximum 4            │
│                            │
└────────────────────────────┘
```

After upload:

```text
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ IMAGE  │ │ IMAGE  │ │ IMAGE  │ │ IMAGE  │
│   ×    │ │   ×    │ │   ×    │ │   ×    │
└────────┘ └────────┘ └────────┘ └────────┘
```

Show upload progress where appropriate.

---

# 33. Image Validation

The UI should clearly communicate:

- Maximum 4 images
- Supported file types
- Maximum file size
- Upload status

Invalid files should generate an inline error.

Example:

```text
You can upload a maximum of 4 images.
```

---

# 34. Listing Preview

Before publishing, users should see how their listing will appear.

```text
Preview

[ CAR IMAGE ]

Toyota Camry

$18,500

2022 • 42,000 km • Petrol

Description...

[ Back to Edit ]    [ Publish Listing ]
```

This reduces accidental publishing errors.

---

# 35. Publish Success

After successful publication:

```text
✓ Listing Published

Your Toyota Camry is now available
in the DriveSphere marketplace.

[ View Listing ]

[ Back to Marketplace ]
```

---

# 36. Payment UX

The purchase action should clearly communicate:

```text
Toyota Camry
$18,500

Secure checkout powered by Stripe

[ Buy Now ]
```

The application should avoid collecting card details directly unless required by the chosen Stripe integration.

---

# 37. Payment Loading

When creating checkout:

```text
Preparing secure checkout...

Please wait.
```

Prevent multiple checkout requests from repeated clicks.

---

# 38. Payment Success

```text
✓ Payment Successful

Your purchase has been confirmed.

Toyota Camry
$18,500

Order #DS1001

[ View Order ]
[ Download Invoice ]
```

---

# 39. Payment Failure

```text
Payment unsuccessful

Your payment could not be completed.

Your card has not been charged, or the
payment status is still being confirmed.

[ Try Again ]
[ Back to Car ]
```

The exact message should depend on the verified Stripe payment state.

---

# 40. Payment Cancelled

```text
Checkout Cancelled

No purchase was completed.

[ Return to Car ]
```

---

# 41. Sold Vehicle State

A sold car should clearly communicate that it is unavailable.

Example:

```text
SOLD

Toyota Camry
$18,500
```

The:

```text
Buy Now
```

button must not be displayed as an active purchase action.

---

# 42. Orders UX

## Page

```text
My Orders

┌─────────────────────────────────────────┐
│ [IMAGE]  Toyota Camry                   │
│          Order #DS1001                  │
│          Aug 10, 2026                   │
│          $18,500                        │
│                                         │
│          Completed                      │
│          [ Download Invoice ]           │
└─────────────────────────────────────────┘
```

---

# 43. Order Status

Recommended statuses:

```text
Pending
Paid
Completed
Failed
Cancelled
```

Status should use both:

- Text
- Visual styling

Do not communicate status through color alone.

---

# 44. Invoice Download

Use a clear action:

```text
↓ Download Invoice
```

After clicking:

- Show loading state.
- Start download after authorization.
- Show error if generation/download fails.

---

# 45. Profile UX

Profile page:

```text
┌─────────────────────────────────────┐
│ [Avatar]                            │
│ Alex Kumar                          │
│ alex@example.com                    │
└─────────────────────────────────────┘

Account

> Edit Profile
> Change Password

Preferences

> App Theme

Activity

> My Orders

Account

> Log Out
```

---

# 46. Edit Profile

```text
Edit Profile

[ Avatar ]

Username
[ Alex Kumar              ]

[ Save Changes ]
```

Use inline success/error feedback.

---

# 47. Avatar Upload

Avatar should provide:

- Current avatar
- Upload/change action
- Preview
- Validation
- Remove/change option if supported

Car image limits should not automatically apply to avatars.

---

# 48. Change Password

Password management should remain handled by Clerk.

UI should clearly communicate the security action.

Example:

```text
Change Password

Current Password
New Password
Confirm Password

[ Update Password ]
```

If Clerk's hosted/security UI is used instead, Stitch should design the surrounding navigation and transition experience.

---

# 49. Theme Settings

```text
Appearance

○ Light
○ Dark
○ System
```

Changing theme should update the application without requiring a page reload where practical.

Persist the user's preference.

---

# 50. Logout Confirmation

Use a confirmation dialog.

```text
Log out?

Are you sure you want to log out?

[ Cancel ]      [ Log Out ]
```

The destructive action should be visually distinguishable.

---

# 51. Buttons

## Primary

Used for the main action.

Examples:

```text
Buy Now
Add Car
Publish Listing
Save Changes
```

## Secondary

Used for supporting actions.

Examples:

```text
Cancel
Back
View Details
```

## Destructive

Used for actions such as:

```text
Delete
Log Out
```

---

# 52. Button States

Every important button should support:

```text
Default
Hover
Focus
Active
Disabled
Loading
```

Loading example:

```text
[ ◌ Publishing... ]
```

The button should be disabled while the operation is in progress.

---

# 53. Form Inputs

Inputs should include:

- Label
- Input
- Optional helper text
- Validation state
- Error message

Example:

```text
Price

[ $18,500 ]

Enter the asking price.

✓ Valid
```

Error:

```text
Price

[ -500 ]

Price must be greater than zero.
```

---

# 54. Accessibility

DriveSphere should target WCAG-oriented accessibility practices.

Requirements:

- Sufficient color contrast
- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Accessible buttons
- Alt text for meaningful images
- Do not rely only on color
- Form errors associated with fields
- Modal focus management

---

# 55. Responsive Breakpoints

Use Tailwind's responsive system.

Conceptually:

```text
Mobile
< 640px

Tablet
640px – 1023px

Desktop
≥ 1024px
```

Exact layout behavior should be defined through Stitch.

---

# 56. Mobile Marketplace

Mobile card layout should prioritize:

```text
Image
Title
Price
Core specifications
```

Filters should become a drawer.

Example:

```text
Marketplace

[ Search cars... ]

[ Filters ]

┌────────────────────────┐
│        CAR IMAGE       │
├────────────────────────┤
│ Toyota Camry           │
│ $18,500                │
│ 2022 • 42k km          │
└────────────────────────┘
```

---

# 57. Mobile Create Listing

The form should use the full available width.

Sticky bottom action can be considered:

```text
┌──────────────────────────┐
│       Publish Listing    │
└──────────────────────────┘
```

Only use sticky actions if they do not obscure form content.

---

# 58. Mobile Car Details

Order:

```text
Images
 ↓
Title
 ↓
Price
 ↓
Specifications
 ↓
Description
 ↓
Seller
 ↓
Buy Now
```

The purchase action should remain easy to access.

---

# 59. Loading States

Every asynchronous screen needs a loading state.

Required areas:

- Authentication
- Dashboard
- Marketplace
- Car details
- Listing creation
- Image uploads
- Checkout creation
- Orders
- Invoice download
- Profile update

Prefer skeletons for content-heavy screens.

Use spinners for short actions.

---

# 60. Error States

Errors should explain:

1. What happened.
2. What the user can do next.

Bad:

```text
Error 500
```

Better:

```text
Unable to load cars

Something went wrong while loading the marketplace.

[ Try Again ]
```

---

# 61. Toast Notifications

Use toasts for lightweight confirmations.

Examples:

```text
✓ Profile updated

✓ Listing published

✓ Theme changed
```

Do not use toasts as the only way to communicate critical payment/order information.

Critical transaction states should have dedicated screens or persistent UI.

---

# 62. Modals

Use modals for:

- Logout confirmation
- Delete confirmation if deletion is added
- Filter drawer on mobile where appropriate
- Important confirmations

Avoid putting large forms inside small modal windows.

---

# 63. Iconography

Use one consistent icon library.

Recommended:

**Lucide React**

Icons should:

- Have consistent stroke weight.
- Have consistent sizing.
- Support accessible labels when needed.
- Never replace essential text.

Typical sizes:

```text
16px — inline
20px — buttons
24px — navigation
```

---

# 64. Image Guidelines

Car images are a major part of the marketplace.

Requirements:

- Maintain aspect ratio.
- Avoid stretched images.
- Use `object-cover` for listing cards where appropriate.
- Use appropriate focal positioning.
- Lazy-load marketplace images where practical.
- Provide alt text.
- Use Cloudinary transformations for optimized delivery.

---

# 65. Content Guidelines

Use concise, informative copy.

Prefer:

```text
Add Your Car
```

over:

```text
Click Here to Add Your New Vehicle Listing
```

Prefer:

```text
No cars found
```

over:

```text
Unfortunately, there are currently no vehicles available matching your requested criteria.
```

---

# 66. Status Language

Use consistent terminology.

### Listing

```text
Draft
Active
Sold
Inactive
```

### Order

```text
Pending
Paid
Completed
Failed
Cancelled
```

Do not use different terminology for the same state on different screens.

---

# 67. Design Components

The Stitch design system should define reusable components for:

```text
Button
Input
Select
Textarea
SearchBar
Filter
Dropdown
Modal
Toast
Card
CarCard
StatCard
StatusBadge
Avatar
ImageGallery
Pagination
Skeleton
EmptyState
ErrorState
LoadingState
Sidebar
Header
MobileNavigation
```

---

# 68. Component Reusability

The React implementation should mirror the design system.

Avoid creating multiple visually different versions of the same component without a clear requirement.

Example:

```text
Button
├── Primary
├── Secondary
├── Destructive
└── Ghost
```

Rather than:

```text
BuyButton
SaveButton
PublishButton
SubmitButton
```

with duplicated styling.

---

# 69. Dashboard Component Structure

Suggested:

```text
Dashboard
├── PageHeader
├── StatsGrid
│   ├── EarningsCard
│   ├── CarsListedCard
│   └── OrdersCard
├── SalesOverview
└── RecentActivity
```

`RecentActivity` can remain optional for MVP.

---

# 70. Marketplace Component Structure

```text
Marketplace
├── PageHeader
├── SearchBar
├── FilterBar
├── SortControl
├── CarGrid
│   └── CarCard
├── LoadingState
├── EmptyState
└── Pagination
```

---

# 71. Create Listing Component Structure

```text
CreateListing
├── PageHeader
├── VehicleInformation
├── VehicleSpecifications
├── Pricing
├── Description
├── ImageUploader
├── ListingPreview
└── FormActions
```

---

# 72. Profile Component Structure

```text
Profile
├── ProfileHeader
├── AccountSettings
│   ├── EditProfile
│   └── ChangePassword
├── Preferences
│   └── ThemeSettings
├── Activity
│   └── MyOrders
└── AccountActions
    └── Logout
```

---

# 73. UX Security Principles

The interface must never imply that an action succeeded before the backend confirms it.

For example:

Do not show:

```text
Payment Successful
```

simply because the user returned to the success URL.

The application should display transaction status based on verified backend/payment state.

Similarly:

Do not show:

```text
Listing Published
```

until the listing API confirms successful creation.

---

# 74. UX for Slow Networks

The application should remain usable on slower connections.

Use:

- Skeletons
- Progressive image loading
- Disabled submit buttons during requests
- Clear loading indicators
- Retry actions
- Avoid unnecessary API calls

---

# 75. UX for API Failures

If the backend becomes unavailable:

```text
We're having trouble connecting to DriveSphere.

Please try again.

[ Retry ]
```

Do not expose:

- Stack traces
- Django exceptions
- Database errors
- API keys
- Internal IDs

---

# 76. UX for Cloudinary Failures

If an image upload fails:

```text
Image upload failed

We couldn't upload this image.

[ Try Again ]
```

Previously uploaded images should remain intact where possible.

---

# 77. UX for Stripe Failures

Payment failures should clearly distinguish:

```text
Payment Failed
```

from:

```text
Payment Pending
```

and:

```text
Payment Cancelled
```

Never tell the user that payment failed if the actual Stripe state is still uncertain.

---

# 78. UX for Sold Cars

If a car becomes sold while another user is viewing it:

The Buy action should gracefully fail/recheck availability.

Example:

```text
This car is no longer available.

It may have just been purchased by another user.

[ Back to Marketplace ]
```

---

# 79. Empty States

Every major collection requires an intentional empty state.

### Marketplace

```text
No cars found
```

### Orders

```text
No orders yet

Cars you purchase will appear here.
```

### Dashboard

```text
No sales yet
```

### Listings

If a dedicated listing management screen is later added:

```text
You haven't listed any cars yet.

[ Add Your First Car ]
```

---

# 80. Design QA

After implementing every Stitch screen, compare:

### Layout

- Width
- Height
- Alignment
- Spacing
- Grid
- Positioning

### Typography

- Font
- Size
- Weight
- Line height
- Letter spacing

### Components

- Buttons
- Inputs
- Cards
- Icons
- Badges

### Responsive

- Mobile
- Tablet
- Desktop

### States

- Loading
- Empty
- Error
- Success
- Disabled

---

# 81. UI/UX Development Rule

Every phase follows:

```text
STITCH
  ↓
DESIGN REVIEW
  ↓
BUILD
  ↓
FRONTEND TEST
  ↓
BACKEND TEST
  ↓
INTEGRATION TEST
  ↓
UI QA
  ↓
STABLE BUILD
  ↓
GIT COMMIT
  ↓
NEXT PHASE
```

Never skip testing because the UI "looks correct."

---

# 82. Phase-to-Screen Mapping

## Phase 0

```text
App Shell
Loading Screen
Error Foundation
```

## Phase 1

```text
Login
Signup
Application Shell
Protected Route States
```

## Phase 2

```text
Dashboard
Dashboard Loading
Dashboard Empty
Dashboard Error
```

## Phase 3

```text
Marketplace
Search
Filters
Car Cards
Marketplace Loading
Marketplace Empty
Marketplace Error
```

## Phase 4

```text
Create Listing
Image Upload
Listing Preview
Publish Success
Validation Errors
Upload Errors
```

## Phase 5

```text
Car Details
Image Gallery
Sold State
Unavailable State
```

## Phase 6

```text
Checkout Preparation
Payment Success
Payment Failed
Payment Cancelled
Payment Pending
```

## Phase 7

```text
My Orders
Order Details
Invoice Download
No Orders
Invoice Error
```

## Phase 8

```text
Profile
Edit Profile
Change Password
Theme Settings
Logout Confirmation
```

---

# 83. Final Screen Inventory

The complete MVP should have Stitch designs for at least:

### Authentication

- [ ] Login
- [ ] Signup

### Application

- [ ] Dashboard
- [ ] Dashboard loading
- [ ] Dashboard empty
- [ ] Dashboard error

### Marketplace

- [ ] Marketplace
- [ ] Search state
- [ ] Filter state
- [ ] Empty state
- [ ] Loading state
- [ ] Error state

### Cars

- [ ] Car Details
- [ ] Image Gallery
- [ ] Sold Car
- [ ] Unavailable Car

### Selling

- [ ] Create Listing
- [ ] Image Upload
- [ ] Listing Preview
- [ ] Validation Errors
- [ ] Publish Success

### Payments

- [ ] Checkout Preparation
- [ ] Payment Success
- [ ] Payment Failed
- [ ] Payment Cancelled
- [ ] Payment Pending

### Orders

- [ ] My Orders
- [ ] Order Details
- [ ] Invoice Download
- [ ] No Orders

### Profile

- [ ] Profile
- [ ] Edit Profile
- [ ] Change Password
- [ ] Theme Settings
- [ ] Logout Confirmation

---

# 84. Final UI/UX Quality Bar

DriveSphere should feel like a cohesive product from the first screen to the invoice download.

The experience should follow:

```text
Simple
   ↓
Clear
   ↓
Trustworthy
   ↓
Fast
   ↓
Consistent
   ↓
Premium
```

The user should never have to wonder:

- Where am I?
- What can I do here?
- What happens when I click this?
- Did my payment work?
- Is my listing published?
- Where is my order?
- Where is my invoice?

Every major action should have an obvious next step and an explicit success/failure state.

---

# 85. UI/UX Definition of Done

A screen is considered UI/UX complete only when:

- [ ] Stitch design exists.
- [ ] Desktop layout exists.
- [ ] Mobile layout exists.
- [ ] Typography is defined.
- [ ] Spacing is defined.
- [ ] Interactive states are defined.
- [ ] Loading state is defined.
- [ ] Empty state is defined where applicable.
- [ ] Error state is defined where applicable.
- [ ] Accessibility has been considered.
- [ ] React implementation matches Stitch.
- [ ] Frontend build passes.
- [ ] Backend integration passes.
- [ ] Responsive test passes.
- [ ] No critical visual defects remain.
- [ ] Stable Git commit created.

---

# 86. Core UX Principle

**Every feature should be designed in Stitch before it is built in React.**

**Every feature should be tested on both frontend and backend before the project proceeds.**

**Every stable phase must be committed to Git before beginning the next phase.**

DriveSphere's design system, screens, interactions, and states should evolve from this document while keeping Stitch as the visual source of truth.
