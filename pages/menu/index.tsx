import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Pill from '../../components/Pill'
import { Category, MenuItem } from '../../utils/types'
import _ from 'lodash'

export default function Drinks() {
  const [categories, setCategories] = useState<Array<Category>>([])
  const [items, setItems] = useState<Array<MenuItem>>([])
  const [cocktailPillActive, setCocktailPillActive] = useState<boolean>(false)
  
  useEffect(() => {
    fetchItems()
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

  const fetchItems = async () => {
    let { data: items, error } = await supabase
      .from<MenuItem>('menu_item')
      .select(`
        id,
        name,
        description,
        category (
          id,
          name,
          path,
          level,
          has_header
        )
      `)
      .order('id')
    if (error) console.log('error', error)
    else if(items) {
      setItems(items)
    } 
  }

  return (
      <div className='bg-darkGreen-light m-0 w-screen h-screen'>
          <div className='bg-darkGreen-medium p-4 flex'>
            {cocktailPillActive && 
              <button 
                className="py-1 px-2 w-8 cursor:pointer shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2"   
                onClick={() => setCocktailPillActive(false)}
              >
                X
              </button>
            }
            {_.filter(categories, (category) => (category.level === 2)).map((category) => (
                <div className='flex'>
                  <Pill 
                    active={cocktailPillActive}
                    onClick={() => setCocktailPillActive(!cocktailPillActive)}
                    text={category.name}
                  />
                </div>
              ))
            }
          </div>
          <div className ='p-4 '>
            {categories.sort((a,b) => a.path < b.path ? -1 : 1).map((category) => {
              if(!category.has_header) return null
              
              const filteredItems = _.filter(items, (item) => (
                item.category?.path === category.path
              ))

              if(filteredItems.length < 1) return null
                         
              return (
                <div key={category.id}>
                  <p className='text-2xl mt-4 mb-4 font-extrabold'>{category.name}</p>
                  {filteredItems.map((item) => (
                    <div key={item.id}>
                      <p className='font-header text-2xl'>{item.name}</p>
                      <p className='mb-4'>{item.description}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
      </div>
  )
}