import { Session } from '@supabase/gotrue-js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

interface Props {
  session: Session
}

const Account  = ({session}: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState<string>('')

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error) {
        if(error instanceof Error) {
          alert(error.message)
        }
    } finally {
      setLoading(false)
    }
  }

  type UpdateType = {
    username: string
    website: string
  }

  async function updateProfile({ username, website }: UpdateType) {
    try {
      const user = supabase.auth.user()

      const updates = {
        id: user?.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase
      .from('profiles')
      .upsert(updates, {
        returning: 'minimal'
      })

      if (error) {
        throw error
      }
    } catch (error) {
      if(error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email" className='text-blue-400'>Email</label>
        <input id="email" type="text" value={session?.user?.email} />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Account