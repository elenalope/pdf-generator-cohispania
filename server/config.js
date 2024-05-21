import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 3000;
export const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
export const MONGO_URI_TEST = process.env.MONGO_URI_TEST;
