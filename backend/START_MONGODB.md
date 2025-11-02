# 🚀 How to Start MongoDB Locally

## Quick Start Guide

### Step 1: Verify MongoDB Installation

Check if MongoDB is installed:
```bash
mongod --version
# or
mongosh --version
```

### Step 2: Start MongoDB

#### Windows
```bash
# Option 1: Start as Windows Service (Recommended)
net start MongoDB

# Option 2: Start manually in a terminal
mongod --dbpath "C:\data\db"
```

#### macOS
```bash
# Option 1: Start as service (Recommended)
brew services start mongodb-community

# Option 2: Start manually
mongod --config /usr/local/etc/mongod.conf

# Option 3: Start with default config
mongod
```

#### Linux (Ubuntu/Debian)
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable auto-start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### Step 3: Verify MongoDB is Running

#### Method 1: MongoDB Shell (mongosh)
```bash
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB: 7.0.x
Apparent server version: 7.0.x
...
test> 
```

Type `exit` or press `Ctrl+C` to quit.

#### Method 2: MongoDB Compass (GUI)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Install and open it
3. Connect using: `mongodb://127.0.0.1:27017`
4. You should see your databases listed

#### Method 3: Test Connection in Browser
```bash
# MongoDB has a web interface on port 28017
# Open browser: http://localhost:28017
```

### Step 4: Verify Your Backend Can Connect

1. Make sure MongoDB is running (see Step 2)
2. Start your backend:
```bash
cd backend
npm run dev
```

You should see:
```
🔄 Attempting to connect to MongoDB... (Attempt 1/5)
✅ MongoDB Connected Successfully
📦 Database: google-calendar-clone
🌐 Host: 127.0.0.1
🔌 Port: 27017
🚀 Server running on port 5000
```

---

## 🐛 Troubleshooting

### Error: "mongod: command not found"

**Problem**: MongoDB is not installed or not in PATH

**Solution**:
- Install MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
- Or use Homebrew (macOS): `brew install mongodb-community`
- Or use package manager (Linux): `sudo apt-get install mongodb-org`

### Error: "Address already in use"

**Problem**: MongoDB is already running

**Solution**:
```bash
# Windows: Check if service is running
sc query MongoDB

# macOS/Linux: Check if process is running
ps aux | grep mongod

# Kill the process if needed
# Windows: net stop MongoDB
# macOS/Linux: killall mongod
```

### Error: "data directory not found"

**Problem**: MongoDB data directory doesn't exist

**Solution**:
```bash
# Windows
mkdir C:\data\db

# macOS/Linux
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

### Error: "Permission denied"

**Problem**: Insufficient permissions

**Solution**:
```bash
# macOS/Linux: Run with sudo
sudo mongod

# Or change ownership
sudo chown -R $USER /data/db
```

### MongoDB Service Won't Start

**Windows**:
1. Open Services (services.msc)
2. Find "MongoDB Server"
3. Right-click → Start
4. Check Properties → Log On tab

**macOS**:
```bash
# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart service
brew services restart mongodb-community
```

**Linux**:
```bash
# Check logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart service
sudo systemctl restart mongod
```

---

## 📝 Common Commands

### Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Stop MongoDB
```bash
# Windows
net stop MongoDB

# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

### Check MongoDB Status
```bash
# Windows
sc query MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

### Connect to MongoDB Shell
```bash
mongosh

# Connect to specific database
mongosh google-calendar-clone

# Show databases
show dbs

# Use database
use google-calendar-clone

# Show collections
show collections
```

---

## ✅ Quick Verification Checklist

- [ ] MongoDB is installed (`mongod --version`)
- [ ] MongoDB service is running
- [ ] Can connect via `mongosh`
- [ ] Backend connects successfully (check console logs)
- [ ] `.env` file has correct `MONGO_URI`

---

## 🌐 Alternative: Use MongoDB Atlas (Cloud)

If you don't want to install MongoDB locally, use MongoDB Atlas:

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed Atlas setup.

---

**Need more help?** Check the error message in your terminal and refer to the troubleshooting section above.
