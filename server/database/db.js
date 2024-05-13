import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';


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