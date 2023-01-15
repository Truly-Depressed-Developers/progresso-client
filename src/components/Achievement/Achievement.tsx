import './Achievement.scss';
import { Tooltip } from '@mui/material';

type Props = {
    iconUrl: string,
    description: string,
}

export const Achievement = (props: Props): JSX.Element => {
    return (
        <Tooltip
            title={
                <span className='achievement-tooltip'>{props.description}</span>
            }
        >
            <div className="achievement">
                <img src={props.iconUrl} />
            </div>
        </Tooltip>
    )
}