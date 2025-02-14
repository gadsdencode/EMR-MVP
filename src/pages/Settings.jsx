import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const PRACTICE_SETTINGS = {
  practiceName: 'EMR Clinic',
  address: '123 Medical Plaza',
  phone: '(555) 123-4567',
  email: 'contact@emrclinic.com',
  website: 'www.emrclinic.com',
  timezone: 'America/New_York'
}

const NOTIFICATION_SETTINGS = {
  emailNotifications: true,
  smsNotifications: false,
  appointmentReminders: true,
  marketingEmails: false
}

const SECURITY_SETTINGS = {
  twoFactorAuth: false,
  sessionTimeout: '30',
  passwordExpiry: '90',
  ipWhitelist: ''
}

export default function Settings() {
  const { user } = useAuth()
  const [practiceSettings, setPracticeSettings] = useState(
    JSON.parse(localStorage.getItem('practiceSettings')) || PRACTICE_SETTINGS
  )
  const [notificationSettings, setNotificationSettings] = useState(
    JSON.parse(localStorage.getItem('notificationSettings')) || NOTIFICATION_SETTINGS
  )
  const [securitySettings, setSecuritySettings] = useState(
    JSON.parse(localStorage.getItem('securitySettings')) || SECURITY_SETTINGS
  )
  const [loading, setLoading] = useState(false)

  const handlePracticeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      localStorage.setItem('practiceSettings', JSON.stringify(practiceSettings))
      toast.success('Practice settings updated successfully')
    } catch (error) {
      toast.error('Failed to update practice settings')
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings))
      toast.success('Notification preferences updated successfully')
    } catch (error) {
      toast.error('Failed to update notification preferences')
    } finally {
      setLoading(false)
    }
  }

  const handleSecuritySubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      localStorage.setItem('securitySettings', JSON.stringify(securitySettings))
      toast.success('Security settings updated successfully')
    } catch (error) {
      toast.error('Failed to update security settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your practice settings and preferences.
          </p>
        </div>
      </div>

      {/* Practice Information */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Practice Information
          </h3>
          <form onSubmit={handlePracticeSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Practice Name
                </label>
                <input
                  type="text"
                  value={practiceSettings.practiceName}
                  onChange={(e) =>
                    setPracticeSettings({ ...practiceSettings, practiceName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={practiceSettings.phone}
                  onChange={(e) =>
                    setPracticeSettings({ ...practiceSettings, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={practiceSettings.email}
                  onChange={(e) =>
                    setPracticeSettings({ ...practiceSettings, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  value={practiceSettings.website}
                  onChange={(e) =>
                    setPracticeSettings({ ...practiceSettings, website: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={practiceSettings.address}
                  onChange={(e) =>
                    setPracticeSettings({ ...practiceSettings, address: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Notification Preferences
          </h3>
          <form onSubmit={handleNotificationSubmit} className="mt-5">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      smsNotifications: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.appointmentReminders}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      appointmentReminders: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Appointment Reminders
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketingEmails}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      marketingEmails: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Marketing Emails
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Security Settings
          </h3>
          <form onSubmit={handleSecuritySubmit} className="mt-5 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    twoFactorAuth: e.target.checked
                  })
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                Enable Two-Factor Authentication
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Timeout (minutes)
              </label>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    sessionTimeout: e.target.value
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <select
                value={securitySettings.passwordExpiry}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    passwordExpiry: e.target.value
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IP Whitelist (comma-separated)
              </label>
              <input
                type="text"
                value={securitySettings.ipWhitelist}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    ipWhitelist: e.target.value
                  })
                }
                placeholder="e.g., 192.168.1.1, 10.0.0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Security Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
