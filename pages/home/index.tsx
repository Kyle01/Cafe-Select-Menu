import Link from 'next/link'
import Image from 'next/image'
import Wallpaper from '../../public/homeWallpaper.jpg'
import { routes } from '../../utils/routes'

export default function Home() {
  return (
    <div className='overflow-hidden'>
      <Image src={Wallpaper} layout='fill' objectFit="cover" objectPosition="center" />
      <div className='w-screen h-screen justify-center flex flex-col items-center overflow-hidden'>
        <div className='z-10 fixed bg-darkGreen-dark border-paleBlue-light border-4 p-8'>
          <p className='font-title text-center text-paleBlue-light text-yellow-600 mt-8 mb-8 text-3xl'>Café Select</p>
          <Link href={routes.MENU}>
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>Menu</p>
            </div>
          </Link>
          <Link href={routes.LOCAL_RECOMMENDATIONS}>
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>Local Recommendations</p>
            </div>
          </Link>
          <Link href={routes.ABOUT}> 
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>About</p>
            </div>
          </Link>
        </div>
      </div> 
    </div>
  )
}