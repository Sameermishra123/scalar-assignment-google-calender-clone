import React from 'react'
import { format, isSameDay, addHours, startOfDay, getHours, getMinutes } from 'date-fns'
import './DayView.css'

function DayView({ currentDate, events, onEventClick, onCreateEvent }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const isToday = isSameDay(currentDate, new Date())

  const getEventsForDay = () => {
    const dayStart = startOfDay(currentDate)
    const dayEnd = addHours(dayStart, 23.99)
    
    return events.filter(event => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      
      return (
        (eventStart >= dayStart && eventStart <= dayEnd) ||
        (eventEnd >= dayStart && eventEnd <= dayEnd) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      )
    })
  }

  const dayEvents = getEventsForDay()

  const getEventPosition = (event) => {
    const eventStart = new Date(event.start)
    const dayStart = startOfDay(eventStart)
    const hoursFromStart = getHours(eventStart) + getMinutes(eventStart) / 60
    const top = (hoursFromStart / 24) * 100
    
    const eventEnd = new Date(event.end)
    const duration = (eventEnd - eventStart) / (1000 * 60 * 60)
    const height = (duration / 24) * 100
    
    return { top: `${top}%`, height: `${Math.max(height, 2)}%` }
  }

  return (
    <div className="day-view h-full flex">
      <div className="day-time-column border-r border-google-border bg-white">
        <div className={`day-time-header h-14 border-b border-google-border p-2 text-center ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className="text-xs text-gray-500">{format(currentDate, 'EEE')}</div>
          <div className={`text-lg font-medium ${isToday ? 'text-google-blue' : 'text-gray-700'}`}>
            {format(currentDate, 'd')}
          </div>
        </div>
        {hours.map(hour => (
          <div key={hour} className="day-time-slot h-16 border-b border-google-border text-xs text-gray-500 px-2 pt-1">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
        ))}
      </div>

      <div className="day-content flex-1 relative">
        {hours.map(hour => (
          <div
            key={hour}
            className="day-hour-slot h-16 border-b border-google-border hover:bg-gray-50 cursor-pointer"
            onClick={() => onCreateEvent(addHours(startOfDay(currentDate), hour))}
          ></div>
        ))}
        
        {dayEvents.map((event, eventIdx) => {
          const position = getEventPosition(event)
          return (
            <div
              key={event._id || eventIdx}
              onClick={(e) => {
                e.stopPropagation()
                onEventClick(event)
              }}
              className="day-event absolute left-2 right-2 rounded px-3 py-2 cursor-pointer event-hover z-10"
              style={{
                ...position,
                backgroundColor: event.color || event.calendarId?.color || '#1a73e8',
                color: 'white'
              }}
              title={`${format(new Date(event.start), 'h:mm a')} - ${format(new Date(event.end), 'h:mm a')}: ${event.title}`}
            >
              <div className="font-medium">{event.title}</div>
              {!event.allDay && (
                <div className="text-sm mt-1">
                  {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                </div>
              )}
              {event.description && (
                <div className="text-sm mt-1 opacity-90 truncate">{event.description}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayView
