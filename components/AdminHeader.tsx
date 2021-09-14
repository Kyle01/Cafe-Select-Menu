
import { useRouter } from 'next/router'
import Link from 'next/link'
import { routes } from '../utils/routes'


export default function AdminHeader() {
    const router = useRouter();

    const path = router.pathname
    const activeStyle = 'py-2 px-6 bg-paleTan-dark text-white rounded-t-lg'
    const inActiveStyle = 'py-2 px-6 bg-paleTan-medium text-white rounded-t-lg'

    return (
        <div>
            <ul className='flex cursor-pointer'>
                <Link href={routes.ADMIN_ITEMS}>
                    <li className={path.includes('items') ? activeStyle : inActiveStyle}>View items</li>
                </Link>
                <Link href={routes.ADMIN_CREATE}>
                    <li className={path.includes('create') ? activeStyle : inActiveStyle}>Add item</li>
                </Link>
            </ul>
        </div>
    )
  }