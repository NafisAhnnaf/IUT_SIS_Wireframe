import React from "react"
import { Screen } from "../types"
import {
  IcoDashboard,
  IcoCalendar,
  IcoRegistration,
  IcoResult,
  IcoCard,
  IcoFeedback,
  IcoBook,
  IcoProfile,
  IcoLock,
  IcoClose,
} from "./Icons"

interface NavItem {
  id: Screen
  label: string
  icon: React.ReactNode
  badge?: string
  badgeColor?: string
}

const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <IcoDashboard /> },
  {
    id: "routine",
    label: "Class Routine",
    icon: <IcoCalendar />,
    badge: "5 Days",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  },
  {
    id: "registration",
    label: "Course Registration",
    icon: <IcoRegistration />,
    badge: "Open",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  },
  { id: "result", label: "Academic Results", icon: <IcoResult /> },
  { id: "admit-card", label: "Exam Admit Card", icon: <IcoCard /> },
  {
    id: "feedback",
    label: "Course Feedback",
    icon: <IcoFeedback />,
    badge: "3 Due",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  },
  { id: "library", label: "Library", icon: <IcoBook /> },
  { id: "profile", label: "Student Profile", icon: <IcoProfile /> },
  { id: "change-password", label: "Change Password", icon: <IcoLock /> },
]

export default function Sidebar({
  screen,
  onNav,
  onClose,
}: {
  screen: Screen
  onNav: (s: Screen) => void
  onClose?: () => void
}) {
  return (
    <aside className="w-64 h-full bg-[#0B1628]/95 backdrop-blur-xl flex flex-col border-r border-white/[0.08] select-none">
      {/* Logo + optional close */}
      <div className="px-5 py-5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B5FBD] flex items-center justify-center shrink-0 shadow-lg ring-1 ring-white/20">
            <span className="text-white font-black text-xs tracking-wider">
              IUT
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-white text-sm font-bold leading-none tracking-tight">
                Student Portal
              </p>
            </div>
            <p className="text-white/40 text-[10px] mt-1 leading-none font-medium">
              Islamic Univ. of Technology
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.08]"
          >
            <IcoClose />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 py-1 text-[10px] font-bold text-white/30 uppercase tracking-widest">
          Navigation
        </p>
        {NAV.map((item) => {
          const active = screen === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 text-left relative group ${
                active
                  ? "bg-white/[0.12] text-white border border-white/[0.14] shadow-sm font-bold"
                  : "text-white/50 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {active && (
                  <span className="w-1 h-5 rounded-full bg-[#60A5FA] absolute left-1.5 shrink-0 shadow-sm" />
                )}
                <span
                  className={`${
                    active
                      ? "text-[#60A5FA]"
                      : "text-white/40 group-hover:text-white/70"
                  } ml-1.5 shrink-0 transition-colors`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold shrink-0 border ${
                    item.badgeColor ||
                    "bg-white/10 text-white/70 border-white/10"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Academic Info Banner */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
            Session
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2024–2025
          </span>
        </div>
        <p className="text-white/80 text-xs font-bold mt-1">
          Summer Term (Sem 4)
        </p>
      </div>

      {/* Bottom accent */}
      <div className="px-5 py-3 border-t border-white/[0.08] flex items-center justify-between">
        <p className="text-white/30 text-[10px] font-medium">IUT SIS v2.4</p>
        <span className="text-[10px] text-white/30 font-medium font-mono">
          B.Sc. SWE
        </span>
      </div>
    </aside>
  )
}
