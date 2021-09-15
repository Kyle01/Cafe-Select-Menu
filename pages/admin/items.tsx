import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { MenuItem } from '../../utils/types'
import _ from 'lodash'
import AdminHeader from '../../components/AdminHeader'

export default function Items() {
  const [session, setSession] = useState<Session | null>(null)
  const [drinks, setDrinks] = useState<Array<MenuItem>>([])
  
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
          <AdminHeader />
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
      </div>
  )
}