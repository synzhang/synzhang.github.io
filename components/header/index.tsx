import { FC } from 'react'
import Link from 'next/link'
import { CMS_NAME, SLOGAN } from '../../constants'

interface PropsInterface {
}

const Header: FC<PropsInterface> = props => {
  return (
    <header className='max-w-3xl mx-auto py-6 px-4 mb-10 border-b-2'>
      <h1 className='text-6xl font-bold'>
        <Link href='/'>{CMS_NAME}</Link>
        <small className='font-normal text-3xl text-gray-600 ml-4'>{SLOGAN}</small>
      </h1>
    </header>
  )
}

export default Header