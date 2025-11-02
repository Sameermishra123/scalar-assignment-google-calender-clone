import React from 'react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addHours, startOfDay, getHours, getMinutes } from 'date-fns'
import './WeekView.css'

function WeekView({ currentDate, events, onEventClick, onCreateEvent }) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
  
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForDay = (day) => {
    const dayStart = startOfDay(day)
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

  const getEventPosition = (event) => {
    const eventStart = new Date(event.start)
    const dayStart = startOfDay(eventStart)
    const hoursFromStart = getHours(eventStart) + getMinutes(eventStart) / 60
    const top = (hoursFromStart / 24) * 100
    
    const eventEnd = new Date(event.end)
    const duration = (eventEnd - eventStart) / (1000 * 60 * 60) // duration in hours
    const height = (duration / 24) * 100
    
    return { top: `${top}%`, height: `${Math.max(height, 2)}%` }
  }

  return (
    <div className="week-view h-full flex">
      <div className="week-time-column border-r border-google-border bg-white">
        <div className="week-time-header h-14 border-b border-google-border"></div>
        {hours.map(hour => (
          <div key={hour} className="week-time-slot h-16 border-b border-google-border text-xs text-gray-500 px-2 pt-1">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
        ))}
      </div>

      <div className="week-days flex-1 flex">
        {days.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div key={dayIdx} className="week-day flex-1 border-r border-google-border last:border-r-0">
              <div className={`week-day-header h-14 border-b border-google-border p-2 text-center ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
                <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
                <div className={`text-lg font-medium ${isToday ? 'text-google-blue' : 'text-gray-700'}`}>
                  {format(day, 'd')}
                </div>
              </div>
              
              <div className="week-day-grid relative">
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="week-hour-slot h-16 border-b border-google-border hover:bg-gray-50 cursor-pointer"
                    onClick={() => onCreateEvent(addHours(startOfDay(day), hour))}
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
                      className="week-event absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer event-hover overflow-hidden z-10"
                      style={{
                        ...position,
                        backgroundColor: event.color || event.calendarId?.color || '#1a73e8',
                        color: 'white'
                      }}
                      title={`${format(new Date(event.start), 'h:mm a')} - ${format(new Date(event.end), 'h:mm a')}: ${event.title}`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      {!event.allDay && (
                        <div className="text-xs opacity-90">
                          {format(new Date(event.start), 'h:mm a')}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekView
