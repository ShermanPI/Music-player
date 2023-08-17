import { useRef, useState } from 'react'

export function InputRange ({ initialValue }) {
  const progressBarContainerRef = useRef()
  const isDragActiveRef = useRef(false)
  const [progressLinePosition, setProgressLinePosition] = useState({ x: initialValue })

  const handleMouseDown = (e) => {
    isDragActiveRef.current = false

    const barBoundaries = progressBarContainerRef.current.getBoundingClientRect()
    const newPosition = 100 - (e.clientX / (barBoundaries.width) * 100) // (e.clientX - barBoundaries.x)
    console.log('-', newPosition)
    setProgressLinePosition({ x: newPosition })
  }

  const handleMouseMove = () => {
    isDragActiveRef.current = true
  }

  const mouseUpHandler = (e) => {
    console.log(isDragActiveRef.current ? 'drag' : 'click')
  }

  return (
    <div ref={progressBarContainerRef} className='events-test-playground' onMouseDown={handleMouseDown} onMouseUp={mouseUpHandler} onMouseMove={handleMouseMove}>
      <div style={{ left: `-${progressLinePosition.x}%` }} className='movible-item' />
    </div>
  )
}
