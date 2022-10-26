import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { urlMain } from "../../lib/config";
import styles from '../../styles/Post.module.css';

export default function CreatePost() {
    const [fields, setFields] = useState({
        title: "",
        description: ""
    })

    const navigate = useNavigate()

    function handleFields({target: {value, name}}) {
        setFields({
            ...fields,
            [name]: value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();

        fetch(urlMain, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields),
        })
        .then(navigate("/post"))
    }

    return (
        <Layout title="Create Post">
            <form onSubmit={handleSubmit.bind(this)}>
                <label htmlFor="title">Title</label>
                <input 
                    onChange={handleFields.bind(this)} 
                    className="border-2"  
                    placeholder="Input title"
                    name="title"
                />
                <label>Content</label>
                <textarea 
                    onChange={handleFields.bind(this)} 
                    className="border-2"  
                    placeholder="Input content"
                    name="description"
                />
                <Button 
                    type="submit" 
                >Post</Button>
            </form>
        </Layout>
    )
}
