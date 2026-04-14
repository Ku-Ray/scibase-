'use client'

import type { AnalysisAxis } from '@/lib/types'

export interface RadarData {
  axis:    AnalysisAxis
  label:   string
  emoji:   string
  score:   number   // 0–10
  max:     number   // always 10
}

interface Props {
  data:   RadarData[]
  size?:  number
}

const RINGS = [2, 4, 6, 8, 10]

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.sin(angleRad),
    y: cy - r * Math.cos(angleRad),
  }
}

export function RadarChart({ data, size = 320 }: Props) {
  const n      = data.length
  const cx     = size / 2
  const cy     = size / 2
  const rMax   = size * 0.38   // max radius
  const step   = (2 * Math.PI) / n

  /* ring polygon points */
  const ringPoints = (ratio: number) =>
    data.map((_, i) => {
      const p = polarToCartesian(cx, cy, rMax * ratio, i * step)
      return `${p.x},${p.y}`
    }).join(' ')

  /* score polygon points */
  const scorePoints = data.map((d, i) => {
    const r = rMax * (d.score / d.max)
    const p = polarToCartesian(cx, cy, r, i * step)
    return `${p.x},${p.y}`
  }).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[360px] mx-auto"
      aria-label="サプリメント評価レーダーチャート"
    >
      {/* ── Background rings ─── */}
      {RINGS.map(v => (
        <polygon
          key={v}
          points={ringPoints(v / 10)}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity={v === 10 ? 0.6 : 0.4}
        />
      ))}

      {/* ── Axis lines ─── */}
      {data.map((_, i) => {
        const outer = polarToCartesian(cx, cy, rMax, i * step)
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={outer.x} y2={outer.y}
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.5"
          />
        )
      })}

      {/* ── Score polygon ─── */}
      <polygon
        points={scorePoints}
        fill="var(--color-accent)"
        fillOpacity="0.18"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* ── Score dots ─── */}
      {data.map((d, i) => {
        const r = rMax * (d.score / d.max)
        const p = polarToCartesian(cx, cy, r, i * step)
        return (
          <circle
            key={i}
            cx={p.x} cy={p.y} r="4"
            fill="var(--color-accent)"
            stroke="white"
            strokeWidth="1.5"
          />
        )
      })}

      {/* ── Labels ─── */}
      {data.map((d, i) => {
        const labelR = rMax + 30
        const p      = polarToCartesian(cx, cy, labelR, i * step)
        const anchor = p.x < cx - 2 ? 'end' : p.x > cx + 2 ? 'start' : 'middle'

        return (
          <g key={i}>
            {/* emoji */}
            <text
              x={p.x} y={p.y - 6}
              textAnchor={anchor}
              fontSize="14"
              dominantBaseline="middle"
            >
              {d.emoji}
            </text>
            {/* label */}
            <text
              x={p.x} y={p.y + 12}
              textAnchor={anchor}
              fontSize="10"
              fill="var(--color-muted-foreground)"
              dominantBaseline="middle"
              fontWeight="500"
            >
              {d.label}
            </text>
            {/* score */}
            <text
              x={p.x} y={p.y + 24}
              textAnchor={anchor}
              fontSize="11"
              fill="var(--color-foreground)"
              dominantBaseline="middle"
              fontWeight="700"
            >
              {d.score.toFixed(1)}
            </text>
          </g>
        )
      })}

      {/* ── Center dot ─── */}
      <circle cx={cx} cy={cy} r="3" fill="var(--color-border)" />
    </svg>
  )
}
