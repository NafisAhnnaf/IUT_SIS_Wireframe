import React, { useState } from "react"
import { STUDENT, SEMESTERS } from "../data/mockData"
import {
  Card,
  PageHeader,
  StatCard,
  StudentBanner,
  gradeChip,
} from "../components/SharedUI"
import { IcoChevronDown, IcoPrinter } from "../components/Icons"

export default function ResultScreen() {
  const [open, setOpen] = useState<Set<number>>(new Set([4, 3]))

  function toggle(id: number) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <PageHeader
        title="Academic Results"
        subtitle="Complete official academic performance and grade records"
      >
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E3A8A] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] bg-white/70 backdrop-blur-sm transition-colors shadow-xs"
        >
          <IcoPrinter /> Print Transcript
        </button>
      </PageHeader>

      <StudentBanner />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="CGPA" value={STUDENT.cgpa} sub="out of 4.00" />
        <StatCard label="Semesters" value="4" sub="completed" />
        <StatCard
          label="Credits"
          value={String(STUDENT.totalCredits)}
          sub="earned"
        />
        <StatCard label="Standing" value="Dean's" sub="List eligible" />
      </div>

      <div className="space-y-3">
        {SEMESTERS.map((sem) => {
          const isOpen = open.has(sem.id)
          const totalCr = sem.courses.reduce((s, c) => s + c.cr, 0)
          return (
            <Card key={sem.id} className="overflow-hidden">
              <button
                onClick={() => toggle(sem.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-[#0F172A] tracking-tight">
                    {sem.label}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-semibold">
                    {sem.period}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="text-[11px] text-[#94A3B8] font-semibold">
                      Semester GPA
                    </span>
                    <span className="font-extrabold text-[#0F172A] text-sm font-mono">
                      {sem.gpa}
                    </span>
                  </div>
                  <span className="text-[#94A3B8]">
                    <IcoChevronDown open={isOpen} />
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-white/40">
                  <div className="sm:hidden px-5 py-2 bg-white/30 text-xs text-[#64748B] font-semibold">
                    Semester GPA:{" "}
                    <span className="font-extrabold text-[#0F172A]">
                      {sem.gpa}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/30">
                          <th className="text-left px-5 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                            Code
                          </th>
                          <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                            Course Title
                          </th>
                          <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                            Cr.
                          </th>
                          <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                            Points
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/30">
                        {sem.courses.map((c, i) => (
                          <tr
                            key={i}
                            className="hover:bg-white/30 transition-colors"
                          >
                            <td className="px-5 py-3">
                              <span className="text-xs font-mono font-bold text-[#1E3A8A]">
                                {c.code}
                              </span>
                              <p className="sm:hidden text-xs text-[#64748B] mt-0.5 font-medium">
                                {c.title}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-[#0F172A] text-sm font-medium hidden sm:table-cell">
                              {c.title}
                            </td>
                            <td className="px-4 py-3 text-center text-[#64748B] text-sm font-semibold">
                              {c.cr}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold ${gradeChip(c.grade)}`}
                              >
                                {c.grade}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-[#64748B] text-sm font-semibold hidden sm:table-cell">
                              {c.pts.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-white/30 border-t border-white/40">
                          <td
                            colSpan={2}
                            className="px-5 py-3 text-xs font-bold text-[#64748B]"
                          >
                            Total Credits: {totalCr}
                          </td>
                          <td className="px-4 py-3 text-center text-xs font-bold text-[#64748B]">
                            {totalCr}
                          </td>
                          <td className="px-4 py-3 text-center text-xs font-extrabold text-[#0F172A]">
                            GPA {sem.gpa}
                          </td>
                          <td className="hidden sm:table-cell" />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <p className="mt-4 text-[11px] text-[#94A3B8] italic font-medium">
        Disclaimer: In case of discrepancy in result, the record kept at the
        Registrar Office shall be considered final.
      </p>
    </div>
  )
}
