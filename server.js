process.on('uncaughtException',(err)=>{
    console.log('error',err);
})

import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js';
import messageRouter from './src/modules/message/message.routes.js';
import { AppError } from './src/utils/AppError.js';
import { globalError } from './src/middleware/gobalErrorMiddleware.js';
import dotenv from "dotenv"
dotenv.config()
const app = express()
const port = 3000


app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))


app.use(userRouter)
app.use(messageRouter)

app.use('*', (req, res, next) => {
    next(new AppError("not found endPoint", 400))
})

app.use(globalError)
dbConnection()



process.on('unhandledRejection', (err) => {
    console.log('error',err);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// 100
// 200
// 300
// 400
// 500