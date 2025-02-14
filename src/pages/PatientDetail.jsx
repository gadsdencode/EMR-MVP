import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function PatientDetail() {
  const { id } = useParams()
  
  const { data: patient, isLoading } = useQuery(['patient', id], async () => {
    const docRef = doc(db, 'patients', id)
    const docSnap = await getDoc(docRef)
    return { id: docSnap.id, ...docSnap.data() }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Patient Details</h1>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {patient?.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Medical History</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {patient?.medicalHistory}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
