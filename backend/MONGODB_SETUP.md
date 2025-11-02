# MongoDB Setup Guide

## 🎯 Quick Setup Options

You have two options for MongoDB:
1. **Local MongoDB** (recommended for development)
2. **MongoDB Atlas** (cloud-hosted, recommended for production)

---

## Option 1: Local MongoDB Setup

### Installation

#### Windows
1. Download MongoDB Community Server from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (recommended)
5. Finish the installation

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Starting MongoDB

#### Windows
```bash
# Start MongoDB service
net start MongoDB

# Or start manually
mongod --dbpath "C:\data\db"
```

#### macOS
```bash
# Start MongoDB service
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

#### Linux
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable auto-start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### Verify MongoDB is Running

Open a new terminal and run:
```bash
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB: 7.0.x
```

Type `exit` to quit mongosh.

### Create Database Directory (if needed)

If MongoDB can't start, create the data directory:

#### Windows
```bash
mkdir C:\data\db
```

#### macOS/Linux
```bash
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

---

## Option 2: MongoDB Atlas Setup (Cloud)

### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a free cluster (M0 tier)

### Step 2: Configure Security
1. **Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Atlas Admin" or "Read and write to any database"

2. **Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add only your server IP

### Step 3: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Update .env File
Replace `<username>` and `<password>` with your credentials, and add the database name:
```
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
```

---

## 🔧 Configure .env File

1. Copy `.env.example` to `.env`:
```bash
cd backend
cp .env.example .env
```

2. Edit `.env` with your preferred option:

### For Local MongoDB:
```env
MONGO_URI=mongodb://127.0.0.1:27017/google-calendar-clone
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

---

## ✅ Test Connection

1. Make sure MongoDB is running (local) or Atlas cluster is active
2. Start your backend:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
📦 Database: google-calendar-clone
🌐 Host: 127.0.0.1:27017
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:27017"
**Problem**: MongoDB is not running locally

**Solution**:
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# macOS/Linux
sudo systemctl status mongod

# Start MongoDB if not running (see Starting MongoDB section above)
```

### Error: "Authentication failed"
**Problem**: Wrong credentials in MongoDB Atlas connection string

**Solution**:
- Double-check username and password in connection string
- Make sure the user has proper permissions in Atlas
- Verify the database name is correct

### Error: "Network access denied"
**Problem**: Your IP is not whitelisted in MongoDB Atlas

**Solution**:
- Go to Atlas → Network Access
- Add your current IP address
- Or temporarily allow all IPs (0.0.0.0/0) for development

### Error: "Invalid connection string"
**Problem**: Connection string format is incorrect

**Solution**:
- For local: `mongodb://127.0.0.1:27017/google-calendar-clone`
- For Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- Make sure there are no extra spaces or quotes

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

**Need help?** Check the error message in your terminal and refer to the troubleshooting section above.
