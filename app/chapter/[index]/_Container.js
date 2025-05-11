// MongoDB의 모든 데이터를 불러오는 컨테이너 역할


import { connectDB } from '@/util/database';
import Index from './components';
import Content from './components/Content';


export default async function SeverContainer() {
  const client = await connectDB;
  const db = client.db('NorwegianWood'); // DB 이름
  const collection = db.collection('NorwegianWoodData'); // Collection 이름
  const myData = await collection.find().toArray(); // 데이터 전체 가져오기


  return (
    <div>
        <Content myData={myData}/>
    </div>
  );
}
 