import { Button, FormControl, FormControlLabel, Pagination, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useGlobalContext } from '../../Provider';
import { Settings } from '../../settings';
import { TakeQuizResponse } from '../../types/TakeQuizResponse';

import "./TakeQuiz.scss";

type Props = {};

const TakeQuiz = (props: Props): JSX.Element => {
    const { id } = useParams();

    const { userID } = useGlobalContext();

    const [quizData, setQuizData] = useState<TakeQuizResponse | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState(1);

    const validQuiz = useMemo(() => answers.length > 0 && answers.every(a => a !== -1), [answers]);

    useEffect(() => {
        (async () => {
            const response = await fetch(Settings.serverUrl + "getCompleteQuiz?id=" + id);
            const data = await response.json();

            console.log(data);

            setQuizData(data);
        })()
    }, []);

    useEffect(() => {
        setAnswers([...Array(quizData?.questions.length).fill(-1)]);
    }, [quizData]);

    const onSubmit = useCallback(() => {
        (async () => {
            const data = new URLSearchParams();
            data.append("id", userID);
            data.append("quiz_id", id?.toString() || "0");

            answers.forEach(a => {
                data.append("ids", a.toString());
            });

            const response = await fetch(Settings.serverUrl + "evaluateQuiz", { method: "POST", body: data });
        })();
    }, [validQuiz, answers]);

    if (quizData === null) {
        return <Paper elevation={2} id="quiz-take">
            Quiz does not exist.
        </Paper>
    }

    const Q = quizData.questions[selectedQuestion - 1];
    const A = quizData.answers[Q.id];
    const ans = answers[selectedQuestion - 1];

    return (
        <Paper elevation={2} id="quiz-take">
            {answers}
            <Typography className='spacer' variant='body1'>{Q.question}</Typography>

            <FormControl>
                <RadioGroup
                    name="radio-buttons-group"
                    onChange={(e) => setAnswers([...answers.map((a, index) => index === (selectedQuestion - 1) ? parseInt(e.target.value) : a)])}
                >
                    {A.map(a => <FormControlLabel key={a.id} value={a.id} control={<Radio />} label={a.id} checked={a.id === ans} />)}
                </RadioGroup>
            </FormControl>

            <Button
                className='button spacer both'
                onClick={onSubmit}
                variant="contained"
                disabled={validQuiz === false}
            >Submit</Button>

            <Pagination
                count={quizData.questions.length}
                defaultPage={1}
                onChange={(_, p) => setSelectedQuestion(p)}
            />
        </Paper>
    );
};

export { TakeQuiz };