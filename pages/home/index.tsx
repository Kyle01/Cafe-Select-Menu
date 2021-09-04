import Link from 'next/link'

export default function Home() {
  return (
      <div className='bg-green-500 h-screen justify-center flex flex-col items-center'>
          <p className='text-center text-yellow-600'>Cafe Select</p>
          <Link href='/drinks'>
            <div className='justify-center border-4 border-yellow-600 w-64 mt-4 mb-4 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center'>Drinks</p>
            </div>
          </Link>
          <Link href='/food'>
            <div className='justify-center border-4 border-yellow-600 w-64 mt-4 mb-4 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center'>Food</p>
            </div>
          </Link>
          <Link href='/about'> 
            <div className='justify-center border-4 border-yellow-600 w-64 mt-4 mb-4 hover:bg-blue-100 cursor-pointer'>
                <p className='text-center'>About</p>
            </div>
          </Link>
      </div>
  )
}