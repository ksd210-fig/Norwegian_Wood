'use client'

import style from './MusicPlayer.module.css';
import { useRef, useState } from "react";

export default function MusicPlayer({musicData, nextPageHandler, prevPageHandler, currentTrack, setTrack}){
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    
    // ------------------------------------------------------------------------------------------------------

    function togglePlayPause(){
        if(isPlaying){
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    
    
      function handleTimeUpdate(){
          setCurrentTime(audioRef.current.currentTime);
      }
    
    
      function timeFormat(time){
          let minute = Math.floor(time/60);
          let second = Math.floor(time)%60;
          return `${twoDigit(minute)}:${twoDigit(second)}`;
      }
    
    
      function twoDigit(number){
          return (number < 10) ? `0${number}` : `${number}`;
      }
    
    
      function handleRangeUpdate(e){
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
      }
    
    
      function moveTrack(n){
        setTrack(currentTrack+n);
        audioRef.current.load();
        setTimeout(()=>{
          if(isPlaying){
            audioRef.current.play();
          }
          setDuration(audioRef.current.duration);
        }, 100);
      }
    
    
      function handleNext(){
        if(currentTrack < musicData.length -1){
          moveTrack(1);
        }else{
          setIsPlaying(false);
          nextPageHandler();
        }
      }
    
    
      function handlePre(){
        if(currentTrack > 0){
          moveTrack(-1);
        }else{
          setIsPlaying(false);
          prevPageHandler();
        }
      }

    // ------------------------------------------------------------------------------------------------------

    return(
        <div>
            <audio 
                src={musicData[currentTrack].URL}
                preload="metadata"
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            />


            <div>
              <div className={style.music_title}>{musicData[currentTrack].title}</div>
              <div className={style.music_artist}>{musicData[currentTrack].artist}</div>
            </div>


            <div className={style.progressbarwrapper}>
              <input 
                  className={style.progressbar}
                  type="range"
                  min="0"
                  max={duration||0}
                  step="0.01"
                  value={currentTime}
                  onChange={handleRangeUpdate}
                  style={{
                    '--percent': `${((currentTime / duration) * 100).toFixed(2)}%`
                  }}
              />
            </div>
            
            
            <div className={style.time_text}>
                <span style={{float: 'left', marginLeft: '10%'}}>{timeFormat(currentTime)}</span>
                <span style={{float: 'right', marginRight: '10%'}}>{timeFormat(duration)}</span>
            </div>

            
            <span className={style.controller}>     
                <img className={style.handlePre} src="/images/music_move.png" onClick={handlePre} />

                <span onClick={togglePlayPause} className={style.PausePlay}>
                    {isPlaying
                      ? <img src="/images/music_pause.png" className={style.Pause} /> 
                      : <img src="/images/music_play.png" className={style.Play} /> }
                </span>
                
                <img className={style.handleNext} src="/images/music_move.png" onClick={handleNext} />
            </span>

        </div>
    )
}