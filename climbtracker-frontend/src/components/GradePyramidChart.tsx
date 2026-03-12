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

const gradeOrder = [
  "4", "4+", "5a", "5a+", "5b", "5b+", "5c", "5c+",
  "6a", "6a+", "6b", "6b+", "6c", "6c+",
  "7a", "7a+", "7b", "7b+", "7c", "7c+",
  "8a", "8a+", "8b", "8b+", "8c", "8c+",
  "9a", "9a+", "9b", "9b+", "9c", "9c+"
]


function GradePyramidChart({ climbs }: Props) {

  const completed = climbs.filter(c => c.completed)

  const gradeCount: Record<string, number> = {}

  completed.forEach(climb => {

    const grade = climb.grade.trim().toLowerCase()

    if (!gradeCount[grade]) {
      gradeCount[grade] = 0
    }

    gradeCount[grade]++

  })

  const sortedGrades = Object.entries(gradeCount)
    .sort((a, b) => gradeOrder.indexOf(a[0]) - gradeOrder.indexOf(b[0]))

  const labels = sortedGrades.map(g => g[0])
  const dataValues = sortedGrades.map(g => g[1])

  const data = {
    labels,
    datasets: [
      {
        label: "Grade pyramid",
        data: dataValues,
        backgroundColor: "#a78bfa"
      }
    ]
  }

  const options = {

    indexAxis: "y" as const,

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
          color: "white"
        },
        grid: {
          color: "#334155"
        }
      }

    }

  }

  if (labels.length === 0) {
    return null
  }

  return (

    <div className="bg-slate-800 p-6 rounded-xl mt-6">

      <Bar data={data} options={options} />

    </div>

  )

}

export default GradePyramidChart