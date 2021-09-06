//@ts-nocheck
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function Drinks() {
  const [session, setSession] = useState(null)
  const [drinks, setDrinks] = useState([])
  const [addName, setAddName] = useState(null)
  const [addDescription, setAddDescription] = useState(null)
  const [addCategory, setAddCategory] = useState(null)
  
  useEffect(() => {
    setSession(supabase.auth.session());
    fetchDrinks()
  }, [])

  const fetchDrinks = async () => {
    let { data: drinks, error } = await supabase.from('menu_drink').select('*').order('id', true)
    if (error) console.log('error', error)
    else setDrinks(drinks)
  }

  const addDrink = async () => {
    let { data: drink, error } = await supabase
      .from('menu_drink')
      .insert({
        name: addName,
        description: addDescription,
        category: addCategory
      }, { user_email: session?.user?.email })
      .single()
    if (error) console.log(error.message)
    else setDrinks([...drinks, drink])
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
            <input 
              className='border border-black'
              value={addCategory}
              placeholder='E.g. Cocktails'
              onChange={(e) => setAddCategory(e.target.value)}
              type='text'
            />
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