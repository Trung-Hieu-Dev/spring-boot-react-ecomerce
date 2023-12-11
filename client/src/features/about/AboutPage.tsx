import React, { useState } from "react";
import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import axios from "axios";

const AboutPage = () => {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    return (
        <Container>
            <Typography>Testing Errors Message</Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant="contained"
                    onClick={() => axios.post("/buggy/validate-error", {
                        "name": "",
                        "email": "test",
                    }).then(res => console.log(res.data))
                        .catch(error => {
                            console.log(error.response?.data.message);
                            setValidationErrors(error);
                        })}
                >Test Validation Error</Button>

                <Button
                    variant="contained"
                    onClick={() => axios.get("/buggy/404")
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error.response.data.message))}
                >Test 404 Error</Button>

                <Button
                    variant="contained"
                    onClick={() => axios.get("/buggy/500")
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error.response.data.message))}
                >Test 500 Error</Button>
            </ButtonGroup>

            {validationErrors.length > 0 &&
              <Alert severity="error">
                <AlertTitle>Validation Errors</AlertTitle>
                <List>
                    {validationErrors.map(error => (
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
              </Alert>
            }
        </Container>
    );
};

export default AboutPage;
