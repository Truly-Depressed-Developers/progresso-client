import "./Browser.scss";
import { useEffect, useState } from "react";
import { Settings } from "../../settings";
import { BrowserFileData } from "../../types/BrowserFileData"
import { BrowserFile } from "../../components/BrowserFile"

type Props = {}

const Browser = (props: Props): JSX.Element => {
    const [files, setFiles] = useState<BrowserFileData[]>([]);


    useEffect(() => {
        fetch(`http://${Settings.ip}:${Settings.port}/allPdfs`)
            .then(async (response) => {
                if (response.ok) {
                    return { data: await response.json(), succ: true };
                } else {
                    return { data: await response.json(), succ: false };
                }
            })
            .then((data) => {
                if (data.succ) {
                    console.log(data.data.data)
                    setFiles(data.data.data)
                } else {
                    console.log("No succ :(")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <div id="browser">
            <div id="browser-container">
                {
                    files.map(file =>
                        <BrowserFile
                            key={file.id}
                            id={file.id}
                            extension={file.extension}
                            originalName={file.originalName}
                            uploadTimestamp={file.uploadTimestamp}
                        />
                    )
                }
            </div>
        </div>
    );
}

export { Browser };