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
    const [currentTrack, setTrack] = useState(0);
    
    // URL 파라미터 읽기
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const contentParam = searchParams.get('content');
        const trackParam = searchParams.get('track');
        
        if (contentParam !== null) {
            setContentIndex(parseInt(contentParam));
        }
        if (trackParam !== null) {
            setTrack(parseInt(trackParam));
        }
    }, [chapterIndex]);

    const chapterData = myData.find(item => String(chapterIndex) === item._id)
        if (!chapterData){
            console.log('⚠️ 아직 chapterData 없음:', {
                chapterIndex,
                availableIDs: myData.map(i => i._id),
              })
              return <div>챕터를 불러오는 중입니다…</div>
        }

    const contentSize = chapterData.contents.length;
    // 현재 챕터의 콘텐츠 개수

    const chapterIds = myData.map(item => String(item._id)) 
    // URL에 들어가는 챕터 번호와 DB의 챕터 _id를 비교하기 위해 문자열 배열로 만듬
    // 예) myData가 [{_id: 1}, {_id: 2}, {_id: 3}] 이라면 chapterIds는 ["1", "2", "3"]

    const chapterPos = chapterIds.findIndex(id => id === chapterIndex)
    // 현재 보고 있는 챕터의 인덱스 파악
    // 예: URL이 /chapter/2라면 chapterPos는 1 (배열은 0부터 시작)

    const totalChapters = chapterIds.length
    // 전체 챕터 개수
    
    const UP_BTN = 'https://norwegianwood-music.s3.ap-northeast-2.amazonaws.com/img/Direction%3DUp%2C+Mouse+Hover%3DNo.png'
    const DN_BTN = 'https://norwegianwood-music.s3.ap-northeast-2.amazonaws.com/img/Direction%3DDown%2C+Mouse+Hover%3DNo.png'

    const isFirstGlobal = (chapterPos === 0) && (currentContentIndex === 0)
    const isLastGlobal  = (chapterPos === totalChapters - 1) && (currentContentIndex === contentSize - 1)
    
    const musicData = chapterData.contents[currentContentIndex]?.music;

    function handleNext(){
        if (currentContentIndex < contentSize - 1){
            setContentIndex(currentContentIndex + 1)
        } else {
            const nextId = chapterIds[chapterPos + 1]
            router.push(`/chapter/${nextId}`)
            setContentIndex(0)
        }
    }

    function handlePre(){
        if (currentContentIndex > 0){
            setContentIndex(currentContentIndex - 1)
        } else if (chapterPos > 0) {
            const prevChapter = myData[chapterPos - 1]
            const prevId = chapterIds[chapterPos - 1]
            const prevContentLastIndex = prevChapter.contents.length - 1
            const lastMusicIndex = prevChapter.contents[prevContentLastIndex].music.length - 1
            
            // 라우팅을 먼저 하고
            router.push(`/chapter/${prevId}?content=${prevContentLastIndex}&track=${lastMusicIndex}`)
            
            // 그 다음 상태 변경
            setTimeout(() => {
                setContentIndex(prevContentLastIndex)
                setTrack(lastMusicIndex)
            }, 0)
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
                {chapterData.contents && chapterData.contents[currentContentIndex] && (
                    <MusicPlayer 
                        musicData={chapterData.contents[currentContentIndex].music} 
                        nextPageHandler={handleNext}
                        prevPageHandler={handlePre}
                        setTrack={setTrack}
                        currentTrack={currentTrack}
                    />
                )}
            </div>
            
            <div className={style.right_container}>
                <div style={{margin: '70px'}}>
                    <span className={style.Libre_font}>(</span>
                    <span className={style.chapter}>CHAPTER</span>
                    <span className={style.Libre_super}>{chapterData._id}.</span>
                    <span className={style.Libre_font}>)</span>
                    <span className={style.chapter_space}>&nbsp;</span>
                    <span className={style.chapter}>{chapterData.title}</span>
                </div>

                <div className={style.content} dangerouslySetInnerHTML={{ __html: chapterData.contents[currentContentIndex].text }}/>                
                
                <hr style={{margin: '0 0 0 0'}}/> 

                <div className={style.page}>
                     
                    <div style={{margin: 0, padding: 0}}>무라카미 하루키. (2017). 노르웨이의 숲. 민음사. {chapterData.contents[currentContentIndex].page}</div>
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