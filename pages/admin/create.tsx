import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { Category, MenuItem } from '../../utils/types'
import AdminHeader from "../../components/AdminHeader";
import _ from 'lodash'

export default function Create() {
  const [session, setSession] = useState<Session | null>(null)
  const [categories, setCategories] = useState<Array<Category>>([])
  const [addName, setAddName] = useState<string>('')
  const [addDescription, setAddDescription] = useState<string>('')
  const [addCategory, setAddCategory] = useState<string>('')
  
  useEffect(() => {
    setSession(supabase.auth.session());
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    let { data: categories, error } = await supabase
      .from<Category>('category')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setCategories(categories || [])
  }
  
  const addMenuItem = async () => {
      let { data: drink, error } = await supabase
        .from<MenuItem>('menu_item')
        .insert({
          name: addName,
          description: addDescription,
          //@ts-ignore
          category_id: _.find(categories, {name: addCategory})?.id,
          //@ts-ignore
        }, {user_id: session?.user?.email})
        .single()
      if (error) {
        console.log(error.message)
      } else if (drink) {
        alert('Menu item added')
      }
  }
  
  return (
      <div className='m-4'>
          <AdminHeader />
          <h1 className='text-2xl mt-4 mb-4'>Add Menu Item</h1>
          <div className="flex justify-between w-72">
            <p className='mr-4'>Name</p>
            <input 
              className='border border-black'
              value={addName}
              placeholder='E.g. Manhattan'
              onChange={(e) => setAddName(e.target.value)}
              type='text'
            />
          </div>
          <div className="flex w-72 mt-2 mb-2">
            <p className='mr-8'>Category</p>
            <select 
              className='border'
              value={addCategory} 
              onChange={(e) => setAddCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category.name} key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between w-72">
            <p className='mr-4'>Description</p>
            <input 
              className='border border-black'
              value={addDescription}
              placeholder='E.g. Classic Whiskey Cocktail'
              onChange={(e) => setAddDescription(e.target.value)}
              type='text'
            />
          </div>
          <button 
            onClick={addMenuItem}
            className='bg-midnightBlue-medium hover:bg-midnightBlue-dark text-white font-bold py-2 px-4 rounded m-4'
          >
            Submit
          </button>
      </div>
  )
}