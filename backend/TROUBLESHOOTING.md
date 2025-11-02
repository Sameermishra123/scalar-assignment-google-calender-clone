# 🔧 MongoDB Connection Troubleshooting Guide

## ❌ Common Error: "connect ECONNREFUSED 127.0.0.1:27017"

This error means MongoDB is **not running** or not accessible at that address.

### Quick Fix Steps:

1. **Start MongoDB** (choose your OS):

   **Windows:**
   ```bash
   net start MongoDB
   ```

   **macOS:**
   ```bash
   brew services start mongodb-community
   ```

   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```

2. **Verify MongoDB is running:**
   ```bash
   mongosh
   ```
   
   If you see the MongoDB shell, you're good! Type `exit` to quit.

3. **Restart your backend:**
   ```bash
   cd backend
   npm run dev
   ```

4. **You should now see:**
   ```
   ✅ MongoDB Connected Successfully
   📦 Database: google-calendar-clone
   ```

---

## ✅ Verify Your Setup

### Step 1: Check `.env` File

Make sure `backend/.env` exists and contains:
```env
MONGO_URI=mongodb://127.0.0.1:27017/google-calendar-clone
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Create it if missing:**
```bash
cd backend
cp env.template .env
```

### Step 2: Test MongoDB Connection Manually

**Option A: MongoDB Shell**
```bash
mongosh
# Should connect and show: test>
```

**Option B: MongoDB Compass**
1. Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Connect to: `mongodb://127.0.0.1:27017`
3. Should show connection successful

**Option C: Test Connection**
```bash
# Test if MongoDB is listening on port 27017
# Windows
netstat -an | findstr 27017

# macOS/Linux
lsof -i :27017
# or
netstat -an | grep 27017
```

### Step 3: Test Backend Connection

```bash
cd backend
npm run dev
```

**Success looks like:**
```
🔄 Attempting to connect to MongoDB... (Attempt 1/5)
✅ MongoDB Connected Successfully
📦 Database: google-calendar-clone
🌐 Host: 127.0.0.1
🚀 Server running on port 5000
```

**Health Check:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK","mongodb":"connected"}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Not Installed

**Symptoms:**
- `mongod: command not found`
- `mongosh: command not found`

**Solution:**
- Download from [mongodb.com/download](https://www.mongodb.com/try/download/community)
- Or use Homebrew (macOS): `brew install mongodb-community`
- Or use package manager (Linux): `sudo apt-get install mongodb-org`

### Issue 2: MongoDB Service Not Starting

**Windows:**
```bash
# Check service status
sc query MongoDB

# Start service
net start MongoDB

# If fails, check Event Viewer for errors
```

**macOS:**
```bash
# Check status
brew services list | grep mongodb

# Start service
brew services start mongodb-community

# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

**Linux:**
```bash
# Check status
sudo systemctl status mongod

# Start service
sudo systemctl start mongod

# Check logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Issue 3: Port 27017 Already in Use

**Check what's using the port:**
```bash
# Windows
netstat -ano | findstr :27017

# macOS/Linux
lsof -i :27017
```

**Solution:**
- Kill the process using the port
- Or change MongoDB port in `mongod.conf`

### Issue 4: Permission Denied

**macOS/Linux:**
```bash
# Fix data directory permissions
sudo chown -R $USER /data/db

# Or run mongod with sudo (not recommended)
sudo mongod
```

### Issue 5: Data Directory Missing

**Create data directory:**
```bash
# Windows
mkdir C:\data\db

# macOS/Linux
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

---

## 🔄 Using MongoDB Atlas (Cloud) Instead

If local MongoDB is too complicated, use MongoDB Atlas (free tier available):

### Step 1: Create Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free)
3. Create a free cluster

### Step 2: Configure Atlas
1. **Database Access**: Create a database user (save username/password!)
2. **Network Access**: Allow your IP (or `0.0.0.0/0` for development)

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

### Step 4: Update `.env`
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Replace:**
- `username` with your Atlas username
- `password` with your Atlas password
- `cluster0.mongodb.net` with your cluster URL

---

## ✅ Registration Test

Once MongoDB is connected, test user registration:

1. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test registration API:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "test123"
     }'
   ```

   **Success response:**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": "...",
       "name": "Test User",
       "email": "test@example.com"
     }
   }
   ```

3. **Or use Postman/Insomnia:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "test123"
     }
     ```

---

## 📋 Checklist

Before running `npm run dev`, ensure:

- [ ] MongoDB is installed
- [ ] MongoDB is running (check with `mongosh`)
- [ ] `.env` file exists in `backend/` directory
- [ ] `MONGO_URI` is set correctly in `.env`
- [ ] Port 5000 is available
- [ ] All npm packages are installed (`npm install`)

---

## 🆘 Still Having Issues?

1. **Check backend logs** - Look for specific error messages
2. **Test MongoDB manually** - Use `mongosh` or MongoDB Compass
3. **Verify .env file** - Make sure variables are correct
4. **Check firewall** - Ensure port 27017 is not blocked
5. **Try MongoDB Atlas** - Cloud option might be easier

**Need more help?** See:
- [START_MONGODB.md](./START_MONGODB.md) - Detailed MongoDB startup guide
- [MONGODB_SETUP.md](./MONGODB_SETUP.md) - Complete setup instructions
