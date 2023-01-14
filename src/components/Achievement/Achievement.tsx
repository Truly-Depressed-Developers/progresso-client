import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Avatar } from '@mui/material';

type Props = {
    iconUrl: string
}

export const Achievement = (props: Props): JSX.Element => {
    return <div className="achievement">
        <img src={props.iconUrl} />
    </div>
}