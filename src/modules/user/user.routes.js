


import express from "express"
import { signin, signup, verify } from "./user.controllers.js"
import { checkMail } from "../../middleware/checkMail.js"
import { validation } from "../../middleware/validation.js"
import { signinSchemaVal, signupSchemaVal } from "./user.validation.js"

const userRouter = express.Router()

userRouter.post('/signup', validation(signupSchemaVal),checkMail, signup)
userRouter.post('/signin', validation(signinSchemaVal) ,signin)
userRouter.get('/verify/:token',verify)

export default userRouter