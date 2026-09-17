import React, { useState } from "react"
import { STUDENT } from "../data/mockData"
import { Card, PageHeader, SectionLabel } from "../components/SharedUI"
import { IcoEdit, IcoCopy } from "../components/Icons"
import { useToast } from "../context/ToastContext"

export default function ProfileScreen() {
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    phone: STUDENT.phone,
    email: STUDENT.email,
    address: STUDENT.address,
    emergAddr: STUDENT.emergAddr,
    blood: STUDENT.blood,
  })

  function handleSave() {
    setEditing(false)
    showToast("Profile updated successfully.", "success")
  }

  function handleCancel() {
    setForm({
      phone: STUDENT.phone,
      email: STUDENT.email,
      address: STUDENT.address,
      emergAddr: STUDENT.emergAddr,
      blood: STUDENT.blood,
    })
    setEditing(false)
  }

  const copyField = (val: string, label: string) => {
    navigator.clipboard.writeText(val)
    showToast(`${label} copied to clipboard!`, "info")
  }

  const fieldClass =
    "w-full text-sm text-[#0F172A] font-medium bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#1E3A8A] focus:bg-white/80 focus:ring-2 focus:ring-[#1E3A8A]/10 transition"

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal and contact information"
        />
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-[#1E3A8A] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] transition-colors bg-white/60 backdrop-blur-sm shadow-xs shrink-0"
          >
            <IcoEdit /> Edit Profile
          </button>
        )}
      </div>

      <Card className="p-6 flex items-center gap-5 mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-lg">
          NA
        </div>
        <div>
          <p className="font-extrabold text-2xl text-[#0F172A] tracking-tight">
            {STUDENT.name}
          </p>
          <p className="text-[#64748B] text-sm mt-0.5 font-medium">
            {STUDENT.dept}
          </p>
          <p className="text-[#94A3B8] text-xs mt-1 font-medium">
            {STUDENT.program} · Batch {STUDENT.batch}
          </p>
        </div>
      </Card>

      <Card className="mb-4 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/40">
          <SectionLabel>Academic Information</SectionLabel>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Student ID", value: STUDENT.id, copyable: true },
            { label: "Academic Year", value: STUDENT.ay },
            { label: "Department", value: STUDENT.dept },
            {
              label: "Current Semester",
              value: `Semester ${STUDENT.semNum} (${STUDENT.semester})`,
            },
            { label: "Program", value: STUDENT.program },
            { label: "Batch", value: STUDENT.batch },
            {
              label: "Academic Advisor",
              value: `${STUDENT.advisorName} (${STUDENT.advisorEmail})`,
              copyable: true,
            },
            {
              label: "Degree Requirements",
              value: `${STUDENT.totalCredits} of 160 Credits Completed`,
            },
          ].map(({ label, value, copyable }) => (
            <div key={label}>
              <p className="text-[11px] text-[#94A3B8] mb-0.5 font-semibold">
                {label}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
                {copyable && (
                  <button
                    onClick={() => copyField(value, label)}
                    title={`Copy ${label}`}
                    className="text-slate-400 hover:text-[#1E3A8A] transition-colors"
                  >
                    <IcoCopy />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pb-4">
          <p className="text-[11px] text-[#94A3B8] italic font-medium">
            For academic record updates, please contact the Registrar Office.
          </p>
        </div>
      </Card>

      <Card className="mb-4 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/40">
          <SectionLabel>Personal Information</SectionLabel>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Date of Birth", value: STUDENT.dob },
            { label: "Gender", value: STUDENT.gender },
            { label: "Country", value: STUDENT.country },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-[#94A3B8] mb-0.5 font-semibold">
                {label}
              </p>
              <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
            </div>
          ))}

          {(["blood", "phone", "email"] as const).map((key) => {
            const labels: Record<string, string> = {
              blood: "Blood Group",
              phone: "Phone",
              email: "University Email",
            }
            return (
              <div key={key}>
                <p className="text-[11px] text-[#94A3B8] mb-1 font-semibold">
                  {labels[key]}
                </p>
                {editing ? (
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className={fieldClass}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {form[key]}
                    </p>
                    <button
                      onClick={() => copyField(form[key], labels[key])}
                      className="text-slate-400 hover:text-[#1E3A8A] transition-colors"
                    >
                      <IcoCopy />
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          <div className="sm:col-span-2">
            <p className="text-[11px] text-[#94A3B8] mb-1 font-semibold">
              Present Address
            </p>
            {editing ? (
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className={`${fieldClass} resize-none`}
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F172A]">
                {form.address}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <p className="text-[11px] text-[#94A3B8] mb-1 font-semibold">
              Emergency Address
            </p>
            {editing ? (
              <textarea
                value={form.emergAddr}
                onChange={(e) =>
                  setForm({ ...form, emergAddr: e.target.value })
                }
                rows={2}
                className={`${fieldClass} resize-none`}
              />
            ) : (
              <p className="text-sm font-semibold text-[#0F172A]">
                {form.emergAddr}
              </p>
            )}
          </div>
        </div>

        {editing && (
          <div className="px-5 pb-5 flex gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-gradient-to-br from-[#1E3A8A] to-[#3B5FBD] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 text-[#64748B] text-sm font-semibold border border-white/60 rounded-xl hover:bg-white/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-white/40">
          <SectionLabel>Family & Guardian</SectionLabel>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Father's Name", value: STUDENT.fatherName },
            { label: "Father's Profession", value: STUDENT.fatherProf },
            { label: "Mother's Name", value: STUDENT.motherName },
            { label: "Mother's Profession", value: STUDENT.motherProf },
            { label: "Guardian's Name", value: STUDENT.guardianName },
            { label: "Guardian's Phone", value: STUDENT.guardianPhone },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-[#94A3B8] mb-0.5 font-semibold">
                {label}
              </p>
              <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
