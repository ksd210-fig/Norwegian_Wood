import Link from 'next/link';
import style from './page.module.css';


export default function(){
  return(
    <div className={style.background}>
      <div className={style.title}>
          <u className={style.title_ko}>노르웨이의 숲</u> <br/> 
          <u className={style.title_en}>Norwegian Wood</u>
      </div>
      <div className={style.content}>
        이 웹사이트는 무라카미 하루키의 노르웨이의 숲에 등장하는 음악과 <br/>
        그와 맞닿은 문장들을 한데 엮어, 작품의 정서를 깊이 있게 전달하고자 하는 아카이브입니다.<br/>
        이 공간을 통해 더 많은 사람들이 그의 문학을 다양한 감각으로 향유할 수 있기를 바랍니다.
      </div>
      <div className={style.footer}>© 2025 Designed & Developed by Yangminkyung & Kusudam. All rights reserved.</div>
      

      <Link href='/chapter/1' className={style.move_button}>
        <span>page move</span>
      </Link>


    </div>
  )
}