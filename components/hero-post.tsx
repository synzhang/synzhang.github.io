import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  return (
    <section className='border-b py-4 lg:py-6 lg:px-4'>
      <h3 className='text-xl lg:text-3xl mb-2 lg:mb-4'>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {title}
        </Link>
      </h3>
      <div>
        <p>{excerpt}</p>
      </div>
      <footer>
        <time
          className='text-gray-500'
          dateTime={date}
        >
          {new Date(date).toLocaleDateString()}
        </time>
      </footer>
    </section>
  )
}