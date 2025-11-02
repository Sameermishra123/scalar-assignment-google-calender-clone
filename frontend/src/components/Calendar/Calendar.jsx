import React, { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, isSameMonth, isSameDay, startOfDay } from 'date-fns'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import MonthView from './views/MonthView'
import WeekView from './views/WeekView'
import DayView from './views/DayView'
import EventModal from './EventModal'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import './Calendar.css'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // 'month', 'week', 'day'
  const [events, setEvents] = useState([])
  const [holidays, setHolidays] = useState([]);
  const [calendars, setCalendars] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCalendarIds, setVisibleCalendarIds] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth()

  useEffect(() => {
    fetchCalendars();
    fetchHolidays();
  }, [])

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/holidays');
      const holidayEvents = response.data.map(holiday => ({
        _id: `holiday-${holiday.date}`,
        title: holiday.name,
        start: new Date(holiday.date),
        end: new Date(holiday.date),
        allDay: true,
        isHoliday: true,
      }));
      setHolidays(holidayEvents);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  useEffect(() => {
    fetchEvents()
  }, [currentDate, view, visibleCalendarIds])

  useEffect(() => {
    if (visibleCalendarIds.length === 0 && calendars.length > 0) {
      setVisibleCalendarIds(calendars.map(cal => cal._id))
    }
  }, [calendars])

  const fetchCalendars = async () => {
    try {
      const response = await axios.get('/api/calendars')
      setCalendars(response.data)
    } catch (error) {
      console.error('Error fetching calendars:', error)
    }
  }

  const fetchEvents = async () => {
    try {
      let start, end
      
      if (view === 'month') {
        start = startOfWeek(startOfMonth(currentDate))
        end = endOfWeek(endOfMonth(currentDate))
      } else if (view === 'week') {
        start = startOfWeek(currentDate, { weekStartsOn: 0 })
        end = endOfWeek(currentDate, { weekStartsOn: 0 })
      } else {
        start = startOfDay(currentDate)
        end = addDays(startOfDay(currentDate), 1)
      }
      
      const calendarIds = visibleCalendarIds.length > 0 ? visibleCalendarIds.join(',') : ''
      const response = await axios.get('/api/events', {
        params: { start: start.toISOString(), end: end.toISOString(), calendarIds }
      })
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  
  }

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1))
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7))
    } else {
      setCurrentDate(addDays(currentDate, -1))
    }
  }

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1))
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7))
    } else {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleCreateEvent = (date) => {
    setSelectedEvent(null)
    setIsEventModalOpen(true)
    // If date is provided, set it as the default start date
    if (date) {
      setSelectedEvent({ start: date, end: date })
    }
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`)
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event')
    }
  }

  const handleSaveEvent = async (eventData) => {
    try {
      if (selectedEvent && selectedEvent._id) {
        await axios.put(`/api/events/${selectedEvent._id}`, eventData)
      } else {
        await axios.post('/api/events', eventData)
      }
      setIsEventModalOpen(false)
      setSelectedEvent(null)
      fetchEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Failed to save event')
    }
  }

  const handleToggleCalendar = (calendarId) => {
    setVisibleCalendarIds(prev => 
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    )
  }

  const handleSearch = async (query) => {
    setSearchQuery(query);
  };

  const filteredEvents = events.filter(event => {
    if (visibleCalendarIds.length === 0) return true
    const calendarId = event.calendarId?._id || event.calendarId
    return visibleCalendarIds.includes(calendarId)
  });

  const searchedEvents = searchQuery
    ? [...filteredEvents, ...holidays].filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...filteredEvents, ...holidays];

  const combinedEvents = searchedEvents;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-dark-background dark:text-dark-text overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        currentDate={currentDate}
        events={events}
        onCreateEvent={handleCreateEvent}
        calendars={calendars}
        visibleCalendarIds={visibleCalendarIds}
        onToggleCalendar={handleToggleCalendar}
        onCalendarUpdate={fetchCalendars}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onLogout={logout}
          onToggleSidebar={toggleSidebar}
        />
        
        <div className="flex-1 overflow-auto">
          {view === 'month' && (
            <MonthView
              currentDate={currentDate}
              events={combinedEvents}
              onEventClick={handleEditEvent}
              onCreateEvent={handleCreateEvent}
            />
          )}
          {view === 'week' && (
            <WeekView
              currentDate={currentDate}
              events={combinedEvents}
              onEventClick={handleEditEvent}
              onCreateEvent={handleCreateEvent}
            />
          )}
          {view === 'day' && (
            <DayView
              currentDate={currentDate}
              events={combinedEvents}
              onEventClick={handleEditEvent}
              onCreateEvent={handleCreateEvent}
            />
          )}
        </div>
      </div>

      {isEventModalOpen && (
        <EventModal
          event={selectedEvent}
          calendars={calendars}
          onClose={() => {
            setIsEventModalOpen(false)
            setSelectedEvent(null)
          }}
          onSave={handleSaveEvent}
          onDelete={selectedEvent?._id ? () => {
            handleDeleteEvent(selectedEvent._id)
            setIsEventModalOpen(false)
            setSelectedEvent(null)
          } : null}
        />
      )}
    </div>
  )
}

export default Calendar
