import mongoose from 'mongoose';
import { NODE_ENV, MONGO_URI_DEV, MONGO_URI_TEST } from '../config.js';

const MONGO_URI = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI_DEV;

export const connect = async() =>{
   try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected 👌");
    } catch (error) {
        console.error(error);
        console.log('Error connecting to database');
    }
};
export default connect;