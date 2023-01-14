import "./UserAvatar.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

type Props = {}

const UserAvatar = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-profile"
            elevation={2}
        >
            <Avatar
                className="avatar"
                src="https://www.autocentrum.pl/ac-file/car-version/5cd964ffc74b353ca106e2f2.jpg"
                sx={{ width: 192, height: 192 }}
                style={{ objectFit: "cover" }}
            />

            <Typography variant="h4" >Spookyless</Typography>
            <Typography variant="h5">Slayer of Integrals</Typography>
        </Paper>
    );
}

export { UserAvatar };