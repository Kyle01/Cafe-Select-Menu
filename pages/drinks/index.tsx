import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Pill from '../../components/Pill'
import { MenuItem } from '../../utils/types'
import _ from 'lodash'

export default function Drinks() {
  const [drinks, setDrinks] = useState<Array<MenuItem>>([])
  const [cocktailPillActive, setCocktailPillActive] = useState<boolean>(false)
  
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    let { data: drinks, error } = await supabase
      .from<MenuItem>('menu_item')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setDrinks(drinks || [])
  }

  return (
      <div className='bg-darkGreen-light m-0 w-screen h-screen'>
          <div className='bg-darkGreen-medium p-4'>
            {cocktailPillActive && 
              <button 
                className="py-1 px-2 w-8 cursor:pointer shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2"   
                onClick={() => setCocktailPillActive(false)}
              >
                X
              </button>
            }
            <Pill 
              active={cocktailPillActive}
              onClick={() => setCocktailPillActive(!cocktailPillActive)}
              text='Cocktails'
            />
          </div>
          <div className ='p-4 '>
            <h1 className='text-4xl mt-4 mb-4 font-title'>Drinks</h1>
            <h2 className='text-2xl mt-4 mb-4 font-extrabold'>Cocktails</h2>
            {_.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Cocktails'.toLocaleLowerCase())
              .map((drink) => (
              <div key={drink.id} className='mt-2 mb-2'>
                <p className='font-header text-2xl'>{drink.name}</p>
                <p className='mb-4'>{drink.description}</p>
              </div>
            ))}
            {!cocktailPillActive && <h2 className='text-2xl mt-4 mb-4 font-extrabold'>Wine</h2>}
            {!cocktailPillActive && _.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Wine'.toLocaleLowerCase())
              .map((drink) => (
              <div key={drink.id} className='mt-2 mb-2'>
                <p className='font-header text-2xl'>{drink.name}</p>
                <p className='mb-4'>{drink.description}</p>
              </div>
            ))}
            {!cocktailPillActive && <h2 className='text-2xl mt-4 mb-4 font-extrabold'>Beer</h2>}
            {!cocktailPillActive && _.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Beer'.toLocaleLowerCase())
              .map((drink) => (
              <div key={drink.id} className='mt-2 mb-2'>
                <p className='font-header text-2xl'>{drink.name}</p>
                <p className='mb-4'>{drink.description}</p>
              </div>
            ))}
          </div>
      </div>
  )
}