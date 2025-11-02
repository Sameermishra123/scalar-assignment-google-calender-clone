# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Terminal/Command Prompt ready

### Step 1: Clone and Setup

```bash
# Navigate to the project directory
cd assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Backend

1. Create `.env` file in `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calendar-clone
JWT_SECRET=my-secret-key-12345
NODE_ENV=development
```

2. Start MongoDB (if using local MongoDB):
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

3. Start backend server:
```bash
cd backend
npm run dev
```

Backend should be running on `http://localhost:5000` ✅

### Step 3: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend should be running on `http://localhost:3000` ✅

### Step 4: Create Your Account

1. Open `http://localhost:3000` in your browser
2. Click "Create a new account"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
4. Click "Create account"

### Step 5: Start Using Calendar

1. Click the **"Create"** button to add your first event
2. Fill in event details:
   - Title: "My First Event"
   - Start/End times
   - Choose a calendar
   - Select a color
3. Click **"Create"**

🎉 You're all set! Start managing your calendar!

## 📝 Common Commands

### Backend
```bash
cd backend
npm run dev    # Start with auto-reload
npm start      # Start in production mode
```

### Frontend
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- **Problem**: `MongoDB connection error`
- **Solution**: 
  - Check if MongoDB is running: `mongod --version`
  - Verify connection string in `.env`
  - For MongoDB Atlas: Use full connection string

### Port Already in Use
- **Problem**: `Port 5000 already in use`
- **Solution**: 
  - Change PORT in backend `.env`
  - Or kill the process using port 5000

### Frontend Can't Connect to Backend
- **Problem**: API calls failing
- **Solution**:
  - Verify backend is running on port 5000
  - Check `frontend/vite.config.js` proxy settings
  - Clear browser cache

## 🎯 Next Steps

- Create multiple calendars for different purposes
- Add recurring events (daily, weekly, monthly)
- Use the search feature to find events
- Try different views (Day, Week, Month)
- Toggle calendars on/off to focus on specific schedules

## 📚 Need Help?

Check the main [README.md](./README.md) for:
- Detailed API documentation
- Architecture overview
- Deployment instructions
- Advanced features

Happy scheduling! 📅✨
