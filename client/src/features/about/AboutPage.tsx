import React from "react";
import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import axios from "axios";

const AboutPage = () => {
    return (
        <Container>
            <Typography>Testing Errors Message</Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant='contained'
                    onClick={() => axios.post('/buggy/validate-error', {
                        "name": "",
                        "email": "test"
                    }).then(res => console.log(res.data))
                        .catch(error => console.log(error.response.data.message))}
                >Test Validation Error</Button>

                <Button
                    variant='contained'
                    onClick={() => axios.get('/buggy/404', )
                        .then(res =>  console.log(res.data))
                        .catch(error => console.log(error.response.data.message))}
                >Test Validation 404 Error</Button>

                <Button
                    variant='contained'
                    onClick={() => axios.get('/buggy/500', )
                        .then(res =>  console.log(res.data))
                        .catch(error => console.log(error.response.data.message))}
                >Test Validation 500 Error</Button>
            </ButtonGroup>
        </Container>
    );
};

export default AboutPage;
