import { useEffect, useState } from 'react'
import { Restaurant } from '../../utils/types'
import { supabase } from '../../utils/supabaseClient'

export default function About() {
    const [about, setAbout] = useState<string>('');
    
    useEffect(() => {
        fetchAbout()
    }, [])

    const fetchAbout = async () => {
        let { data: restaurantDetails, error } = await supabase
            .from<Restaurant>('restaurant')
            .select('*')
            .order('id')
            .limit(1)
        if (error) console.log('error', error)
        else if (restaurantDetails) {
            setAbout(restaurantDetails[0].about_section)
        }
    }

    return (
        <div className='m-4'>
            <h1 className='text-4xl mb-2'>About</h1>
            <td dangerouslySetInnerHTML={{__html: about}} />
        </div>
    )
  }