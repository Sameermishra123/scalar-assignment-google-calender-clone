# 🚀 Quick Setup Instructions

## Step 1: Create .env File

Create a `.env` file in the `backend/` directory with the following content:

```env
MONGO_URI=mongodb://127.0.0.1:27017/google-calendar-clone
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Or copy from template:
```bash
cd backend
cp env.template .env
```

## Step 2: Start MongoDB

### Option A: Local MongoDB (Windows)
```bash
# Open PowerShell/CMD as Administrator
net start MongoDB
```

### Option B: Local MongoDB (macOS)
```bash
brew services start mongodb-community
# Or manually:
mongod --config /usr/local/etc/mongod.conf
```

### Option C: Local MongoDB (Linux)
```bash
sudo systemctl start mongod
# Check status:
sudo systemctl status mongod
```

### Option D: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
```

## Step 3: Verify MongoDB is Running

```bash
mongosh
```

If you see the MongoDB shell prompt, you're good! Type `exit` to quit.

## Step 4: Start Backend

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

## ✅ Success!

If you see the success message above, your backend is running correctly!

## ❌ Still Having Issues?

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed troubleshooting.
