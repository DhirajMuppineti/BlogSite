
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
export const About = () => {
    const blogStyle = {
        margin:'10px auto 10px auto',
        padding:'5px',
        height:'70vh',
        width:'150vh', 
        alignItems:"center",
    }
    return (
        <>
            <Container style={{height:'80vh'}}>
                <Card style={blogStyle}>
                    <Card.Body style={{alignItems:'center'}}>
                        <Card.Title>About</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">this website</Card.Subtitle>
                        <Card.Text>
                            <p>This is a simple and stupid blog site I've to made to learn frameworks like react, django
                                and django rest frameworks. It helped me understand all aspeacts of full stack development
                                and how frustrating javascript is, and also how frustrating web dev is but hopefully it would 
                                look good on the resume. And now it's sounding like a linkedin post. Well, that's it.
                            </p>
                            <img src="https://images3.memedroid.com/images/UPLOADED197/64050ce835751.webp" width="400" height="200" />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>  
        </>
        
    );
}