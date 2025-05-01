import {useEffect, useState} from "react";
import axios from "axios";

export function Index() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log("Error fetching data: ", err)
            })
    }, [])

    return (
        <div>
            {posts && posts.map(post => (
                <div key={post.id} className="p-5 my-5 border rounded-md shadow-sm text-left">
                    <h2 className="mb-5 font-bold">{post.title}</h2>
                    <p className="font-serif mb-3">{post.author}</p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}
