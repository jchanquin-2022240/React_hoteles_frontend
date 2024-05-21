import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { URL, IF } from "../url"
import { useContext, useEffect, useState } from "react"

const HotelDetails = () => {

    const postId = useParams().id
    const [post, setPost] = useState({})
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const fetchPost = async () => {


    }

    const handleDeletePost = async () => {



    }

    useEffect(() => {

        fetchPost()

    }, [postId])

    const fetchPostComments = async () => {

        setLoader(true)

    }

    useEffect(() => {

        fetchPostComments()

    }, [postId])

    const postComment = async (e) => {

        e.preventDefault()

    }

    return (
        <div>
            {loader ? <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div> : <div className="px-8 md:px-[200px] mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>

                </div>
                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                </div>
                <img src={IF + post.photo} className="w-full  mx-auto mt-8" alt="" />
                <p className="mx-auto mt-8">{post.desc}</p>
                <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p>Categorias:</p>
                    <div className="flex justify-center items-center space-x-2">
                        {post.categories?.map((c, i) => (
                            <>
                                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col mt-4 md:flex-row">
                    <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Escribe un comentario" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
                    <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Agregar comentario</button>
                </div>
            </div>}

        </div>
    )
}

export default HotelDetails