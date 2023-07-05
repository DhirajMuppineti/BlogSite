import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import jwt from 'jwt-decode'

export const Login = () => {    
    // Create the submit method.
    const onSubmit = async (form,e) => {
        
        e.preventDefault();
        console.log(form);
        
        // Create the POST requuest
        try{
            
            const {data} = await axios.post('https://dhirajmuppineti.pythonanywhere.com/token/', form ,
            {
                headers: 
                    {'Content-Type': 'application/json'}, withCredentials: true
            });
            console.log(data);
            // Initialize the access & refresh token in localstorage.      
            localStorage.clear();
            localStorage.setItem('access_token', data?.access);
            localStorage.setItem('refresh_token', data?.refresh);
            console.log(jwt(localStorage.getItem('access_token')));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            window.location.href = '/'
        }catch(err){
            console.log(err)
        }
    }

    const schema = yup.object().shape({
        username: yup.string().required("Your username is required."),
        password: yup.string().min(4).max(20).required(),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });


    return (
        <Card style={{width:"80vh", margin: "auto",padding: "8vh", marginTop: "10vh"}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {errors.username?.message}
                {errors.password?.message}
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Dragon" {...register("username")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="" {...register("password")}/>
                </Form.Group>
                <Button type="submit">Login</Button>
                <Button onClick={()=>{window.location.href = '/signup'}}>SignUp</Button>
            </Form>
        </Card>
    );
}
