import "./UserAchievements.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { BorderLinearProgress } from "../BorderLinearProgress/BorderLinearProgress";
import { SkillMeter } from "../SkillMeter";
import { Skill } from "../../types/Skill";
import { Achievement } from "../Achievement";

type Props = {}

const UserAchievements = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-skills"
            elevation={2}
        >
            <Typography className="user-achievements-header" variant="h5" >Achievements</Typography>

            <div className="achievements-container">
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
                <Achievement
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/000080_Navy_Blue_Square.svg/2048px-000080_Navy_Blue_Square.svg.png"
                />
            </div>

        </Paper>
    );
}

export { UserAchievements };