import { useRef, useState } from 'react'

export function InputRange ({ initialValue }) {
  const progressBarContainerRef = useRef()
  const isDragActiveRef = useRef(false)
  const [progressLinePosition, setProgressLinePosition] = useState({ x: (initialValue) })

  const handleMouseDown = (e) => {
    isDragActiveRef.current = false

    const barBoundaries = progressBarContainerRef.current.getBoundingClientRect()
    const newPosition = (e.clientX - barBoundaries.left) / barBoundaries.width * 100
    console.log('Progress: -', newPosition, '%')
    setProgressLinePosition({ x: newPosition })
  }

  const handleMouseMove = () => {
    isDragActiveRef.current = true
  }

  const mouseUpHandler = () => {
    console.log(isDragActiveRef.current ? 'drag' : 'click')
  }

  return (
    <div ref={progressBarContainerRef} className='events-test-playground' onMouseDown={handleMouseDown} onMouseUp={mouseUpHandler} onMouseMove={handleMouseMove}>
      <div style={{ right: `${100 - progressLinePosition.x}%` }} className='movible-item' />
    </div>
  )
}
