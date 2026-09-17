import React, { useState, useRef, useEffect } from "react"
import { Screen, AppNotification } from "../types"
import { STUDENT, NOTIFICATIONS_INIT } from "../data/mockData"
import { InitialsAvatar } from "./SharedUI"
import { IcoMenu, IcoBell, IcoSearch, IcoCheck } from "./Icons"
import { useToast } from "../context/ToastContext"

const PAGE_LABELS: Record<Screen, string> = {
  dashboard: "Dashboard",
  routine: "Class Routine & Timetable",
  registration: "Course Registration",
  profile: "Student Profile",
  feedback: "Course Feedback",
  result: "Academic Results",
  "admit-card": "Exam Admit Card",
  library: "Central Library",
  "change-password": "Change Password",
}

export function TopBar({
  screen,
  onMenuClick,
  onOpenSearch,
  onNav,
}: {
  screen: Screen
  onMenuClick: () => void
  onOpenSearch: () => void
  onNav: (s: Screen) => void
}) {
  const { showToast } = useToast()
  const [notifications, setNotifications] =
    useState<AppNotification[]>(NOTIFICATIONS_INIT)
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifs(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    showToast("All notifications marked as read", "info")
  }

  const handleNotifClick = (notif: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
    )
    setShowNotifs(false)
    if (notif.screenTarget) {
      onNav(notif.screenTarget)
    }
  }

  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/60 flex items-center justify-between px-4 md:px-7 shrink-0 z-20 select-none">
      {/* Left section: mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 -ml-2 text-[#64748B] hover:text-[#0F172A] hover:bg-black/5 rounded-xl transition"
          onClick={onMenuClick}
        >
          <IcoMenu />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#94A3B8] font-semibold tracking-wide">
            IUT SIS
          </span>
          <span className="text-[#CBD5E1] font-bold">/</span>
          <span className="text-[#0F172A] font-extrabold tracking-tight">
            {PAGE_LABELS[screen]}
          </span>
        </div>
      </div>

      {/* Right section: Search button, Notifications, User */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Quick Search trigger button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-[#1E3A8A]/40 hover:bg-white text-xs text-[#64748B] transition-all group"
        >
          <span className="text-[#94A3B8] group-hover:text-[#1E3A8A] transition-colors">
            <IcoSearch />
          </span>
          <span className="hidden sm:inline font-medium">Quick search...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 text-slate-500 rounded border border-slate-200">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-white/80 transition-all border border-transparent hover:border-white/60"
            title="Notifications"
          >
            <IcoBell />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Popover */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-[#0F172A]">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-extrabold text-[10px] rounded-md border border-blue-200">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    <IcoCheck /> Mark read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#94A3B8]">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotifClick(notif)}
                      className={`p-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        !notif.read ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-xs font-bold ${
                            !notif.read ? "text-[#1E3A8A]" : "text-[#0F172A]"
                          }`}
                        >
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-[#94A3B8] whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-1 font-medium leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile card */}
        <div
          onClick={() => onNav("profile")}
          className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200/70 cursor-pointer group"
          title="Go to Profile"
        >
          <div className="hidden lg:block text-right">
            <p className="text-[#0F172A] text-xs font-bold leading-tight group-hover:text-[#1E3A8A] transition-colors">
              {STUDENT.name}
            </p>
            <p className="text-[#94A3B8] text-[10px] font-mono font-medium">
              {STUDENT.id}
            </p>
          </div>
          <div className="relative">
            <InitialsAvatar size="sm" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
          </div>
        </div>
      </div>
    </header>
  )
}
