/* eslint-disable react/jsx-closing-tag-location */
import { usePlayer } from '../hooks/usePlayer'
import { ControlBtn } from './ControlButton'

export const MusicPlayer = () => {
  const { music, isPlaying, isReplaying, volumeHandler, playPreviousSong, playNextSong, playSongHandler, replayHandler } = usePlayer({ initialMusicId: 0 })
  const artists = music.artists
  return (
    <section className='music-player'>
      <section className='nav-container'>
        <svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' class='Svg-sc-ytk21e-0 haNxPq'><path className='hey' d='M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z' /></svg>
        <h1 className='player-title'>MY PLAYLIST PLAYER</h1>
        <svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' class='Svg-sc-ytk21e-0 haNxPq'><path d='M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' /></svg>
      </section>
      {music
        ? <section className='music-container'>
          <div className={`album-cover ${isPlaying ? 'rotate' : ''}`}>
            <img src={music.albumImg} alt={`${music.name} album cover`} />
          </div>
          <b className='music-name'>{music.name}</b>
          <p className='artist-names'>{artists.length > 1 ? artists.map((el, i) => i === (artists.length - 1) ? el : `${el}, `) : artists}</p>
        </section>
        : null}

      <input type='range' min='0' max='100' step='5' defaultValue='20' onInput={volumeHandler} />
      <section className='control-panel'>
        <ControlBtn buttonContent='⏮️' handleClick={playPreviousSong} />
        <ControlBtn buttonContent='⏮️' handleClick={playPreviousSong} />
        <ControlBtn buttonContent={isPlaying ? '⏸️' : '▶️'} handleClick={playSongHandler} />
        <ControlBtn buttonContent='⏭️' handleClick={playNextSong} />
        <ControlBtn buttonContent={isReplaying ? '🔥' : '🔁'} handleClick={replayHandler} />
      </section>
    </section>
  )
}
