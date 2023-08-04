/* eslint-disable react/jsx-closing-tag-location */
import { usePlayer } from '../hooks/usePlayer'
import { ControlBtn } from './ControlButton'

export const MusicPlayer = () => {
  const { music, isPlaying, isReplaying, volumeHandler, playPreviousSong, playNextSong, playSongHandler, replayHandler } = usePlayer({ initialMusicId: 0 })
  const artists = music.artists
  return (
    <section className='music-player'>
      <h1>Music Player</h1>
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
