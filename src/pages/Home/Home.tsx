import { Typography } from "@mui/material";
import "./Home.scss";

type Props = {}

const Home = (props: Props): JSX.Element => {
    return (
        <div id="home">
            <div>

                <Typography
                    variant="h1"
                >
                    Progresso
                </Typography>

                <br />

                <Typography
                    variant="h5"
                >
                    &lt;BITEhack&gt; (Edycja V, 2023)
                </Typography>
            </div>
        </div>
    );
}

export { Home };