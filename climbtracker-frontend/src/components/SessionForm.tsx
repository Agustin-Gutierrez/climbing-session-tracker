import { useState } from "react"
import { createSession } from "../api/sessionApi"

interface Props {
  refreshSessions: () => void
}

function SessionForm({ refreshSessions }: Props) {

  const [date, setDate] = useState("")
  const [gym, setGym] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const newSession = {
      date,
      gym,
      user: { id: 1 }
    }

    try {
      await createSession(newSession)
      refreshSessions()
      setDate("")
      setGym("")
    } catch (error) {
      console.error("Error creating session:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="bg-slate-700 text-white px-3 py-2 rounded w-40"
      />

      <input
        type="text"
        placeholder="Gym"
        value={gym}
        onChange={(e) => setGym(e.target.value)}
        required
        className="bg-slate-700 text-white px-3 py-2 rounded flex-1"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold"
      >
        Add
      </button>

    </form>
  )
}

export default SessionForm