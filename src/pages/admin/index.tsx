import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { CATEGORIES, MenuItem } from '../../utils/types'
import _ from 'lodash'

export default function Drinks() {
  const [session, setSession] = useState<Session | null>(null)
  const [drinks, setDrinks] = useState<Array<MenuItem>>([])
  const [addName, setAddName] = useState<string>('')
  const [addDescription, setAddDescription] = useState<string>('')
  const [addCategory, setAddCategory] = useState<string>(CATEGORIES[0])
  
  useEffect(() => {
    setSession(supabase.auth.session());
    fetchDrinks()
  }, [])

  const fetchDrinks = async () => {
    let { data: drinks, error } = await supabase
      .from<MenuItem>('menu_item')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setDrinks(drinks || [])
  }

  const addDrink = async () => {
    let { data: drink, error } = await supabase
      .from<MenuItem>('menu_item')
      .insert({
        name: addName,
        description: addDescription,
        category: addCategory
        //@ts-ignore
      }, {user_id: session?.user?.email})
      .single()
    if (error) {
      console.log(error.message)
    } else if (drink) {
      setDrinks([...drinks, drink])
    }
  }

  const deleteDrink = async (id: string) => {
    let { data: drink, error } = await supabase
      .from<MenuItem>('menu_item')
      .delete()
      .match({ id }
        //@ts-ignore
      , {user_id: session?.user?.email})
    if (error) {
      console.log(error.message)
    } else if (drink) {
      const newDrinks = _.reject(drinks, (d) => d.id === id)
      console.log(newDrinks)
      setDrinks(newDrinks)
    }
  }

  return (
      <div className='m-4'>
          <h1 className='text-2xl mt-4 mb-4'>Drinks</h1>
          {drinks.map((drink) => (
            <div className='flex' key={drink.id}>
              <div className='mt-2 mb-2'>
                <p>{drink.name}</p>
                <p>{drink.description}</p>
                <p>Category: {drink.category}</p>
              </div>
              <button 
                className='bg-paleBlue-medium hover:bg-paleBlue-dark text-white font-bold py-2 px-4 rounded m-4'
                onClick={() => deleteDrink(drink.id)}
              >
                Delete
              </button>
            </div>
          ))}
          <h1 className='text-2xl mt-4 mb-4'>Add Drinks</h1>
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
              {CATEGORIES.map((category) => (
                <option value={category} key={category}>{category}</option>
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
            onClick={addDrink}
            className='bg-midnightBlue-medium hover:bg-midnightBlue-dark text-white font-bold py-2 px-4 rounded m-4'
          >
            Submit
          </button>
      </div>
  )
}