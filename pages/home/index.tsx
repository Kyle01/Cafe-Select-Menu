import Link from 'next/link'
import Image from 'next/image'
import Wallpaper from '../../public/homeWallpaper.jpg'

export default function Home() {
  return (
    <div className='overflow-hidden'>
      <Image src={Wallpaper} layout='fill' objectFit="cover" objectPosition="center" />
      <div className='w-screen h-screen justify-center flex flex-col items-center overflow-hidden'>
        <div className='z-10 fixed bg-darkGreen-dark border-paleBlue-light border-4'>
          <p className='text-center text-paleBlue-medium text-yellow-600 mt-8 mb-8 text-2xl'>Café Select</p>
          <Link href='/drinks'>
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>Drinks</p>
            </div>
          </Link>
          <Link href='/food'>
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>Food</p>
            </div>
          </Link>
          <Link href='/about'> 
            <div className='justify-center w-48 mt-8 mb-8 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center text-paleBlue-light underline text-xl'>About</p>
            </div>
          </Link>
        </div>
      </div> 
    </div>
  )
}