import "./Upload.scss";

import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import { CircularProgress } from '@mui/material';

type Props = {}

const Upload = (props: Props): JSX.Element => {

    const [isUploading, setIsUploading] = useState(false);
    const [isFinishedUploading, setIsFinishedUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            return;
        }

        setIsUploading(true);
        setIsFinishedUploading(false);

        const data = new FormData();

        acceptedFiles.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });

        fetch(Settings.serverUrl + "file", {
            method: "POST", body: data
        })
            .then(() => {
                setIsUploading(false)
                setIsFinishedUploading(true);
            });

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

    const shouldReact = !(isUploading || isFinishedUploading);

    return (
        <FormControl id="upload-form">
            <Typography variant="h3">
                Upload
            </Typography>

            <Paper
                elevation={2}
                style={{ width: "80vw", height: "50vh", padding: 32 }}
            >

                <div
                    className="files-drop"
                    {...getRootProps()}
                    style={{ transition: "background-color 0.25s", cursor: (shouldReact ? "pointer" : "default"), backgroundColor: ((shouldReact && isDragActive) ? "rgba(0,255,0,0.2)" : "rgba(0,0,0,0.04)") }}
                >
                    <input
                        {...getInputProps()}
                        disabled={shouldReact === false}
                    />

                    {isUploading === false && isFinishedUploading === false &&
                        (isDragActive ?
                            <span>Drop here!</span> :
                            <span>Drag and drop file(s) here</span>
                        )
                    }

                    {isUploading === true && isFinishedUploading === false &&
                        <>
                            <CircularProgress />
                            <span>Uploading...</span>
                        </>
                    }

                    {isUploading === false && isFinishedUploading === true &&
                        <span>File(s) uploaded!</span>
                    }

                </div>

            </Paper>
        </FormControl>
    );
}

export { Upload };