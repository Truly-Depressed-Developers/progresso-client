import "./AdBanner.scss";

type Props = {
    mode: "vertical" | "horizontal",
    size: number,
    src: string
};

const AdBanner = ({ mode, size, src }: Props): JSX.Element => {
    return (
        <img
            style={mode === "vertical" ?
                { width: size } :
                { height: size }
            }
            src={src}
        />
    );
}

export { AdBanner };