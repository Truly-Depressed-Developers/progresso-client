import { Icon, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { quizData } from '../../types/Quizes';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import "./QuizTile.scss"

type Props = quizData;

const QuizTile = (props: Props): JSX.Element => {

    const navigate = useNavigate();

    const takeQuiz = () => {
        navigate(`/quiz/${props.id}/take`);
    }

    const editQuiz = () => {
        navigate(`/quiz/${props.id}/add`);
    }

    return (
        <Paper className="quizTile" elevation={2}>
            <div>
                {props.name}
            </div>
            <div>
                <Icon onClick={() => editQuiz()} component={CreateIcon} />
                <Icon onClick={() => takeQuiz()} component={PlayCircleIcon} />
            </div>
        </Paper>
    );
};

export { QuizTile }; 