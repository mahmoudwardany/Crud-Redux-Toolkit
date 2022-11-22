import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { addPost, clear, removePosts, update } from '../feature/posts';
export default function Forms() {
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [isEdit,setEdit]=useState(false)
    const [Id,setId]=useState(null)
    const [editTitle,setEditedTitle]=useState('')
    const [editdesc,setEditedDesc]=useState('')
const posts=useSelector((state)=> state.posts.items)
const disptach=useDispatch()

return (
    <>
    <Form className='my-3 w-50 mx-auto text-start' >
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
        placeholder="Enter Title" 
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        
        />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" 
        value={desc}

        onChange={(e)=> setDesc(e.target.value)}
        placeholder="Enter Description" />
    </Form.Group>
    <div className='text-center'>
        <Button 
        variant="primary"
        onClick={()=>{disptach(addPost({id:posts.length +1 ,title,desc}))
    setTitle('')
    setDesc('')
    }}
        >
        Add post
        </Button>
        </div>
    </Form>
    {posts.length >0 ? <Button className=' mb-2' variant='warning'onClick={()=>disptach(clear())}>Delete all Posts</Button>:""}

    <div className='card mx-2 bg-light' >
        {posts.length > 0 ? posts.map(post=><div key={post.id}>
            <span>{post.id}</span>
        <h2>{post.title}</h2>
        <p>{post.desc}</p>
        <span className=' m-2'>
            <Button variant='danger' 
            className=' m-2'
            onClick={()=> disptach(removePosts(post))}
            >Delete</Button>
            <Button variant='success'
            className=' m-2'
            onClick={()=>{
                setEdit(true)
                setId(post.id)
            }}
            >Edit</Button>
            <hr/>
            {isEdit && Id === post.id && (
        <>
         <Form className='my-3 w-50 mx-auto text-start' >
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
        placeholder="Update Title"
        onChange={(e)=> setEditedTitle(e.target.value)} 
        />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" 
        placeholder="Update Description"
        onChange={(e)=> setEditedDesc(e.target.value)}
        />
        </Form.Group>
        <div className='text-center'>
        <Button variant='success'
        onClick={()=> { 
            disptach(update({id:post.id,title:editTitle,desc:editdesc}))
        setEdit(false)
            }}
        >Update</Button>
        </div>
    </Form>
    </>
            )}
        </span>
        </div>
 ):"there's no Posts"
 }
        
        

    </div>
    </>
)
}
