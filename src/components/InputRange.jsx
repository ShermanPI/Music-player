import { useRef } from 'react'

export default function RangeInput ({ initialValue }) {
  const movibleItemRef = useRef()
  const isDragActiveRef = useRef(false)

  const handleMouseDown = () => {
    isDragActiveRef.current = false
  }

  const handleMouseMove = (e) => {
    isDragActiveRef.current = true
    const rect = e.target.getBoundingClientRect()
    const newItemX = (e.clientX - rect.left)
    const newItemY = (e.clientY - rect.top)

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
