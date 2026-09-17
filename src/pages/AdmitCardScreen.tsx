import React, { useState } from "react"
import { STUDENT, EXAMS } from "../data/mockData"
import { Card, PageHeader, SectionLabel } from "../components/SharedUI"
import { IcoPrinter, IcoDownload, IcoCheck } from "../components/Icons"
import { useToast } from "../context/ToastContext"

export function AdmitCardScreen() {
  const { showToast } = useToast()
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloaded(true)
    showToast("Admit card PDF downloaded successfully.", "success")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title="Exam Admit Card"
          subtitle="Final Examination · December 2024"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E3A8A] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] bg-white/70 backdrop-blur-sm transition-colors shadow-xs"
          >
            <IcoPrinter /> Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white rounded-xl hover:opacity-90 transition-opacity shadow-md shrink-0"
          >
            <IcoDownload /> Download PDF
          </button>
        </div>
      </div>

      {downloaded && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center justify-between">
          <span>
            Admit card downloaded successfully. Ready for exam venue
            verification.
          </span>
          <span className="text-emerald-600 font-bold">PDF Ready</span>
        </div>
      )}

      {/* Clearance Checklist summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 text-xs">
            <IcoCheck />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">Fee Clearance</p>
            <p className="text-[10px] text-[#64748B]">All semester dues paid</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 text-xs">
            <IcoCheck />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">
              Attendance Rule (75%)
            </p>
            <p className="text-[10px] text-[#64748B]">
              Eligible across all 6 courses
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 text-xs">
            <IcoCheck />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">
              Library Clearance
            </p>
            <p className="text-[10px] text-[#64748B]">
              No blocking library holds
            </p>
          </div>
        </div>
      </div>

      {/* Official Admit Card Slip */}
      <Card className="overflow-hidden border border-white/80 shadow-md">
        <div className="bg-gradient-to-br from-[#0B1628] to-[#1E3A8A] px-8 py-7 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">IUT</span>
            </div>
            <div className="text-left">
              <p className="font-extrabold text-white text-lg leading-tight">
                Islamic University of Technology
              </p>
              <p className="text-white/40 text-xs mt-0.5 font-medium">
                Board Bazar, Gazipur-1704, Bangladesh
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/60 text-[11px] uppercase tracking-[0.15em] font-bold">
              Examination Admit Card
            </p>
            <p className="text-white font-bold text-sm mt-0.5">
              {STUDENT.ay} · {STUDENT.semester}
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-5 border-b border-white/40">
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { label: "Student ID", value: STUDENT.id },
              { label: "Semester", value: `Semester ${STUDENT.semNum}` },
              { label: "Student Name", value: STUDENT.name },
              { label: "Program", value: STUDENT.program },
              { label: "Department", value: STUDENT.dept },
              { label: "Batch", value: STUDENT.batch },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] text-[#94A3B8] font-semibold">
                  {label}
                </p>
                <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="sm:w-28 flex sm:flex-col items-center gap-3">
            <div className="w-24 h-28 border-2 border-white/60 rounded-xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                NA
              </div>
            </div>
            <p className="text-[10px] text-[#94A3B8] text-center font-semibold">
              Authorized Photo
            </p>
          </div>
        </div>

        <div className="p-6">
          <SectionLabel>Examination Schedule</SectionLabel>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/40 rounded-xl">
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                    Time
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Course
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Room
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/30">
                {EXAMS.map((e, i) => (
                  <tr key={i} className="hover:bg-white/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[#0F172A] text-xs">
                        {e.date}
                      </p>
                      <p className="text-[#94A3B8] text-xs font-medium">
                        {e.day}
                      </p>
                      <p className="sm:hidden text-[#64748B] text-xs font-medium mt-0.5">
                        {e.time}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] text-xs font-medium hidden sm:table-cell">
                      {e.time}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-mono font-bold text-[#1E3A8A] text-xs">
                        {e.code}
                      </p>
                      <p className="text-[#0F172A] text-xs mt-0.5 font-medium">
                        {e.title}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-[#0F172A] text-xs">
                      {e.room}
                    </td>
                    <td className="px-4 py-3 text-center text-[#64748B] text-xs font-medium hidden sm:table-cell">
                      {e.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 border-t border-white/40 flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="text-xs text-[#94A3B8] font-medium">
            <p>Verification QR / Serial: IUT-EXAM-2024-42150</p>
            <p className="mt-1 italic">
              This admit card must be presented at the examination hall with a
              valid student ID card.
            </p>
          </div>
          <div className="text-center shrink-0">
            <div className="w-36 h-px bg-[#0F172A]/20 mb-2" />
            <p className="text-xs text-[#64748B] font-bold">
              Controller of Examinations
            </p>
            <p className="text-[10px] text-[#94A3B8] font-medium">
              Islamic University of Technology
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
