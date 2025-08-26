'use client'

import { useState, useEffect } from 'react'
import { Patient } from '@/lib/types'
import { api } from '@/lib/api'

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await api.getPatients()
      setPatients(data)
    } catch (err) {
      setError('Failed to fetch patients')
      console.error('Error fetching patients:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSession = async (patientId: number) => {
    try {
      const session = await api.createSession(patientId)
      window.location.href = `/session/${session.id}`
    } catch (err) {
      setError('Failed to create session')
      console.error('Error creating session:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={fetchPatients}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
        <p className="text-gray-600">Manage patients and healthcare sessions</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Patients</h2>
        </div>
        
        {patients.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No patients found. The database might be empty.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <div key={patient.id} className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600">Age: {patient.age}</p>
                  <p className="text-gray-600">Medical History: {patient.medical_history}</p>
                </div>
                <button
                  onClick={() => handleCreateSession(patient.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Start Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
