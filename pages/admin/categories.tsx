import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { Category } from '../../utils/types'
import _ from 'lodash'
import CategoryTree from '../../components/CategoryTree'
import AdminHeader from '../../components/AdminHeader'

const TOP_LEVEL = 'TOP LEVEL'

export default function Categories() {
  const [session, setSession] = useState<Session | null>(null)
  const [categories, setCategories] = useState<Array<Category>>([])
  const [addName, setAddName] = useState<string>('')
  const [addParentCategory, setParentCategory] = useState<string>(TOP_LEVEL)
  const [addHeader, setAddHeader] = useState<boolean>(true)

  useEffect(() => {
    setSession(supabase.auth.session());
    fetchCategories()
  }, [])

  const getAddPath = ():string  => {
    const addValue = String((categories.length + 1))
    
    if(addParentCategory === TOP_LEVEL){
      return addValue
    } else {
      const parentNode = categories.find((c) => c.name === addParentCategory)

      if(!parentNode) {
        return addValue
      } else {
        return `${parentNode.path}.${addValue}`
      }
    }

  }

  const fetchCategories = async () => {
    let { data: categories, error } = await supabase
      .from<Category>('category')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setCategories(categories || [])
  }

  //to do: consider moving this to a util file. Along with the other apis calls in the app 
  const addDrink = async () => {
    let { data: category, error } = await supabase
      .from<Category>('category')
      .insert({
        name: addName,
        path: getAddPath(),
        has_header: addHeader
        //@ts-ignore
      }, {user_id: session?.user?.email})
      .single()
    if (error) {
      console.log(error.message)
    } else if (category) {
      setCategories([...categories, category])
    }
  }

  const deleteNode = async (id: string) => {
    let { data: category, error } = await supabase
      .from<Category>('category')
      .delete()
      .match({ id }
        //@ts-ignore
      , {user_id: session?.user?.email})
    if (error) {
      console.log(error.message)
    } else if (category) {
      const newCategory = _.reject(categories, (d) => d.id === id)
      setCategories(newCategory)
    }
  }

  return (
      <div className='m-4'>
          <AdminHeader />
          <h1 className='text-2xl mt-4 mb-4'>Categories</h1>
          {CategoryTree({tree: categories, onDelete: deleteNode})}
          <h1 className='text-2xl mt-4 mb-4'>Add Category</h1>
          <div className="flex justify-between w-72">
            <p className='mr-4'>Name</p>
            <input 
              className='border border-black'
              value={addName}
              placeholder='E.g. Cocktails'
              onChange={(e) => setAddName(e.target.value)}
              type='text'
            />
          </div>
          <div className="flex w-72 mt-2 mb-2">
            <p className='mr-8'>Parent Node</p>
            <select 
              className='border'
              value={addParentCategory} 
              onChange={(e) => setParentCategory(e.target.value)}
            >
              {[{name: TOP_LEVEL}, ...categories].map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between w-72">
            <p className='mr-4'>Has Header?</p>
            <input 
              checked={addHeader}
              onChange={() => setAddHeader(!addHeader)}
              type='checkbox'
            />
          </div>
          <button 
            onClick={addDrink}
            className='bg-midnightBlue-medium hover:bg-midnightBlue-dark text-white font-bold py-2 px-4 rounded m-4'
          >
            Submit
          </button>
      </div>
  )
}