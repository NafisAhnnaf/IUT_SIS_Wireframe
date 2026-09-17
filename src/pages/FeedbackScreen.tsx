import React, { useState } from "react"
import { STUDENT, FEEDBACK_INIT } from "../data/mockData"
import {
  Card,
  PageHeader,
  SectionLabel,
  StudentBanner,
} from "../components/SharedUI"
import { IcoStar, IcoClose } from "../components/Icons"
import { useToast } from "../context/ToastContext"

export function FeedbackScreen() {
  const { showToast } = useToast()
  const [items, setItems] = useState(FEEDBACK_INIT)
  const [modal, setModal] = useState<number | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const pending = items.filter((i) => i.status === "Pending").length

  function submit() {
    if (modal === null) return
    const courseTitle = items[modal].title
    setItems(
      items.map((item, i) =>
        i === modal ? { ...item, status: "Evaluated" } : item,
      ),
    )
    setModal(null)
    setRating(0)
    setComment("")
    showToast(`Evaluation submitted for ${courseTitle}!`, "success")
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title="Course Feedback"
          subtitle={`${STUDENT.ay} · ${STUDENT.semester}`}
        />
        {pending > 0 && (
          <span className="mt-1 px-3 py-1.5 bg-amber-50/80 backdrop-blur-sm text-amber-700 border border-amber-200 rounded-full text-xs font-bold shrink-0">
            {pending} pending
          </span>
        )}
      </div>

      <StudentBanner />

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-white/40 flex items-center justify-between">
          <SectionLabel>Feedback Status</SectionLabel>
          <span className="text-[11px] text-[#94A3B8] font-semibold">
            {items.length} courses
          </span>
        </div>
        <div className="divide-y divide-white/30">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 hover:bg-white/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono font-bold text-[#94A3B8]">
                  {item.code}
                </p>
                <p className="text-sm font-semibold text-[#0F172A] truncate mt-0.5">
                  {item.title}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  {item.teacher}
                </p>
              </div>
              {item.status === "Evaluated" ? (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shrink-0">
                  Evaluated
                </span>
              ) : (
                <button
                  onClick={() => setModal(i)}
                  className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold shrink-0 hover:bg-amber-100 transition-colors"
                >
                  Give Feedback
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 w-full max-w-md">
            <div className="flex items-start justify-between p-5 border-b border-white/40">
              <div>
                <p className="font-bold text-[#0F172A]">{items[modal].title}</p>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  {items[modal].teacher}
                </p>
                <p className="text-[11px] font-mono font-bold text-[#94A3B8] mt-0.5">
                  {items[modal].code}
                </p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
              >
                <IcoClose />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm font-bold text-[#0F172A] mb-2">
                Overall Rating
              </p>
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    className="hover:scale-110 transition-transform"
                  >
                    <IcoStar filled={n <= rating} />
                  </button>
                ))}
              </div>
              <label className="block text-sm font-bold text-[#0F172A] mb-1.5">
                Comments{" "}
                <span className="text-[#94A3B8] font-medium">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this course..."
                rows={3}
                className="w-full text-sm bg-white/60 border border-white/60 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 resize-none transition font-medium"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={submit}
                  disabled={rating === 0}
                  className="flex-1 py-2.5 bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-md"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#64748B] border border-white/60 rounded-xl hover:bg-white/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
