import React, { useState } from "react"
import { RegistrationCourse } from "../types"
import {
  STUDENT,
  REGISTRATION_SESSION,
  REGISTRATION_COURSES,
} from "../data/mockData"
import { Card, PageHeader, SectionLabel } from "../components/SharedUI"
import {
  IcoRegistration,
  IcoCheck,
  IcoPrinter,
  IcoUser,
  IcoShield,
  IcoClose,
} from "../components/Icons"
import { useToast } from "../context/ToastContext"

export default function RegistrationScreen() {
  const { showToast } = useToast()
  const [courses, setCourses] =
    useState<RegistrationCourse[]>(REGISTRATION_COURSES)
  const [activeTab, setActiveTab] =
    useState<"All" | "Core" | "Elective" | "Humanities">("All")
  const [submissionStatus, setSubmissionStatus] =
    useState<"Draft" | "Submitted" | "Approved">("Draft")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Toggle course selection
  const handleToggleCourse = (courseId: string) => {
    if (submissionStatus === "Submitted") {
      showToast(
        "Cannot modify courses after submission without advisor unlock.",
        "warning",
      )
      return
    }

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const nextSelected = !c.isSelected
          // Calculate proposed total
          const currentTotal = prev
            .filter((x) => x.isSelected)
            .reduce((acc, curr) => acc + curr.credits, 0)
          const proposed = nextSelected
            ? currentTotal + c.credits
            : currentTotal - c.credits

          if (nextSelected && proposed > REGISTRATION_SESSION.maxCredits) {
            showToast(
              `Credit limit exceeded! Maximum allowed is ${REGISTRATION_SESSION.maxCredits} credits.`,
              "warning",
            )
            return c
          }
          return { ...c, isSelected: nextSelected }
        }
        return c
      }),
    )
  }

  const selectedCourses = courses.filter((c) => c.isSelected)
  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0)
  const theoryCredits = selectedCourses
    .filter((c) => c.type === "Theory")
    .reduce((sum, c) => sum + c.credits, 0)
  const labCredits = selectedCourses
    .filter((c) => c.type === "Lab")
    .reduce((sum, c) => sum + c.credits, 0)

  const isValidCreditRange =
    totalCredits >= REGISTRATION_SESSION.minCredits &&
    totalCredits <= REGISTRATION_SESSION.maxCredits

  const handleSaveDraft = () => {
    showToast("Registration draft saved successfully.", "info")
  }

  const handleSubmitRegistration = () => {
    if (!isValidCreditRange) {
      showToast(
        `Selected credits (${totalCredits.toFixed(1)}) must be between ${REGISTRATION_SESSION.minCredits} and ${REGISTRATION_SESSION.maxCredits}.`,
        "warning",
      )
      return
    }
    setShowConfirmModal(true)
  }

  const confirmSubmission = () => {
    setSubmissionStatus("Submitted")
    setShowConfirmModal(false)
    showToast(
      "Course registration successfully submitted to Academic Advisor!",
      "success",
    )
  }

  const handlePrintSlip = () => {
    window.print()
  }

  const filteredCourses = courses.filter((c) => {
    if (activeTab === "All") return true
    return c.category === activeTab
  })

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Header */}
      <PageHeader
        title="Semester Course Registration"
        subtitle={`Session ${REGISTRATION_SESSION.academicYear} · ${REGISTRATION_SESSION.semesterName}`}
      >
        <button
          onClick={handlePrintSlip}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E3A8A] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] bg-white/70 backdrop-blur-sm transition-colors shadow-xs"
        >
          <IcoPrinter /> Print Registration Slip
        </button>
      </PageHeader>

      {/* Banner: Registration Session Status */}
      <div className="mb-5 p-5 rounded-2xl bg-gradient-to-r from-[#0B1628] to-[#1E3A8A] text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <IcoRegistration />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {REGISTRATION_SESSION.status}
              </span>
              <span className="text-white/60 text-xs font-medium">
                Deadline:{" "}
                <strong className="text-white">
                  {REGISTRATION_SESSION.deadlineDate}
                </strong>
              </span>
            </div>
            <h2 className="text-lg font-extrabold mt-1 tracking-tight">
              {REGISTRATION_SESSION.semesterName}
            </h2>
            <p className="text-white/60 text-xs mt-0.5 font-medium">
              Academic Advisor: {STUDENT.advisorName} ({STUDENT.advisorDept})
            </p>
          </div>
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-white/10 shrink-0">
          <span className="text-xs text-white/50 font-medium">Status</span>
          <span
            className={`text-xs font-extrabold px-3 py-1 rounded-lg mt-1 ${
              submissionStatus === "Submitted"
                ? "bg-blue-500/30 text-blue-200 border border-blue-400/30"
                : "bg-amber-500/30 text-amber-200 border border-amber-400/30"
            }`}
          >
            {submissionStatus === "Submitted"
              ? "Submitted for Advisor Approval"
              : "Draft (Pending Submission)"}
          </span>
        </div>
      </div>

      {/* Credit Load Progress Meter Card */}
      <Card className="p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <SectionLabel>Credit Load Calculator</SectionLabel>
            <p className="text-sm font-extrabold text-[#0F172A] mt-0.5">
              Enrolled:{" "}
              <span className="text-[#1E3A8A] text-lg font-black">
                {totalCredits.toFixed(1)}
              </span>
              <span className="text-[#94A3B8] font-normal text-xs ml-1">
                / {REGISTRATION_SESSION.maxCredits} max allowed
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#64748B]">
              Theory:{" "}
              <strong className="text-[#0F172A]">
                {theoryCredits.toFixed(1)} cr
              </strong>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-[#64748B]">
              Lab:{" "}
              <strong className="text-[#0F172A]">
                {labCredits.toFixed(1)} cr
              </strong>
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isValidCreditRange
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {isValidCreditRange
                ? "✓ Valid Credit Range"
                : "⚠ Outside Credit Bounds"}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isValidCreditRange
                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                : "bg-gradient-to-r from-red-500 to-rose-600"
            }`}
            style={{
              width: `${Math.min((totalCredits / REGISTRATION_SESSION.maxCredits) * 100, 100)}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-[11px] text-[#94A3B8] font-medium">
          <span>Min Required: {REGISTRATION_SESSION.minCredits} Credits</span>
          <span>Target: ~19.5 Credits</span>
          <span>Max Allowed: {REGISTRATION_SESSION.maxCredits} Credits</span>
        </div>
      </Card>

      {/* Clearances & Pre-requisite Checks Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="p-4 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <IcoCheck />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0F172A]">
              Advisor Pre-clearance
            </p>
            <p className="text-[10px] text-[#64748B] font-medium">
              Granted by Dr. Raihan Kamal
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <IcoShield />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0F172A]">
              Accounts Clearance
            </p>
            <p className="text-[10px] text-[#64748B] font-medium">
              Semester dues cleared
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-white/60 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <IcoCheck />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0F172A]">
              Schedule Conflict Check
            </p>
            <p className="text-[10px] text-[#64748B] font-medium">
              0 time slot collisions
            </p>
          </div>
        </div>
      </div>

      {/* Course Catalog & Selection */}
      <Card className="overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <SectionLabel>Offered Courses for Semester 5</SectionLabel>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">
              Select mandatory core subjects and your preferred departmental
              electives.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(["All", "Core", "Elective", "Humanities"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === tab
                    ? "bg-white text-[#1E3A8A] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Rows */}
        <div className="divide-y divide-slate-100">
          {filteredCourses.map((course) => {
            const isEnrolled = !!course.isSelected

            return (
              <div
                key={course.id}
                className={`p-4 sm:p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isEnrolled ? "bg-blue-50/30" : "hover:bg-slate-50/60"
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => handleToggleCourse(course.id)}
                    disabled={submissionStatus === "Submitted"}
                    className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      isEnrolled
                        ? "bg-[#1E3A8A] border-[#1E3A8A] text-white"
                        : "border-slate-300 bg-white hover:border-[#1E3A8A]"
                    } ${
                      submissionStatus === "Submitted"
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isEnrolled && <IcoCheck />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-xs text-[#1E3A8A] bg-blue-100/60 px-2 py-0.5 rounded-md">
                        {course.code}
                      </span>
                      <span className="text-xs font-bold text-[#0F172A]">
                        {course.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          course.type === "Lab"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {course.type} · {course.credits.toFixed(1)} Cr
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {course.section}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] font-medium line-clamp-1">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <IcoUser /> Instructor:{" "}
                        <strong className="text-slate-700">
                          {course.instructor}
                        </strong>
                      </span>
                      <span>·</span>
                      <span>Schedule: {course.scheduleTime}</span>
                      {course.prerequisite && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            ✓ {course.prerequisite}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Seat capacity & action button */}
                <div className="flex items-center md:flex-col items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <p className="text-[10px] text-[#94A3B8] font-medium">
                      Seats:{" "}
                      <strong className="text-slate-700">
                        {course.seatsTaken}/{course.seatsTotal}
                      </strong>
                    </p>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-slate-400 rounded-full"
                        style={{
                          width: `${(course.seatsTaken / course.seatsTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCourse(course.id)}
                    disabled={submissionStatus === "Submitted"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isEnrolled
                        ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                        : "bg-[#1E3A8A] text-white hover:opacity-90 shadow-xs"
                    } ${
                      submissionStatus === "Submitted"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isEnrolled ? "Remove" : "Enroll"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Submission Actions */}
      <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-extrabold text-sm text-[#0F172A]">
            Selected: {selectedCourses.length} Courses (
            {totalCredits.toFixed(1)} Total Credits)
          </p>
          <p className="text-xs text-[#64748B] mt-0.5">
            {submissionStatus === "Submitted"
              ? "Your registration form has been formally submitted. Advisor approval pending."
              : "Review your enrolled courses before submitting for final advisor endorsement."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSaveDraft}
            disabled={submissionStatus === "Submitted"}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>

          {submissionStatus === "Submitted" ? (
            <span className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
              <IcoCheck /> Form Submitted
            </span>
          ) : (
            <button
              onClick={handleSubmitRegistration}
              disabled={!isValidCreditRange}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white hover:opacity-95 transition-opacity shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit to Advisor
            </button>
          )}
        </div>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/80 w-full max-w-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">
                  <IcoRegistration />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#0F172A]">
                    Confirm Course Registration
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Semester 5 (Autumn 2024–2025)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <IcoClose />
              </button>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              You are about to submit{" "}
              <strong>{selectedCourses.length} courses</strong> totaling{" "}
              <strong>{totalCredits.toFixed(1)} credits</strong> to your
              academic advisor <strong>{STUDENT.advisorName}</strong>. Once
              submitted, changes require advisor clearance.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-5 space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Theory Credits</span>
                <span>{theoryCredits.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Lab Credits</span>
                <span>{labCredits.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-[#1E3A8A] pt-1 border-t border-slate-200">
                <span>Total Registered</span>
                <span>{totalCredits.toFixed(1)} / 22.5</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={confirmSubmission}
                className="flex-1 py-2.5 bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-md transition"
              >
                Confirm & Submit
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-[#64748B] border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
