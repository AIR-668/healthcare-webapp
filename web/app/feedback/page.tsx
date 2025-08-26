'use client'

import { useState, useEffect } from 'react'
import { Session } from '@/lib/types'
import { api } from '@/lib/api'

export default function Feedback() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const data = await api.getSessions()
      setSessions(data)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setMessage({ type: 'error', text: 'Failed to fetch sessions' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSession || !feedback.trim()) return

    try {
      setSubmitting(true)
      await api.submitFeedback(selectedSession.id, feedback)
      setMessage({ type: 'success', text: 'Feedback submitted successfully!' })
      setFeedback('')
      setSelectedSession(null)
    } catch (err) {
      console.error('Error submitting feedback:', err)
      setMessage({ type: 'error', text: 'Failed to submit feedback' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</h1>
        <p className="text-gray-600">Provide feedback for completed healthcare sessions</p>
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

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmitFeedback}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Session
            </label>
            <select
              value={selectedSession?.id || ''}
              onChange={(e) => {
                const session = sessions.find(s => s.id === parseInt(e.target.value))
                setSelectedSession(session || null)
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a session...</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  Session {session.id} - Patient ID: {session.patient_id} 
                  ({new Date(session.timestamp).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {selectedSession && (
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Session Details</h3>
              <p className="text-sm text-gray-600">Patient ID: {selectedSession.patient_id}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(selectedSession.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Diagnosis: {selectedSession.diagnosis}</p>
              <p className="text-sm text-gray-600">Treatment: {selectedSession.treatment_plan}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed feedback about the session..."
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!selectedSession || !feedback.trim() || submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}
