
import { catchError } from '../../middleware/catchError.js';
import { messageModel } from './../../../databases/models/message.model.js';
import QRcode from "qrcode"
const addMsg = catchError(async (req, res) => {
    await messageModel.insertMany(req.body)

    res.json({ message: "success" })
}
)

const shareProfile = catchError(async (req, res) => {

    QRcode.toDataURL("http://localhost:3000/messages", (err, qr) => {

        res.send(`<img src="${qr}"/>`)

    })
}
)


const allMsgs = catchError(async (req, res) => {
    let messages = await messageModel.find({ receivedId: req.params.id })
    res.json({ message: 'success', messages })
})

export {
    addMsg,
    allMsgs,
    shareProfile
}

