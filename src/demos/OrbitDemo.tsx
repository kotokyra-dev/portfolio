import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/context'

const TOTAL_DAYS = 90

const SERIES: number[] = (() => {
  let seed = 17
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  let value = 2600
  const values: number[] = []
  for (let i = 0; i < TOTAL_DAYS; i += 1) {
    value += (random() - 0.44) * 380
    values.push(Math.round(Math.max(900, value)))
  }
  return values
})()

const PERIODS = [7, 30, 90] as const
type Period = (typeof PERIODS)[number]

const copy = {
  ru: {
    revenue: 'Выручка',
    average: 'В среднем за день',
    best: 'Лучший день',
    period: 'Период',
    days: (n: number) => `${n} дн.`,
    channels: 'Источники трафика',
    channelNames: ['Органика', 'Реклама', 'Соцсети', 'Email'],
  },
  en: {
    revenue: 'Revenue',
    average: 'Daily average',
    best: 'Best day',
    period: 'Period',
    days: (n: number) => `${n} days`,
    channels: 'Traffic sources',
    channelNames: ['Organic', 'Ads', 'Social', 'Email'],
  },
}

const CHANNELS = [46, 27, 18, 9]
const W = 600
const H = 220
const P = 10

export function OrbitDemo() {
  const { language } = useLanguage()
  const t = copy[language]
  const [period, setPeriod] = useState<Period>(30)
  const [hover, setHover] = useState<number | null>(null)

  const values = useMemo(() => SERIES.slice(-period), [period])
  const max = Math.max(...values)
  const min = Math.min(...values)
  const total = values.reduce((sum, value) => sum + value, 0)
  const average = Math.round(total / values.length)

  const numberFormat = useMemo(
    () => new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'en-US'),
    [language],
  )
  const money = (value: number) => `$${numberFormat.format(value)}`

  const step = (W - P * 2) / (values.length - 1)
  const yFor = (value: number) => H - P - ((value - min) / (max - min || 1)) * (H - P * 2)
  const coords = values.map((value, index) => [P + index * step, yFor(value)] as const)
  const line = coords
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ')
  const area = `${line} L${(P + (values.length - 1) * step).toFixed(1)} ${H - P} L${P} ${H - P} Z`

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const index = Math.round(ratio * (values.length - 1))
    setHover(Math.max(0, Math.min(values.length - 1, index)))
  }

  return (
    <div className="demo-orbit">
      <div className="demo-orbit__top">
        <div className="demo-kpis">
          <div className="demo-kpi">
            <span>{t.revenue}</span>
            <strong>{money(total)}</strong>
          </div>
          <div className="demo-kpi">
            <span>{t.average}</span>
            <strong>{money(average)}</strong>
          </div>
          <div className="demo-kpi">
            <span>{t.best}</span>
            <strong>{money(max)}</strong>
          </div>
        </div>

        <div className="demo-periods" role="group" aria-label={t.period}>
          {PERIODS.map((value) => (
            <button
              key={value}
              type="button"
              className={value === period ? 'is-active' : ''}
              onClick={() => {
                setPeriod(value)
                setHover(null)
              }}
            >
              {t.days(value)}
            </button>
          ))}
        </div>
      </div>

      <div className="demo-chart-wrap" onMouseMove={handleMove} onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="demo-chart" role="img" aria-label={t.revenue}>
          <defs>
            <linearGradient id="orbit-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((fraction) => (
            <line
              key={fraction}
              x1={P}
              x2={W - P}
              y1={H - P - fraction * (H - P * 2)}
              y2={H - P - fraction * (H - P * 2)}
              stroke="var(--border)"
              strokeWidth="1"
            />
          ))}

          <path d={area} fill="url(#orbit-fill)" />
          <path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {hover !== null && (
            <circle
              cx={coords[hover][0]}
              cy={coords[hover][1]}
              r="4.5"
              fill="var(--accent)"
              stroke="var(--bg-elev)"
              strokeWidth="2"
            />
          )}
        </svg>

        {hover !== null && (
          <div
            className="demo-tooltip"
            style={{
              left: `${(hover / (values.length - 1)) * 100}%`,
              top: `${(coords[hover][1] / H) * 100}%`,
            }}
          >
            {money(values[hover])}
          </div>
        )}
      </div>

      <div className="demo-bars">
        <p>{t.channels}</p>
        {CHANNELS.map((value, index) => (
          <div className="demo-bar" key={t.channelNames[index]}>
            <span>{t.channelNames[index]}</span>
            <div className="demo-bar__track">
              <div className="demo-bar__fill" style={{ width: `${value}%` }} />
            </div>
            <b>{value}%</b>
          </div>
        ))}
      </div>
    </div>
  )
}
