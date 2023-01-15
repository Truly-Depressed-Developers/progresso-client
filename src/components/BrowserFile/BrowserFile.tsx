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
    function openPDF() {
        console.log("id:", props.id)
        fetch(`http://${Settings.ip}:${Settings.port}/file?` + new URLSearchParams({
            id: props.id,
        }))
            .then(async (response) => {
                if (response.ok) {
                    return { blob: await response.blob(), succ: true };
                } else {
                    return { blob: await response.blob(), succ: false };
                }
            })
            .then((data) => {
                if (data.succ) {
                    var file = window.URL.createObjectURL(data.blob!);
                    window.location.assign(file);
                } else {
                    console.log("No succ :(")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <ButtonBase
            onClick={openPDF}
        >
            <Paper
                id="browser-file"
                elevation={2}
            >
                <div id="inner">
                    <div id="top-details">
                        <div className="upvoteContainer">
                            <img className="extensionIcon" src={`http://${Settings.ip}:${Settings.port}/static/upvote.png`} />
                            <Typography className="extension" variant="body1">123</Typography>
                        </div>
                        <img className="extensionIcon" src={`http://${Settings.ip}:${Settings.port}/static/${props.extension}.png`} />
                    </div>
                    <Typography className="name" variant="h5" >{props.originalName}</Typography>
                    <div id="bottom-details">
                        <Typography className="uploadTimestamp" variant="body1">{new Date(props.uploadTimestamp).toLocaleString()}</Typography>
                    </div>
                </div>
            </Paper>
        </ButtonBase>
    );
}

export { BrowserFile };