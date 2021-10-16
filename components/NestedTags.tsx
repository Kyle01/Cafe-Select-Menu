export interface NestedTagItemType {
      text: string
      onClick?: () => void
}

interface Props {
    items: Array<NestedTagItem>
}

export const NestedTags = ({
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
                  className={"py-2 px-8 border-midnightBlue-light bg-midnightBlue-medium cursor:pointer underline shadow-md rounded-full border text-center text-white text-xs btn-primary focus:outline-none active:shadow-none z-20"}
            >
                  {items[0].text}
            </button>
            <button 
                  className={"py-2 px-8 -ml-4 border-midnightBlue-light bg-midnightBlue-dark cursor:pointer underline shadow-md rounded-r-2xl border-r border-t border-b text-center text-white text-xs btn-primary focus:outline-none active:shadow-none z-10"}
            >
                  {items[1].text}
            </button>
            <button 
                  className={"py-2 px-8 -ml-4 border-midnightBlue-light bg-midnightBlue-dark cursor:pointer underline shadow-md rounded-r-2xl border-r border-t border-b text-center text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2"}
            >
                  {items[2].text}
            </button>
        </div>
    )
}