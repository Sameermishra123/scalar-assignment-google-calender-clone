import React, { useState } from 'react'
import { format } from 'date-fns'
import Settings from './Settings'
import ThemeToggle from '../ThemeToggle'
import './TopNav.css'

function TopNav({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  onSearch,
  searchQuery,
  onLogout,
  onToggleSidebar
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const formatDateRange = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy')
    } else if (view === 'week') {
      // Calculate week start and end
      const weekStart = new Date(currentDate)
      weekStart.setDate(currentDate.getDate() - currentDate.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`
      } else {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
      }
    } else {
      return format(currentDate, 'EEEE, MMMM d, yyyy')
    }
  }

  return (
    <>
      <div className="h-14 border-b border-google-border dark:border-dark-border flex items-center px-6 bg-white dark:bg-dark-background">
        <div className="flex items-center flex-1">
          <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={onToday}
            className="px-4 py-2 text-sm border border-google-border dark:border-dark-border rounded hover:bg-gray-50 dark:hover:bg-gray-700 mr-4"
          >
            Today
          </button>

          <h2 className="text-xl font-normal text-gray-700 dark:text-dark-text min-w-[200px]">
            {formatDateRange()}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-google-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue w-64 bg-white dark:bg-dark-card"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-1 border border-google-border dark:border-dark-border rounded-md overflow-hidden">
            <button
              onClick={() => onViewChange('day')}
              className={`px-3 py-1.5 text-sm ${view === 'day' ? 'bg-google-blue text-white' : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Day
            </button>
            <button
              onClick={() => onViewChange('week')}
              className={`px-3 py-1.5 text-sm border-x border-google-border dark:border-dark-border ${view === 'week' ? 'bg-google-blue text-white' : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Week
            </button>
            <button
              onClick={() => onViewChange('month')}
              className={`px-3 py-1.5 text-sm ${view === 'month' ? 'bg-google-blue text-white' : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Month
            </button>
          </div>

          <ThemeToggle />
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <div className="relative group">
            <button className="w-8 h-8 bg-google-blue rounded-full text-white text-sm font-medium flex items-center justify-center">
              {localStorage.getItem('userInitial') || 'U'}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg border border-google-border dark:border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}

export default TopNav
