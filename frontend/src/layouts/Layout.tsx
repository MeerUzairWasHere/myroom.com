import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"

interface Props {
  children:React.ReactNode;
}

const Layout = ({children}:Props) => {
  return (
    <div className="flex flex-col min-h-screen">
       <Header />
       <Hero />
        <main className="container mx-auto py-10 flex-1">
          {children}
        </main>
       <Footer />

</div>
  )
}
export default Layout