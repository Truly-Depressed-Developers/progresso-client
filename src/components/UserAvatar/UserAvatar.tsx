import "./UserAvatar.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

type Props = {
    username: string,
    title: string,
    photo_url_id: string
}

const UserAvatar = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-profile"
            elevation={2}
        >
            <Avatar
                className="avatar"
                src={Settings.serverUrl + "file?id=" + props.photo_url_id}
                sx={{ width: 192, height: 192 }}
                style={{ objectFit: "cover" }}
            />

            <Typography variant="h4" >{props.username}</Typography>
            <Typography variant="h6">{props.title}</Typography>
        </Paper>
    );
}

export { UserAvatar };