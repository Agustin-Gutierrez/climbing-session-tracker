import type { Session } from "../types/Session"
import { deleteSession } from "../api/sessionApi"
import ClimbList from "./ClimbList"
import { useState } from "react"

interface Props {
  sessions: Session[]
  refreshSessions: () => void
}

function SessionList({ sessions, refreshSessions }: Props) {

  const [expandedSession, setExpandedSession] = useState<number | null>(null)

  const handleDelete = (e: React.MouseEvent, id: number) => {

    e.preventDefault()
    e.stopPropagation()

    const confirmed = window.confirm("Delete this session?")
    if (!confirmed) return

    deleteSession(id)
    refreshSessions()

  }

  const toggleSession = (id: number) => {
    if (expandedSession === id) {
      setExpandedSession(null)
    } else {
      setExpandedSession(id)
    }
  }

  return (
  <div className="space-y-4">

    {sessions.map((session) => (

      <div
        key={session.id}
        className="bg-slate-800 p-4 rounded-xl shadow hover:bg-slate-700 transition"
      >

        <div
          className="flex justify-between items-start cursor-pointer"
          onClick={() => toggleSession(session.id)}
        >

          <div>

            <div className="text-lg font-semibold flex gap-2">
              {expandedSession === session.id ? "▼" : "▶"} {session.gym}
            </div>

            <div className="text-sm text-slate-400">
              {session.date} — {session.user.username}
            </div>

          </div>

          <button
            type="button"
            onClick={(e) => handleDelete(e, session.id)}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Delete
          </button>

        </div>

        {expandedSession === session.id && (

          <ClimbList
            sessionId={session.id}
            onClimbAdded={refreshSessions}
          />

        )}

      </div>

    ))}

  </div>
)
}

export default SessionList