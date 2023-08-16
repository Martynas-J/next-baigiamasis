import mongoose from "mongoose";

const { Schema } = mongoose

const discovererSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    birthplace: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contribution: {
        type: String,
        required: true,
    },
}, { timestamps: true })

let discovererModel
try {
    discovererModel = mongoose.model('Discoverer')
} catch (error) {
    discovererModel = mongoose.model('Discoverer', discovererSchema)
}
export default discovererModel