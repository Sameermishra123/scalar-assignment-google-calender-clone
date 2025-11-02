import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

const Settings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm a',
    timeZone: 'UTC',
    defaultEventDuration: 60,
    weekStart: 'sunday',
    showWeekends: true,
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    location: '',
    notifications: {
      email: true,
      desktop: true,
    },
    offlineMode: false,
  });

  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/settings', {
        headers: { 'x-auth-token': token },
      });
      setSettings(res.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('notifications.')) {
      const key = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        notifications: { ...prev.notifications, [key]: checked },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/settings', settings, {
        headers: { 'x-auth-token': token },
      });
      onClose();
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="settings-overlay" onClick={onClose}></div>
      <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
          {/* Language & Region */}
          <div>
            <h3 className="text-lg font-medium mb-2">Language & Region</h3>
            <div className="space-y-2">
              <label className="block">Language</label>
              <select name="language" value={settings.language} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="en">English (US)</option>
                {/* Add other languages here */}
              </select>
              <label className="block">Date Format</label>
              <select name="dateFormat" value={settings.dateFormat} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
          </div>

          {/* Event Settings */}
          <div>
            <h3 className="text-lg font-medium mb-2">Event Settings</h3>
            <div className="space-y-2">
              <label className="block">Default duration</label>
              <select name="defaultEventDuration" value={settings.defaultEventDuration} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" name="notifications.email" checked={settings.notifications.email} onChange={handleChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>Desktop Notifications</span>
                <input type="checkbox" name="notifications.desktop" checked={settings.notifications.desktop} onChange={handleChange} className="form-checkbox" />
              </div>
            </div>
          </div>

          {/* View Options */}
          <div>
            <h3 className="text-lg font-medium mb-2">View Options</h3>
            <div className="flex items-center justify-between">
              <span>Show weekends</span>
              <input type="checkbox" name="showWeekends" checked={settings.showWeekends} onChange={handleChange} className="form-checkbox" />
            </div>
          </div>

          {/* Working Hours & Location */}
          <div>
            <h3 className="text-lg font-medium mb-2">Working Hours & Location</h3>
            <div className="space-y-2">
              <label className="block">Start Time</label>
              <input type="time" name="workingHoursStart" value={settings.workingHoursStart} onChange={handleChange} className="w-full p-2 border rounded" />
              <label className="block">End Time</label>
              <input type="time" name="workingHoursEnd" value={settings.workingHoursEnd} onChange={handleChange} className="w-full p-2 border rounded" />
              <label className="block">Location</label>
              <input type="text" name="location" value={settings.location} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., Office" />
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="text-lg font-medium mb-2">Keyboard Shortcuts</h3>
            <p className="text-sm text-gray-500">View and customize shortcuts (static for now).</p>
          </div>

          {/* Offline Mode */}
          <div>
            <h3 className="text-lg font-medium mb-2">Offline Mode</h3>
            <div className="flex items-center justify-between">
              <span>Enable offline mode</span>
              <input type="checkbox" name="offlineMode" checked={settings.offlineMode} onChange={handleChange} className="form-checkbox" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-google-border rounded hover:bg-gray-50 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-google-blue text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;