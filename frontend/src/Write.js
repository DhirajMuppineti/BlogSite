import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import {useState} from 'react';
import {useContext} from "react";
import {AppContext} from "./App";
import jwt from 'jwt-decode'

export const Write = () => {
    const {isAuth} = useContext(AppContext);
    const navigate = useNavigate();
    const [textValue,setTextValue] = useState("");
    const schema = yup.object().shape({
        title: yup.string().max(100).required("Title is required."),
        subtitle: yup.string().max(50),
        content: yup.string(),
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const userId = jwt(localStorage.getItem('access_token'));
        
        axios.post('http://127.0.0.1:8000/blog/api/blogs/', {
            title: data?.title,
            subtitle: data?.subtitle,
            content: textValue,
            lastupdated: new Date().toJSON().slice(0, 10),
            likes: 0,
            readCount: 0,
            author:userId.user_id,
        })
        .then((res) => {
            console.log(res);
            console.log(userId.user_id);
            navigate('/', { replace: true });
            
        })
        .catch((err) => {
            console.log(err);
            console.log(userId.user_id);
        });
        
        console.log(data);
    };
    return (
        <div>{isAuth?
            <Form onSubmit={handleSubmit(onSubmit)}>
                {errors.title?.message}
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Title" {...register("title")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Subtitle" {...register("subtitle")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <CKEditor editor={ ClassicEditor } 
                    data={ textValue }
                    onChange={(event, editor) => {
                            const data = editor.getData();
                            setTextValue(data);
                          }}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>:<h1>you need to login first</h1>}
        </div>
    );
}
