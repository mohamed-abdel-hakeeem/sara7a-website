import { userModel } from "../../../databases/models/user.model.js"
import { emailHtml } from "../../emails/emailTemplate.js"
import { sendMail } from "../../emails/sendEmail.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { catchError } from "../../middleware/catchError.js";



const signup = catchError(async (req, res, next) => {
        await userModel.insertMany(req.body)
        let token = jwt.sign({ email: req.body.email }, 'sendMailToHambozo')
        // sendMail({ email: req.body.email, html: emailHtml(token) })
        res.json({ message: "success" })

})

const signin = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ _id: user._id, email: user.email }, 'secretKey')
        return res.json({ message: "success", token })
    }

    return res.json({ message: "incorrect email or password " })
})



export {
    signup,
    verify,
    signin
}