import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, startOfDay, addHours } from 'date-fns'
import './MonthView.css'

function MonthView({ currentDate, events, onEventClick, onCreateEvent }) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
    }).slice(0, 3) // Show max 3 events per day
  }

  const getEventStyle = (event, day) => {
    const eventStart = startOfDay(new Date(event.start))
    const dayStart = startOfDay(day)
    const isMultiDay = eventStart < dayStart
    
    return {
      backgroundColor: event.color || event.calendarId?.color || '#1a73e8',
      color: 'white',
      marginLeft: isMultiDay ? '0' : '0'
    }
  }

  return (
    <div className="month-view h-full">
      <div className="month-view-header grid grid-cols-7 border-b border-google-border dark:border-dark-border">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500 dark:text-gray-400 text-center border-r border-google-border dark:border-dark-border last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      
      <div className="month-view-grid grid grid-cols-7 auto-rows-fr h-[calc(100%-32px)]">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart)
          const isToday = isSameDay(day, new Date())
          const dayEvents = getEventsForDay(day)
          const moreEvents = getEventsForDay(day).length < events.filter(event => {
            const eventStart = startOfDay(new Date(event.start))
            const dayStart = startOfDay(day)
            const dayEnd = addHours(dayStart, 23.99)
            const eventEnd = new Date(event.end)
            return (
              (eventStart >= dayStart && eventStart <= dayEnd) ||
              (eventEnd >= dayStart && eventEnd <= dayEnd) ||
              (eventStart <= dayStart && eventEnd >= dayEnd)
            )
          }).length

          return (
            <div
              key={idx}
              className={`
                month-cell border-r border-b border-google-border p-1 overflow-hidden
                ${!isCurrentMonth ? 'bg-gray-50 dark:bg-dark-card' : 'bg-white dark:bg-dark-background'}
                ${isToday ? 'bg-blue-50 dark:bg-blue-900' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`
                    text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center
                    ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-dark-text'}
                    ${isToday ? 'bg-google-blue text-white' : ''}
                  `}
                  onClick={() => onCreateEvent(startOfDay(day))}
                >
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="space-y-0.5">
                {dayEvents.map((event, eventIdx) => (
                  <div
                    key={event._id || eventIdx}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                    className="event-item text-xs px-1.5 py-0.5 rounded cursor-pointer event-hover truncate"
                    style={getEventStyle(event, day)}
                    title={event.title}
                  >
                    {!isSameDay(new Date(event.start), day) && '... '}
                    {format(new Date(event.start), 'HH:mm')} {event.title}
                  </div>
                ))}
                {moreEvents && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                    +{events.filter(event => {
                      const eventStart = startOfDay(new Date(event.start))
                      const dayStart = startOfDay(day)
                      const dayEnd = addHours(dayStart, 23.99)
                      const eventEnd = new Date(event.end)
                      return (
                        (eventStart >= dayStart && eventStart <= dayEnd) ||
                        (eventEnd >= dayStart && eventEnd <= dayEnd) ||
                        (eventStart <= dayStart && eventEnd >= dayEnd)
                      )
                    }).length - dayEvents.length} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthView
