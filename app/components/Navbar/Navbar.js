// 1. 햄버거(토글) 버튼 생성 ㅇ
// 2. 모달창 열림 ㅇ
// 3. 모달창에 챕터 id, 챕터 정보 불러오기
// 4. 각각의 챕터 정보에 링크 넣기 
// 5. 모달창에 닫힘 버튼 넣기 ㅇ
// 6. url별로 버튼(흑/백) 다르게 보이게 하기 ㅇ
// 7. NavbarContainer에서 데이터 불러오기 
// 8. Link 넣기

'use client'

import { useState } from "react"
import style from './Navbar.module.css'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar({myData}){
    const[state, setState] = useState('closeModal');
    const pathname = usePathname();
    const hamburgerImage = 
        pathname === '/'
            ?   '/images/hamburger_white.png'
            :   '/images/hamburger_black.png'
    
    // console.log(myData.length);

    function twoDigit(number){
        return (number < 10) 
            ? `0${number}` 
            : `${number}`
    }


    return(
        <div>
            <img className={style.hamburger} onClick={()=>{
                setState(state == 'closeModal' ? 'openModal' : 'closeModal')
            }} src={hamburgerImage}/>

            <div className={style[state]}>
                <img className={style.close_button} onClick={()=>{
                    setState(state == 'openModal' ? 'closeModal' : 'openModal')
                }} src='/images/hamburger_close.png' />
                <div className={style.modal_chapter}>
                    {myData.map((a) => (
                        <div key={a.index}>
                            <Link href={'/chapter/' + a.index} onClick={()=>setState('closeModal')} className={style.hoverUnderline}>
                                <span className={style.chapter_index}>{twoDigit(a.index)} </span>
                                <span style={{letterSpacing : '10px'}}>. </span>
                                <span className={style.chapter_text}>{a.chapter}</span>
                                <span className={style.Libre}>(</span>
                                <span className={style.music_length}>{a.music_titles.length}</span>
                                <span className={style.Libre}>)</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

