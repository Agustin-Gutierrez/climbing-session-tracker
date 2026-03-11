const API_URL = "http://localhost:8080/api/users"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
}

export const getUser = async (id: number) => {

  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  return await response.json()
}