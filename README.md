# 📅 Google Calendar Clone

A full-stack, high-fidelity clone of Google Calendar with pixel-perfect UI design, seamless interactions, and comprehensive event management capabilities.

![Calendar Clone](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)

## 🎯 Features

### Core Functionalities
- ✅ **Multiple Views**: Day, Week, and Month views with smooth transitions
- ✅ **Event Management**: Create, edit, delete, and view events with a beautiful modal interface
- ✅ **Color Coding**: Assign different colors to events and calendars
- ✅ **Multiple Calendars**: Create and manage multiple calendars (e.g., Work, Personal, Tasks)
- ✅ **Calendar Toggles**: Show/hide specific calendars
- ✅ **Recurring Events**: Support for daily, weekly, monthly, and yearly recurring events
- ✅ **Search Functionality**: Search events by title, description, or location
- ✅ **Today Button**: Quick navigation to current date
- ✅ **Date Navigation**: Navigate between months, weeks, and days with intuitive controls
- ✅ **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes

### UI/UX Features
- 🎨 **Pixel-Perfect Design**: Matches Google Calendar's visual design
- ✨ **Smooth Animations**: Transitions and hover effects for better user experience
- 🎯 **Interactive Mini Calendar**: Sidebar calendar for quick date selection
- 📱 **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- 🌈 **Color Customization**: Choose from 8 predefined colors for calendars

### Backend Features
- 🔐 **JWT Authentication**: Secure user authentication and authorization
- 📊 **RESTful API**: Clean, well-structured API endpoints
- 🗄️ **MongoDB Integration**: Persistent data storage with Mongoose ODM
- 🔒 **Data Validation**: Input validation and error handling
- ⚡ **Optimized Queries**: Efficient database queries with proper indexing

## 🚀 Tech Stack

### Frontend
- **React.js** 18.2.0 - UI library
- **Vite** 5.0.8 - Build tool and dev server
- **Tailwind CSS** 3.3.6 - Utility-first CSS framework
- **React Router** 6.20.1 - Client-side routing
- **Axios** 1.6.2 - HTTP client
- **date-fns** 2.30.0 - Date manipulation library

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** with Mongoose 8.0.3 - Database and ODM
- **JWT** (jsonwebtoken) 9.0.2 - Authentication
- **bcryptjs** 2.4.3 - Password hashing
- **express-validator** 7.0.1 - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cd backend
cp env.template .env
```

Or manually create `.env` with:
```env
MONGO_URI=mongodb://127.0.0.1:27017/google-calendar-clone
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

> **Note**: Make sure MongoDB is running locally, or use MongoDB Atlas connection string. See [MONGODB_SETUP.md](./backend/MONGODB_SETUP.md) for detailed setup instructions.

4. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🏗️ Architecture

### Project Structure

```
assignment/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Event.js         # Event model
│   │   └── Calendar.js      # Calendar model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── events.js        # Event CRUD routes
│   │   └── calendars.js     # Calendar CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Express server setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── Calendar/
│   │   │       ├── Calendar.jsx       # Main calendar component
│   │   │       ├── Sidebar.jsx        # Left sidebar
│   │   │       ├── TopNav.jsx         # Top navigation
│   │   │       ├── EventModal.jsx     # Event create/edit modal
│   │   │       ├── MiniCalendar.jsx   # Sidebar mini calendar
│   │   │       ├── CalendarList.jsx   # Calendar toggles
│   │   │       └── views/
│   │   │           ├── MonthView.jsx  # Month view
│   │   │           ├── WeekView.jsx   # Week view
│   │   │           └── DayView.jsx    # Day view
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx        # Authentication context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

### Data Flow

```
User Action (Frontend)
    ↓
React Component
    ↓
API Call (Axios)
    ↓
Express Route Handler
    ↓
MongoDB (via Mongoose)
    ↓
Response
    ↓
State Update (React)
    ↓
UI Re-render
```

## 📡 API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "token": "jwt_token",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

#### Login User
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "token": "jwt_token",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

### Events

#### Get Events
```
GET /api/events?start=2024-01-01&end=2024-01-31&calendarIds=id1,id2
Headers: Authorization: Bearer <token>
Response: Array of events
```

#### Get Single Event
```
GET /api/events/:id
Headers: Authorization: Bearer <token>
Response: Event object
```

#### Create Event
```
POST /api/events
Headers: Authorization: Bearer <token>
Body: {
  "title": "Meeting",
  "description": "Team meeting",
  "start": "2024-01-15T10:00:00Z",
  "end": "2024-01-15T11:00:00Z",
  "allDay": false,
  "calendarId": "...",
  "color": "#1a73e8",
  "location": "Office",
  "recurrence": {
    "frequency": "WEEKLY",
    "interval": 1
  }
}
Response: Created event object
```

#### Update Event
```
PUT /api/events/:id
Headers: Authorization: Bearer <token>
Body: { ...event fields to update }
Response: Updated event object
```

#### Delete Event
```
DELETE /api/events/:id
Headers: Authorization: Bearer <token>
Response: { "message": "Event deleted successfully" }
```

#### Search Events
```
GET /api/events/search/:query
Headers: Authorization: Bearer <token>
Response: Array of matching events
```

### Calendars

#### Get Calendars
```
GET /api/calendars
Headers: Authorization: Bearer <token>
Response: Array of calendars
```

#### Create Calendar
```
POST /api/calendars
Headers: Authorization: Bearer <token>
Body: {
  "name": "Work",
  "color": "#1a73e8",
  "visible": true
}
Response: Created calendar object
```

#### Update Calendar
```
PUT /api/calendars/:id
Headers: Authorization: Bearer <token>
Body: { ...calendar fields to update }
Response: Updated calendar object
```

#### Delete Calendar
```
DELETE /api/calendars/:id
Headers: Authorization: Bearer <token>
Response: { "message": "Calendar deleted successfully" }
```

## 🔄 Recurring Events Logic

The application supports recurring events with the following recurrence rules:

### Supported Frequencies
- **DAILY**: Event repeats every day
- **WEEKLY**: Event repeats every week
- **MONTHLY**: Event repeats every month
- **YEARLY**: Event repeats every year

### Recurrence Schema
```javascript
{
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
  interval: Number,        // Repeat every N intervals (default: 1)
  count: Number | null,    // Number of occurrences (null = infinite)
  until: Date | null,      // End date (null = no end)
  byDay: ["MO", "TU"],     // Days of week (for WEEKLY)
  byMonthDay: [15],        // Day of month (for MONTHLY)
  byMonth: [1, 2]          // Months (for YEARLY)
}
```

### Conflict Handling

The application handles overlapping events by:
1. Displaying events side-by-side in week/day views
2. Stacking events vertically in month view
3. Showing indicators for events that span multiple days
4. Maintaining event order based on start time

## 🎨 Animations and Transitions

### Implemented Animations

1. **Modal Fade-in**: Event modal appears with fade and slide animation
2. **Hover Effects**: Events and buttons have smooth hover transitions
3. **View Transitions**: Smooth transitions between Day/Week/Month views
4. **Button Interactions**: Buttons have active states and hover effects
5. **Color Picker**: Smooth color selection in event modal

### CSS Transitions

```css
/* Fade-in animation */
.fade-in {
  animation: fadeIn 0.2s ease-in;
}

/* Slide-in animation */
.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Event hover effect */
.event-hover {
  transition: all 0.2s ease;
}

.event-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

## 🌍 Timezone Support

The application supports timezone handling:
- Default timezone: GMT+05:30 (configurable per event)
- Events store datetime in ISO 8601 format
- Frontend displays times in user's local timezone

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: All inputs are validated using express-validator
- **Authorization**: Users can only access their own events and calendars
- **CORS**: Configured for secure cross-origin requests

## 📱 Responsive Design

The application is fully responsive with:
- **Desktop**: Full sidebar and calendar views
- **Tablet**: Collapsible sidebar, optimized layout
- **Mobile**: Hamburger menu, stacked views, touch-friendly controls

## 🚀 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

### Backend (Render/Railway)

1. Set environment variables:
   - `PORT`
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET`

2. Deploy to Render/Railway with your Git repository

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🔮 Future Improvements

- [ ] **Drag and Drop**: Implement drag-and-drop for event rescheduling
- [ ] **Notifications**: Add browser notifications for upcoming events
- [ ] **WebSockets**: Real-time event synchronization between users
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Google Calendar Integration**: Import/export events from Google Calendar
- [ ] **Event Reminders**: Email/push notifications for reminders
- [ ] **Event Attachments**: Add file attachments to events
- [ ] **Collaborative Events**: Share events with other users
- [ ] **Event Templates**: Create reusable event templates
- [ ] **Calendar Sharing**: Share calendars with other users
- [ ] **Export/Import**: Export calendar as ICS file
- [ ] **Mobile App**: Native mobile app (React Native)

## 📝 Development Notes

### Adding New Features

1. **New Calendar View**: Create component in `frontend/src/components/Calendar/views/`
2. **New API Endpoint**: Add route in `backend/routes/`
3. **New Model**: Create schema in `backend/models/`

### Code Style

- Use functional components with React Hooks
- Follow ESLint/Prettier configuration
- Use Tailwind CSS utility classes
- Maintain consistent file naming (PascalCase for components)

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

**Frontend won't connect to backend:**
- Verify backend is running on port 5000
- Check CORS settings in `backend/server.js`
- Verify API proxy in `frontend/vite.config.js`

**Events not displaying:**
- Check browser console for errors
- Verify authentication token is valid
- Check MongoDB connection and data

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🙏 Acknowledgments

- Google Calendar for design inspiration
- React community for excellent documentation
- date-fns for date manipulation utilities
- Tailwind CSS for beautiful styling utilities

---

**Built with ❤️ using React, Node.js, and MongoDB**

For questions or support, please open an issue on GitHub.
