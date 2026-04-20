import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import Stripe from "stripe"

import connection from './DB/connection.js'
import { globalError } from './src/services/asyncHandler.js'
import * as indexRouter from './src/module/index.router.js'

// -------- dirname fix
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// -------- env
dotenv.config({ path: path.join(__dirname, './config/.env') })

// -------- stripe (FIXED)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// -------- app
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -------- CORS
const allowedOrigins = [
  "http://localhost:4200",
  "https://ziadal3tar.github.io"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

app.use(express.static('public'))
app.use(express.json())

// -------- routes
app.use('/auth', indexRouter.authRouter)
app.use('/services', indexRouter.servicesRouter)
app.use('/client', indexRouter.clientsRouter)
app.use('/user', indexRouter.userRouter)
app.use('/orders', indexRouter.ordersRouter)
app.use('/payment', indexRouter.paymentRouter)

// -------- test route
app.get('/', (req, res) => res.send('X company apis V2!'))

// -------- not found
app.use('*', (req, res) => {
  res.send("In-valid Route pls check url or method")
})

// -------- error
app.use(globalError)

// -------- DB
connection()

// ❌ مهم جدًا: امسح listen
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// ✅ لازم تعمل export عشان Vercel
export default app