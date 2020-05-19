import Meta from '../components/meta'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}