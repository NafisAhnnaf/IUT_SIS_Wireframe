# Islamic University of Technology (IUT) — Student Information System (SIS)
### SWE 4401: Software Requirements and Specifications (SRS)
**Topic:** High-Fidelity Prototyping & Wireframing  
**Department:** Computer Science and Engineering (CSE)  
**Program:** B.Sc. in Software Engineering  
**Student ID:** 230042150 (Nafis Ahnaf Jamil)  
**Target Platform:** Web / Single Page Application (SPA) 

---

## 1. Project Overview & Academic Context

This project represents a **High-Fidelity Interactive Prototype** developed within the scope of **SWE 4401: Software Requirements and Specifications** course.

In traditional software engineering workflows, static wireframes and textual SRS documents frequently leave ambiguities regarding state transitions, validation boundaries, and micro-interactions. This high-fidelity prototype serves as an **executable specification** that bridges requirement engineering with real-world user experience (UX), allowing stakeholders (students, faculty advisors, academic registrars) to test, evaluate, and validate functional and non-functional requirements in a realistic production-grade environment before backend API integration.

### Core Objectives of the High-Fidelity Prototype
1. **Requirements Validation:** Verify that user workflows for course registration, routine planning, and grade tracking satisfy operational constraints.
2. **Usability Heuristic Compliance:** Implement Nielsen’s usability heuristics (e.g., *Visibility of System Status*, *Error Prevention*, *Recognition over Recall*).
3. **Formal Academic Constraint Modeling:** Implement real university rules such as credit hour bounds (15.0–22.5 cr), prerequisite gating, and attendance clearance thresholds.
4. **Document Fidelity:** Provide printable, publication-ready academic documents (Examination Admit Cards, Transcripts, Course Registration Slips) formatted with `@media print`.

---

## 2. System Architecture & Modularization

The codebase has been refactored from a single monolithic file into a scalable, maintainable modular structure complying with modern component-driven engineering principles:

```
src/
├── components/                     # Reusable UI & Feature-Level Components
│   ├── CgpaTrendChart.tsx          # Standalone SVG CGPA line chart with Dean's Honor threshold
│   ├── Icons.tsx                   # Centralized, scalable SVG icon definitions
│   ├── SearchModal.tsx             # Global Command Palette (Ctrl+K) search index
│   ├── SharedUI.tsx                # Card, PageHeader, StatCard, InitialsAvatar, Badges
│   ├── Sidebar.tsx                 # Responsive portal sidebar with dynamic status pills
│   ├── TopBar.tsx                  # Top navigation, breadcrumbs, search & notifications
│   └── index.ts                    # Barrel export
│
├── pages/                          # Specialized Screen Views (Domain Views)
│   ├── DashboardScreen.tsx         # Central landing hub with Next Class & CGPA trajectory
│   ├── RoutineScreen.tsx           # Class routine matrix, day agenda & calendar export
│   ├── RegistrationScreen.tsx      # Semester course enrollment & advisor submission
│   ├── ProfileScreen.tsx           # Academic, personal & emergency contact records
│   ├── FeedbackScreen.tsx          # Teacher evaluation rubric & rating modal
│   ├── ResultScreen.tsx            # Semester-wise transcript with expandable grade sheets
│   ├── AdmitCardScreen.tsx         # Verified examination clearance slip & barcode
│   ├── LibraryScreen.tsx           # Book loan tracker & interactive renewal engine
│   ├── ChangePasswordScreen.tsx    # Security credentials update with strength analyzer
│   └── index.ts                    # Barrel export
│
├── context/
│   └── ToastContext.tsx            # Global transient feedback system (Success, Warning, Info)
├── data/
│   └── mockData.ts                 # Realistic IUT academic datasets (Students, Courses, Routine)
├── types.ts                        # Comprehensive TypeScript type definitions
├── App.tsx                         # Root routing coordinator and keyboard shortcut listener
└── index.css                       # Tailwind CSS v4 directives, custom animations & print rules
```

---

## 3. Detailed Feature Breakdown

### 3.1. Class Routine & Timetable Calendar (`/routine`)
* **Weekly Schedule Matrix:** Full Sunday–Thursday academic timetable mapped against 6 university period slots (08:00 to 17:00).
* **Theory vs. Lab Allocation:** Visual differentiation between 75-minute lecture slots and continuous 2.5-hour afternoon laboratory sessions (14:30 – 17:00).
* **View Flexibility:** Single-click toggle between a high-density **Weekly Grid View** and a chronological **Day-by-Day Agenda View**.
* **Venue & Faculty Mapping:** Displays specific campus locations (*Room E-301, Academic Bldg 1*, *CSE Lab 3, NAB 4th Floor*) and faculty initials.
* **Standard Calendar Export (`.ics`):** Client-side generation of RFC-5545 compliant `.ics` calendar files for importing into Google Calendar or Apple Calendar.
* **Print Optimization:** Print-specific stylesheet strips navigation chrome and outputs clean A4 schedules.

### 3.2. Dedicated Course Registration (`/registration`)
* **Semester Enrollment Lifecycle:** Models the beginning-of-semester registration process for Semester 5 (Autumn 2024–2025).
* **Live Credit Load Calculator & Meter:** Enforces institutional boundaries:
  * Minimum: **15.0 Credits** | Maximum: **22.5 Credits**
  * Color-coded dynamic progress indicator with real-time over-credit/under-credit warning states.
* **Categorized Course Offerings:**
  * **Core Mandatory:** *Compiler Design*, *Software Architecture*, *Computer Networks* + laboratories.
  * **Departmental Electives:** Selectable choices (*Cloud Computing & DevOps*, *AI & Machine Learning*, *Mobile App Development*).
  * **Humanities / Management:** *Technology Management & Entrepreneurship*.
* **Prerequisite & Conflict Verification:** Automated checks verify passed prerequisites (e.g., *Passed CSE 4403 Algorithms*) and validate that selected courses have 0 timetable overlaps.
* **Advisor Endorsement Workflow:** Students can save drafts or submit to their assigned academic advisor (*Dr. Abu Raihan Mostofa Kamal*), locking the form and displaying confirmation dialogs.
* **Official Registration Slip:** Generates an official registration slip complete with signature lines for the Student, Academic Advisor, and Head of Department.

### 3.3. Dashboard Intelligence & "Day-At-A-Glance" (`/dashboard`)
* **Upcoming Lecture Widget:** Identifies the student's next imminent class based on the timetable (Course code, venue, instructor, start time).
* **Interactive CGPA Trend Component:** Custom SVG visualization tracking GPA progression from Semester 1 through Semester 4 with a dashed indicator at the **3.75 Dean's Honor Roll** milestone.
* **Urgent Action Banners:** Prominently surfaces the active Course Registration deadline and pending faculty evaluations.
* **Quick Access Grid:** Direct shortcuts to high-frequency pages with status counters.

### 3.4. Academic Results & Transcripts (`/result`)
* **Multi-Semester Transcript:** Accordion-style semester breakdowns (GPA, total credits, grade distribution).
* **Grade Point Chips:** Visual classification of letter grades ($A \ge 3.75$, $B \ge 3.00$, etc.).
* **Registrar Disclaimer:** Official institutional verification notes for academic integrity.

### 3.5. Exam Admit Card with Verified Clearances (`/admit-card`)
* **Multi-Departmental Clearance Verification:** Pre-flight checklist confirming:
  1. *Accounts / Fee Clearance*
  2. *75% Minimum Attendance Rule Clearance*
  3. *Library Dues Clearance*
* **Detailed Exam Schedule:** Final examination dates, starting times, assigned examination halls, and durations.
* **Controller of Examinations Slip:** Formatted university layout with student avatar, verification barcode (`IUT-EXAM-2024-42150`), and official signature block.

### 3.6. Central Library Management (`/library`)
* **Loan Status Engine:** Visual indicators calculate remaining days or overdue penalties (BDT 5/day late fee).
* **One-Click Renewal:** Interactive book renewal button extending borrowing periods by +30 days with live toast notifications.
* **Borrowing History Log:** Historical record of returned books with punctuality audits.

### 3.7. Course Feedback & Faculty Evaluation (`/feedback`)
* **Evaluation Queue:** Lists enrolled subjects with "Evaluated" and "Pending" statuses.
* **Interactive Evaluation Dialog:** Multi-point star rating rubric and qualitative feedback submission.

### 3.8. Profile & Security Management (`/profile`, `/change-password`)
* **Click-to-Copy Data Chips:** One-click copying of Student ID, university email, and advisor contact to system clipboard.
* **Contact Records:** In-place editable form for mobile numbers, blood group, and residential addresses.
* **Password Strength Meter:** Evaluates password complexity dynamically across weak, good, and strong tiers.

---

## 4. Usability & Interaction Innovations

| UX Feature | Purpose & Academic Rationale | Implementation |
| :--- | :--- | :--- |
| **Command Palette (`Ctrl+K`)** | *Flexibility and efficiency of use (Heuristic #7)*: Enables experienced users to jump directly to courses, professors, or pages. | Modal dialog listening to global keyboard events with real-time fuzzy filtering. |
| **Notification Center** | *Visibility of system status (Heuristic #1)*: Keeps students informed about upcoming classes, due dates, and deadlines. | Header bell popover with unread counters, category tags, and "Mark All Read". |
| **Toast Feedback Engine** | *User feedback & reassurance*: Confirms every state-changing action (copying, submitting, renewing). | Floating animated pills with automatic 3.5s dismiss timer. |
| **Printable Documentation** | *Match between system and real world (Heuristic #2)*: Generates physical paper forms adhering to university administration standards. | Clean `@media print` rules removing UI navigation and resetting layouts to standard A4. |

---

## 5. Technology Stack

* **UI Framework:** React 19 (`react`, `react-dom`)
* **Build Tooling:** Vite 8 & TypeScript 5.7
* **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
* **Typography:** Plus Jakarta Sans (Google Fonts)
* **Code Formatter:** oxfmt
* **Hosting Platform:** Vercel (Configured with `vercel.json` SPA rewrites and asset cache controls)

---

## 6. Local Development & Build Guide

### Prerequisites
* **Node.js:** v20.x or higher
* **pnpm:** v9.x or higher

### Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Run the Vite development server (hot reload active)
pnpm dev

# 3. Type-check TypeScript codebase
pnpm tsc --noEmit

# 4. Format code using oxfmt
pnpm format

# 5. Build production bundle (outputs to dist/)
pnpm build

# 6. Preview production build locally
pnpm preview
```

---

## 7. Hosting & Deployment (Vercel)

This application is fully pre-configured for deployment on **Vercel**:
* `vercel.json` contains single-page application (SPA) rewrite rules ensuring deep routes resolve to `/index.html`:
  ```json
  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
* Immutable caching headers are configured for all `/assets/*` bundles to ensure high-performance loading and instant global delivery.
