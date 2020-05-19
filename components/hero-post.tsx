import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  return (
    <section>
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{title}</a>
        </Link>
      </h3>
      <div>
        <p>{excerpt}</p>
      </div>
    </section>
  )
}