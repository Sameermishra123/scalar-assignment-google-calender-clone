import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, eachDayOfInterval, getDay } from 'date-fns'
import MiniCalendar from './MiniCalendar'
import CalendarList from './CalendarList'
import CreateEventButton from './CreateEventButton'
import './Sidebar.css'

function Sidebar({
  isOpen,
  currentDate,
  events,
  onCreateEvent,
  calendars,
  visibleCalendarIds,
  onToggleCalendar,
  onCalendarUpdate,
  view,
  onViewChange
}) {
  const [selectedDate, setSelectedDate] = useState(currentDate)

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} bg-white dark:bg-dark-background border-r border-google-border dark:border-dark-border`}>
      <CreateEventButton onCreateEvent={onCreateEvent} />
      
      <div className="flex-1 overflow-y-auto">
        <MiniCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          events={events}
        />
        
        <CalendarList
          calendars={calendars}
          visibleCalendarIds={visibleCalendarIds}
          onToggleCalendar={onToggleCalendar}
          onCalendarUpdate={onCalendarUpdate}
        />
      </div>
    </div>
  )
}

export default Sidebar
