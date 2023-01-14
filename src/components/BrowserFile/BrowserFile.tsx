import "./BrowserFile.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { BrowserFileData } from "../../types/BrowserFileData"
import { ButtonBase } from "@mui/material"

type Props = BrowserFileData


const BrowserFile = (props: Props): JSX.Element => {
    return (
        <ButtonBase
            onClick={() => {
                window.open(`file/${props.id}`, '_blank');
            }}
        >
            <Paper
                id="browser-file"
                elevation={2}
            >
                <Typography className="name" variant="h5" >{props.originalName}</Typography>
                <div id="browser-file-details">
                    <Typography className="extension" variant="body1">{props.extension}</Typography>
                    <Typography className="uploadTimestamp" variant="body1">{props.uploadTimestamp}</Typography>
                </div>
            </Paper>
        </ButtonBase>
    );
}

export { BrowserFile };