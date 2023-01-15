import { Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { quizData } from '../../types/Quizes';

import "./QuizTile.scss"

type Props = quizData;

const QuizTile = (props: Props): JSX.Element => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/quiz/${props.id}/take`);
    }

    return (
        <Paper onClick={onClick} className="quizTile" elevation={3}>
            <div className='quizTileTitle'>
                {props.name}
            </div>
            <div className='quizTileGo'>&gt;</div>
        </Paper>
    );
};

export { QuizTile }; 