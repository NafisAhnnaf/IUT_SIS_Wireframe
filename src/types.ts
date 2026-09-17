export type Screen = "dashboard" | "routine" | "registration" | "profile" | "feedback" | "result" | "admit-card" | "library" | "change-password"

export interface StudentInfo {
  id: string
  name: string
  dept: string
  program: string
  batch: string
  ay: string
  semester: string
  semNum: number
  cgpa: string
  totalCredits: number
  email: string
  phone: string
  gender: string
  dob: string
  blood: string
  address: string
  emergAddr: string
  country: string
  fatherName: string
  fatherProf: string
  motherName: string
  motherProf: string
  guardianName: string
  guardianPhone: string
  advisorName: string
  advisorDept: string
  advisorEmail: string
}

export interface Course {
  code: string
  title: string
  cr: number
  grade: string
  pts: number
}

export interface SemesterResult {
  id: number
  label: string
  period: string
  gpa: string
  courses: Course[]
}

export interface FeedbackItem {
  code: string
  title: string
  teacher: string
  status: "Evaluated" | "Pending"
}

export interface ExamSchedule {
  date: string
  day: string
  time: string
  code: string
  title: string
  room: string
  duration: string
}

export interface LibraryBook {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  issued: string
  due: string
  daysLeft: number
}

export interface LibraryHistoryItem {
  title: string
  author: string
  isbn: string
  category: string
  issued: string
  returned: string
  status: "On Time" | "Overdue"
}

export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday"

export interface RoutineSlot {
  id: string
  day: DayOfWeek
  startTime: string
  endTime: string
  slotIndex: number // 0 to 5 for grid columns
  courseCode: string
  courseTitle: string
  teacher: string
  teacherInitials: string
  room: string
  building: string
  type: "Theory" | "Lab"
  colorTheme: "blue" | "indigo" | "emerald" | "amber" | "purple" | "rose"
}

export interface RegistrationCourse {
  id: string
  code: string
  title: string
  credits: number
  type: "Theory" | "Lab"
  category: "Core" | "Elective" | "Humanities"
  section: string
  instructor: string
  prerequisite: string | null
  prerequisiteMet: boolean
  scheduleTime: string
  seatsTotal: number
  seatsTaken: number
  description: string
  isSelected?: boolean
}

export interface AppNotification {
  id: string
  title: string
  message: string
  time: string
  type: "academic" | "library" | "registration" | "feedback"
  screenTarget?: Screen
  read: boolean
}

export interface ToastMessage {
  id: string
  type: "success" | "info" | "warning"
  text: string
}
