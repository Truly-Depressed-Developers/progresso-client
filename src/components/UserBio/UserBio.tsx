import "./UserBio.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

type Props = {
    bio: string
}

const UserBio = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-bio"
            elevation={2}
        >
            <Typography className="about-me" variant="h5" >About me</Typography>
            <Typography className="about-me-text" variant="body1">{props.bio}</Typography>
        </Paper>
    );
}

export { UserBio };