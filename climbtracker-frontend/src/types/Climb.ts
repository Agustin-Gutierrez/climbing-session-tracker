export interface Climb {

  id: number

  routeName: string

  grade: string

  attempts: number

  completed: boolean

  session?: {
    id: number
    date: string
    gym: string
  }

}