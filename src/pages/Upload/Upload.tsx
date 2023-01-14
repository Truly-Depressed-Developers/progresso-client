import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";

type Props = {}

const Upload = (props: Props): JSX.Element => {

    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            return;
        }

        setIsUploading(true);

        const data = new FormData();

        acceptedFiles.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });

        fetch(Settings.serverUrl + "fileUpload", {
            method: "POST", body: data
        });

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

    return (
        <FormControl>
            <Typography variant="h3">
                Upload
            </Typography>

            {isUploading ?
                <p></p> :
                <div
                    {...getRootProps()}
                    style={{ border: "2px dashed gray", borderRadius: 8, cursor: "pointer" }}
                >
                    <input {...getInputProps()}
                    />
                    {
                        isDragActive ?
                            <p>Drop here</p> :
                            <p>Drag some files to upload them</p>
                    }
                </div>
            }

        </FormControl>
    );
}

export { Upload };