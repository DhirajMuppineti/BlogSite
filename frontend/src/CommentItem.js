import Card from 'react-bootstrap/Card';

export const CommentItem = (props) => {

    const DOMPurify = require('dompurify')(window);
    return (
            <Card style={{width:"18rem",marginLeft:'140vh',marginTop:'5vh'}}>
                <Card.Body style={props.style}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle style={{font:"small-caption"}} className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
                    <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.blog) }}></div>
                    </Card.Text>
                </Card.Body>
            </Card>
    );
        
}