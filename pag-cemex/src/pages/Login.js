import { React, useState } from 'react';
import './Login.css';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();

    const [userOrEmail, setUserOrEmail] = useState('');
    const [password, setPassword] = useState('');

    function validateForm() {
        return userOrEmail.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        fakeLogin(userOrEmail, password);

        history.push('/');
    }

    return (
        <div id='login-page'>
            <Row noGutters className='vh-100'>
                <Col
                    xl={{ span: 5, offset: 7 }}
                    lg={{ span: 6, offset: 6 }}
                    md={{ span: 8, offset: 4 }}
                    sm={{ span: 10, offset: 2 }}
                >
                    <div id='login-backdrop'>
                        <div id='login-column'>
                            <Image
                                src='/img/cemex.png'
                                alt='Logotipo CEMEX'
                                id='login-logo'
                            />
                            <Form id='login-form'>
                                <p id='login-title'>
                                    Ingresa tus datos para iniciar sesión
                                </p>
                                <br />
                                <Form.Group controlId='loginForm.userOrEmail'>
                                    <Form.Control
                                        type='email'
                                        value={userOrEmail}
                                        onChange={(e) =>
                                            setUserOrEmail(e.target.value)
                                        }
                                        placeholder='Usuario o correo electrónico'
                                    />
                                </Form.Group>
                                <Form.Group controlId='loginForm.password'>
                                    <Form.Control
                                        type='password'
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder='Contraseña'
                                    />
                                </Form.Group>
                            </Form>
                            <Button
                                id='loginButton'
                                variant='dark'
                                type='submit'
                                disabled={!validateForm()}
                                onClick={handleSubmit}
                                block
                            >
                                INICIAR SESIÓN
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

function fakeLogin(userOrEmail, password) {
    console.warn('LOGIN NOT IMPLEMENTED');
    console.log(`Submitted user or email: ${userOrEmail}`);
    console.log(`Submitted password: ${password}`);

    document.cookie = `logged=${userOrEmail};max-age=900;path=/;`;
}

export default Login;
