interface Props {
    items: Array<string>
}

const About = ({
    items
}: Props) => {
    if (items.length === 1) {
        return (
            <button 
                  className="py-1 px-4 cursor:pointer underline shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none"
            >
                  {items[0]}
            </button>
        )
    }
    
    return (
        <div className='flex relative'>
            <button 
                  className={"py-1 px-4 cursor:pointer underline shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none z-10"}
            >
                  {items[0]}
            </button>
            <button 
                  className={"py-1 px-4 cursor:pointer underline shadow-md rounded-r-xl border-r border-t border-b text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none absolute left-16"}
            >
                  {items[1]}
            </button>
            <button 
                  className={"py-1 px-4 cursor:pointer underline shadow-md rounded-r-xl border-r border-t border-b text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none absolute left-32"}
            >
                  {items[2]}
            </button>
        </div>
    )
  }

export default About