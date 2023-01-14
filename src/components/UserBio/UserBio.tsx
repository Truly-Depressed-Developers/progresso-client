import "./UserBio.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

type Props = {}

const UserBio = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-bio"
            elevation={2}
        >
            <Typography className="about-me" variant="h5" >About me</Typography>
            <Typography className="about-me-text" variant="body1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, amet. Aliquam saepe sunt perferendis harum neque ipsum doloribus dolore eveniet, aperiam, in incidunt est sed fuga voluptatem nesciunt temporibus ipsam ullam nam velit iure commodi. Fugiat deleniti omnis repudiandae accusamus voluptatibus, cumque ad, veniam mollitia perspiciatis vel quia tenetur sunt.</Typography>
        </Paper>
    );
}

export { UserBio };