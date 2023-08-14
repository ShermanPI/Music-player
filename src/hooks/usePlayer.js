import { useState, useRef, useEffect } from 'react'

const dummyMusic = [
  { id: 'M-1111', albumImg: '../static/img/bohemian.jpg', name: 'Bohemian Rhapsody', artists: ['Queen'], url: '../../static/music/bohemian.mp3', duration: 183000, albumHexColor: '#a83888' },
  { id: 'M-2222', albumImg: '../static/img/renegade.jpg', name: 'Renegade', artists: ['3rd Prototype', 'Harley Bird', 'Valentina Franco'], url: '../../static/music/renegade.mp3', duration: 227000, albumHexColor: '#cd4f00' },
  { id: 'M-3333', albumImg: '../static/img/BLANK.jpg', name: 'Blank', artists: ['Disfigure'], url: '../../static/music/blank.mp3', duration: 208000, albumHexColor: '#597e78' },
  { id: 'M-4444', albumImg: '../static/img/runandhide.jpg', name: 'Run & Hide', artists: ['Zeus X Crona', 'Shiah Maisel'], url: '../../static/music/run&hide.mp3', duration: 161000, albumHexColor: '#a05060' }
]

export const usePlayer = ({ initialMusicId }) => {
  const [musicId, setMusicId] = useState(initialMusicId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReplaying, setReplay] = useState(false)
  const [songDuration, setSongDuration] = useState(dummyMusic[musicId].duration)
  const [songTimeProgress, setSongTimeProgress] = useState(0)
  const audioRef = useRef(new window.Audio(dummyMusic[musicId].url))
  const maxId = dummyMusic.length

  const music = dummyMusic[musicId]

  useEffect(() => {
    let timeIntervalId

    if (isPlaying) {
      timeIntervalId = setInterval(() => {
        const newSongProgress = songTimeProgress
        if (newSongProgress <= songDuration) {
          setSongTimeProgress(newSongProgress + 1000)
        }
      }, 1000)
    }

    return () => {
      clearInterval(timeIntervalId)
    }
  }, [isPlaying, songTimeProgress])

  useEffect(() => {
    const autoReplay = () => {
      if (isReplaying) {
        audioRef.current.play()
        setSongTimeProgress(0)
      } else {
        playNextSong()
      }
    }
    audioRef.current.addEventListener('ended', autoReplay)

    return () => {
      audioRef.current.removeEventListener('ended', autoReplay)
    }
  }, [isReplaying])

  useEffect(() => {
    audioRef.current.volume = 0.2
  }, [])

  useEffect(() => {
    const root = document.querySelector(':root')
    root.style.setProperty('--active-icon-color', dummyMusic[musicId].albumHexColor)
  }, [musicId])

  const playNextSong = () => {
    const newId = (musicId + 1) % maxId
    audioRef.current.src = dummyMusic[newId].url
    audioRef.current.play()
    setIsPlaying(true)
    setMusicId(newId)
    setSongDuration(dummyMusic[newId].duration)
    setSongTimeProgress(0)
  }

  const playPreviousSong = () => {
    const newId = (musicId - 1 + maxId) % maxId
    audioRef.current.src = dummyMusic[newId].url
    audioRef.current.play()
    setIsPlaying(true)
    setMusicId(newId)
    setSongDuration(dummyMusic[newId].duration)
    setSongTimeProgress(0)
  }

  const playSongHandler = () => {
    if (!isPlaying) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const replayHandler = () => {
    setReplay(!isReplaying)
  }

  const volumeHandler = (e) => {
    audioRef.current.volume = (e.target.value / 100)
  }

  return {
    music,
    isPlaying,
    isReplaying,
    songDuration,
    songTimeProgress,
    volumeHandler,
    playNextSong,
    playPreviousSong,
    playSongHandler,
    replayHandler
  }
}
