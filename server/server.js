import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import adminRouter from './routes/adminRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Stripe webhook must come first (uses raw)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Webhook for Clerk
app.post('/clerk', clerkWebhooks)

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/api/admin/create-default', (req, res) => res.send("Use POST method to create default admin"))

app.use('/api/admin', adminRouter)
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)

// Start Server
const startServer = async () => {
  try {
    await connectDB()
    await connectCloudinary()
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (err) {
    console.error('❌ Server startup failed:', err.message)
  }
}

startServer()
