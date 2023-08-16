import mongoose from "mongoose";

const { Schema } = mongoose

const starSchema = new Schema({
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
    systemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System',
        required: true,
    },
    discovererId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discoverer',
        required: true,
    },
}, { timestamps: true })

let starModel
try {
    starModel = mongoose.model('Star')
} catch (error) {
    starModel = mongoose.model('Star', starSchema)
}
export default starModel