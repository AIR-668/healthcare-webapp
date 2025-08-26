'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Session, Patient } from '@/lib/types'
import { api } from '@/lib/api'

export default function SessionPage() {
  const params = useParams()
  const sessionId = parseInt(params.id as string)
  
  const [session, setSession] = useState<Session | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [diagnosis, setDiagnosis] = useState('')
  const [treatmentPlan, setTreatmentPlan] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchSessionData()
    }
  }, [sessionId])

  const fetchSessionData = async () => {
    try {
      setLoading(true)
      const sessionData = await api.getSession(sessionId)
      setSession(sessionData)
      setDiagnosis(sessionData.diagnosis || '')
      setTreatmentPlan(sessionData.treatment_plan || '')
      
      if (sessionData.patient_id) {
        const patientData = await api.getPatient(sessionData.patient_id)
        setPatient(patientData)
      }
    } catch (err) {
      console.error('Error fetching session data:', err)
      setMessage({ type: 'error', text: 'Failed to load session data' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    try {
      setSaving(true)
      await api.updateSession(session.id, { diagnosis, treatment_plan: treatmentPlan })
      setMessage({ type: 'success', text: 'Session updated successfully!' })
      
      // Refresh session data
      await fetchSessionData()
    } catch (err) {
      console.error('Error updating session:', err)
      setMessage({ type: 'error', text: 'Failed to update session' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Session not found</p>
        <a href="/" className="text-blue-600 hover:underline">← Back to Dashboard</a>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Healthcare Session #{session.id}
            </h1>
            <p className="text-gray-600">
              {new Date(session.timestamp).toLocaleString()}
            </p>
          </div>
          <a 
            href="/" 
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {patient && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">{patient.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <p className="text-gray-900">{patient.age}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <p className="text-gray-900">{patient.medical_history}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Details</h2>
        
        <form onSubmit={handleUpdateSession}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis
            </label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treatment Plan
            </label>
            <textarea
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="Enter treatment plan..."
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Update Session'}
            </button>
            
            <a
              href="/feedback"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Provide Feedback
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
