import "./UserSkills.scss";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { BorderLinearProgress } from "../BorderLinearProgress/BorderLinearProgress";
import { SkillMeter } from "../SkillMeter";
import { Skill } from "../../types/Skill";

type Props = {}

const skills: Skill[] = [
    { name: "Opierdalanie się", value: 25 },
    { name: "Prokrastynacja", value: 17 },
    { name: "Clean code", value: 5 },
    { name: "Zarządzanie czasem", value: 15 },
    { name: "Bycie kreatywnym", value: 1 },
]

const UserSkills = (props: Props): JSX.Element => {
    const maxValue = Math.max(...skills.map(s => s.value));

    return (
        <Paper
            id="user-skills"
            elevation={2}
        >
            <Typography className="user-skills-header" variant="h5" >Skills</Typography>

            {skills.sort((a, b) => b.value - a.value).map(s => <SkillMeter key={s.name} value={s.value} maxValue={maxValue} name={s.name} />)}
        </Paper>
    );
}

export { UserSkills };