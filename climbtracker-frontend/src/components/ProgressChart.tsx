import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"
import type { Climb } from "../types/Climb"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  climbs: Climb[]
}

// orden real de grados
const gradeOrder = [
  "4","4+","5a","5a+","5b","5b+","5c","5c+",
  "6a","6a+","6b","6b+","6c","6c+",
  "7a","7a+","7b","7b+","7c","7c+",
  "8a","8a+","8b","8b+"
]

function ProgressChart({ climbs }: Props) {

  const completed = climbs.filter(c => c.completed)

  const gradeCount: Record<string, number> = {}

  completed.forEach(climb => {

    const grade = climb.grade.trim().toLowerCase()

    if (!gradeCount[grade]) {
      gradeCount[grade] = 0
    }

    gradeCount[grade]++

  })

  // ordenar grados por dificultad
  const sortedGrades = Object.entries(gradeCount)
    .sort((a, b) => gradeOrder.indexOf(a[0]) - gradeOrder.indexOf(b[0]))

  const labels = sortedGrades.map(g => g[0])
  const dataValues = sortedGrades.map(g => g[1])

  const data = {
    labels,
    datasets: [
      {
        label: "Completed climbs",
        data: dataValues,
        backgroundColor: "#22c55e"
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
        beginAtZero: true,
        ticks: {
          color: "white"
        },
        grid: {
          color: "#334155"
        }
      }

    }

  }

  if (labels.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl mt-6 text-center text-slate-400">
        No completed climbs yet
      </div>
    )
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-6">
      <Bar data={data} options={options} />
    </div>
  )

}

export default ProgressChart