import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";

export const Signup = () =>{
    const schema = yup.object().shape({
        username: yup.string().required("Your username is required."),
        password: yup.string().min(4).max(20).required(),
        password2: yup.string().oneOf([yup.ref("password"),null], "Passwords Don't Match").required(),
        email: yup.string().email().required(),
        first_name: yup.string().required("Your first name is required."),
        last_name: yup.string().required("Your first name is required."),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) =>{
        axios.post('https://dhirajmuppineti.pythonanywhere.com/register/', {
            username: data?.username,
            password: data?.password,
            password2:data?.password2,
            email:data?.email,
            first_name:data?.first_name,
            last_name:data?.last_name,
        })
        .then((res) => {
            window.location.href = '/login';
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <Card style={{width:"100vh", margin: "auto",padding: "8vh", marginTop: "10vh"}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {errors.username?.message}
                {errors.password?.message}
                {errors.password2?.message}
                {errors.email?.message}
                {errors.first_name?.message}
                {errors.last_name?.message}
                <Form.Group className="mb-3">
                    <Form.Label>Create Username</Form.Label>
                    <Form.Control type="text" placeholder="dragonx101" {...register("username")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@gmail.com" {...register("email")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="john" {...register("first_name")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="cena" {...register("last_name")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="********" {...register("password")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="********" {...register("password2")}/>
                </Form.Group>
                
                <Button type="submit">SignUp</Button>
            </Form>
        </Card>
    );
}
