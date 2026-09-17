import React from "react"
import { Screen } from "../types"
import { STUDENT, WEEKLY_ROUTINE, SEMESTERS } from "../data/mockData"
import {
  PageHeader,
  StatCard,
  Card,
  InitialsAvatar,
  SectionLabel,
} from "../components/SharedUI"
import {
  IcoChevronRight,
  IcoCalendar,
  IcoRegistration,
  IcoResult,
  IcoFeedback,
  IcoBook,
  IcoCard,
  IcoClock,
  IcoMapPin,
} from "../components/Icons"
import CgpaTrendChart from "../components/CgpaTrendChart"

export default function DashboardScreen({
  onNav,
}: {
  onNav: (s: Screen) => void
}) {
  // Find a sample next class from Sunday's schedule
  const nextClass = WEEKLY_ROUTINE[0] // Algorithms at 08:00 AM in Room E-301

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <PageHeader
        title={`Good morning, ${STUDENT.name.split(" ")[0]}.`}
        subtitle={`${STUDENT.ay} · ${STUDENT.semester} · Semester ${STUDENT.semNum}`}
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Academic Year" value={STUDENT.ay} />
        <StatCard
          label="Current Semester"
          value={`Sem ${STUDENT.semNum}`}
          sub={STUDENT.semester}
        />
        <StatCard
          label="CGPA"
          value={STUDENT.cgpa}
          sub="out of 4.00"
          trend="+0.12 vs Sem 3"
        />
        <StatCard
          label="Credits Earned"
          value={String(STUDENT.totalCredits)}
          sub="total completed"
        />
      </div>

      {/* Identity Card */}
      <Card className="p-5 flex items-center gap-5 mb-5">
        <InitialsAvatar size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-extrabold text-xl text-[#0F172A] tracking-tight">
              {STUDENT.name}
            </p>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
              Regular
            </span>
          </div>
          <p className="text-[#64748B] text-sm mt-0.5 font-medium">
            {STUDENT.dept}
          </p>
          <p className="text-[#94A3B8] text-xs mt-1 font-medium">
            {STUDENT.program} · Batch {STUDENT.batch}
          </p>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            Student ID&nbsp;
            <span className="font-mono font-bold text-[#1E3A8A]">
              {STUDENT.id}
            </span>
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
            Advisor
          </span>
          <span className="text-xs font-bold text-[#0F172A]">
            {STUDENT.advisorName}
          </span>
          <span className="text-[11px] text-[#64748B] font-medium">
            {STUDENT.advisorEmail}
          </span>
        </div>
      </Card>

      {/* NEW: Today's Schedule & Next Class Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Next Class Alert Card */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B5FBD] text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold tracking-wider uppercase text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Upcoming Lecture
              </span>
              <span className="text-white/70 text-xs font-medium flex items-center gap-1">
                <IcoClock /> Today · {nextClass.startTime} – {nextClass.endTime}
              </span>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-sm bg-white/20 px-2 py-0.5 rounded-md">
                  {nextClass.courseCode}
                </span>
                <span className="text-base font-extrabold tracking-tight">
                  {nextClass.courseTitle}
                </span>
              </div>
              <p className="text-white/80 text-xs mt-1 font-medium flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <IcoMapPin /> {nextClass.room} ({nextClass.building})
                </span>
                <span>Instructor: {nextClass.teacher}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
            <span className="text-white/70 text-[11px] font-medium">
              Semester 4 Regular Schedule
            </span>
            <button
              onClick={() => onNav("routine")}
              className="px-3.5 py-1.5 rounded-xl bg-white text-[#1E3A8A] text-xs font-bold hover:bg-white/90 transition shadow-xs flex items-center gap-1"
            >
              Open Class Timetable <IcoChevronRight />
            </button>
          </div>
        </div>

        {/* Interactive CGPA Trend Chart Component */}
        <CgpaTrendChart onViewResults={() => onNav("result")} />
      </div>

      {/* NEW: Semester 5 Course Registration Action Banner */}
      <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <IcoRegistration />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#0F172A]">
                Semester 5 Course Registration Open
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                Action Required
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              Submit your pre-enrolled courses before the 30 October deadline to
              secure preferred sections.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNav("registration")}
          className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:opacity-90 transition-opacity shrink-0 shadow-sm"
        >
          Register Courses Now
        </button>
      </div>

      {/* Quick Access Grid */}
      <h2 className="font-bold text-lg text-[#0F172A] mb-3 tracking-tight">
        Quick Access
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          {
            screen: "routine" as Screen,
            label: "Class Routine",
            desc: "Weekly schedule, rooms & teacher timetable",
            accent: "from-blue-50/80 to-indigo-50/60 border-blue-200/60",
            arrow: "text-[#1E3A8A]",
            icon: <IcoCalendar />,
          },
          {
            screen: "result" as Screen,
            label: "View Results",
            desc: `CGPA ${STUDENT.cgpa} · ${STUDENT.semNum} semesters completed`,
            accent: "from-indigo-50/80 to-blue-50/60 border-indigo-200/60",
            arrow: "text-[#1E3A8A]",
            icon: <IcoResult />,
          },
          {
            screen: "admit-card" as Screen,
            label: "Exam Admit Card",
            desc: "December 2024 final examination pass",
            accent: "from-purple-50/80 to-indigo-50/60 border-purple-200/60",
            arrow: "text-purple-600",
            icon: <IcoCard />,
          },
          {
            screen: "feedback" as Screen,
            label: "Course Feedback",
            desc: "3 evaluations pending · Submit before deadline",
            accent: "from-amber-50/80 to-orange-50/60 border-amber-200/60",
            arrow: "text-amber-600",
            icon: <IcoFeedback />,
          },
          {
            screen: "library" as Screen,
            label: "Library",
            desc: "1 book overdue · Return before next visit",
            accent: "from-red-50/80 to-rose-50/60 border-red-200/60",
            arrow: "text-red-600",
            icon: <IcoBook />,
          },
          {
            screen: "registration" as Screen,
            label: "Course Registration",
            desc: "Semester 5 course selection & advisor clearance",
            accent: "from-emerald-50/80 to-teal-50/60 border-emerald-200/60",
            arrow: "text-emerald-600",
            icon: <IcoRegistration />,
          },
        ].map((q) => (
          <button
            key={q.screen}
            onClick={() => onNav(q.screen)}
            className={`text-left p-4.5 rounded-2xl border bg-gradient-to-br ${q.accent} backdrop-blur-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`${q.arrow} text-base`}>{q.icon}</span>
                  <span className="font-bold text-sm text-[#0F172A]">
                    {q.label}
                  </span>
                </div>
                <span
                  className={`${q.arrow} opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}
                >
                  <IcoChevronRight />
                </span>
              </div>
              <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                {q.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Academic Notice Banner */}
      <div className="flex gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/60">
        <div className="w-1 rounded-full bg-gradient-to-b from-[#1E3A8A] to-[#3B5FBD] shrink-0" />
        <div>
          <p className="text-xs font-bold text-[#0F172A]">
            Official Academic Notice
          </p>
          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed font-medium">
            Final examinations begin 15 December 2024. Ensure your course
            evaluations are completed and admit card is downloaded and verified
            before your first exam.
          </p>
        </div>
      </div>
    </div>
  )
}
