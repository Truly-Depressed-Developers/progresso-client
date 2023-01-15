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

    const [result, setResult] = useState<null | boolean>(null);
    const [msg, setMsg] = useState("");

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
        setAnswers([...Array(quizData?.questions?.length).fill(-1)]);
    }, [quizData]);

    const onSubmit = useCallback(() => {
        (async () => {
            const dt = new URLSearchParams();
            dt.append("id", userID);
            dt.append("quiz_id", id?.toString() || "0");

            answers.forEach(a => {
                dt.append("ids", a.toString());
            });

            const response = await fetch(Settings.serverUrl + "evaluateQuiz", { method: "POST", body: dt });
            const data = await response.json();

            if (data.correct === 1) {
                setResult(true);
                setMsg(data.description);
            } else {
                setResult(false);
            }

        })();
    }, [validQuiz, answers]);

    if (quizData === null) {
        return <Paper elevation={2} id="quiz-take">
            Quiz does not exist.
        </Paper>
    }

    if (!quizData.questions) {
        return (
            <Paper elevation={2} id="quiz-take">
                <Typography className='spacer' variant='body1'>Ten quiz nie ma pytań</Typography>
            </Paper>
        );
    }

    const Q = quizData.questions[selectedQuestion - 1];
    const A = quizData.answers[Q.id];
    const ans = answers[selectedQuestion - 1];

    if (result === true) {
        return <Paper elevation={2} id="quiz-take">
            {msg}
        </Paper>
    }

    if (result === false) {
        return <Paper elevation={2} id="quiz-take">
            You've made a mistake, better luck next time!
        </Paper>
    }

    return (
        <Paper elevation={2} id="quiz-take">
            <Typography className='spacer' variant='body1'>{Q.question}</Typography>

            <FormControl>
                <RadioGroup
                    name="radio-buttons-group"
                    onChange={(e) => setAnswers([...answers.map((a, index) => index === (selectedQuestion - 1) ? parseInt(e.target.value) : a)])}
                >
                    {A.map(a => <FormControlLabel key={a.id} value={a.id} control={<Radio />} label={a.answer} checked={a.id === ans} />)}
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