'use client'

import { useState } from 'react'

export default function Settings() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [theme, setTheme] = useState('dark')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Replace with your real settings update logic (API call, DB update, etc.)
    console.log('Updating settings:', { username, email, theme })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Account Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Theme Selector */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">
              Theme
            </label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System Default</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}