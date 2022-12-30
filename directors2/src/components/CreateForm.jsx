import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import React, { useState, useRef } from "react";

function BasicExample(props) {

    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [file, setFile] = useState("");
    const CreatePhotoField = useRef();

    async function submitHandler(e) {
        e.preventDefault();


        const data = new FormData();
        data.append("photo", file);
        data.append("name", name);
        data.append("dob", dob);

        setName("");
        setDob("");
        setFile("");
        CreatePhotoField.current.value = "";

        console.log(data);

        const newPhoto = await Axios.post("http://localhost:5000/create-director", data, { headers: { "Content-Type": "multipart/form-data" } });
        props.setDirectors(prev => prev.concat([newPhoto.data]));
    }

    return (
        <div className='row'>
            <div className='col-md-4 m-auto'>
                <h2>Add a director</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Control onChange={e => setDob(e.target.value)} value={dob} type="text" placeholder="Year of Birth" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhoto">
                        <Form.Control ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" placeholder="Upload photo" />
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