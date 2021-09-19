import { Category } from '../utils/types'

interface Props {
    tree: Array<Category>
}
const About = ({
    tree
}: Props) => {
    return (
        <>
            {tree.map((node) => (
              <div className='flex justify-between max-w-xl'>
                  <p className='mr-4'>{node.name}</p>
                  <p>{node.path}</p>
              </div>     
            ))}
        </>
    )
  }

export default About