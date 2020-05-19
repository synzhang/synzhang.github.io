import Layout from '../components/layout'
import Container from '../components/container'
import HeroPost from '../components/hero-post'
import { getAllPosts } from '../services/api'
import Head from 'next/head'
import { CMS_NAME } from '../constants'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          {allPosts.map((heroPost, index) => (
            <HeroPost
              key={index}
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          ))}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}