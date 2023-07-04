import Container from 'react-bootstrap/Container';
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {BlogItem} from './BlogItem';
import {CommentItem} from './CommentItem';
import React from "react";
import {useLocation} from "react-router-dom";

function useSearch() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}



export const Read = () => {
    let query = useSearch();
    const url = "http://127.0.0.1:8000/blog/api/blogs/" + query.get('id');
    const {data} = useQuery(["blog"],() => {
        return Axios.get(url).then((res)=>res.data);
    });
    console.log(data);
    const commentUrl = "http://127.0.0.1:8000/blog/api/comments/";
    const {data:commentData,isLoading,status,error} = useQuery(["comments"],() => {
        return Axios.get(commentUrl).then((res)=>res.data);
    });

    
    if(isLoading){
        return <h1>Loading</h1>;
    }
    
    
    const blogStyle = {
        margin:'10px auto 10px auto',
        padding:'5px',
        height:'auto',
        width:'150vh', 
        alignItems:"center",
    }
    const commentStyle = {
        margin:'10px',padding:'5px',textAlign:'left' ,
        borderLeft:'20vh',
        top: '-25px', /* Same as body margin top + border */
        left: '10px',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
    }
    return (
        <>
            <Container>
                <BlogItem style={blogStyle} id={data?.id} likes={data?.likes} title={data?.title} subtitle={data?.subtitle} blog={data?.content} readlink={false}/>
            </Container>
            <Container>
                {status === "error" && <p>Error fetching data</p>} {console.log(error)}{console.log(commentData)}
                {status === "loading" && <p>Fetching data...</p>}
                {status === "success" && commentData?.map((obj)=>{
                    if (obj?.blog == query.get('id')) {
                        console.log(obj);
                        return <CommentItem style={commentStyle} id={obj?.id} title={obj?.username} subtitle={`commented on : ${obj?.commented_date}`} blog={obj?.comment}/>
                }})
                }
            </Container>
        </>
        
    );
}