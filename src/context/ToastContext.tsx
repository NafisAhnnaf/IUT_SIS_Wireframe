import React, { createContext, useContext, useState, useCallback } from "react"
import { ToastMessage } from "../types"

interface ToastContextType {
  showToast: (text: string, type?: "success" | "info" | "warning") => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback(
    (text: string, type: "success" | "info" | "warning" = "success") => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, type, text }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3500)
    },
    [],
  )

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-sm font-medium transition-all duration-300 animate-slide-up ${
              toast.type === "success"
                ? "bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/40"
                : toast.type === "warning"
                  ? "bg-amber-950/90 text-amber-100 border-amber-500/40 shadow-amber-950/40"
                  : "bg-blue-950/90 text-blue-100 border-blue-500/40 shadow-blue-950/40"
            }`}
          >
            <span className="shrink-0 text-base">
              {toast.type === "success" && "✓"}
              {toast.type === "warning" && "⚠"}
              {toast.type === "info" && "ℹ"}
            </span>
            <p className="flex-1 text-xs leading-relaxed">{toast.text}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white transition-colors text-xs p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
