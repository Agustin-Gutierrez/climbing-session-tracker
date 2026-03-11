import { useEffect, useState } from "react"

import { getSessions } from "./api/sessionApi"
import { getStats, getMyClimbs } from "./api/climbApi"

import SessionForm from "./components/SessionForm"
import SessionList from "./components/SessionList"
import ProgressChart from "./components/ProgressChart"
import SessionProgressChart from "./components/SessionProgressChart"
import ActivityHeatmap from "./components/ActivityHeatmap"
import GradePyramidChart from "./components/GradePyramidChart"

import LoginPage from "./pages/LoginPage"

import { jwtDecode } from "jwt-decode"

import type { Session } from "./types/Session"
import type { Climb } from "./types/Climb"

const getUserFromToken = () => {

  const token = localStorage.getItem("token")

  if (!token) return null

  try {

    const decoded: any = jwtDecode(token)

    return (
      decoded.sub ||
      decoded.email ||
      decoded.username ||
      null
    )

  } catch {

    return null

  }

}

function App() {

  const [sessions, setSessions] = useState<Session[]>([])
  const [climbs, setClimbs] = useState<Climb[]>([])
  const [maxGrade, setMaxGrade] = useState<string | null>(null)

  const [userEmail] = useState<string | null>(getUserFromToken())

  const [stats, setStats] = useState({
    total: 0,
    completed: 0
  })

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  )

  const username = userEmail?.split("@")[0]

  // -------------------------
  // Sessions
  // -------------------------

  const fetchSessions = async () => {

    try {

      const data = await getSessions()

      setSessions(
        data.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )

    } catch (error) {

      console.error("Error fetching sessions:", error)

    }

  }

  // -------------------------
  // Climbs
  // -------------------------

  const fetchClimbs = async () => {

    try {

      const data = await getMyClimbs()
      setClimbs(data)

    } catch (error) {

      console.error("Error fetching climbs:", error)

    }

  }

  // -------------------------
  // Stats
  // -------------------------

  const fetchStats = async () => {

    try {

      const data = await getStats()
      setStats(data)

    } catch (error) {

      console.error("Error fetching stats:", error)

    }

  }

  // -------------------------
  // User
  // -------------------------

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:8080/api/users/1", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      setMaxGrade(data.maxGrade)

    } catch (error) {

      console.error("Error fetching user:", error)

    }

  }

  // -------------------------
  // Refresh dashboard
  // -------------------------

  const refreshData = () => {

    fetchSessions()
    fetchClimbs()
    fetchStats()
    fetchUser()

  }

  // -------------------------
  // Initial load
  // -------------------------

  useEffect(() => {

    if (isAuthenticated) {
      refreshData()
    }

  }, [isAuthenticated])

  // -------------------------
  // Logout
  // -------------------------

  const logout = () => {

    localStorage.removeItem("token")
    window.location.reload()

  }

  // -------------------------
  // Success rate
  // -------------------------

  const successRate =
    stats.total === 0
      ? 0
      : Math.round((stats.completed / stats.total) * 100)

  // -------------------------
  // Login screen
  // -------------------------

  if (!isAuthenticated) {

    return (
      <LoginPage onLogin={() => setIsAuthenticated(true)} />
    )

  }

  // -------------------------
  // Dashboard
  // -------------------------

  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center">

      <div className="w-full max-w-5xl p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold tracking-tight">
            Climb Tracker
          </h1>

          <div className="flex items-center gap-4">

            {maxGrade && (
              <span className="text-sm text-slate-400">
                Best: {maxGrade}
              </span>
            )}

            {username && (
              <span className="text-sm text-slate-300 bg-slate-800 px-3 py-1 rounded-md">
                {username}
              </span>
            )}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">

          <div className="bg-slate-800 p-4 rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm text-slate-400">
              Total Climbs
            </div>
            <div className="text-xl font-bold">
              {stats.total}
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm text-slate-400">
              Completed
            </div>
            <div className="text-xl font-bold">
              {stats.completed}
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm text-slate-400">
              Success Rate
            </div>
            <div className="text-xl font-bold">
              {successRate}%
            </div>
          </div>

        </div>

        {/* SESSION FORM */}

        <SessionForm refreshSessions={refreshData} />

        {/* SESSION LIST */}

        <SessionList
          sessions={sessions}
          refreshSessions={refreshData}
        />

        {/* DASHBOARD GRID */}

        <div className="grid grid-cols-2 gap-6 mt-8 animate-fade-in">

          <GradePyramidChart climbs={climbs} />

          <SessionProgressChart climbs={climbs} />

          <ProgressChart climbs={climbs} />

          <ActivityHeatmap sessions={sessions} />

        </div>

      </div>

    </div>

  )

}

export default App