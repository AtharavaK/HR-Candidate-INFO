# HR Candidate Management Application

## Overview
A professional, full-stack HR candidate management system built with React, Express.js, and PostgreSQL. This application streamlines the hiring process by allowing HR teams to efficiently add, track, search, edit, and manage job candidates.

## Project Status
✅ **MVP Complete** - All core features implemented and tested
- Database schema and migrations complete
- Backend API with full CRUD operations
- Professional Material Design-inspired UI
- Search and filter functionality
- Form validation and error handling

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query v5)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM
- **Validation**: Zod schemas

## Features

### ✅ Candidate Management
- **Add Candidates**: Comprehensive form with validation for all candidate details
- **View Dashboard**: Clean table view with stats cards showing total candidates and experience levels
- **Search & Filter**: Real-time search by name, email, or skills
- **Edit Candidates**: Update candidate information with pre-populated forms
- **Delete Candidates**: Safe deletion with confirmation dialog

### ✅ Data Fields
- Full Name (required)
- Email (required, unique)
- Phone Number (required)
- Address (optional)
- Education (optional)
- Years of Experience (optional, supports 0 years)
- Skills (optional, comma-separated)
- Resume URL (optional, validated URL)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── candidate-form-dialog.tsx
│   │   │   └── delete-candidate-dialog.tsx
│   │   ├── pages/
│   │   │   ├── dashboard.tsx     # Main dashboard page
│   │   │   └── not-found.tsx
│   │   ├── lib/
│   │   │   └── queryClient.ts    # TanStack Query configuration
│   │   ├── App.tsx
│   │   └── index.css             # Tailwind + theme configuration
│   └── index.html
├── server/
│   ├── db.ts                     # Database connection
│   ├── storage.ts                # Data access layer
│   ├── routes.ts                 # API endpoints
│   └── index.ts                  # Express server
├── shared/
│   └── schema.ts                 # Drizzle schema and Zod validation
└── design_guidelines.md          # UI/UX design system
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/candidates` | Fetch all candidates (ordered by creation date) |
| GET | `/api/candidates/:id` | Fetch single candidate by ID |
| POST | `/api/candidates` | Create new candidate |
| PUT | `/api/candidates/:id` | Update candidate |
| DELETE | `/api/candidates/:id` | Delete candidate |

## Database Schema

### `candidates` Table
```sql
CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address TEXT,
  education TEXT,
  experience_years INTEGER,
  skills TEXT,
  resume_url TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Design System

### Theme
- **Approach**: Material Design-inspired with enterprise refinement
- **Color Scheme**: Professional blue primary color with neutral grays
- **Typography**: Inter font family for clarity and readability
- **Spacing**: Consistent 4px-based spacing system

### Key Design Principles
1. **Clarity Over Decoration**: Every element serves a functional purpose
2. **Data Hierarchy**: Information architecture prioritizes quick scanning
3. **Efficiency First**: Minimize clicks, maximize workflow speed
4. **Professional Restraint**: Clean, trustworthy interface for HR context

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs both frontend and backend)
npm run dev

# Push database schema changes
npm run db:push

# Force database schema sync
npm run db:push --force
```

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- `NODE_ENV` - Set to "development" for local development
- `SESSION_SECRET` - Session secret for future authentication features

## Key Implementation Details

### Form Reset Logic
The CandidateFormDialog uses a `useEffect` hook to properly reset form values when:
- Switching from "Add" to "Edit" mode
- Switching between different candidates
- Closing and reopening the dialog

This ensures no stale data persists between operations.

### Nullish Coalescing for Experience
The form uses the nullish coalescing operator (`??`) instead of logical OR (`||`) for the `experienceYears` field to properly handle legitimate 0 values. This prevents 0 years of experience from being incorrectly treated as a missing value.

### TanStack Query Integration
- All data fetching uses TanStack Query with automatic caching
- Mutations invalidate relevant queries for immediate UI updates
- Loading and error states handled gracefully throughout the UI

## Recent Changes

### 2024-11-06: Initial MVP Implementation
- Created complete database schema with all required fields
- Implemented full backend API with validation and error handling
- Built professional Material Design-inspired frontend
- Added search and filter functionality
- Implemented add/edit/delete operations with proper form handling
- Fixed critical form reset bugs for reliable edit workflow
- Fixed nullish coalescing issue for zero experience values

## Future Enhancements
- User authentication and role-based access control
- File upload for resumes (direct upload instead of URL only)
- Advanced filtering (by experience range, education level)
- Candidate status tracking (applied, interviewed, offered, hired, rejected)
- Interview scheduling and notes
- Email notifications
- Export candidates to CSV
- Pagination for large datasets
- Candidate timeline/activity history

## Testing
The application includes comprehensive data-testid attributes on all interactive elements for reliable end-to-end testing:
- All buttons, inputs, and links have unique test IDs
- Dynamic elements include row-specific identifiers
- Form fields are properly labeled for accessibility

## Notes
- The application uses Replit's built-in PostgreSQL database
- All database migrations are handled via Drizzle Kit's `db:push` command
- No manual SQL migrations are required
- The design follows the guidelines in `design_guidelines.md` for consistent UI/UX
