import React, { useState } from 'react'
import { store } from '../lib/store'
import { PlusIcon, EnvelopeIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function Messages() {
  const [messages] = useState(store.getMessages())
  const [patients] = useState(store.getPatients())
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [newMessage, setNewMessage] = useState({
    recipientId: '',
    subject: '',
    content: '',
    priority: 'normal'
  })

  const handleSendMessage = (e) => {
    e.preventDefault()
    try {
      const recipient = patients.find(p => p.id === newMessage.recipientId)
      store.addMessage({
        ...newMessage,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        sender: 'Doctor',
        status: 'sent',
        timestamp: new Date().toISOString()
      })
      setShowComposeModal(false)
      setNewMessage({ recipientId: '', subject: '', content: '', priority: 'normal' })
      toast.success('Message sent successfully')
      window.location.reload()
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const handleMarkAsRead = (id) => {
    try {
      store.updateMessage(id, { status: 'read' })
      window.location.reload()
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  const handleDeleteMessage = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        store.deleteMessage(id)
        setSelectedMessage(null)
        toast.success('Message deleted successfully')
        window.location.reload()
      } catch (error) {
        toast.error('Failed to delete message')
      }
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <p className="mt-2 text-sm text-gray-700">
            Communicate securely with patients and staff.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowComposeModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Compose
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-6">
        {/* Message List */}
        <div className="w-1/3 overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {message.status === 'unread' ? (
                        <EnvelopeIcon className="h-5 w-5 text-indigo-600 mr-2" />
                      ) : (
                        <EnvelopeOpenIcon className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {message.subject}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {message.priority}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {message.recipientName}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {format(new Date(message.timestamp), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Message Detail */}
        {selectedMessage ? (
          <div className="flex-1 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedMessage.subject}
                </h3>
                <div className="flex gap-2">
                  {selectedMessage.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">From</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedMessage.sender}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">To</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedMessage.recipientName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(selectedMessage.timestamp), 'PPpp')}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedMessage.priority}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Message</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.content}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Select a message to view details</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Compose New Message
            </h3>
            <form onSubmit={handleSendMessage}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Recipient
                  </label>
                  <select
                    required
                    value={newMessage.recipientId}
                    onChange={(e) => setNewMessage({ ...newMessage, recipientId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select recipient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Priority
                  </label>
                  <select
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
