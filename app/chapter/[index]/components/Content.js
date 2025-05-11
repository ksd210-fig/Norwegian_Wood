'use client'

import style from './../chapter.module.css'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MusicPlayer from './MusicPlayer/MusicPlayer';
import Link from 'next/link';


export default function Content({myData}){
    const router = useRouter()
    const chapterIndex = usePathname().split("/")[2]
    const [currentContentIndex, setContentIndex] = useState(0);
    
    const chapterData = myData.find(item => String(chapterIndex) === item._id)
        if (!chapterData){
            console.log('⚠️ 아직 chapterData 없음:', {
                chapterIndex,
                availableIDs: myData.map(i => i._id),
              })
              return <div>챕터를 불러오는 중입니다…</div>
        }

    const contentSize = chapterData.contents.length;

    const chapterIds = myData.map(item => String(item._id))
    const chapterPos = chapterIds.findIndex(id => id === chapterIndex)
    const totalChapters = chapterIds.length
    
    const UP_BTN = 'https://norwegianwood-music.s3.ap-northeast-2.amazonaws.com/img/Direction%3DUp%2C+Mouse+Hover%3DNo.png'
    const DN_BTN = 'https://norwegianwood-music.s3.ap-northeast-2.amazonaws.com/img/Direction%3DDown%2C+Mouse+Hover%3DNo.png'

    const isFirstGlobal = (chapterPos === 0) && (currentContentIndex === 0)
    const isLastGlobal  = (chapterPos === totalChapters - 1) && (currentContentIndex === contentSize - 1)
    
    useEffect(() => {
        setContentIndex(0)
      }, [chapterIndex])    


    //-------------- 함수 -----------------

    const handleNext = ()=>{
        if (currentContentIndex < contentSize - 1){
            setContentIndex(currentContentIndex + 1)
        } else {
            const nextId = chapterIds[chapterPos + 1]
            router.push(`/chapter/${nextId}`)
            setContentIndex(0)
        }
    }

    const handlePre = ()=>{
        if (currentContentIndex > 0){
            setContentIndex(currentContentIndex - 1)
        } else if (chapterPos > 0) {
            const prevId = chapterIds[chapterPos - 1]
            const prevChapter = myData[chapterPos - 1]
            router.push(`/chapter/${prevId}`)
            setContentIndex(prevChapter.contents.length - 1)
        }
    }


    //------------------------------------
    return(
        <div className={style.container}>
            <div className={style.left_container}>
                <Link href='/' className={style.title}>
                    <u className={style.title_ko}>노르웨이의 숲</u> 
                    <br/> 
                    <u className={style.title_en}>Norwegian Wood</u>
                </Link>
                <img src={chapterData.img} className={style.img} />
                <MusicPlayer 
                    musicData={chapterData.contents[currentContentIndex].music} 
                    nextPageHandler={handleNext}
                    prevPageHandler={handlePre}
                />
            </div>
            
            <div className={style.right_container}>
                <div style={{margin: '30px'}}>
                    <span className={style.Libre_font}>(</span>
                    <span className={style.chapter}>Chapter </span>
                    <span className={style.Libre_super}>{chapterData._id}.</span>
                    <span className={style.Libre_font}>)</span>
                    <span className={style.chapter}>{chapterData.title}</span>
                </div>

                <div className={style.content} dangerouslySetInnerHTML={{ __html: chapterData.contents[currentContentIndex].text }}/>                
                
                <div className={style.page}>
                    <hr/> 
                    <div style={{margin: '1%'}}>무라카미 하루키. (2017). 노르웨이의 숲. 민음사. {chapterData.contents[currentContentIndex].page}</div>
                </div>
            </div>
            
            <div className={style.button}>
                <img src={UP_BTN} className={style.upbtn} style={{opacity: isFirstGlobal ? 0.6 : 1, pointerEvents: isFirstGlobal ? 'none' : 'auto'}}
                onClick={handlePre}
                    disabled={currentContentIndex === 0}
                />
                <br/>
                <img src={DN_BTN} className={style.downbtn} style={{opacity: isLastGlobal ? 0.6 : 1, pointerEvents: isLastGlobal ? 'none' : 'auto'}}
                onClick={handleNext}
                    disabled={currentContentIndex === contentSize - 1}    
                />
            </div>
        </div>
    )
}