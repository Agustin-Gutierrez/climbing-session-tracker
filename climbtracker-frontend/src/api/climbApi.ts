import type { Climb } from "../types/Climb"

const API_URL = "http://localhost:8080/api/climbs"

// -------------------------
// helper para headers auth
// -------------------------

const getAuthHeaders = () => {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("No authentication token found")
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }

}

// -------------------------
// Get climbs by user
// -------------------------

export const getMyClimbs = async (): Promise<Climb[]> => {

  const response = await fetch(`${API_URL}/my`, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to fetch climbs")
  }

  return await response.json()

}

// -------------------------
// Get climbs by session
// -------------------------

export const getClimbsBySession = async (sessionId: number): Promise<Climb[]> => {

  const response = await fetch(`${API_URL}/session/${sessionId}`, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to fetch climbs for session")
  }

  return await response.json()

}

// -------------------------
// Get stats
// -------------------------

export const getStats = async () => {

  const response = await fetch(`${API_URL}/stats`, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }

  return await response.json()

}

// -------------------------
// Add climb (ClimbForm)
// -------------------------

export const addClimb = async (
  sessionId: number,
  climb: Partial<Climb>
) => {

  const response = await fetch(`${API_URL}/session/${sessionId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(climb)
  })

  if (!response.ok) {
    throw new Error("Failed to create climb")
  }

  return await response.json()

}

// -------------------------
// Update climb
// -------------------------

export const updateClimb = async (
  id: number,
  climb: Partial<Climb>
) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(climb)
  })

  if (!response.ok) {
    throw new Error("Failed to update climb")
  }

  return await response.json()

}

// -------------------------
// Delete climb
// -------------------------

export const deleteClimb = async (id: number) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to delete climb")
  }

}