import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js"

import { Line } from "react-chartjs-2"
import type { Climb } from "../types/Climb"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

interface Props {
  climbs: Climb[]
}

const gradeOrder = [
  "4", "4+", "5a", "5a+", "5b", "5b+", "5c", "5c+",
  "6a", "6a+", "6b", "6b+", "6c", "6c+",
  "7a", "7a+", "7b", "7b+", "7c", "7c+",
  "8a", "8a+", "8b", "8b+", "8c", "8c+",
  "9a", "9a+", "9b", "9b+", "9c", "9c+"
]

function SessionProgressChart({ climbs }: Props) {

  const sessions: Record<string, number> = {}

  climbs.forEach(climb => {

    if (!climb.completed) return

    const date = climb.session?.date

    if (!date) return

    const gradeIndex = gradeOrder.indexOf(climb.grade)

    if (sessions[date] === undefined || gradeIndex > sessions[date]) {
      sessions[date] = gradeIndex
    }

  })

  const sortedDates = Object.keys(sessions).sort()

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: "Best grade per session",
        data: sortedDates.map(date => sessions[date]),
        borderColor: "#38bdf8",
        backgroundColor: "#38bdf8",
        tension: 0.3
      }
    ]
  }

  const options = {

    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },

    scales: {

      x: {
        ticks: {
          color: "white"
        },
        grid: {
          color: "#334155"
        }
      },

      y: {
        ticks: {
          color: "white",
          callback: function(value:any){
            return gradeOrder[value] || ""
          }
        },
        grid: {
          color: "#334155"
        }
      }

    }

  }

  return (

    <div className="bg-slate-800 p-6 rounded-xl mt-6">

      <Line data={data} options={options} />

    </div>

  )

}

export default SessionProgressChart