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

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json() , clerkWebhooks)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
app.use('/api/admin', express.json(), adminRouter)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)

const PORT = process.env.PORT || 5000

// ✅ Start server only after DB connects
const startServer = async () => {
  try {
    console.log("⏳ Connecting to DB...")
    await connectDB()
    await connectCloudinary()

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("❌ Server startup failed:", err.message)
    process.exit(1)
  }
}

startServer()
