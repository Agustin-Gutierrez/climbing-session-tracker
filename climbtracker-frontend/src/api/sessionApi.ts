import type { Session } from "../types/Session"

const API_URL = "http://localhost:8080/api/sessions"

// -------------------------
// helper auth headers
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
// Get sessions
// -------------------------

export const getSessions = async (): Promise<Session[]> => {

  const response = await fetch(API_URL, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to fetch sessions")
  }

  return await response.json()

}

// -------------------------
// Create session
// -------------------------

export const createSession = async (session: Partial<Session>) => {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(session)
  })

  if (!response.ok) {
    throw new Error("Failed to create session")
  }

  return await response.json()

}

// -------------------------
// Delete session
// -------------------------

export const deleteSession = async (id: number) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to delete session")
  }

}