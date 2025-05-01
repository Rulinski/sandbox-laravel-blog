import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function Index() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
            .then(res => {
                setPosts(res.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex">
                <Link
                    to="/posts/create"
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
                >
                    Create new post
                </Link>
            </div>

            {posts && posts
                .slice()
                .reverse()
                .map(post => (
                    <div key={post.id} className="p-5 my-5 border rounded-md shadow-sm text-left">
                        <h2 className="mb-5 font-bold">{post.title}</h2>
                        <p className="font-serif mb-3">{post.author}</p>
                        <p>{post.body}</p>
                    </div>
                ))}
        </div>
    )
}
