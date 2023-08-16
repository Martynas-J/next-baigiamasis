import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        mongoose.set('strictQuery', false); // Pridėta eilutė
        console.log("Prisijunge");
    } catch (error) {
        throw new Error("Connection failed!");
    }
};

export default connect;