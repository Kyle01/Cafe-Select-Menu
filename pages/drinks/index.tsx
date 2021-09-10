import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { MenuDrink } from '../../utils/types'

export default function Drinks() {
  const [session, setSession] = useState<Session | null>(null)
  const [drinks, setDrinks] = useState<Array<MenuDrink>>([])
  const [addName, setAddName] = useState<string>('')
  const [addDescription, setAddDescription] = useState<string>('')
  const [addCategory, setAddCategory] = useState<string>('')
  
  useEffect(() => {
    setSession(supabase.auth.session());
    fetchDrinks()
  }, [])

  const fetchDrinks = async () => {
    let { data: drinks, error } = await supabase
      .from<MenuDrink>('menu_drink')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setDrinks(drinks || [])
  }

  const addDrink = async () => {
    let { data: drink, error } = await supabase
      .from<MenuDrink>('menu_drink')
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

  return (
      <div className='m-4'>
          <h1 className='text-2xl mt-4 mb-4'>Drinks</h1>
          {drinks.map((drink) => (
            <div key={drink.id} className='mt-2 mb-2'>
              <p>{drink.name}</p>
              <p>{drink.description}</p>
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
          <div className="flex justify-between w-72 mt-2 mb-2">
            <p className='mr-4'>Category</p>
            <select value={addCategory} onChange={(e) => setAddCategory(e.target.value)}>
              <option value="Cocktails">Cocktails</option>
              <option value="Wine">Wine</option>
              <option value="Beer">Beer</option>
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
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'
          >
            Submit
          </button>
      </div>
  )
}