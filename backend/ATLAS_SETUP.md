# 🚀 MongoDB Atlas Setup Guide

## Quick Setup Steps

### Step 1: Update .env File

1. Open `backend/.env` (create it if it doesn't exist by copying `env.template`)

2. Update the `MONGO_URI` with your actual password:

```env
MONGO_URI=mongodb+srv://sameermishra280202_db_user:YOUR_ACTUAL_PASSWORD@cluster0.ynpi2ff.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Important**: Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB Atlas database user password.

### Step 2: Verify Atlas Network Access

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to **Network Access** (in the left sidebar)
3. Click **Add IP Address**
4. For development, click **Allow Access from Anywhere** (0.0.0.0/0)
5. Or add your specific IP address for better security

### Step 3: Verify Database User

1. Go to **Database Access** in Atlas
2. Make sure user `sameermishra280202_db_user` exists
3. Verify the user has **Atlas Admin** or **Read and write to any database** permissions
4. Make sure you know the correct password

### Step 4: Test Connection

```bash
cd backend
npm run dev
```

You should see:
```
🔄 Attempting to connect to MongoDB... (Attempt 1/5)
✅ MongoDB Connected Successfully
📦 Database: google-calendar-clone
🌐 Host: cluster0.ynpi2ff.mongodb.net
🚀 Server running on port 5000
```

---

## 🔒 Security Best Practices

### For Development:
- Use `0.0.0.0/0` in Network Access (allows all IPs)

### For Production:
- Whitelist only your server's IP address
- Use strong passwords
- Rotate passwords regularly
- Enable MongoDB Atlas monitoring and alerts

---

## 🐛 Troubleshooting Atlas Connection

### Error: "Authentication failed"
**Problem**: Wrong password or username

**Solution**:
1. Verify password in `.env` file (no spaces, correct case)
2. Reset password in Atlas → Database Access
3. Update `.env` with new password

### Error: "Network access denied"
**Problem**: Your IP is not whitelisted

**Solution**:
1. Go to Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Wait 1-2 minutes for changes to propagate

### Error: "DNS resolution failed"
**Problem**: Invalid connection string or network issue

**Solution**:
1. Verify connection string format in `.env`
2. Check if cluster is running (not paused)
3. Verify cluster URL is correct

### Error: "Connection timeout"
**Problem**: Network/firewall blocking connection

**Solution**:
1. Check if you're behind a corporate firewall
2. Try from a different network
3. Increase timeout in connection options

---

## ✅ Connection String Format

Correct format:
```
mongodb+srv://username:password@cluster0.ynpi2ff.mongodb.net/database-name?retryWrites=true&w=majority
```

Parts:
- `mongodb+srv://` - Protocol for Atlas
- `username:password` - Your database user credentials
- `cluster0.ynpi2ff.mongodb.net` - Your cluster URL
- `database-name` - Database name (google-calendar-clone)
- `?retryWrites=true&w=majority` - Connection options

---

## 🔄 Switching Between Local and Atlas

To switch back to local MongoDB, update `.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/google-calendar-clone
```

The code automatically detects the connection type and adjusts timeouts accordingly.

---

## 📝 Notes

- The connection string supports automatic retry logic (up to 5 attempts)
- Connection is tested before server starts
- Health check available at `/api/health`
- Password is automatically hidden in error logs for security
