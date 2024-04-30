import "@/globals.css"

export default async function Layout({ children }) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      {children}
    </>
  )
}
