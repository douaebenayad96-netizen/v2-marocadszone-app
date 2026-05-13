import { BiLoaderAlt } from "react-icons/bi"

type SampleButtonProps = {
  text: string
  icon?: React.ReactNode
  callback?: () => void
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}

const SampleButtonFilter = ({ text, icon, callback, type = "button", isLoading }: SampleButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`btn-secondary-white w-fit ${isLoading ? 'loading' : ''}`}
      type={type}
      disabled={isLoading}
    >
      {icon}
      <span
      >{text}</span>
      {isLoading && (
        <BiLoaderAlt className="animate-spin text-primary-blue-all-900 text-xl" />
      )}
    </button>

  )
}

export default SampleButtonFilter