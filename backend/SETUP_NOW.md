# 🚀 Quick Setup - Start Now!

## Step 1: Create `.env` File

Copy the template and update with your password:

```bash
cd backend
cp env.template .env
```

Or manually create `backend/.env`:

```env
MONGO_URI=mongodb+srv://sameermishra280202_db_user:<Sameer0813>@cluster0.ynpi2ff.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**⚠️ Important Note about Password:**

If your password contains special characters like `<` or `>`, you may need to URL-encode them:
- `<` becomes `%3C`
- `>` becomes `%3E`

If authentication fails, try:
```env
MONGO_URI=mongodb+srv://sameermishra280202_db_user:%3CSameer0813%3E@cluster0.ynpi2ff.mongodb.net/google-calendar-clone?retryWrites=true&w=majority
```

## Step 2: Verify Atlas Network Access

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (0.0.0.0/0) for development
5. Click **Confirm**

## Step 3: Start Backend

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

## ✅ Success!

If you see "✅ MongoDB Connected Successfully", you're all set!

## ❌ If You Get Authentication Errors

1. **Check password**: Verify password is correct in Atlas dashboard
2. **URL encode special characters**: See Step 1 above
3. **Reset password**: In Atlas → Database Access → Edit User → Reset Password
4. **Verify username**: Make sure username is exactly `sameermishra280202_db_user`

## 🧪 Test Connection

Once connected, test registration:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

Or test health endpoint:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"OK","mongodb":"connected"}
```
