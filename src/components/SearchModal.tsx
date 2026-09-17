import React, { useState, useEffect, useRef } from "react"
import { Screen } from "../types"
import {
  SEMESTERS,
  WEEKLY_ROUTINE,
  LIBRARY_CURRENT,
  REGISTRATION_COURSES,
} from "../data/mockData"
import {
  IcoSearch,
  IcoClose,
  IcoCalendar,
  IcoRegistration,
  IcoResult,
  IcoBook,
  IcoProfile,
} from "./Icons"

interface SearchResultItem {
  id: string
  category: "Page" | "Course" | "Faculty" | "Library"
  title: string
  subtitle: string
  targetScreen: Screen
  icon?: React.ReactNode
}

export function SearchModal({
  isOpen,
  onClose,
  onNav,
}: {
  isOpen: boolean
  onClose: () => void
  onNav: (s: Screen) => void
}) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Build searchable index
  const index: SearchResultItem[] = [
    // Pages
    {
      id: "p-dash",
      category: "Page",
      title: "Dashboard",
      subtitle: "Overview, quick access & notices",
      targetScreen: "dashboard",
    },
    {
      id: "p-routine",
      category: "Page",
      title: "Class Routine & Timetable",
      subtitle: "Weekly schedule, rooms and periods",
      targetScreen: "routine",
      icon: <IcoCalendar />,
    },
    {
      id: "p-reg",
      category: "Page",
      title: "Course Registration",
      subtitle: "Semester 5 course enrollment & advisor clearance",
      targetScreen: "registration",
      icon: <IcoRegistration />,
    },
    {
      id: "p-res",
      category: "Page",
      title: "Academic Results",
      subtitle: "Semester GPA, CGPA & credit breakdown",
      targetScreen: "result",
      icon: <IcoResult />,
    },
    {
      id: "p-admit",
      category: "Page",
      title: "Exam Admit Card",
      subtitle: "December 2024 final examination slip",
      targetScreen: "admit-card",
    },
    {
      id: "p-feed",
      category: "Page",
      title: "Course Feedback",
      subtitle: "Faculty evaluations & course surveys",
      targetScreen: "feedback",
    },
    {
      id: "p-lib",
      category: "Page",
      title: "Central Library",
      subtitle: "Borrowed books, renewals & history",
      targetScreen: "library",
      icon: <IcoBook />,
    },
    {
      id: "p-prof",
      category: "Page",
      title: "Student Profile",
      subtitle: "Personal, academic & contact details",
      targetScreen: "profile",
      icon: <IcoProfile />,
    },
    {
      id: "p-pass",
      category: "Page",
      title: "Change Password",
      subtitle: "Account security settings",
      targetScreen: "change-password",
    },

    // Courses
    ...SEMESTERS[0].courses.map((c) => ({
      id: `c-${c.code}`,
      category: "Course" as const,
      title: `${c.code}: ${c.title}`,
      subtitle: `${c.cr} Credits · Current Enrolled Course`,
      targetScreen: "routine" as Screen,
    })),
    ...REGISTRATION_COURSES.map((c) => ({
      id: `rc-${c.code}`,
      category: "Course" as const,
      title: `${c.code}: ${c.title}`,
      subtitle: `${c.credits} Credits · Semester 5 Offering (${c.category})`,
      targetScreen: "registration" as Screen,
    })),

    // Faculty
    ...Array.from(new Set(WEEKLY_ROUTINE.map((r) => r.teacher))).map(
      (teacher) => ({
        id: `f-${teacher}`,
        category: "Faculty" as const,
        title: teacher,
        subtitle: `Instructor · Department of CSE`,
        targetScreen: "routine" as Screen,
      }),
    ),

    // Library books
    ...LIBRARY_CURRENT.map((b) => ({
      id: `b-${b.id}`,
      category: "Library" as const,
      title: b.title,
      subtitle: `By ${b.author} · Due: ${b.due}`,
      targetScreen: "library" as Screen,
    })),
  ]

  const filtered = index.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchesQuery =
      query.trim() === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  const handleSelect = (item: SearchResultItem) => {
    onNav(item.targetScreen)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-2xl w-full max-w-xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden">
        {/* Search header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center gap-3">
          <span className="text-[#1E3A8A]">
            <IcoSearch />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, faculty, timetable, library, or pages..."
            className="flex-1 text-sm bg-transparent outline-none font-medium text-[#0F172A] placeholder:text-[#94A3B8]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#94A3B8] hover:text-[#0F172A] text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <IcoClose />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-200/60 flex items-center gap-1.5 overflow-x-auto">
          {["All", "Page", "Course", "Faculty", "Library"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-bold text-slate-700">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &lsquo;Algorithms&rsquo;,
                &lsquo;Routine&rsquo;, &lsquo;Admit Card&rsquo;, or
                &lsquo;Library&rsquo;
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-600 group-hover:text-[#1E3A8A] shrink-0 transition-colors">
                    {item.icon || (
                      <span className="text-[10px] font-extrabold uppercase">
                        {item.category[0]}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-wide shrink-0">
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50/90 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Navigation Quick Jump</span>
          <div className="flex items-center gap-2">
            <span>ESC to close</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  )
}
