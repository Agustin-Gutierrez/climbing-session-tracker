import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { subDays } from "date-fns"
import type { Session } from "../types/Session"

interface Props {
  sessions: Session[]
}

type HeatmapValue = {
  date: string
  count: number
}

function ActivityHeatmap({ sessions }: Props) {

  const today = new Date()
  const startDate = subDays(today, 90)

  const sessionCount: Record<string, number> = {}

  sessions.forEach(session => {

    const date = session.date

    if (!sessionCount[date]) {
      sessionCount[date] = 0
    }

    sessionCount[date]++

  })

  const values: HeatmapValue[] = Object.entries(sessionCount).map(
    ([date, count]) => ({
      date,
      count
    })
  )

  return (

    <div className="bg-slate-800 p-6 rounded-xl mt-6">

      <h3 className="text-2xl text-white mb-4">Climbing Activity</h3>

      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={values}
        gutterSize={2}

        titleForValue={(value: HeatmapValue | null) => {
          if (!value) return 'No climbing sessions'

          const date = new Date(value.date)

          return `${value.count} climbs on ${date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}`
        }}

        classForValue={(value: HeatmapValue | null) => {

          if (!value || value.count === 0) return "color-empty"

          if (value.count >= 4) return "color-scale-4"
          if (value.count >= 3) return "color-scale-3"
          if (value.count >= 2) return "color-scale-2"

          return "color-scale-1"
        }}
      />

    </div>

  )

}

export default ActivityHeatmap