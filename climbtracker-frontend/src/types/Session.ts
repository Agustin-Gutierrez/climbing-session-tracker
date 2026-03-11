export interface User {
  id: number
  username: string
  email: string
  maxGrade: string
}

export interface Session {
  id: number
  date: string
  gym: string
  user: User
}