
import { Category } from '../utils/types'

interface Props {
    tree: Array<Category>
    onDelete: (id: string) => void
}

const About = ({
    onDelete,
    tree
}: Props) => {

    const level = (node: Category):number => {
        return node.path.split('.').length
    }

    
    return (
        <>
            {tree.sort((n, m) => n.path < m.path ? -1 : 1).map((node) => {
                const nodeLevel = level(node) - 1
                const header = node.has_header
                
                return (
                    <div className='flex justify-between max-w-xl mt-4 mb-4' key={node.name}>
                        <div className={`ml-${(nodeLevel) * 4} text-xl flex items-center`}>
                            <p className='mr-2'>{nodeLevel > 0 ? '|_' : null}</p>
                            <p className='pt-2'>{node.name}</p>
                            <p className={`pt-2 text-sm ml-2 ${header ? null : 'text-midnightBlue-medium'}`}>{header ? '- Header -' : ' - Hidden - '}</p>
                            <button 
                                className='bg-paleBlue-medium hover:bg-paleBlue-dark text-white font-bold py-1 px-2 rounded text-xs ml-4'
                                onClick={() => onDelete(node.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>     
                )
            })}
        </>
    )
  }

export default About