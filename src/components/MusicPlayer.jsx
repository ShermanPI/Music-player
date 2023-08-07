/* eslint-disable react/jsx-closing-tag-location */
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

      <input type='range' min='0' max='100' step='5' defaultValue='20' onInput={volumeHandler} />
      <section className='control-panel'>
        <ControlBtn buttonContent=<svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z' /><path d='M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49z' /></svg> handleClick={playPreviousSong} />
        <ControlBtn buttonContent=<svg role='img' height='32' width='32' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z' /></svg> handleClick={playPreviousSong} />
        <ControlBtn
          buttonContent={isPlaying
            ? <svg role='img' height='28' width='28' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z' /></svg>
            : <svg role='img' height='28' width='28' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z' /></svg>} handleClick={playSongHandler}
        />
        <ControlBtn buttonContent=<svg role='img' height='32' width='32' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z' /></svg> handleClick={playNextSong} />
        <ControlBtn buttonContent={isReplaying ? '🔥' : <svg role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 24 24' data-encore-id='icon' className='Svg-sc-ytk21e-0 haNxPq'><path d='M6 2a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h1v-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.798l1.298-1.298a1 1 0 1 0-1.414-1.414L9.373 19l3.713 3.712a1 1 0 0 0 1.414-1.414L13.202 20H18a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H6z' /></svg>} handleClick={replayHandler} />
      </section>
    </section>
  )
}
