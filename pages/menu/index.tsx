import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import { Category, MenuItem } from '../../utils/types'
import { NestedTags } from '../../components/NestedTags'
import { routes } from '../../utils/routes'
import _ from 'lodash'

export default function Drinks() {
  const router = useRouter()
  const [categories, setCategories] = useState<Array<Category>>([])
  const [items, setItems] = useState<Array<MenuItem>>([])
  const [filteredCategory, setFilteredCategory] = useState<Category | null>(null)
  const [displayFilters, setDisplayFilters] = useState<Array<string>>([])
  const { tags } = router.query

  useEffect(() => {
    fetchItems()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (Array.isArray(tags)) {
      const display = tags.map((text) => text.replace('_', ' '))
      setDisplayFilters(display)
    } else if (tags) {
      setDisplayFilters (tags.replace('_', ' ').split(','))
    } else {
      setDisplayFilters([])
    }
  }, [tags])

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

  const onSetFilter = (category: Category | null) => {
    setFilteredCategory(category)

    if(category) {
      if(tags) {
        const newUrl = `tags=${tags},${category.name.replace(' ', '_')}`
        router.replace({pathname: routes.MENU, query: newUrl})
      } else {
        router.replace({pathname: routes.MENU, query: {tags: category.name}})
      }
    } else {
      router.replace({pathname: routes.MENU})
    }
  }

  const availableFilters = _.filter(categories, (c) => {
    const currentLevel = (filteredCategory?.level || 0) 
    return c.level === currentLevel + 1 && c.path.includes(filteredCategory?.path || '')
  })

  const filteredCategories = _.filter(categories, (c) => {
    if (!filteredCategory) return true
    
    return c.path.includes(filteredCategory?.path)
  })

  const showHeader = (category: Category) => {
    if(!category.has_header) return false 
    const categoryItems = _.filter(items, (item) => (
      item.category?.path.includes(category.path)
    ))
    if(categoryItems.length < 1) return false 
    if(category.level <= (filteredCategory?.level || 0)) return false 

    return true
  }

  const displayFilterInput = displayFilters.map((text) => {
    const category = categories.find((c) => c.name === text) || null
    return ({ 
      text: text, 
      onClick: () => onSetFilter(category)
    })
  })

  return (
      <div className='bg-darkGreen-light m-0 w-screen h-screen'>
          <div className='bg-darkGreen-medium p-4 flex'>
            {displayFilters.length > 0 && 
              <button 
                className="px-1 w-8 cursor:pointer shadow-md rounded-full border text-center border-white text-white text-xs btn-primary focus:outline-none active:shadow-none mr-2"   
                onClick={() => onSetFilter(null)}
              >
                X
              </button>
            }
            {displayFilters.length > 0 && 
              <NestedTags
                items={displayFilterInput}
              />
            }
            {availableFilters.map((category) => (
                <div className='flex' key={category.id}>
                  <NestedTags
                    items={[{text: category.name, onClick: () => onSetFilter(category), transparent: true}]}
                  />
                </div>
              ))
            }
          </div>
          <div className ='p-4 '>
            {filteredCategories.sort((a,b) => a.path < b.path ? -1 : 1).map((category) => {             
              const categoryItems = _.filter(items, (item) => (
                item.category?.path.includes(category.path) && item.category.level === category.level
              ))

              return (
                <div key={category.id}>
                  {showHeader(category) && <p className='text-2xl mt-4 mb-4 font-extrabold'>{category.name}</p>}
                  {categoryItems.map((item) => (
                    //@ts-ignore
                    <div key={item.id}>
                      {/* @ts-ignore */}
                      <p className='font-header text-2xl'>{item.name}</p>
                      {/* @ts-ignore */}
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