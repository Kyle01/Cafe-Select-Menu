import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { supabase } from '../../utils/supabaseClient'
import { Restaurant } from '../../utils/types'
import AdminHeader from '../../components/AdminHeader'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
    () => {
      return import('react-quill');
    },
    { ssr: false }
);


export default function RestaurantDetails() {
  const [_session, setSession] = useState<Session | null>(null)
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [about, setAbout] = useState<string>('');

  useEffect(() => {
    setSession(supabase.auth.session());
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    let { data: restaurantDetails, error } = await supabase
      .from<Restaurant>('restaurant')
      .select('*')
      .order('id')
      .limit(1)
    if (error) console.log('error', error)
    else if (restaurantDetails) {
      setAbout(restaurantDetails[0].about_section)
      setRestaurantId(restaurantDetails[0].id)
    }
  }

  const submitChanges = async () => {
    console.log('in here')
    const { data, error } = await supabase  
      .from('restaurant') 
      .update({ 
        about_section: about
       })
      .match({ id: restaurantId })
    if (error) console.log('error', error)
    else alert('Saved!')
  }
  
  return (
      <div className='m-4'>
          <AdminHeader />
          <h1 className='text-2xl mt-4 mb-4'>About</h1>
          <ReactQuill theme="snow" value={about} onChange={setAbout}/>
          <button
            onClick={submitChanges}
            className='bg-midnightBlue-medium hover:bg-midnightBlue-dark text-white font-bold py-2 px-4 rounded m-4'
          >
            Save changes
          </button>
      </div>
  )
}