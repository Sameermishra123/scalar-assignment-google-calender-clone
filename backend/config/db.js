const mongoose = require('mongoose');

/**
 * MongoDB Connection with Retry Logic
 * Handles connection errors and retries automatically
 */
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/google-calendar-clone';
  
  // Connection options (no deprecated options needed in Mongoose 8+)
  // Detect if using Atlas (mongodb+srv://) or local MongoDB
  const isAtlas = MONGO_URI.startsWith('mongodb+srv://');
  
  const options = {
    serverSelectionTimeoutMS: isAtlas ? 10000 : 5000, // Longer timeout for Atlas
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  };

  // Check if URI is provided
  if (!MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined in .env file');
    console.error('💡 Please create a .env file with MONGO_URI');
    process.exit(1);
  }

  // Retry connection configuration
  const maxRetries = 5;
  const retryDelay = 3000; // 3 seconds
  let retryCount = 0;

  const attemptConnection = async () => {
    try {
      console.log(`🔄 Attempting to connect to MongoDB... (Attempt ${retryCount + 1}/${maxRetries})`);
      
      await mongoose.connect(MONGO_URI, options);

      // Success! Connection established
      console.log('✅ MongoDB Connected Successfully');
      console.log(`📦 Database: ${mongoose.connection.name}`);
      console.log(`🌐 Host: ${mongoose.connection.host}`);
      console.log(`🔌 Port: ${mongoose.connection.port || 'default'}`);
      
      // Reset retry count on success
      retryCount = 0;

      // Set up connection event handlers
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected successfully');
      });

      return true;

    } catch (error) {
      retryCount++;
      
      // Check if we've exceeded max retries
      if (retryCount >= maxRetries) {
        console.error('\n❌ MongoDB Connection Failed');
        console.error(`❌ Error: ${error.message}`);
        console.error(`❌ Failed after ${maxRetries} attempts`);
        console.error('\n💡 Troubleshooting Steps:');
        console.error('1. Check if MongoDB is running:');
        console.error('   - Windows: net start MongoDB');
        console.error('   - macOS: brew services start mongodb-community');
        console.error('   - Linux: sudo systemctl start mongod');
        console.error('   - Or run: mongod (in a separate terminal)');
        console.error('\n2. Verify MongoDB is accessible:');
        console.error('   - Run: mongosh (should connect)');
        console.error('   - Or test in MongoDB Compass');
        console.error('\n3. Check your .env file:');
        console.error(`   - Current MONGO_URI: ${MONGO_URI.replace(/:[^:@]+@/, ':****@')}`); // Hide password in logs
        console.error('   - For local: mongodb://127.0.0.1:27017/google-calendar-clone');
        console.error('   - For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/google-calendar-clone');
        console.error('\n4. If using Atlas:');
        console.error('   - Verify username and password in connection string');
        console.error('   - Replace <db_password> with your actual MongoDB Atlas password');
        console.error('   - Check Network Access in Atlas dashboard (whitelist IP: 0.0.0.0/0 for development)');
        console.error('   - Ensure cluster is running and not paused');
        
        process.exit(1);
      }

      // Retry with exponential backoff
      console.error(`❌ Connection attempt ${retryCount} failed: ${error.message}`);
      console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return attemptConnection();
    }
  };

  return await attemptConnection();
};

module.exports = connectDB;
