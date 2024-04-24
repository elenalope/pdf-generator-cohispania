import mongoose from 'mongoose';
import { MONGO_URI, MONGO_URI_TEST } from '../config.js';


const MONGO_URL_CONNECTION = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;


const connect = async() =>{
   try {
        await mongoose.connect(MONGO_URL_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.error(error);
        console.log('Error connecting to database');
    }
};
export default connect;