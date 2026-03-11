import { useState } from "react"
import { addClimb } from "../api/climbApi"

interface Props {
  sessionId: number
  onClimbAdded: () => void
}

function ClimbForm({ sessionId, onClimbAdded }: Props) {

  const [routeName, setRouteName] = useState("")
  const [grade, setGrade] = useState("")
  const [completed, setCompleted] = useState(true)

  const normalizeGrade = (grade: string) => {
    return grade
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!routeName || !grade) return

    const normalizedGrade = normalizeGrade(grade)

    try {
      await addClimb(sessionId, {
        routeName: routeName.trim(),
        grade: normalizedGrade,
        attempts: 1,
        completed
      })

      setRouteName("")
      setGrade("")
      setCompleted(true)

      onClimbAdded()

    } catch (error) {
      console.error("Error creating climb:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mt-3 items-center"
    >

      <input
        type="text"
        placeholder="Route"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        className="bg-slate-700 px-2 py-1 rounded text-sm w-28"
      />

      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="bg-slate-700 px-2 py-1 rounded text-sm w-16"
      />

      <label className="flex items-center gap-1 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Send
      </label>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
      >
        Add
      </button>

    </form>
  )
}

export default ClimbForm