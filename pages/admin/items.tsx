import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { MenuItem } from '../../utils/types'
import _ from 'lodash'
import AdminHeader from '../../components/AdminHeader'

export default function Items() {
  const [session, setSession] = useState<Session | null>(null)
  const [items, setItems] = useState<Array<MenuItem>>([])
  
  useEffect(() => {
    setSession(supabase.auth.session());
    fetchItems()
  }, [])

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
    if (error) alert(error)
    else setItems(items || [])
  }

  const deleteItem = async (id: string) => {
    let { data: item, error } = await supabase
      .from<MenuItem>('menu_item')
      .delete()
      .match({ id }
        //@ts-ignore
      , {user_id: session?.user?.email})
    if (error) {
      console.log(error.message)
    } else if (item) {
      const newItems = _.reject(items, (d) => d.id === id)
      setItems(newItems)
    }
  }

  return (
      <div className='m-4'>
          <AdminHeader />
          <h1 className='text-2xl mt-4 mb-4'>Drinks</h1>
          {items.map((item) => (
            <div className='flex' key={item.id}>
              <div className='mt-2 mb-2'>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>Category: {item.category?.name}</p>
              </div>
              <button 
                className='bg-paleBlue-medium hover:bg-paleBlue-dark text-white font-bold py-2 px-4 rounded m-4'
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
  )
}