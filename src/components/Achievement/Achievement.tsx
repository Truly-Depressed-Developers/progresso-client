import './Achievement.scss';
import { Tooltip } from '@mui/material';
import { Fragment, } from 'react';
import { HtmlTooltip } from '../../components/HtmlTooltip';
import Typography from '@mui/material/Typography';

type Props = {
    iconUrl: string,
    name: string,
    description: string,
}

export const Achievement = (props: Props): JSX.Element => {
    return (
        <HtmlTooltip
            title={
                <Fragment>
                    <Typography className="achievement-tooltip-name">{props.name}</Typography>
                    <span className='achievement-tooltip-description'>{props.description}</span>
                </Fragment>
            }
        >
            <div className="achievement">
                <img src={props.iconUrl} />
            </div>
        </HtmlTooltip>
    )
}