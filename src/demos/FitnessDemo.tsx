import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/context'

const STORAGE_KEY = 'pulse-fit-workouts'
const GOAL_MINUTES = 150

type WorkoutType = 'run' | 'strength' | 'yoga' | 'bike'

type Workout = {
  id: string
  type: WorkoutType
  minutes: number
  date: string
}

function daysAgo(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().slice(0, 10)
}

const TODAY = daysAgo(0)

const TYPES: WorkoutType[] = ['run', 'strength', 'yoga', 'bike']

const SAMPLE: Workout[] = [
  { id: 'sample-1', type: 'run', minutes: 35, date: daysAgo(1) },
  { id: 'sample-2', type: 'strength', minutes: 45, date: daysAgo(2) },
  { id: 'sample-3', type: 'yoga', minutes: 25, date: daysAgo(4) },
]

const copy = {
  ru: {
    goal: 'Цель недели',
    minutes: (n: number) => `${n} мин`,
    of: 'из',
    formType: 'Тренировка',
    formMinutes: 'Минуты',
    formDate: 'Дата',
    add: 'Добавить',
    list: 'Последние тренировки',
    empty: 'Записей пока нет — добавь первую тренировку.',
    remove: 'Удалить',
    types: { run: 'Бег', strength: 'Сила', yoga: 'Йога', bike: 'Велосипед' },
    total: 'Всего за неделю',
  },
  en: {
    goal: 'Weekly goal',
    minutes: (n: number) => `${n} min`,
    of: 'of',
    formType: 'Workout',
    formMinutes: 'Minutes',
    formDate: 'Date',
    add: 'Add',
    list: 'Recent workouts',
    empty: 'No workouts yet — add your first one.',
    remove: 'Delete',
    types: { run: 'Running', strength: 'Strength', yoga: 'Yoga', bike: 'Cycling' },
    total: 'This week',
  },
}

function loadWorkouts(): Workout[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed as Workout[]
    }
  } catch {
    /* ignore */
  }
  return SAMPLE
}

export function FitnessDemo() {
  const { language } = useLanguage()
  const t = copy[language]
  const [workouts, setWorkouts] = useState<Workout[]>(loadWorkouts)
  const [type, setType] = useState<WorkoutType>('run')
  const [minutes, setMinutes] = useState('30')
  const [date, setDate] = useState(TODAY)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
    } catch {
      /* ignore */
    }
  }, [workouts])

  const weekStart = daysAgo(6)
  const weekMinutes = workouts
    .filter((workout) => workout.date >= weekStart)
    .reduce((sum, workout) => sum + workout.minutes, 0)
  const percent = Math.min(100, Math.round((weekMinutes / GOAL_MINUTES) * 100))

  const add = (event: React.FormEvent) => {
    event.preventDefault()
    const value = Number.parseInt(minutes, 10)
    if (!Number.isFinite(value) || value <= 0) return
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`
    setWorkouts((current) => [{ id, type, minutes: value, date }, ...current])
  }

  const remove = (id: string) => {
    setWorkouts((current) => current.filter((workout) => workout.id !== id))
  }

  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="demo-fit">
      <div className="demo-fit__top">
        <div className="demo-goal">
          <div className="demo-goal__head">
            <span>{t.goal}</span>
            <strong>
              {t.minutes(weekMinutes)} {t.of} {t.minutes(GOAL_MINUTES)}
            </strong>
          </div>
          <div className="demo-goal__bar">
            <div className="demo-goal__fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <span className="demo-goal__percent">{percent}%</span>
      </div>

      <form className="demo-form" onSubmit={add}>
        <label className="demo-field">
          <span>{t.formType}</span>
          <select value={type} onChange={(event) => setType(event.target.value as WorkoutType)}>
            {TYPES.map((item) => (
              <option key={item} value={item}>
                {t.types[item]}
              </option>
            ))}
          </select>
        </label>

        <label className="demo-field">
          <span>{t.formMinutes}</span>
          <input
            className="demo-input"
            type="number"
            min="1"
            max="600"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
          />
        </label>

        <label className="demo-field">
          <span>{t.formDate}</span>
          <input
            className="demo-input"
            type="date"
            value={date}
            max={TODAY}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        <button type="submit" className="demo-submit">
          {t.add}
        </button>
      </form>

      <div className="demo-list-wrap">
        <p className="demo-list-title">
          {t.list}
          <span>
            {t.total}: {t.minutes(weekMinutes)}
          </span>
        </p>
        <ul className="demo-list">
          {sorted.length === 0 && <li className="demo-cart__empty">{t.empty}</li>}
          {sorted.map((workout) => (
            <li className="demo-workout" key={workout.id}>
              <span className="demo-workout__type">{t.types[workout.type]}</span>
              <span className="demo-workout__meta">
                {t.minutes(workout.minutes)} · {workout.date.slice(8, 10)}.
                {workout.date.slice(5, 7)}
              </span>
              <button
                type="button"
                className="demo-workout__del"
                onClick={() => remove(workout.id)}
                aria-label={t.remove}
                title={t.remove}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
