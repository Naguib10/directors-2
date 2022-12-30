import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BasicExample() {
    return (
        <div className='row'>
            <div className='col-md-4 m-auto'>
                <h2>Add a director</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Control type="text" placeholder="Year of Birth" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhoto">
                        <Form.Control type="file" placeholder="Upload photo" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default BasicExample;