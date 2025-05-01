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

    const handleDeletePost = async (postId) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/posts/${postId}`);

            setPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId)
            );
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

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
                        <p className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">{post.author}</p>
                        <p>id: {post.id}</p>
                        <p>{post.body}</p>


                        <div className="space-x-5 space-y-5 my-3">
                            <Link
                                to={`posts/update/${post.id}`}
                                state={post}
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Edit Post
                            </Link>

                            <button
                                onClick={() => handleDeletePost(post.id)}
                                className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 cursor-pointer">
                                Delete Post
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}
