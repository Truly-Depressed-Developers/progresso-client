import "./SkillMeter.scss";

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { BorderLinearProgress } from '../BorderLinearProgress';
import { Typography } from '@mui/material';

type Props = {
    value: number,
    maxValue: number,
    name: string
};

export const SkillMeter = (props: Props): JSX.Element => {
    return (
        <div className="skill-meter">
            <Typography variant="subtitle1">{props.name}</Typography>
            <div className='progress-bar'>
                <BorderLinearProgress
                    style={{ width: "calc(100% - 56px)" }}
                    variant='determinate'
                    value={props.value / props.maxValue * 100}
                />
                <Typography variant="body1">{props.value}XP</Typography>
            </div>
        </div>
    );
}  