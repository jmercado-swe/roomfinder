# RoomFinder Architecture & Design Plan

## Pages (MVP)

| Route | Page |
|---|---|
| `/` | Home: browse and filter rooms |
| `/login`, `/signup` | Log in and sign up |
| `/rooms/[id]` | Room details + send inquiry |
| `/rooms/new` | Create a listing |
| `/rooms/[id]/edit` | Edit own listing |
| `/profile` | My listings and inquiries |

## Reusable Components

- `Header` (logo + nav + login/logout)
- `Footer`
- `RoomCard` (used on Home and Profile)
- `FilterBar` (price and location filters)
- `RoomForm` (used by create and edit)
- `InquiryForm`
- `Button`

Hierarchy:

```
RootLayout
├── Header
├── Page
│   ├── Home → FilterBar, RoomCard[]
│   ├── Room Details → InquiryForm
│   ├── New / Edit Room → RoomForm
│   └── Profile → RoomCard[], inquiry list
└── Footer
```

Week 04 priority: data models, auth, Home with RoomCard + FilterBar.

## Data Model (PostgreSQL)

**User**
- id (uuid, primary key)
- name (text)
- email (text, unique)
- password_hash (text)
- created_at (timestamp)

**Room**
- id (uuid, primary key)
- owner_id (uuid → User.id)
- title (text)
- description (text)
- price (integer, ₱ per month)
- location (text, city/province)
- image_url (text, optional)
- created_at (timestamp)

**Inquiry**
- id (uuid, primary key)
- room_id (uuid → Room.id)
- sender_id (uuid → User.id)
- message (text)
- created_at (timestamp)

Relationships:

```
User 1 ──── * Room       (one user owns many rooms)
User 1 ──── * Inquiry    (one user sends many inquiries)
Room 1 ──── * Inquiry    (one room gets many inquiries)
```

## Design

**Colors (Tailwind)**
- Primary: `teal-700` (#0f766e) for buttons, links, header
- Accent: `amber-500` (#f59e0b) for price tags
- Background: `slate-50` (#f8fafc)
- Text: `slate-900` (#0f172a), muted `slate-600`

**Typography**
- Font: Inter (via `next/font/google`)
- Headings: `text-3xl font-bold` (h1), `text-xl font-semibold` (h2)
- Body: `text-base`

**Layout & Spacing**
- Page container: `max-w-5xl mx-auto px-4`
- Section spacing: `py-8`, gaps: `gap-4`
- Room cards: 1 column on mobile, `md:grid-cols-2`, `lg:grid-cols-3`
- Cards: `rounded-lg border shadow-sm p-4`
- No extra UI library; plain Tailwind utility classes
