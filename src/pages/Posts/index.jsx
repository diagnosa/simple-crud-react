import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card"
import Layout from "../../components/Layout";
import { urlMain } from "../../lib/config"
import styles from "../../styles/Post.module.css";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const handleRemove = (id) => async () => {
        const delResponse = await fetch(`${urlMain}/${id}`, {
            method: 'DELETE'
        })

        const {message} = await delResponse.json()
        if(message === "Success"){
            getData()
        }
    }

    const getData = async () => {
        setLoading(true)
        const postResponse = await fetch(urlMain, {
            method: 'GET'
        })

        const {blogs: data} = await postResponse.json()

        setPosts(data)
        setLoading(false)
        console.log('fetched!')
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout title="Post">
            <Link to="/post/create">Create</Link>
            <section >
                {loading ? <div>Loading...</div> : <></>}
                <div className={styles.wrap}>
                    {posts.length > 0 ? 
                        posts.map((item, index) => (
                            <Card title={item.title} body={item.description} 
                            key={`card-${index}`} 
                            button={
                                <>
                                    <Button 
                                    className="bg-red-500"
                                    onClick={handleRemove(item.id)}
                                    >Delete
                                    </Button>
                                    <Button>
                                        <Link to={`/post/edit/${item.id}`}>
                                    Edit</Link>
                                    </Button>
                                </>
                            } 
                            />
                        ))
                        : "No post found"
                    }
                </div>
            </section>
        </Layout>
    )
}
