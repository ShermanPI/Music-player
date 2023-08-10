/* eslint-disable react/jsx-closing-tag-location */
import { icons } from '../../static/svg/icons'
import { usePlayer } from '../hooks/usePlayer'
import { ControlBtn } from './ControlButton'

export const MusicPlayer = () => {
  const { music, isPlaying, isReplaying, volumeHandler, playPreviousSong, playNextSong, playSongHandler, replayHandler } = usePlayer({ initialMusicId: 0 })
  const artists = music.artists
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

      <section className='control-panel'>
        <input type='range' min='0' max='100' step='5' defaultValue='20' onInput={volumeHandler} className='panel-volume' />
        <ControlBtn buttonContent={icons.volumeIcon} />
        <ControlBtn buttonContent={icons.playBackwardsIcon} handleClick={playPreviousSong} />
        <ControlBtn
          buttonContent={isPlaying ? icons.pauseIcon : icons.playIcon} handleClick={playSongHandler}
        />
        <ControlBtn buttonContent=<svg role='img' height='32' width='32' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z' /></svg> handleClick={playNextSong} />
        <ControlBtn buttonContent={isReplaying ? '🔥' : icons.replayIcon} handleClick={replayHandler} />
      </section>
    </section>
  )
}
