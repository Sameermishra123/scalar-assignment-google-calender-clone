import React, { useState } from 'react'
import axios from 'axios'
import './CalendarList.css'

function CalendarList({ calendars, visibleCalendarIds, onToggleCalendar, onCalendarUpdate }) {
  const [showAddCalendar, setShowAddCalendar] = useState(false)
  const [newCalendarName, setNewCalendarName] = useState('')

  const colors = [
    '#1a73e8', '#ea4335', '#fbbc04', '#34a853',
    '#f63384', '#9c27b0', '#009688', '#ff5722'
  ]

  const handleAddCalendar = async (e) => {
    e.preventDefault()
    if (!newCalendarName.trim()) return

    try {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      await axios.post('/api/calendars', {
        name: newCalendarName,
        color: randomColor
      })
      setNewCalendarName('')
      setShowAddCalendar(false)
      onCalendarUpdate()
    } catch (error) {
      console.error('Error creating calendar:', error)
      alert('Failed to create calendar')
    }
  }

  const handleDeleteCalendar = async (calendarId) => {
    if (!window.confirm('Are you sure you want to delete this calendar?')) return

    try {
      await axios.delete(`/api/calendars/${calendarId}`)
      onCalendarUpdate()
    } catch (error) {
      console.error('Error deleting calendar:', error)
      alert('Failed to delete calendar')
    }
  }

  return (
    <div className="px-4 py-2">
      <div className="text-xs font-medium text-gray-500 uppercase mb-2">
        My Calendars
      </div>
      
      <div className="space-y-1">
        {calendars.map(calendar => (
          <div key={calendar._id} className="flex items-center group">
            <label className="flex items-center flex-1 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={visibleCalendarIds.includes(calendar._id)}
                onChange={() => onToggleCalendar(calendar._id)}
                className="mr-2"
              />
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: calendar.color }}
              ></div>
              <span className="text-sm text-gray-700 flex-1">{calendar.name}</span>
            </label>
            <button
              onClick={() => handleDeleteCalendar(calendar._id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs px-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {showAddCalendar ? (
        <form onSubmit={handleAddCalendar} className="mt-2">
          <input
            type="text"
            value={newCalendarName}
            onChange={(e) => setNewCalendarName(e.target.value)}
            placeholder="Calendar name"
            className="w-full px-2 py-1 text-sm border border-google-border rounded focus:outline-none focus:ring-1 focus:ring-google-blue"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 text-xs bg-google-blue text-white rounded hover:bg-google-blue-hover"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddCalendar(false)
                setNewCalendarName('')
              }}
              className="px-3 py-1 text-xs border border-google-border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddCalendar(true)}
          className="mt-2 text-sm text-google-blue hover:text-google-blue-hover"
        >
          + Add calendar
        </button>
      )}
    </div>
  )
}

export default CalendarList
