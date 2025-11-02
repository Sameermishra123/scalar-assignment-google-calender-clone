# ⚡ MongoDB Atlas Quick Start

## ✅ Your Code is Already Configured!

Your backend code is **already set up** to connect to MongoDB Atlas with:
- ✅ Automatic retry logic (5 attempts)
- ✅ Success logging ("✅ MongoDB Connected Successfully")
- ✅ Reads from `.env` file
- ✅ Supports both local and Atlas automatically
- ✅ `dotenv.config()` at the top of `server.js`

## 🚀 Setup Steps

### Step 1: Create/Update `.env` File

In the `backend/` folder, create or update `.env`:

```env
MONGO_URI=mongodb+srv://sameermishra280202_db_user:YOUR_ACTUAL_PASSWORD@cluster0.ynpi2ff.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**⚠️ Important**: Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB Atlas password.

### Step 2: Verify Atlas Configuration

1. **Network Access**: 
   - Go to [Atlas Dashboard](https://cloud.mongodb.com) → Network Access
   - Make sure your IP is whitelisted (or use `0.0.0.0/0` for development)

2. **Database User**:
   - Go to Database Access
   - Verify user `sameermishra280202_db_user` exists and password is correct

3. **Cluster Status**:
   - Make sure your cluster is running (not paused)

### Step 3: Start Backend

```bash
cd backend
npm run dev
```

**Expected Output:**
```
🔄 Attempting to connect to MongoDB... (Attempt 1/5)
✅ MongoDB Connected Successfully
📦 Database: google-calendar-clone
🌐 Host: cluster0.ynpi2ff.mongodb.net
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

---

## ✅ Verification Checklist

- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGO_URI` contains your actual password (no `<db_password>` placeholder)
- [ ] Network Access configured in Atlas
- [ ] Database user exists and password is correct
- [ ] Cluster is running (not paused)
- [ ] Backend starts successfully with "✅ MongoDB Connected Successfully"

---

## 🔄 How It Works

1. **`server.js`** loads environment variables with `dotenv.config()`
2. **`config/db.js`** reads `MONGO_URI` from `process.env`
3. Connection automatically detects Atlas vs local MongoDB
4. Retries up to 5 times if connection fails
5. Logs success message when connected

---

## 🐛 Quick Troubleshooting

### "Authentication failed"
- Check password in `.env` (no spaces, correct case)
- Reset password in Atlas if needed

### "Network access denied"
- Whitelist your IP in Atlas Network Access
- Use `0.0.0.0/0` for development

### "Connection timeout"
- Check if cluster is paused
- Verify connection string format
- Check internet connection

---

## 📝 Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

Your specific connection string:
```
mongodb+srv://sameermishra280202_db_user:PASSWORD@cluster0.ynpi2ff.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
```

---

**That's it!** Once you update the password in `.env`, your backend will automatically connect to MongoDB Atlas. 🎉
