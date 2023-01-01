import Nav from 'react-bootstrap/Nav';

function BasicExample(props) {
    return (
        <Nav
            //activeKey="/home"
            activeKey={props.location}
        >
            <Nav.Item>
                <Nav.Link href="/">Directors</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/add-d">Add Directors</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/add-m'>Add Movies</Nav.Link>
            </Nav.Item>

        </Nav>
    );
}

export default BasicExample;