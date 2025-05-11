import { connectDB } from '@/util/database';
import Navbar from './Navbar';

export default async function NavbarContainer() {
  const client = await connectDB;
  const db = client.db('NorwegianWood'); // DB 이름
  const collection = db.collection('NorwegianWoodData'); // Collection 이름
  const myData = await collection.find().toArray(); // 데이터 전체 가져오기

  const result = myData.map((data) => {
    const allTitles = data.contents.flatMap((section) => {
      const musics = Array.isArray(section.music)
        ? section.music
        : [section.music]
  
      return musics.map((m) => m.title);
    });



    return {
      index: data._id,
      chapter: data.title,
      contents: data.contents,
      music_titles: allTitles,
    };
  });

  return <Navbar myData={result} />;
}