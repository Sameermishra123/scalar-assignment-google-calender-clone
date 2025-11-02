import React from 'react'

function CreateEventButton({ onCreateEvent }) {
  return (
    <button
      onClick={() => onCreateEvent()}
      className="mx-4 mt-4 mb-2 px-4 py-2 bg-google-blue text-white rounded-md hover:bg-google-blue-hover transition-colors shadow-sm font-medium text-sm flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Create
    </button>
  )
}

export default CreateEventButton
