// import { MongoClient } from 'mongodb'

// const url = `mongodb+srv://${process.env.DB_ID}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
// const options = { useNewUrlParser: true };

// let client;
// let connectDB;

// if (process.env.NODE_ENV === 'development') {
//   // 개발 환경에서는 hot reload로 인해 여러 인스턴스가 생길 수 있으므로 글로벌 변수 사용
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(url, options);
//     global._mongoClientPromise = client.connect();
//   }
//   connectDB = global._mongoClientPromise;
// } else {
//   // 프로덕션에서는 싱글 인스턴스만 사용
//   client = new MongoClient(url, options);
//   connectDB = client.connect();
// }

// export { connectDB, client };


import { MongoClient } from 'mongodb'

const url = `mongodb+srv://${process.env.DB_ID}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
const options = { useNewUrlParser: true };
let connectDB = new MongoClient(url, options).connect();


export { connectDB }
