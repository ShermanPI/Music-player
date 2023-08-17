import { useRef, useState } from 'react'

export function InputRange ({ initialValue }) {
  const movibleItemRef = useRef()
  const isDragActiveRef = useRef(false)
  const [squarePosition, setSquarePosition] = useState()

  const handleMouseDown = () => {
    isDragActiveRef.current = false
  }

  const handleMouseMove = (e) => {
    isDragActiveRef.current = true
    const rect = e.target.getBoundingClientRect()
    const itemRect = movibleItemRef.current.getBoundingClientRect()
    console.log(itemRect)

    const newItemX = ((e.clientX - rect.left) - (itemRect.width / 2))
    const newItemY = ((e.clientY - rect.top) - (itemRect.height / 2))

    movibleItemRef.current.style.transform = `translate(${newItemX}px, ${newItemY}px)`
    console.log('se ha levantado el click', movibleItemRef.current)
  }

  const mouseUpHandler = (e) => {
    console.log(isDragActiveRef.current ? 'drag' : 'click')
  }

  return (
    <div className='events-test-playground' onMouseDown={handleMouseDown} onMouseUp={mouseUpHandler} onMouseMove={handleMouseMove}>
      <div ref={movibleItemRef} className='movible-item' />
    </div>
  )
}
