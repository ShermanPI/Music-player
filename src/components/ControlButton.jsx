export const ControlBtn = ({ buttonContent, onClick }) => {
  return (
    <button onClick={onClick} className='control-btn'>{buttonContent}</button>
  )
}
