import React, { useState, useEffect } from 'react'
import { format, addHours } from 'date-fns'
import './EventModal.css'

function EventModal({ event, calendars, onClose, onSave, onDelete }) {
  const isEdit = !!event?._id
  
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    start: event?.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    end: event?.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : format(addHours(new Date(), 2), "yyyy-MM-dd'T'HH:mm"),
    allDay: event?.allDay || false,
    calendarId: event?.calendarId?._id || event?.calendarId || calendars[0]?._id || '',
    color: event?.color || calendars.find(c => c._id === (event?.calendarId?._id || event?.calendarId))?.color || '#1a73e8',
    location: event?.location || '',
    recurrence: event?.recurrence || null
  })

  const [recurrenceType, setRecurrenceType] = useState(event?.recurrence?.frequency || 'none')

  const colors = [
    '#1a73e8', '#ea4335', '#fbbc04', '#34a853',
    '#f63384', '#9c27b0', '#009688', '#ff5722'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const eventData = {
      ...formData,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      recurrence: recurrenceType !== 'none' ? {
        frequency: recurrenceType.toUpperCase(),
        interval: 1
      } : null
    }

    onSave(eventData)
  }

  const handleStartDateChange = (value) => {
    setFormData(prev => {
      const newStart = new Date(value)
      const prevEnd = new Date(prev.end)
      const duration = prevEnd - new Date(prev.start)
      const newEnd = new Date(newStart.getTime() + duration)
      
      return {
        ...prev,
        start: value,
        end: format(newEnd, "yyyy-MM-dd'T'HH:mm")
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-normal text-gray-800">
              {isEdit ? 'Edit Event' : 'Create Event'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Add title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full text-2xl font-normal border-none outline-none focus:border-b focus:border-gray-300 pb-2"
                required
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="allDay"
                checked={formData.allDay}
                onChange={(e) => setFormData(prev => ({ ...prev, allDay: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="allDay" className="text-sm text-gray-700">All day</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calendar</label>
              <select
                value={formData.calendarId}
                onChange={(e) => {
                  const selectedCalendar = calendars.find(c => c._id === e.target.value)
                  setFormData(prev => ({
                    ...prev,
                    calendarId: e.target.value,
                    color: selectedCalendar?.color || prev.color
                  }))
                }}
                className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
                required
              >
                {calendars.map(calendar => (
                  <option key={calendar._id} value={calendar._id}>
                    {calendar.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Add location"
                className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add description"
                rows={4}
                className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repeat</label>
              <select
                value={recurrenceType}
                onChange={(e) => setRecurrenceType(e.target.value)}
                className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue"
              >
                <option value="none">Does not repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-google-border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-google-blue text-white rounded-md hover:bg-google-blue-hover"
              >
                {isEdit ? 'Save' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventModal
