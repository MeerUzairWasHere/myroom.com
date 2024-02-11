import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
         <Link to="/" >MyRoom.com</Link>
        </span>
        <span className="flex space-x-2">
         <Link to="/sign-in" className="flex items-center justify-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover: " >Sign In</Link>
        </span>
      </div>  
    </header>
  )
}
export default Header