import { FC } from 'react'
import Link from 'next/link'

interface PropsInterface {
}

const Header: FC<PropsInterface> = props => {
  return (
    <header className='max-w-3xl mx-auto py-6 px-4 mb-10 border-b-2'>
    </header>
  )
}

export default Header