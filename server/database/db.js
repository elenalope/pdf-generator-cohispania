import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';


//const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : MONGO_URI;

const connect = async() =>{
   try {
        await mongoose.connect(MONGO_URI,{
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