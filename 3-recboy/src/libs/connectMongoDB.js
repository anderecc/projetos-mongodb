/* eslint-disable no-undef */
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    return await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_STRING);
};

export default connectMongoDB;
