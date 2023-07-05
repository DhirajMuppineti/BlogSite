import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import {BiSolidLike} from 'react-icons/bi';
import {BiLike} from 'react-icons/bi';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import jwt from 'jwt-decode';
import axios from "axios";

export const BlogItem = (props) => {
    const [isLiked,setIsLiked] = useState(false);
    const [isCommenting,setIsCommenting] = useState(false);
    const [like,setLike] = useState(0);
    const [likeId,setLikeId] = useState(0);
    const likeBlog = () => {
        if(!isLiked){
            setIsLiked(true);
            setLike(1);
            const userId = jwt(localStorage.getItem('access_token'));
        
            axios.post('https://dhirajmuppineti.pythonanywhere.com/blog/api/likes/', {
                user:userId.user_id,
                blog:props.id,
            })
            .then((res) => {
                console.log(res);
                setLikeId(res.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
        }
            
        else{
            setLike(0);
            setIsLiked(false);
            axios.delete('https://dhirajmuppineti.pythonanywhere.com/blog/api/likes/'+likeId).then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
            
    }

    const commentBlog = () => {
        setIsCommenting(true);
    }

    const schema = yup.object().shape({
        comment: yup.string(),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data)=>{
        const userId = jwt(localStorage.getItem('access_token'));
        
        axios.post('https://dhirajmuppineti.pythonanywhere.com/blog/api/comments/', {
            
            comment: data?.comment,
            user:userId.user_id,
            blog:props.id,
        })
        .then((res) => {
            console.log(res);
            setIsCommenting(false);
            window.location.href = '/read?id='+props.id;
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(data);
        
    }

    

    const DOMPurify = require('dompurify')(window);
    return (
        <>
        <Card style={props.style}>
            <Card.Body style={{alignItems:'center'}}>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.blog) }}></div>
                    {!props.readlink && <Button onClick={likeBlog}>{props.likes + like} {isLiked?<BiSolidLike/>:<BiLike/>}</Button>}
                    {!props.readlink && <Button onClick={commentBlog}>Comment</Button>}
                </Card.Text>
                {props.readlink && <Card.Link href={"read?id="+props.id}>Read now</Card.Link>}
            </Card.Body>
        </Card>
        {isCommenting&& 
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Commenting</Form.Label>
                    <Form.Control type="text" placeholder="Write your comment here" {...register("comment")}/>
                </Form.Group>
                <Button type="submit">Comment</Button>
            </Form>
        }
        </>
        
    );
}
