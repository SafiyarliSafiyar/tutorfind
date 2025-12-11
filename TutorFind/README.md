# TutorFind Frontend

React + Vite + Tailwind SPA for TutorFind, a local tutor discovery platform with separate Tutor and Learner experiences, booking flows, and dashboards. The frontend is API-driven and expects a separate backend and database.

## Tech Stack
- React 18 with Vite
- React Router v6
- Tailwind CSS (via PostCSS)
- State: local React state + lightweight `AuthContext` for mock auth/persistence
- No image upload/avatars in use

## Project Structure
```
frontend/
├─ index.html              # Vite entry
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ src/
│  ├─ main.jsx             # App bootstrap with RouterProvider + AuthProvider
│  ├─ router.jsx           # Route definitions
│  ├─ App.jsx              # Root wrapper (MainLayout)
│  ├─ context/
│  │   └─ AuthContext.jsx  # Mock auth (name/email/role) persisted in localStorage
│  ├─ layouts/
│  │   └─ MainLayout.jsx   # Shell layout (header + outlet)
│  ├─ components/
│  │   ├─ Header.jsx       # Navbar with user dropdown, role-aware links
│  │   └─ TutorCard.jsx    # Tutor search result card (no photo)
│  ├─ pages/
│  │   ├─ Home.jsx             # Simple landing CTA to search
│  │   ├─ SearchResults.jsx    # Filters: city, district, subject, price, rating, weekdays; sort by rating/price
│  │   ├─ TutorProfile.jsx     # Tutor details, monthly rate, phone, availability, learner booking modal
│  │   ├─ TutorDashboard.jsx   # Tutor bookings inbox with status filters + accepted-slot filter
│  │   ├─ LearnerDashboard.jsx # Learner sessions (booked/waiting) with filters
│  │   ├─ ProfileSettings.jsx  # Role-aware profile form (tutor: monthly payment, bio, subjects, quals, phone; learner: basic info)
│  │   ├─ Availability.jsx     # Tutor recurring slots (add/delete)
│  │   └─ auth/
│  │       ├─ Login.jsx        # Login (role baked as tutor), demo buttons (tutor/learner), forgot password stub
│  │       └─ Signup.jsx       # Signup (first/last name, email, password/confirm, role cards)
│  └─ styles/
│      └─ index.css            # Tailwind directives + component styles via @apply
```

## Core Flows
- **Home**: Minimal CTA to `/search`.
- **Search**: Filters tutors by city, district, subject, min/max price, min rating, selectable weekdays. Sorting: rating (default), price low/high. Results render `TutorCard`.
- **Tutor Profile**: Shows tutor info (city, district, phone, monthly rate), subjects, qualifications, reviews, availability slots. Learners select a slot from a dropdown, set subject, mode, note, and send a booking request (logs for now). Tutors cannot book.
- **Tutor Dashboard (Bookings)**: Lists requests with status (Pending/Accepted/Declined) and learner phone. Tabs for all/pending/accepted; accepted view adds a slot filter (from tutor availability).
- **Learner Dashboard**: Shows booked and waiting sessions with status filters.
- **Profile Settings**:
  - Tutor: first/last name, headline, city, district, phone, monthly payment, bio, subjects, qualifications.
  - Learner: first/last name, city, district, phone (tutor-only fields hidden).
- **Availability**: Tutor can add/delete recurring weekly slots (day, start, end).
- **Auth**: Mock `AuthContext` storing `{name, email, role}` in localStorage. Login sets role=tutor by default; demo buttons set tutor/learner.

## Expected Backend/API Design
**Auth**
- `POST /api/auth/login` → { token, user: { id, role, name, email } }
- `POST /api/auth/signup` → { token, user }
- `POST /api/auth/logout` (optional if stateless JWT)

**Tutor Search**
- `GET /api/tutors` with query params:
  - `city`, `district`, `subject`
  - `minPrice`, `maxPrice`
  - `minRating`
  - `availabilityDays[]=Monday` (multi)
  - `sort=rating|price-asc|price-desc`
- Response: tutors with id, name, city, district, subjects[], rating, reviewsCount, monthlyRate, availabilityDays[], phone, bio (optionally trimmed).

**Tutor Profile**
- `GET /api/tutors/:id` → full profile: name, city, districts[], phone, monthlyRate, rating, reviewsCount, subjects[], qualifications[], bio, availability slots [{day,start,end}], reviews.
- `POST /api/bookings` (learner) → body: { tutorId, slot, subject, mode, note }

**Bookings (Tutor)**
- `GET /api/tutors/:id/bookings` → list with status (pending/accepted/declined), learner info (name, phone), subject, time/slot, note.
- `PATCH /api/bookings/:id` → { status: "accepted"|"declined" }.
- Optional filter: `?status=accepted&slot=Monday%2010:00-12:00`.

**Bookings (Learner)**
- `GET /api/learners/:id/bookings` → booked/waiting sessions with tutor info, subject, time/slot, status, note.

**Availability (Tutor)**
- `GET /api/tutors/:id/availability` → [{ day, start, end }]
- `POST /api/tutors/:id/availability` → add slot
- `DELETE /api/tutors/:id/availability/:slotId`

**Profile Settings**
- `GET /api/me/profile` → role-aware fields
- `PATCH /api/me/profile` → update fields; if role=tutor, includes monthly rate, bio, subjects, qualifications, phone; if learner, only basic fields.

## Suggested Database Schema (Relational)
Tables:
- `users`: id, role (tutor|learner|admin), first_name, last_name, email (unique), password_hash, phone, created_at, updated_at.
- `tutor_profiles`: user_id (PK/FK), headline, city, district, monthly_rate, bio, qualifications (text), subjects (text/JSON).
- `tutor_availability`: id, tutor_id (FK users.id), day_of_week (enum), start_time, end_time, created_at.
- `bookings`: id, tutor_id, learner_id, subject, slot_text (e.g., “Monday 10:00-11:00”), mode (online|in-person), note, status (pending|accepted|declined|waiting), created_at, updated_at.
- `tutor_reviews` (future): id, tutor_id, learner_id, rating, comment, created_at.
- `tutor_locations` (optional multi-location): id, tutor_id, city, district.

Indexes:
- Tutors: city, district, rating, monthly_rate, subjects (JSON/tsvector), availability day lookup.
- Bookings: tutor_id, learner_id, status.

## Deployment/Ports
- Frontend: `npm run dev` (default Vite 5173) or `npm run build` + `npm run preview`.
- Backend: run on a separate port (e.g., 3000/4000) serving the APIs above.
- DB: separate instance (PostgreSQL/MySQL/etc.).

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes/Assumptions
- Photos removed; no upload handling.
- Relevance sort removed per requirement; default sort is rating.
- Availability filter is by weekday selections, not time ranges.
- Roles: front assumes role=tutor on manual login; demo buttons set tutor/learner. Real backend should return role with auth token.
- Error handling/toasts not implemented; forms log to console.
