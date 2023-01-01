import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import React, { useState, useRef } from "react";
import Select from "../components/Select";

function BasicExample(props) {

    const [name, setName] = useState("");
    const [dop, setDop] = useState("");
    const [file, setFile] = useState("");
    const [director, setDirector] = useState("");
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

        const newPhoto = await Axios.post("http://localhost:5000/create-movie", data, { headers: { "Content-Type": "multipart/form-data" } });
        //props.setDirectors(prev => prev.concat([newPhoto.data]));
    }

    return (
        <div className='row'>
            <div className='col-md-4 m-auto'>
                <h2>Add a movie</h2>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>

    );
}

export default BasicExample;