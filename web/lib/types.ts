export interface Patient {
  id: number
  name: string
  age: number
  medical_history: string
}

export interface Session {
  id: number
  patient_id: number
  timestamp: string
  diagnosis?: string
  treatment_plan?: string
  feedback?: string
}

export interface SessionUpdate {
  diagnosis?: string
  treatment_plan?: string
}
