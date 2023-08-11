import { useState, useRef, useEffect } from 'react'

const dummyMusic = [
  { id: 'M-1111', albumImg: '../static/img/monarca.jpg', name: 'Progreso', artists: ['Eladio Carrion'], url: '../../static/music/Progreso.mp3', duration: '100000' },
  { id: 'M-2222', albumImg: '../static/img/3MEN2 KBRN.png', name: 'Coco Chanel', artists: ['Eladio Carrion', 'Bad Bunny'], url: '../../static/music/Coco Chanel.mp3' },
  { id: 'M-3333', albumImg: '../static/img/minina.png', name: 'Minina', artists: ['Carree, Spreen'], url: '../../static/music/minina.mp3' },
  { id: 'M-4444', albumImg: '../static/img/Sauce Boyz.jpg', name: 'Kemba Walker', artists: ['Eladio Carrion', 'Bad Bunny', 'Shermanius'], url: '../../static/music/Kemba Walker.mp3' }
]

function millisToMinutesAndSeconds (millis) {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const usePlayer = ({ initialMusicId }) => {
  const [musicId, setMusicId] = useState(initialMusicId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReplaying, setReplay] = useState(false)
  const audioRef = useRef(new window.Audio(dummyMusic[musicId].url))
  const [songDuration, setSongDuration] = useState(millisToMinutesAndSeconds(dummyMusic[musicId].duration))
  const maxId = dummyMusic.length

  const music = dummyMusic[musicId]

  const playNextSong = () => {
    // const newId = musicId + 1
    // if (newId <= maxId) {
    //   audioRef.current.src = dummyMusic[newId].url
    //   audioRef.current.play()
    //   setIsPlaying(true)
    //   setMusicId(newId)
    // } else {
    //   audioRef.current.src = dummyMusic[0].url
    //   audioRef.current.play()
    //   setIsPlaying(true)
    //   setMusicId(0)
    // }

    // bard
    const newId = (musicId + 1) % maxId
    audioRef.current.src = dummyMusic[newId].url
    audioRef.current.play()
    setIsPlaying(true)
    setMusicId(newId)
    console.log(audioRef.current.duration, audioRef.current)
  }

  const playPreviousSong = () => {
    // const newId = musicId - 1
    // if (newId < 0) {
    //   audioRef.current.src = dummyMusic[maxId].url
    //   audioRef.current.play()
    //   setIsPlaying(true)
    //   setMusicId(maxId)
    // } else {
    //   audioRef.current.src = dummyMusic[newId].url
    //   audioRef.current.play()
    //   setIsPlaying(true)
    //   setMusicId(newId)
    // }

    // bard
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
    // console.log(this)
    // console.log(e.target.value)
    audioRef.current.volume = (e.target.value / 100)
  }

  return {
    music,
    isPlaying,
    isReplaying,
    songDuration,
    volumeHandler,
    playNextSong,
    playPreviousSong,
    playSongHandler,
    replayHandler
  }
}
