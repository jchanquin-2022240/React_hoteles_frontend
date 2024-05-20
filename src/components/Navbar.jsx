import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"


const Navbar = () => {

    const [prompt, setPrompt] = useState("")
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    const path = useLocation().pathname

    const showMenu = () => {

        setMenu(!menu)
    }

    const { user } = useContext(UserContext)

    return (
        <div >
            <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Kinal Travvels</Link></h1>       
            <div onClick={showMenu} className="md:hidden text-lg">
            </div>
        </div>
    )
}

export default Navbar 