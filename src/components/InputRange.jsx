import { useEffect, useRef, useState } from 'react'

export function InputRange ({ initialValue, inputFunction, endDragFunction, isVertical = false }) {
  const progressBarContainerRef = useRef()
  const isDraggingRef = useRef(false)
  const [rangePosition, setRangePosition] = useState(initialValue)

  useEffect(() => {
    setRangePosition(initialValue)
  }, [initialValue])

  const renderNewRange = (event) => {
    const barBoundaries = progressBarContainerRef.current.getBoundingClientRect()
    let newPosition = 0

    // Check if Mouse events exist on users' device
    if (event.clientX) {
      newPosition = isVertical
        ? 100 - (event.clientY - barBoundaries.top) / barBoundaries.height * 100
        : (event.clientX - barBoundaries.left) / barBoundaries.width * 100
    } else {
      newPosition = isVertical
        ? 100 - (event.touches[0].clientY - barBoundaries.top) / barBoundaries.height * 100
        : (event.touches[0].clientX - barBoundaries.left) / barBoundaries.width * 100
    }

    if (newPosition >= 0 && newPosition <= 100) {
      inputFunction(newPosition)
      setRangePosition(newPosition)
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
      if (endDragFunction) endDragFunction()
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
    <div className='progress-bar-container'>
      <div ref={progressBarContainerRef} className='progress-bar' onMouseDown={handlePressingDown} onTouchStart={handlePressingDown} onTouchMove={handleMovement}>
        <div style={{ right: `${100 - rangePosition}%` }} className='progress-line' />
      </div>
      <div style={{ right: `calc(${100 - rangePosition}% - 0.75rem)` }} className='progress-bar-circle' />
    </div>
  )
}
