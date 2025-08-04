import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import courseRouter from './routes/courseRoute.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('⏳ Connecting to DB...');
    await connectDB();
    console.log('✅ MongoDB Connected');

    console.log('⏳ Connecting to Cloudinary...');
    await connectCloudinary();
    console.log('✅ Cloudinary Connected');

    app.use(cors());
    app.use(clerkMiddleware());

    app.get('/', (req, res) => res.send('API Working'));
    app.post('/clerk', express.json(), clerkWebhooks);
    app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
    app.use('/api/admin', express.json(), adminRouter);
    app.use('/api/educator', express.json(), educatorRouter);
    app.use('/api/course', express.json(), courseRouter);
    app.use('/api/user', express.json(), userRouter);

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
};

startServer();
