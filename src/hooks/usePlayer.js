import { useState, useRef, useEffect } from 'react'
import bohemian from '../assets/img/bohemian.jpg'
import renegade from '../assets/img/renegade.jpg'
import blank from '../assets/img/BLANK.jpg'
import runandhide from '../assets/img/runandhide.jpg'
import bohemianMusic from '../assets/music/bohemian.mp3'
import renegadeMusic from '../assets/music/renegade.mp3'
import blankMusic from '../assets/music/blank.mp3'
import runandhideMusic from '../assets/music/run&hide.mp3'

const dummyMusic = [
  { id: 'M-1111', albumImg: bohemian, name: 'Bohemian Rhapsody', artists: ['Queen'], url: bohemianMusic, albumHexColor: '#a83888' },
  { id: 'M-2222', albumImg: renegade, name: 'Renegade', artists: ['3rd Prototype', 'Harley Bird', 'Valentina Franco'], url: renegadeMusic, albumHexColor: '#cd4f00' },
  { id: 'M-3333', albumImg: blank, name: 'Blank', artists: ['Disfigure'], url: blankMusic, albumHexColor: '#597e78' },
  { id: 'M-4444', albumImg: runandhide, name: 'Run & Hide', artists: ['Zeus X Crona', 'Shiah Maisel'], url: runandhideMusic, albumHexColor: '#a05060' }
]

export const usePlayer = ({ initialMusicId }) => {
  const [musicId, setMusicId] = useState(initialMusicId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReplaying, setReplay] = useState(false)
  const [songDuration, setSongDuration] = useState('--:--')
  const [songTimeProgress, setSongTimeProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(new window.Audio(dummyMusic[musicId].url))
  const canPlayRef = useRef(false)
  const songChangedRef = useRef(false)
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
    // auto replaying the song if isReplaying is active
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
    audioRef.current.preload = 'metadata'
    audioRef.current.volume = 0.2
  }, [])

  // change application color when song changes
  useEffect(() => {
    const root = document.querySelector(':root')
    root.style.setProperty('--active-icon-color', dummyMusic[musicId].albumHexColor)
  }, [musicId])

  // see if the music after changed can be played
  useEffect(() => {
    canPlayRef.current = false

    const playSong = () => {
      canPlayRef.current = true

      if (songChangedRef.current) {
        playSongHandler()
        setIsPlaying(true)
        songChangedRef.current = false
      } else {
        setIsLoading(false)
      }
    }

    audioRef.current.addEventListener('canplay', playSong)

    return () => {
      audioRef.current.removeEventListener('canplay', playSong)
    }
  }, [musicId])

  useEffect(() => {
    const setNewSongDuration = () => {
      const newSongDuration = audioRef.current.duration * 1000
      console.log('🔥🔥🔥🔥🔥🔥', newSongDuration)
      setSongDuration(newSongDuration)
    }

    // set the song duration after metadata load
    audioRef.current.addEventListener('loadedmetadata', setNewSongDuration)

    return () => {
      audioRef.current.removeEventListener('loadedmetadata', setNewSongDuration)
    }
  }, [musicId])

  const playSongHandler = () => {
    setIsLoading(true)

    if (canPlayRef.current) {
      setIsLoading(false)
      audioRef.current.play()
      setIsPlaying(true)
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const playNextSong = () => {
    setIsLoading(true)
    setIsPlaying(false)
    songChangedRef.current = true

    const newId = (musicId + 1) % maxId
    audioRef.current.src = dummyMusic[newId].url
    setMusicId(newId)
    setSongDuration('--:--')
    setSongTimeProgress(0)
  }

  const playPreviousSong = () => {
    setIsLoading(true)
    setIsPlaying(false)
    songChangedRef.current = true

    const newId = (musicId - 1 + maxId) % maxId
    audioRef.current.src = dummyMusic[newId].url
    setMusicId(newId)
    setSongDuration('--:--')
    setSongTimeProgress(0)
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
    isLoading,
    volumeHandler,
    playNextSong,
    playPreviousSong,
    playSongHandler,
    replayHandler
  }
}
