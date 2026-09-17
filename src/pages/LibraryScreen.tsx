import React, { useState } from "react"
import { LIBRARY_CURRENT, LIBRARY_HISTORY } from "../data/mockData"
import {
  Card,
  PageHeader,
  StatCard,
  SectionLabel,
  loanStatus,
} from "../components/SharedUI"
import { IcoClock } from "../components/Icons"
import { useToast } from "../context/ToastContext"

export default function LibraryScreen() {
  const { showToast } = useToast()
  const [currentBooks, setCurrentBooks] = useState(LIBRARY_CURRENT)

  const overdue = currentBooks.filter((b) => b.daysLeft < 0).length
  const dueSoon = currentBooks.filter(
    (b) => b.daysLeft >= 0 && b.daysLeft <= 7,
  ).length

  const handleRenewBook = (bookId: string, title: string) => {
    setCurrentBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, due: "15 Jan 2025", daysLeft: 30 } : b,
      ),
    )
    showToast(`"${title}" has been renewed for 30 additional days!`, "success")
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <PageHeader
        title="Library"
        subtitle="IUT Central Library · Book Management & Renewals"
      />

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard
          label="Books Borrowed"
          value={`${currentBooks.length}/5`}
          sub="borrowing limit"
        />
        <StatCard
          label="Due Soon"
          value={String(dueSoon)}
          sub="within 7 days"
        />
        <StatCard
          label="Overdue"
          value={String(overdue)}
          sub="return immediately"
        />
      </div>

      {/* Overdue alert */}
      {overdue > 0 && (
        <div className="flex gap-3 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200 mb-5">
          <div className="w-0.5 rounded-full bg-red-500 shrink-0" />
          <div>
            <p className="text-xs font-bold text-red-700">Overdue Notice</p>
            <p className="text-xs text-red-600 mt-0.5 font-medium leading-relaxed">
              You have {overdue} overdue book{overdue > 1 ? "s" : ""}. A fine of
              BDT 5 per day is charged for late returns. Please return them as
              soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Currently borrowed */}
      <Card className="overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-white/40 flex items-center justify-between">
          <SectionLabel>Currently Borrowed</SectionLabel>
          <span className="text-[11px] text-[#94A3B8] font-semibold">
            {currentBooks.length} books
          </span>
        </div>
        <div className="divide-y divide-white/30">
          {currentBooks.map((book) => {
            const st = loanStatus(book.daysLeft)
            return (
              <div
                key={book.id}
                className="px-5 py-4 hover:bg-white/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-[#0F172A] text-sm leading-tight">
                        {book.title}
                      </p>
                      <span
                        className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${st.cls}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
                        />
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] font-medium">
                      {book.author}
                    </p>
                    <p className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
                      {book.isbn}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-white/50 border border-white/60 text-[10px] font-bold text-[#64748B] hidden sm:block">
                      {book.category}
                    </span>
                    {book.daysLeft >= 0 && (
                      <button
                        onClick={() => handleRenewBook(book.id, book.title)}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition shadow-2xs"
                      >
                        Renew (+30d)
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/30">
                  <div className="flex items-center gap-1.5">
                    <IcoClock />
                    <span className="text-[11px] text-[#94A3B8] font-semibold">
                      Issued
                    </span>
                    <span className="text-[11px] font-bold text-[#0F172A]">
                      {book.issued}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IcoClock />
                    <span className="text-[11px] text-[#94A3B8] font-semibold">
                      Due
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        book.daysLeft < 0
                          ? "text-red-600"
                          : book.daysLeft <= 7
                            ? "text-amber-600"
                            : "text-[#0F172A]"
                      }`}
                    >
                      {book.due}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#94A3B8] hidden sm:block ml-auto">
                    {book.id}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Borrowing history */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-white/40 flex items-center justify-between">
          <SectionLabel>Borrowing History</SectionLabel>
          <span className="text-[11px] text-[#94A3B8] font-semibold">
            {LIBRARY_HISTORY.length} records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/30">
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  Book
                </th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                  Author
                </th>
                <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                  Issued
                </th>
                <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  Returned
                </th>
                <th className="text-center px-4 py-2.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/30">
              {LIBRARY_HISTORY.map((book, i) => (
                <tr key={i} className="hover:bg-white/30 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-[#0F172A] text-xs leading-tight">
                      {book.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
                      {book.isbn}
                    </p>
                    <p className="md:hidden text-xs text-[#64748B] mt-0.5 font-medium">
                      {book.author}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B] font-medium hidden md:table-cell">
                    {book.author}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-[#64748B] font-semibold hidden sm:table-cell">
                    {book.issued}
                  </td>
                  <td className="px-4 py-3 text-center text-xs font-semibold text-[#0F172A]">
                    {book.returned}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        book.status === "On Time"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
