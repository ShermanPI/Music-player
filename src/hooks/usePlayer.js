import { useState, useRef, useEffect } from 'react'

const dummyMusic = [
  { id: 'M-1111', albumImg: '../static/img/monarca.jpg', name: 'Progreso', artists: ['Eladio Carrion'], url: '../../static/music/Progreso.mp3', duration: 100000 },
  { id: 'M-2222', albumImg: '../static/img/3MEN2 KBRN.png', name: 'Coco Chanel', artists: ['Eladio Carrion', 'Bad Bunny'], url: '../../static/music/Coco Chanel.mp3', duration: 190000 },
  { id: 'M-3333', albumImg: '../static/img/minina.png', name: 'Minina', artists: ['Carree, Spreen'], url: '../../static/music/minina.mp3', duration: 150000 },
  { id: 'M-4444', albumImg: '../static/img/Sauce Boyz.jpg', name: 'Kemba Walker', artists: ['Eladio Carrion', 'Bad Bunny', 'Shermanius'], url: '../../static/music/Kemba Walker.mp3', duration: 200000 }
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
        setSongTimeProgress(newSongProgress + 1000)
      }, 1000)
    }

    return () => {
      clearInterval(timeIntervalId)
    }
  }, [isPlaying, songTimeProgress])

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

  useEffect(() => {
    const autoReplay = () => {
      if (isReplaying) {
        audioRef.current.play()
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
