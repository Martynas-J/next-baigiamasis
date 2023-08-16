import mongoose from "mongoose";

const { Schema } = mongoose

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    planetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planet',
        required: true,
    },
    discovererId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'discoverer',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true })

let photoModel
try {
    photoModel = mongoose.model('photo')
} catch (error) {
    photoModel = mongoose.model('photo', photoSchema)
}
export default photoModel