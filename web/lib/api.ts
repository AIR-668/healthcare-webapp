import axios from 'axios'
import { Patient, Session, SessionUpdate } from './types'

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com' 
  : 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  // Patient endpoints
  async getPatients(): Promise<Patient[]> {
    const response = await apiClient.get('/patients')
    return response.data
  },

  async getPatient(id: number): Promise<Patient> {
    const response = await apiClient.get(`/patients/${id}`)
    return response.data
  },

  async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const response = await apiClient.post('/patients', patient)
    return response.data
  },

  // Session endpoints
  async getSessions(): Promise<Session[]> {
    const response = await apiClient.get('/sessions')
    return response.data
  },

  async getSession(id: number): Promise<Session> {
    const response = await apiClient.get(`/sessions/${id}`)
    return response.data
  },

  async createSession(patientId: number): Promise<Session> {
    const response = await apiClient.post('/sessions', { patient_id: patientId })
    return response.data
  },

  async updateSession(id: number, updates: SessionUpdate): Promise<Session> {
    const response = await apiClient.put(`/sessions/${id}`, updates)
    return response.data
  },

  // Feedback endpoint
  async submitFeedback(sessionId: number, feedback: string): Promise<void> {
    await apiClient.post(`/sessions/${sessionId}/feedback`, { feedback })
  },
}
