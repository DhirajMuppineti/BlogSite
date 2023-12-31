import Container from 'react-bootstrap/Container';
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {BlogItem} from './BlogItem';
import {useEffect, useState} from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';


export const Home = () => {

    const [message, setMessage] = useState('');
    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
            (async () => {
            try {
                const {data} = await axios.get('https://dhirajmuppineti.pythonanywhere.com/home/', {
                                headers: {
                                'Content-Type': 'application/json'
                                }}
                            );
                setMessage(data.message);
            } catch (e) {
            console.log('not auth')
            }
            })()};
    }, []);
    const url = "https://dhirajmuppineti.pythonanywhere.com/blog/api/blogs/";
    const {data, isLoading, isError, error} = useQuery(["blogs"],() => {
        return Axios.get(url).then((res)=>res.data);
    });
    console.log(data);
    const cardStyle = {margin:'10px',padding:'5px',textAlign:'left',width: '18rem' };

    if(isLoading){
        return <h1>Loading</h1>;
    }
    if(isError){
        return <h1>{error.message};</h1>
    }
    return (
        <>
        <h1>Hi {message}</h1>
        <div style={{display: "flex", height: "auto", alignItems: "flex-start"}}>
            
            <Container style={{flex:" 0 0 30%",margin:'20px',marginTop:'0px'}}>
                
                {data.map((obj)=>{
                    return <BlogItem style={cardStyle} id={obj?.id} title={obj?.title} subtitle={obj?.subtitle} blog={obj?.content.slice(0,100)+"..."} readlink={true}/>
                })}
            </Container>
            <Carousel style={{width: "80%", height: "auto",marginRight:'20px'}}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images3.memedroid.com/images/UPLOADED122/631a54015012a.webp"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images7.memedroid.com/images/UPLOADED240/630fc79740532.webp"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images7.memedroid.com/images/UPLOADED972/5daec4333d2b4.jpeg"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
        </>
    );
}

