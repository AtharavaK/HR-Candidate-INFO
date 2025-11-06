# Design Guidelines: HR Candidate Management Application

## Design Approach

**Selected System**: Material Design-inspired approach with enterprise refinement
**Rationale**: This is a utility-focused, information-dense application for HR professionals who prioritize efficiency, clarity, and data accessibility over visual flair. Material Design provides excellent patterns for forms, tables, and data management interfaces.

---

## Core Design Principles

1. **Clarity Over Decoration**: Every element serves a functional purpose
2. **Data Hierarchy**: Information architecture prioritizes quick scanning and data retrieval
3. **Efficiency First**: Minimize clicks, maximize workflow speed
4. **Professional Restraint**: Clean, trustworthy interface appropriate for HR context

---

## Typography System

**Font Family**: Inter or Roboto via Google Fonts CDN
- **Headers (H1)**: text-3xl font-semibold (Dashboard titles, page headers)
- **Headers (H2)**: text-2xl font-semibold (Section titles)
- **Headers (H3)**: text-xl font-medium (Card headers, table headers)
- **Body Text**: text-base font-normal (Form labels, table data)
- **Small Text**: text-sm (Helper text, metadata, timestamps)
- **Button Text**: text-sm font-medium uppercase tracking-wide

---

## Layout & Spacing System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Form field gaps: space-y-4
- Grid gaps: gap-6
- Card spacing: p-6

**Container Strategy**:
- Main app wrapper: max-w-7xl mx-auto px-4
- Form containers: max-w-2xl mx-auto
- Dashboard tables: w-full with responsive overflow

**Grid Layouts**:
- Dashboard stats: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
- Form fields: grid-cols-1 md:grid-cols-2 (for related fields like name/email)

---

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed header with logo, app name, main navigation links (Dashboard, Add Candidate)
- Height: h-16, shadow-sm, border-b
- Navigation items: Horizontal flex layout with gap-6

### Forms (Add/Edit Candidate)
- **Form Container**: Card-style with rounded-lg, shadow-md, p-6
- **Input Fields**: 
  - Full width inputs with consistent height (h-10 to h-12)
  - Rounded corners (rounded-md)
  - Border treatment with focus states
  - Labels above inputs (text-sm font-medium mb-2)
  - Helper text below inputs (text-xs)
- **Field Groups**: Use grid-cols-2 for related fields (First/Last name), full width for textarea fields (Address, Education)
- **Action Buttons**: Right-aligned, primary action (Submit/Save) prominent, secondary action (Cancel) subdued

### Data Display (Dashboard)
- **Candidate Table**:
  - Responsive table with horizontal scroll on mobile
  - Header row with font-semibold, border-b-2
  - Alternating row treatment for readability
  - Row height: min-h-12
  - Cell padding: px-6 py-4
  - Action column: Right-aligned with icon buttons (Edit, Delete)
- **Table Columns**: Name, Email, Phone, Experience, Skills, Actions
- **Empty State**: Centered message with illustration/icon when no candidates exist

### Search & Filters
- **Search Bar**: 
  - Positioned above table
  - Icon prefix (magnifying glass from Heroicons)
  - Full width on mobile, max-w-md on desktop
  - Rounded-lg with shadow-sm
  - Height: h-10

### Cards & Stats
- **Dashboard Stats Cards** (optional for showing totals):
  - Grid of 3-4 cards: Total Candidates, New This Month, etc.
  - Rounded-lg, shadow-sm, p-6
  - Large number display (text-3xl font-bold)
  - Label below (text-sm)

### Modals & Dialogs
- **Delete Confirmation**:
  - Centered overlay with backdrop (backdrop-blur-sm)
  - Card-style modal: rounded-lg, shadow-xl, p-6, max-w-md
  - Warning icon at top
  - Action buttons: Cancel (secondary) and Delete (destructive)

### Buttons
- **Primary Actions**: px-6 py-2.5, rounded-md, font-medium
- **Secondary Actions**: Similar sizing, alternative visual treatment
- **Icon Buttons**: p-2, rounded-md (for table actions)
- **States**: Include hover, active, and disabled states

---

## Icons
**Library**: Heroicons (via CDN) - use outline variant for most icons
- Add: plus-circle
- Edit: pencil-square
- Delete: trash
- Search: magnifying-glass
- User: user-circle
- Close: x-mark

---

## Accessibility & Forms
- All form inputs have associated labels with `for` attributes
- Required field indicators (* or "Required" text)
- Error messages appear below fields with distinct treatment
- Success notifications after form submission (toast or banner)
- Focus states clearly visible on all interactive elements
- Table rows have hover state for better interaction feedback

---

## Page Layouts

### Dashboard Page
1. **Header Section**: Page title "Candidate Dashboard" + Add Candidate button (top-right)
2. **Search Bar Section**: Full-width search with filters
3. **Stats Cards** (optional): 3-4 metric cards in grid
4. **Candidates Table**: Full-width responsive table with all candidate data
5. **Pagination** (if many records): Bottom of table, centered

### Add/Edit Candidate Page
1. **Header**: Page title "Add New Candidate" or "Edit Candidate"
2. **Form Card**: Centered, max-w-2xl container
3. **Form Fields**: 2-column grid where appropriate, full-width for text areas
4. **Action Bar**: Bottom of form, right-aligned buttons

---

## Responsive Behavior
- **Mobile (base)**: Single column layouts, stack all form fields, hide less critical table columns
- **Tablet (md)**: 2-column form grids, show more table columns
- **Desktop (lg+)**: Full multi-column layouts, all features visible

---

## Animation Guidelines
**Use Sparingly**: Only for meaningful state changes
- Form submission: Brief loading indicator
- Delete action: Fade out row animation
- Modal appearance: Simple fade + scale (duration-200)
- No decorative animations

---

This design creates a professional, efficient HR management interface optimized for data entry, viewing, and management tasks while maintaining visual clarity and usability.