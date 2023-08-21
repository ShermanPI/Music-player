/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { icons } from '../assets/svg/icons'
import { usePlayer } from '../hooks/usePlayer'
import { ControlBtn } from './ControlButton'
import { InputRange } from './InputRange'

function millisToMinutesAndSeconds (millis) {
  if (isNaN(millis)) {
    return '--:--'
  }

  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const MusicPlayer = () => {
  const { music, isPlaying, isReplaying, songDuration, songTimeProgress, isLoading, unmuteAudio, timeHandler, volumeHandler, playPreviousSong, playNextSong, playSongHandler, replayHandler } = usePlayer({ initialMusicId: 0 })
  const [isPanelVolumeActive, setVolumePanelActive] = useState(false)
  const artists = music.artists

  const handleVolumeClick = () => {
    setVolumePanelActive(!isPanelVolumeActive)
  }

  return (
    <section className='music-player'>
      <section className='nav-container'>
        <svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path className='hey' d='M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z' /></svg>
        <h1 className='player-title'>MY PLAYLIST PLAYER</h1>
        <svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' /></svg>
      </section>
      {music
        ? <section className='music-container'>
          <div className={`album-cover ${isPlaying ? 'rotate' : ''}`}>
            <div className='speed-rate'>
              x1.0
            </div>
            <img src={music.albumImg} alt={`${music.name} album cover`} />
          </div>
          <b className='music-name'>{music.name}</b>
          <p className='artist-names'>{artists.length > 1 ? artists.map((el, i) => i === (artists.length - 1) ? el : `${el}, `) : artists}</p>
        </section>
        : null}

      <section className='progress-section'>
        <InputRange initialValue={songTimeProgress / songDuration * 100} inputFunction={timeHandler} endDragFunction={unmuteAudio} />

        <div className='progress-time'>
          <p className='actual-time'>{millisToMinutesAndSeconds(songTimeProgress)}</p>
          <p className='finish-time'>{millisToMinutesAndSeconds(songDuration)}</p>
        </div>
      </section>

      <section className='control-panel'>
        <div className={`loading-container ${isLoading ? 'loading' : ''}`}>
          <div />
        </div>

        <div className='volume-container'>
          <div className={`panel-volume ${isPanelVolumeActive ? '' : 'inactive'}`}>
            <InputRange initialValue={20} inputFunction={volumeHandler} />
            {/* <input type='range' min='0' max='100' step='2' defaultValue='20' onInput={volumeHandler} /> */}
          </div>
          <button onClick={handleVolumeClick} className='control-btn volume-btn'>
            <svg className={`${isPanelVolumeActive ? 'icon-active' : ''}`} role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon'><path d='M14.5 1.134A1 1 0 0 1 15 2v20a1 1 0 0 1-1.5.866L2.846 16.712a5.445 5.445 0 0 1 0-9.424L13.5 1.135a1 1 0 0 1 1 0zM3.847 9.02a3.444 3.444 0 0 0 0 5.96L13 20.268V3.732L3.847 9.02zM17 20.127a8.504 8.504 0 0 0 0-16.253v2.125a6.502 6.502 0 0 1 0 12.003v2.125z' /><path d='M17 16.032V7.968a4.5 4.5 0 0 1 0 8.064z' /></svg>
          </button>
        </div>

        <ControlBtn buttonContent={icons.playBackwardsIcon} onClick={playPreviousSong} />
        <ControlBtn buttonContent={isPlaying ? icons.pauseIcon : icons.playIcon} onClick={playSongHandler} />
        <ControlBtn buttonContent={<svg role='img' height='32' width='32' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0.7.7h1.6a.7.7 0 0 0.7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z' /></svg>} onClick={playNextSong} />
        <ControlBtn buttonContent={isReplaying ? '🔥' : icons.replayIcon} onClick={replayHandler} />
      </section>
    </section>
  )
}
