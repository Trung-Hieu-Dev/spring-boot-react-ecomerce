import React from "react";
import { Button, Container, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography gutterBottom variant='h3'>
                Not Found
            </Typography>
            <Divider />
            <Button onClick={() => navigate(-1)}>Back To Previous</Button>
        </Container>
    );
};

export default NotFound;
