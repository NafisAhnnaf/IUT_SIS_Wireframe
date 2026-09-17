import React, { useState } from "react"
import { SEMESTERS, STUDENT } from "../data/mockData"
import { Card, SectionLabel } from "./SharedUI"
import { IcoChevronRight } from "./Icons"

export default function CgpaTrendChart({
  onViewResults,
}: {
  onViewResults?: () => void
}) {
  const [activeSemIndex, setActiveSemIndex] = useState<number | null>(null)

  // Semesters chronological order: Sem 1 to Sem 4
  const data = [...SEMESTERS].sort((a, b) => a.id - b.id)
  const minGpa = 3.2
  const maxGpa = 4.0

  // SVG dimensions
  const width = 360
  const height = 120
  const paddingX = 35
  const paddingY = 20

  const getX = (index: number) => {
    return paddingX + (index / (data.length - 1)) * (width - paddingX * 2)
  }

  const getY = (gpa: number) => {
    const ratio = (gpa - minGpa) / (maxGpa - minGpa)
    return height - paddingY - ratio * (height - paddingY * 2)
  }

  const points = data.map((sem, i) => ({
    x: getX(i),
    y: getY(parseFloat(sem.gpa)),
    sem,
  }))

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    // Bezier control point for smooth curve
    const prev = points[i - 1]
    const cx1 = prev.x + (p.x - prev.x) / 2
    const cy1 = prev.y
    const cx2 = prev.x + (p.x - prev.x) / 2
    const cy2 = p.y
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`
  }, "")

  // Area under curve for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  // Dean's list threshold line (3.75)
  const deansListY = getY(3.75)

  const activeSem =
    activeSemIndex !== null ? data[activeSemIndex] : data[data.length - 1]

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>CGPA Progression</SectionLabel>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Current: {STUDENT.cgpa}
          </span>
        </div>

        {/* Highlight Banner */}
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {activeSem.gpa}{" "}
              <span className="text-xs text-[#64748B] font-semibold">
                in {activeSem.label}
              </span>
            </p>
            <p className="text-[10px] text-[#94A3B8] font-medium">
              {activeSem.period} · {activeSem.courses.length} courses
            </p>
          </div>
          <span className="text-[10px] text-indigo-600 font-bold">
            {parseFloat(activeSem.gpa) >= 3.75
              ? "★ Dean's Honor Roll"
              : "In Good Standing"}
          </span>
        </div>

        {/* SVG Interactive Chart */}
        <div className="relative w-full h-32 my-1">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Threshold Line: 3.75 Dean's List */}
            <line
              x1={paddingX}
              y1={deansListY}
              x2={width - paddingX}
              y2={deansListY}
              stroke="#CBD5E1"
              strokeDasharray="4 3"
              strokeWidth="1"
            />
            <text
              x={width - paddingX + 4}
              y={deansListY + 3}
              fill="#94A3B8"
              fontSize="8"
              fontWeight="600"
            >
              3.75
            </text>

            {/* Gradient Fill */}
            <path d={areaD} fill="url(#cgpaGradient)" />

            {/* Curved Trend Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Data Points */}
            {points.map((p, i) => {
              const isActive =
                activeSemIndex === i ||
                (activeSemIndex === null && i === points.length - 1)
              return (
                <g
                  key={i}
                  onMouseEnter={() => setActiveSemIndex(i)}
                  onMouseLeave={() => setActiveSemIndex(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 5 : 3.5}
                    fill={isActive ? "#1E3A8A" : "#2563EB"}
                    stroke="#FFFFFF"
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="transition-all duration-150"
                  />
                  <text
                    x={p.x}
                    y={height - 5}
                    textAnchor="middle"
                    fill={isActive ? "#0F172A" : "#94A3B8"}
                    fontSize="9"
                    fontWeight={isActive ? "700" : "500"}
                  >
                    S{p.sem.id}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {onViewResults && (
        <button
          onClick={onViewResults}
          className="text-[11px] font-bold text-[#1E3A8A] hover:underline flex items-center justify-between pt-2.5 border-t border-slate-100 group"
        >
          <span>View Detailed Semester Breakdown</span>
          <span className="group-hover:translate-x-0.5 transition-transform">
            <IcoChevronRight />
          </span>
        </button>
      )}
    </Card>
  )
}
export { CgpaTrendChart }
