import { FC } from 'react'
import Link from 'next/link'
import { CMS_NAME, SLOGAN } from '../../constants'

interface PropsInterface {
}

const Header: FC<PropsInterface> = props => {
  return (
    <header className='max-w-3xl mx-4 lg:mx-auto py-6 lg:px-4 mb-6 lg:mb-10 border-b-2'>
      <h1 className='text-6xl font-bold'>
        <Link href='/'>{CMS_NAME}</Link>
        <small
          className='block lg:inline-block font-normal text-xl lg:text-3xl text-gray-600 lg:ml-4'
        >
          {SLOGAN}
        </small>
      </h1>
    </header>
  )
}

export default Header