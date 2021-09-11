interface Props {
    active: boolean
    onClick: () => void
    text: string
}
const About = ({
    active,
    onClick,
    text,
}: Props) => {
    const styling = `py-1 px-2 w-24 cursor:pointer underline shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2`
    const activeStyling = `py-1 px-2 w-24 cursor:pointer border-midnightBlue-light bg-midnightBlue-medium underline shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2`
    return (
        <button 
              className={active ? activeStyling : styling}
              onClick={onClick}
        >
              {text}
        </button>
    )
  }

export default About