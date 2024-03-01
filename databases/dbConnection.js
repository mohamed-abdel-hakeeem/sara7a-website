import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/sara7aC41').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}