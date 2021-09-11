import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { MenuItem } from '../../utils/types'
import _ from 'lodash'

export default function Drinks() {
  const [drinks, setDrinks] = useState<Array<MenuItem>>([])
  
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
      <div className='m-4'>
          <h1 className='text-4xl mt-4 mb-4'>Drinks</h1>
          <h2 className='text-2xl mt-4 mb-4'>Cocktails</h2>
          {_.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Cocktails'.toLocaleLowerCase())
            .map((drink) => (
            <div key={drink.id} className='mt-2 mb-2'>
              <p className='font-bold'>{drink.name}</p>
              <p className='mb-4'>{drink.description}</p>
            </div>
          ))}
          <h2 className='text-2xl mt-4 mb-4'>Wine</h2>
          {_.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Wine'.toLocaleLowerCase())
            .map((drink) => (
            <div key={drink.id} className='mt-2 mb-2'>
              <p className='font-bold'>{drink.name}</p>
              <p className='mb-4'>{drink.description}</p>
            </div>
          ))}
          <h2 className='text-2xl mt-4 mb-4'>Beer</h2>
          {_.filter(drinks, (item) => item.category.toLocaleLowerCase() === 'Beer'.toLocaleLowerCase())
            .map((drink) => (
            <div key={drink.id} className='mt-2 mb-2'>
              <p className='font-bold'>{drink.name}</p>
              <p className='mb-4'>{drink.description}</p>
            </div>
          ))}

      </div>
  )
}