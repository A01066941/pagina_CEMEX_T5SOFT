import React from 'react';
import './Login.css';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Login()
{
    return (
            <Row noGutters className="vh-100">
                <Col md={{ span: 5, offset: 7 }}>
                    <div className="login-backdrop">
                        <div className="login-column flex-container">
                            {/* <Image src="/img/cemex.png" alt="Logo CEMEX" id="logo"/> */}
                        </div>
                    </div>
                </Col>
            </Row>
    );
}

export default Login;