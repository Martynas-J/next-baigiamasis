import mongoose from "mongoose";

const { Schema } = mongoose

const systemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    galaxy: {
        type: String,
        required: true,
    },
    galaxyGroup: {
        type: String,
        required: true,
    },
    planets: {
        type: String,
        required: true,
    },
    stars: {
        type: String,
        required: true,
    },
}, { timestamps: true })

let systemModel
try {
    systemModel = mongoose.model('System')
} catch (error) {
    systemModel = mongoose.model('System', systemSchema)
}
export default systemModel