import React, { useState } from "react"
import { Card, PageHeader } from "../components/SharedUI"
import { IcoEye } from "../components/Icons"
import { useToast } from "../context/ToastContext"

export default function ChangePasswordScreen() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ current: "", next: "", confirm: "" })
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  })
  const [error, setError] = useState("")

  const strength =
    form.next.length === 0
      ? 0
      : form.next.length < 8
        ? 1
        : form.next.length < 12
          ? 2
          : 3
  const strengthMeta = [
    { label: "", color: "" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Good", color: "bg-amber-400" },
    { label: "Strong", color: "bg-emerald-500" },
  ][strength]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    if (!form.current) {
      setError("Please enter your current password.")
      return
    }
    if (form.next.length < 8) {
      setError("New password must be at least 8 characters.")
      return
    }
    if (form.next !== form.confirm) {
      setError("New passwords do not match.")
      return
    }
    setForm({ current: "", next: "", confirm: "" })
    showToast(
      "Password updated successfully! Use new password on next login.",
      "success",
    )
  }

  const inputClass =
    "w-full pr-11 text-sm bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#1E3A8A] focus:bg-white/80 focus:ring-2 focus:ring-[#1E3A8A]/10 transition font-medium"

  return (
    <div className="p-4 md:p-8 max-w-lg">
      <PageHeader
        title="Change Password"
        subtitle="Keep your account secure with a strong password."
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {(["current", "next", "confirm"] as const).map((key) => {
            const labels = {
              current: "Current Password",
              next: "New Password",
              confirm: "Confirm New Password",
            }
            const placeholders = {
              current: "Enter current password",
              next: "Minimum 8 characters",
              confirm: "Re-enter new password",
            }
            return (
              <div key={key}>
                <label className="block text-sm font-bold text-[#0F172A] mb-1.5">
                  {labels[key]}
                </label>
                <div className="relative">
                  <input
                    type={show[key] ? "text" : "password"}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    placeholder={placeholders[key]}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  >
                    <IcoEye visible={show[key]} />
                  </button>
                </div>

                {key === "next" && form.next.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            n <= strength
                              ? strengthMeta.color
                              : "bg-white/50 border border-white/60"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-medium">
                      Strength:{" "}
                      <span className="font-bold text-[#0F172A]">
                        {strengthMeta.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )
          })}

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Update Password
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-white/40">
          <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
            Password requirements: minimum 8 characters. Use a mix of letters,
            numbers, and symbols for a stronger password.
          </p>
        </div>
      </Card>
    </div>
  )
}
