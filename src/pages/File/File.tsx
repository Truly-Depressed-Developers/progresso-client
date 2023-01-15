import "./File.scss";
import { useEffect } from "react";
import { Settings } from "../../settings";
import { useParams } from "react-router-dom";

type Props = {}

const File = (props: Props): JSX.Element => {
    const { id } = useParams<string>()

    useEffect(() => {
        console.log("id:", id)
        fetch(`http://${Settings.ip}:${Settings.port}/file?` + new URLSearchParams({
            id: id!,
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
    }, [])

    return (
        <div></div>
    );
}

export { File };