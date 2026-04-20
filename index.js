import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __direname = path.dirname(fileURLToPath(import.meta.url))
// -----------
import stripe from 'stripe'
stripe('sk_test_51MxafiDlUdQmc698VshMfXJCYCDQDeH1jggtJnJhB5tI4lSDnDhrzHgxiTlSYw16LQB7vCNnMX88hvhOLsDn4UiY00SY4YxfoZ');
import bodyParser from 'body-parser'
// ---------
dotenv.config({ path: path.join(__direname, './config/.env') })
import express from 'express'
// import * as indexRouter from './src/module/index.router.js'
const app = express()
import connection from './DB/connection.js'
import { globalError } from './src/services/asyncHandler.js'
import * as indexRouter from './src/module/index.router.js'
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
import cors from "cors";

const allowedOrigins = [
  "http://localhost:4200",
  "https://ziadal3tar.github.io"
];

app.use(cors({
  origin: function (origin, callback) {
    // للسماح بطلبات زي Postman أو بدون origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
const port = process.env.PORT
app.use(express.static('public'));
app.use(express.json())

app.use('/auth', indexRouter.authRouter)
app.use('/services', indexRouter.servicesRouter)
app.use('/client', indexRouter.clientsRouter)
app.use('/user', indexRouter.userRouter)
app.use('/orders', indexRouter.ordersRouter)
app.use('/payment', indexRouter.paymentRouter)

app.get('/', (req, res) => res.send('X company apis V2!'))

app.use('*', (req, res, next) => {
    res.send("In-valid Route pls check url or method")
})


app.use(globalError)
connection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
