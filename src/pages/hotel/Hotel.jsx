import axios from "axios"
import HotelCard from "../../components/HotelCard"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export const Hotel = () => {

    const { search } = useLocation()
    const [posts, setPosts] = useState([])
    const [noResults, setNoResults] = useState(false)
    const [loader, setLoader] = useState(false)

    const fetchPosts = async () => {

        setLoader(true)

        try {


        }
        catch (err) {

        }
    }

    useEffect(() => {

        fetchPosts()

    }, [search])



    return (
        <>

            <div className="px-8 md:px-[200px] min-h-[80vh]">
                {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ?
                    posts.map((post) => (
                        <>
                            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                                <HomePosts key={post._id} post={post} />
                            </Link>
                        </>
                    )) : <h3 className="text-center font-bold mt-16">No hay Blogs disponibles</h3>}
            </div>
        </>
    )
}

export default Hotel