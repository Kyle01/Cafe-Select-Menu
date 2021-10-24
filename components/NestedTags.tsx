export interface NestedTagItemType {
      text: string
      onClick?: () => void
      transparent?: boolean
}

interface Props {
    items: Array<NestedTagItemType>
}

export const NestedTags = ({
    items
}: Props) => {
    if (items.length === 1) {
        return (
            <button
                  className={`${items[0].transparent ? null : 'bg-midnightBlue-dark'} py-2 px-8 cursor:pointer underline shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2`}
                  onClick={items[0].onClick}
            >
                  {items[0].text}
            </button>
        )
    }
    
    if (items.length > 1) {
          return(
            <div className='flex relative'>
                  {items.map((item, i) => {
                        const zIndex = `z-${(items.length - i) * 10}`
                        if(i === 0) {
                              return (
                                    <button
                                          className={`py-2 px-8 border-midnightBlue-light bg-midnightBlue-medium cursor:pointer underline shadow-md rounded-full border text-center text-white text-xs btn-primary focus:outline-none active:shadow-none ${zIndex}`}
                                          onClick={item.onClick}
                                    >
                                          {item.text}
                                    </button>
                              )
                        }
                        if (i === items.length - 1) {
                              return ( 
                                    <button 
                                          className={`py-2 px-8 -ml-4 border-midnightBlue-light bg-midnightBlue-dark cursor:pointer underline shadow-md rounded-r-2xl border-r border-t border-b text-center text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2 ${zIndex}"`}
                                          onClick={item.onClick}
                                    >
                                          {item.text}
                                    </button>
                              )
                        }
                        return (
                              <button 
                                    className={`py-2 px-8 -ml-4 border-midnightBlue-light bg-midnightBlue-medium cursor:pointer underline shadow-md rounded-r-2xl border-r border-t border-b text-center text-white text-xs btn-primary focus:outline-none active:shadow-none ${zIndex}`}
                                    onClick={item.onClick}
                              >
                                    {item.text}
                              </button>
                        )
                  })}
            </div>
          )
    }

    return null
}