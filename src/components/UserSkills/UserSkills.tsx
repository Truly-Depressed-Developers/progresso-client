import "./UserSkills.scss";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { SkillMeter } from "../SkillMeter";
import { Skill } from "../../types/Skill";

type Props = { skills: Skill[] }

const UserSkills = (props: Props): JSX.Element => {
    const maxValue = Math.max(...props.skills.map(s => s.points));
    console.log("aaa", props.skills.map(s => s.id))
    return (
        <Paper
            id="user-skills"
            elevation={2}
        >
            <Typography className="user-skills-header" variant="h5" >Skills</Typography>

            {props.skills.sort((a, b) => b.points - a.points).map(s => <SkillMeter key={s.id} value={s.points} maxValue={maxValue} name={s.name} />)}
        </Paper>
    );
}

export { UserSkills };