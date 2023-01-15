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
import { Achievement as AchievementData } from "../../types/Achievement";

type Props = {
    achievements: AchievementData[]
}

const UserAchievements = (props: Props): JSX.Element => {
    return (
        <Paper
            id="user-skills"
            elevation={2}
        >
            <Typography className="user-achievements-header" variant="h5" >Achievements</Typography>

            <div className="achievements-container">
                {
                    props.achievements.map(a =>
                        <Achievement
                            key={a.id}
                            iconUrl={Settings.serverUrl + "static/" + a.photo_url}
                            name={a.name}
                            description={a.description}
                        />)
                }
            </div>

        </Paper>
    );
}

export { UserAchievements };