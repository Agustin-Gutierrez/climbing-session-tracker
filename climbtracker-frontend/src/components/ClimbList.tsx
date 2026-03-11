import { useEffect, useState } from "react"
import { getClimbsBySession } from "../api/climbApi"
import type { Climb } from "../types/Climb"
import ClimbForm from "./ClimbForm"

interface Props {
  sessionId: number
  onClimbAdded: () => void
}

function ClimbList({ sessionId, onClimbAdded }: Props) {

  const [climbs, setClimbs] = useState<Climb[]>([])

  const fetchClimbs = async () => {
    const data = await getClimbsBySession(sessionId)
    setClimbs(data)
  }

  useEffect(() => {
    fetchClimbs()
  }, [sessionId])

  return (
    <div className="mt-3 space-y-1">

      {climbs.map((climb) => (
        <div key={climb.id} className="text-sm text-slate-300">
          {climb.routeName} — {climb.grade} {climb.completed ? "✅" : "❌"}
        </div>
      ))}

      <ClimbForm
        sessionId={sessionId}
        onClimbAdded={() => {
          fetchClimbs()
          onClimbAdded()
        }}
      />

    </div>
  )
}

export default ClimbList