import React, { useState, useMemo } from "react"
import { DayOfWeek, RoutineSlot } from "../types"
import { WEEKLY_ROUTINE, TIME_SLOTS, STUDENT } from "../data/mockData"
import { Card, PageHeader, SectionLabel } from "../components/SharedUI"
import {
  IcoPrinter,
  IcoDownload,
  IcoCalendar,
  IcoClock,
  IcoMapPin,
  IcoUser,
  IcoSearch,
} from "../components/Icons"
import { useToast } from "../context/ToastContext"

const DAYS: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
]

export default function RoutineScreen() {
  const { showToast } = useToast()
  const [activeDay, setActiveDay] = useState<DayOfWeek | "All">("All")
  const [viewMode, setViewMode] = useState<"matrix" | "agenda">("matrix")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | "Theory" | "Lab">("All")

  // Filter slots
  const filteredSlots = useMemo(() => {
    return WEEKLY_ROUTINE.filter((slot) => {
      const matchesDay = activeDay === "All" || slot.day === activeDay
      const matchesType = typeFilter === "All" || slot.type === typeFilter
      const q = searchQuery.toLowerCase()
      const matchesQuery =
        q === "" ||
        slot.courseCode.toLowerCase().includes(q) ||
        slot.courseTitle.toLowerCase().includes(q) ||
        slot.room.toLowerCase().includes(q) ||
        slot.teacher.toLowerCase().includes(q)
      return matchesDay && matchesType && matchesQuery
    })
  }, [activeDay, typeFilter, searchQuery])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = () => {
    showToast("Class routine downloaded as PDF", "success")
  }

  const handleExportIcs = () => {
    // Generate real standard iCalendar (.ics) format
    let icsContent =
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//IUT SIS//Class Routine//EN\n"
    WEEKLY_ROUTINE.forEach((slot) => {
      icsContent += "BEGIN:VEVENT\n"
      icsContent += `SUMMARY:${slot.courseCode} - ${slot.courseTitle}\n`
      icsContent += `LOCATION:${slot.room} (${slot.building})\n`
      icsContent += `DESCRIPTION:Instructor: ${slot.teacher} (${slot.type})\n`
      icsContent += "END:VEVENT\n"
    })
    icsContent += "END:VCALENDAR"

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute("download", "IUT_Class_Routine_Sem4.ics")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast("Routine exported to .ics calendar format!", "success")
  }

  const colorStyles: Record<string, {
    bg: string
    border: string
    text: string
    badge: string
  }> = {
    blue: {
      bg: "bg-blue-50/90",
      border: "border-blue-200",
      text: "text-blue-950",
      badge: "bg-blue-100/90 text-blue-700",
    },
    indigo: {
      bg: "bg-indigo-50/90",
      border: "border-indigo-200",
      text: "text-indigo-950",
      badge: "bg-indigo-100/90 text-indigo-700",
    },
    purple: {
      bg: "bg-purple-50/90",
      border: "border-purple-200",
      text: "text-purple-950",
      badge: "bg-purple-100/90 text-purple-700",
    },
    emerald: {
      bg: "bg-emerald-50/90",
      border: "border-emerald-200",
      text: "text-emerald-950",
      badge: "bg-emerald-100/90 text-emerald-700",
    },
    amber: {
      bg: "bg-amber-50/90",
      border: "border-amber-200",
      text: "text-amber-950",
      badge: "bg-amber-100/90 text-amber-700",
    },
    rose: {
      bg: "bg-rose-50/90",
      border: "border-rose-200",
      text: "text-rose-950",
      badge: "bg-rose-100/90 text-rose-700",
    },
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      {/* Header */}
      <PageHeader
        title="Class Routine & Timetable"
        subtitle={`Semester ${STUDENT.semNum} (${STUDENT.semester}) · Academic Year ${STUDENT.ay}`}
      >
        <button
          onClick={handleExportIcs}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E3A8A] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] bg-white/70 backdrop-blur-sm transition-colors shadow-xs"
        >
          <IcoCalendar /> Add to Calendar (.ics)
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white rounded-xl hover:opacity-95 transition-opacity shadow-md"
        >
          <IcoPrinter /> Print Routine
        </button>
      </PageHeader>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <Card className="p-4">
          <SectionLabel>Semester</SectionLabel>
          <p className="text-xl font-extrabold text-[#0F172A] mt-1">
            Semester 4
          </p>
          <p className="text-[11px] text-[#64748B] font-medium">B.Sc. in SWE</p>
        </Card>
        <Card className="p-4">
          <SectionLabel>Weekly Load</SectionLabel>
          <p className="text-xl font-extrabold text-[#0F172A] mt-1">18 Hours</p>
          <p className="text-[11px] text-[#64748B] font-medium">
            Theory & Labs
          </p>
        </Card>
        <Card className="p-4">
          <SectionLabel>Active Courses</SectionLabel>
          <p className="text-xl font-extrabold text-[#0F172A] mt-1">
            6 Courses
          </p>
          <p className="text-[11px] text-[#64748B] font-medium">
            4 Theory · 2 Labs
          </p>
        </Card>
        <Card className="p-4">
          <SectionLabel>Primary Venue</SectionLabel>
          <p className="text-xl font-extrabold text-[#0F172A] mt-1 truncate">
            Academic Bldg 1
          </p>
          <p className="text-[11px] text-[#64748B] font-medium">
            Rooms E-301 to E-304
          </p>
        </Card>
      </div>

      {/* Controls & Filter Bar */}
      <Card className="p-4 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Day selection tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setActiveDay("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeDay === "All"
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "text-[#64748B] hover:bg-slate-100"
              }`}
            >
              All Week
            </button>
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeDay === day
                    ? "bg-[#1E3A8A] text-white shadow-xs"
                    : "text-[#64748B] hover:bg-slate-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Search, Type Filter & View Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <IcoSearch />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course or room..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/80 border border-slate-200/80 rounded-xl text-[#0F172A] font-medium placeholder:text-slate-400 outline-none focus:border-[#1E3A8A]"
              />
            </div>

            {/* Type selector */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200/80 rounded-xl text-[#0F172A] font-semibold outline-none"
            >
              <option value="All">All Types</option>
              <option value="Theory">Theory Only</option>
              <option value="Lab">Lab Sessions</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/70">
              <button
                onClick={() => setViewMode("matrix")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === "matrix"
                    ? "bg-white text-[#1E3A8A] shadow-xs"
                    : "text-slate-500"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("agenda")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === "agenda"
                    ? "bg-white text-[#1E3A8A] shadow-xs"
                    : "text-slate-500"
                }`}
              >
                Agenda View
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Schedule Display */}
      {viewMode === "matrix" ? (
        /* ─── WEEKLY MATRIX VIEW ─────────────────────────────────────── */
        <Card className="overflow-hidden border border-white/60">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Header row with time slots */}
              <div className="grid grid-cols-7 border-b border-slate-200/80 bg-slate-50/80">
                <div className="p-3 border-r border-slate-200/80 text-xs font-extrabold text-[#1E3A8A] flex items-center justify-center">
                  Day / Time
                </div>
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot.index}
                    className="p-2.5 text-center border-r last:border-r-0 border-slate-200/80"
                  >
                    <p className="text-[11px] font-bold text-[#0F172A]">
                      {slot.label}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                      {slot.period}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rows for each day */}
              <div className="divide-y divide-slate-200/70">
                {DAYS.map((day) => {
                  if (activeDay !== "All" && activeDay !== day) return null
                  const daySlots = filteredSlots.filter((s) => s.day === day)

                  return (
                    <div
                      key={day}
                      className="grid grid-cols-7 min-h-[96px] bg-white/40 hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Day Name Header */}
                      <div className="p-3 border-r border-slate-200/80 flex flex-col justify-center items-center bg-slate-50/40">
                        <span className="font-extrabold text-sm text-[#0F172A]">
                          {day}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          {daySlots.length} class
                          {daySlots.length === 1 ? "" : "es"}
                        </span>
                      </div>

                      {/* 6 time slot columns */}
                      {TIME_SLOTS.map((slotInfo) => {
                        const matchingSlot = daySlots.find(
                          (s) => s.slotIndex === slotInfo.index,
                        )

                        return (
                          <div
                            key={slotInfo.index}
                            className="p-1.5 border-r last:border-r-0 border-slate-200/70 flex flex-col justify-center"
                          >
                            {matchingSlot ? (
                              <div
                                className={`p-2.5 rounded-xl border ${
                                  colorStyles[matchingSlot.colorTheme]
                                    ?.border || "border-blue-200"
                                } ${
                                  colorStyles[matchingSlot.colorTheme]?.bg ||
                                  "bg-blue-50"
                                } shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="font-mono font-extrabold text-[11px] text-[#1E3A8A]">
                                      {matchingSlot.courseCode}
                                    </span>
                                    <span
                                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                                        matchingSlot.type === "Lab"
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {matchingSlot.type}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-[#0F172A] line-clamp-1 group-hover:line-clamp-none">
                                    {matchingSlot.courseTitle}
                                  </p>
                                </div>

                                <div className="mt-2 pt-1.5 border-t border-black/5 text-[10px] space-y-0.5">
                                  <div className="flex items-center gap-1 text-slate-600 font-medium">
                                    <IcoMapPin />
                                    <span className="truncate">
                                      {matchingSlot.room}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                                    <IcoUser />
                                    <span className="truncate">
                                      {matchingSlot.teacherInitials}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full rounded-xl border border-dashed border-slate-200/50 flex items-center justify-center">
                                <span className="text-[10px] text-slate-300 font-medium">
                                  —
                                </span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* ─── AGENDA / TIMELINE VIEW ──────────────────────────────────── */
        <div className="space-y-4">
          {DAYS.map((day) => {
            if (activeDay !== "All" && activeDay !== day) return null
            const daySlots = filteredSlots.filter((s) => s.day === day)
            if (daySlots.length === 0) return null

            return (
              <Card key={day} className="overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
                    <h3 className="font-extrabold text-sm text-[#0F172A]">
                      {day}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {daySlots.length} sessions
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-100">
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-28 shrink-0 text-left">
                          <p className="font-extrabold text-xs text-[#0F172A] flex items-center gap-1">
                            <IcoClock /> {slot.startTime} – {slot.endTime}
                          </p>
                          <span
                            className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                              slot.type === "Lab"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {slot.type} Session
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#1E3A8A]">
                              {slot.courseCode}
                            </span>
                            <span className="text-slate-300">·</span>
                            <h4 className="font-bold text-sm text-[#0F172A]">
                              {slot.courseTitle}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1.5">
                            <IcoUser /> Instructor: {slot.teacher}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 pl-32 sm:pl-0">
                        <p className="font-bold text-xs text-[#0F172A] flex items-center sm:justify-end gap-1">
                          <IcoMapPin /> {slot.room}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {slot.building}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Routine Notes */}
      <div className="mt-5 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 flex items-start gap-3">
        <span className="text-[#1E3A8A] mt-0.5 shrink-0">ℹ</span>
        <div className="text-xs text-[#64748B] leading-relaxed">
          <p className="font-bold text-[#0F172A]">
            Official IUT Academic Scheduling Notice
          </p>
          <p className="mt-0.5">
            Regular lecture duration is 75 minutes. Laboratory classes are
            conducted continuously across the afternoon slot (14:30 – 17:00).
            Students are required to be present at their assigned rooms 5
            minutes before scheduled session time.
          </p>
        </div>
      </div>
    </div>
  )
}
