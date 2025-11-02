import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, eachDayOfInterval, getDay, startOfDay } from 'date-fns'
import './MiniCalendar.css'

function MiniCalendar({ currentDate, selectedDate, onDateSelect, events }) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const hasEvent = (date) => {
    const dateStr = format(startOfDay(date), 'yyyy-MM-dd')
    return events.some(event => {
      const eventStart = format(startOfDay(new Date(event.start)), 'yyyy-MM-dd')
      return eventStart === dateStr
    })
  }

  return (
    <div className="p-4 border-b border-google-border">
      <div className="text-sm font-medium text-gray-700 mb-2">
        {format(currentDate, 'MMMM yyyy')}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-xs text-center text-gray-500 py-1">
            {day.charAt(0)}
          </div>
        ))}
        
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart)
          const isToday = isSameDay(day, new Date())
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const hasEventOnDay = hasEvent(day)
          
          return (
            <button
              key={idx}
              onClick={() => onDateSelect(day)}
              className={`
                text-xs p-1 rounded-full hover:bg-gray-100 transition-colors
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                ${isToday ? 'bg-google-blue text-white font-medium' : ''}
                ${isSelected && !isToday ? 'bg-blue-100' : ''}
                ${hasEventOnDay && !isToday ? 'font-semibold' : ''}
              `}
            >
              {format(day, 'd')}
              {hasEventOnDay && !isToday && (
                <div className="w-1 h-1 bg-google-blue rounded-full mx-auto mt-0.5"></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MiniCalendar
