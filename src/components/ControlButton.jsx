export const ControlBtn = ({ buttonContent, handleClick }) => {
  return (
    <button onClick={handleClick} className='control-btn'>{buttonContent}</button>
  )
}
