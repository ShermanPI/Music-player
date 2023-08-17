import { useEffect, useRef, useState } from 'react'

export function InputRange ({ initialValue }) {
  const progressBarContainerRef = useRef()
  const isDraggingRef = useRef(false)
  const [progressLinePosition, setProgressLinePosition] = useState({ x: (initialValue) })

  const renderNewRange = (event) => {
    const barBoundaries = progressBarContainerRef.current.getBoundingClientRect()
    let newPosition = 0

    // Check if Mouse events exist on users' device
    if (event.clientX) {
      newPosition = (event.clientX - barBoundaries.left) / barBoundaries.width * 100
    } else {
      newPosition = (event.touches[0].clientX - barBoundaries.left) / barBoundaries.width * 100
    }
    setProgressLinePosition({ x: newPosition })
  }

  const handlePressingDown = (e) => {
    isDraggingRef.current = true
    renderNewRange(e)
  }

  const handleMovement = (e) => {
    if (!isDraggingRef.current) return
    renderNewRange(e)
  }

  useEffect(() => {
    const stopDrag = () => {
      console.log('drag stopped')
      isDraggingRef.current = false
    }

    window.addEventListener('mouseup', stopDrag)

    // return (
    //   window.removeEventListener('mouseup', stopDrag)
    // )
  }, [])

  // const mouseUpHandler = () => {

  // }

  return (
    // onMouseUp={mouseUpHandler}
    <div ref={progressBarContainerRef} className='events-test-playground' onMouseDown={handlePressingDown} onTouchStart={handlePressingDown} onMouseMove={handleMovement} onTouchMove={handleMovement}>
      <div style={{ right: `${100 - progressLinePosition.x}%` }} className='movible-item' />
    </div>
  )
}
