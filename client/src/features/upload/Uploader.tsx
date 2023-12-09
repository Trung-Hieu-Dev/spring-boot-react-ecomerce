import React from "react";
import { Input, Typography } from "@mui/material";

const Uploader = () => {
    const onFileChangeHandler = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        fetch("http://localhost:8080/api/file/upload", {
            method: "post",
            body: formData,
        }).then(response => {
            if (response.ok) {
                alert("Upload image successfully");
            }
        });
    };

    return (
        <>
            <Typography variant="h2">
                Uploader
            </Typography>

            <Input type="file" onChange={onFileChangeHandler}/>
        </>

    );
};

export default Uploader;
