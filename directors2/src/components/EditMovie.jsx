import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Example(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState(props.movie);
    const [dop, setDop] = useState(props.year);
    const [file, setFile] = useState("");
    const [director, setDirector] = useState(props.director);
    const CreatePhotoField = useRef();

    async function submitHandler(e) {
        e.preventDefault();


        const data = new FormData();
        data.append("photo", file);
        data.append("name", name);
        data.append("dop", dop);
        data.append("director", director);

        setName("");
        setDop("");
        setFile("");
        setDirector("");
        CreatePhotoField.current.value = "";

        //console.log(data);
        handleClose();

        const newPhoto = await axios.put(`http://localhost:5000/update-movie/${props.id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        console.log("edit movie hamadaaaa");
        await props.edit();

    }

    return (
        <>
            <Button variant="outline-primary btn-sm" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit movie details</Modal.Title>
                </Modal.Header>


                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Control onChange={e => setDop(e.target.value)} value={dop} type="text" placeholder="Year of Production" />
                    </Form.Group>


                    <Form.Group controlId="formBasicSelect">
                        <Form.Control as="select" value={director} onChange={e => setDirector(e.target.value)} placeholder="Director">
                            <option disabled value={0} key={0}>Choose the director</option>
                            {props.directors.map((director, id) => {
                                return <option value={director.name} key={id}>{director.name}</option>
                            })}

                        </Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formPhoto">
                        <Form.Control ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" placeholder="Upload photo" />
                    </Form.Group>



                </Form>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

//render(<Example />);

export default Example;