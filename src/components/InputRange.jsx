import { useEffect, useRef, useState } from 'react'

export function InputRange ({ initialValue, inputFunction }) {
  const progressBarContainerRef = useRef()
  const isDraggingRef = useRef(false)
  const [rangePosition, setRangePosition] = useState({ x: (initialValue) })

  useEffect(() => {
    setRangePosition({ x: initialValue })
  }, [initialValue])

  const renderNewRange = (event) => {
    const barBoundaries = progressBarContainerRef.current.getBoundingClientRect()
    const maxRange = barBoundaries.left + barBoundaries.width
    let newPosition = 0
    let userXposition = 0

    // Check if Mouse events exist on users' device
    if (event.clientX) {
      newPosition = (event.clientX - barBoundaries.left) / barBoundaries.width * 100
      userXposition = event.clientX
    } else {
      newPosition = (event.touches[0].clientX - barBoundaries.left) / barBoundaries.width * 100
      userXposition = event.touches[0].clientX
    }

    if (userXposition < maxRange && userXposition > barBoundaries.left) {
      inputFunction(newPosition)
      setRangePosition({ x: newPosition })
    }
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
      isDraggingRef.current = false
    }

    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchend', stopDrag)
    window.addEventListener('mousemove', handleMovement)

    return () => {
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchend', stopDrag)
      window.removeEventListener('mousemove', handleMovement)
    }
  }, [])

  return (
    // onMouseUp={mouseUpHandler} onMouseMove={handleMovement}
    <div ref={progressBarContainerRef} className='progress-bar' onMouseDown={handlePressingDown} onTouchStart={handlePressingDown} onTouchMove={handleMovement}>
      <div style={{ right: `${100 - rangePosition.x}%` }} className='progress-line' />
    </div>
  )
}
