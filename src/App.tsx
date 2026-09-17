import React, { useState, useEffect } from "react"
import { Screen } from "./types"
import { ToastProvider } from "./context/ToastContext"
import Sidebar from "./components/Sidebar"
import TopBar from "./components/TopBar"
import SearchModal from "./components/SearchModal"

import DashboardScreen from "./pages/DashboardScreen"
import RoutineScreen from "./pages/RoutineScreen"
import RegistrationScreen from "./pages/RegistrationScreen"
import ProfileScreen from "./pages/ProfileScreen"
import FeedbackScreen from "./pages/FeedbackScreen"
import ResultScreen from "./pages/ResultScreen"
import AdmitCardScreen from "./pages/AdmitCardScreen"
import LibraryScreen from "./pages/LibraryScreen"
import ChangePasswordScreen from "./pages/ChangePasswordScreen"

function AppContent() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  function navigate(s: Screen) {
    setScreen(s)
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }

  // Global Ctrl+K / Cmd+K keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 print:bg-white print:h-auto print:overflow-visible">
      {/* Desktop sidebar - hidden on print */}
      <div className="hidden md:flex h-full print:hidden">
        <Sidebar screen={screen} onNav={navigate} />
      </div>

      {/* Mobile drawer - hidden on print */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex print:hidden">
          <div className="w-64 h-full shrink-0">
            <Sidebar
              screen={screen}
              onNav={navigate}
              onClose={() => setMobileOpen(false)}
            />
          </div>
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main viewport */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 print:overflow-visible print:h-auto">
        {/* Top bar header - hidden on print */}
        <div className="print:hidden">
          <TopBar
            screen={screen}
            onMenuClick={() => setMobileOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            onNav={navigate}
          />
        </div>

        {/* Screen Content */}
        <main className="flex-1 overflow-y-auto print:overflow-visible">
          {screen === "dashboard" && <DashboardScreen onNav={navigate} />}
          {screen === "routine" && <RoutineScreen />}
          {screen === "registration" && <RegistrationScreen />}
          {screen === "profile" && <ProfileScreen />}
          {screen === "feedback" && <FeedbackScreen />}
          {screen === "result" && <ResultScreen />}
          {screen === "admit-card" && <AdmitCardScreen />}
          {screen === "library" && <LibraryScreen />}
          {screen === "change-password" && <ChangePasswordScreen />}
        </main>

        {/* Global Footer - hidden on print */}
        <footer className="px-6 py-3 border-t border-white/40 bg-white/50 backdrop-blur-md shrink-0 print:hidden flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#94A3B8] font-medium gap-1">
          <p>
            2026 &copy; Islamic University of Technology &middot; Student
            Information System
          </p>
          <p className="font-mono">
            Department of Computer Science &amp; Engineering
          </p>
        </footer>
      </div>

      {/* Command Palette Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNav={navigate}
      />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
