import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { urlMain } from "../../lib/config";

export default function EditPost() {
    const { id } = useParams()
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

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${urlMain}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        })
        .then(navigate("/post"))
    }

    useEffect(() => {
        fetch(`${urlMain}/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(({message, blog}) => {
            if(message === "Success") {
                setFields(blog)
            }
        })
    }, [id])

    return (
        <Layout title="Edit Post">
            <form onSubmit={handleSubmit.bind(this)}>
                <label htmlFor="title">Title</label>
                <input 
                    onChange={handleFields.bind(this)} 
                    className="border-2"  
                    placeholder="Input title"
                    value={fields.title}
                    name="title"
                />
                <label>Content</label>
                <textarea 
                    onChange={handleFields.bind(this)} 
                    className="border-2"  
                    placeholder="Input content"
                    name="description"
                    value={fields.description}
                />
                <Button 
                    type="submit" 
                >Edit</Button>
            </form>
        </Layout>
    )
}
