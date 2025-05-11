import { MongoClient } from 'mongodb'

const url = `mongodb+srv://${process.env.DB_ID}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
const options = { useNewUrlParser: true };
let connectDB = new MongoClient(url, options).connect();


export { connectDB }