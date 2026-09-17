import React from "react"
import { STUDENT } from "../data/mockData"
import { useToast } from "../context/ToastContext"
import { IcoCopy } from "./Icons"

export function InitialsAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-20 h-20 text-xl",
  }[size]
  return (
    <div
      className={`${cls} rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white flex items-center justify-center font-bold shrink-0 tracking-wide shadow-md`}
    >
      NA
    </div>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white/75 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">
      {children}
    </p>
  )
}

export function StatCard({
  label,
  value,
  sub,
  trend,
  className = "",
}: {
  label: string
  value: string
  sub?: string
  trend?: string
  className?: string
}) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <SectionLabel>{label}</SectionLabel>
        {trend && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {trend}
          </span>
        )}
      </div>
      <p className="text-[2rem] font-extrabold leading-none text-[#0F172A] mt-2 tracking-tight">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-[#94A3B8] mt-1.5 font-medium">{sub}</p>
      )}
    </div>
  )
}

export function StudentBanner() {
  const { showToast } = useToast()

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(STUDENT.id)
    showToast(`Student ID ${STUDENT.id} copied to clipboard!`, "info")
  }

  return (
    <Card className="p-5 flex items-center gap-4 mb-5">
      <InitialsAvatar size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#0F172A] text-base leading-tight">
          {STUDENT.name}
        </p>
        <p className="text-[#64748B] text-xs mt-0.5">{STUDENT.dept}</p>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-0.5 shrink-0">
        <span className="text-[11px] text-[#94A3B8] font-medium">
          Student ID
        </span>
        <button
          onClick={handleCopyId}
          title="Click to copy ID"
          className="group flex items-center gap-1.5 font-mono font-bold text-[#1E3A8A] text-sm hover:text-[#3B5FBD] transition-colors"
        >
          {STUDENT.id}
          <span className="text-slate-400 group-hover:text-[#1E3A8A] transition-colors">
            <IcoCopy />
          </span>
        </button>
        <span className="text-[11px] text-[#94A3B8] mt-1 font-medium">
          {STUDENT.ay} · Sem {STUDENT.semNum}
        </span>
      </div>
    </Card>
  )
}

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-extrabold text-2xl md:text-[1.875rem] text-[#0F172A] leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#94A3B8] mt-1 font-medium">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2.5 shrink-0">{children}</div>
      )}
    </div>
  )
}

export function gradeChip(grade: string) {
  if (grade.startsWith("A"))
    return "bg-emerald-50 text-emerald-700 border border-emerald-200"
  if (grade.startsWith("B"))
    return "bg-blue-50 text-blue-700 border border-blue-200"
  if (grade.startsWith("C"))
    return "bg-amber-50 text-amber-700 border border-amber-200"
  return "bg-red-50 text-red-700 border border-red-200"
}

export function loanStatus(daysLeft: number) {
  if (daysLeft < 0)
    return {
      label: `${Math.abs(daysLeft)}d overdue`,
      cls: "bg-red-50 text-red-700 border border-red-200",
      dot: "bg-red-500",
    }
  if (daysLeft <= 7)
    return {
      label: `Due in ${daysLeft}d`,
      cls: "bg-amber-50 text-amber-700 border border-amber-200",
      dot: "bg-amber-500",
    }
  return {
    label: `${daysLeft}d remaining`,
    cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  }
}
