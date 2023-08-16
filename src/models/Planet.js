import mongoose from "mongoose";

const { Schema } = mongoose

const planetSchema = new Schema({
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

let planetModel
try {
    planetModel = mongoose.model('Planet')
} catch (error) {
    planetModel = mongoose.model('Planet', planetSchema)
}
export default planetModel