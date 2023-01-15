import { Alert, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Settings } from '../../settings';

import "./QuestionAdd.scss";

type Props = {};

const QuestionAdd = (props: Props): JSX.Element => {
    const { id } = useParams();

    const [question, setQuestion] = useState("");
    const [asnwerCount, setAnswerCount] = useState(3);
    const [answers, setAnswers] = useState<string[]>(["", "", ""]);

    const validQuestion = useMemo(() => question.length >= 3, [question]);
    const validAnswerCount = useMemo(() => asnwerCount >= 3, [asnwerCount]);
    const validAnswers = useMemo(() => answers.map(a => a.length > 0), [answers]);

    const validForm = useMemo(() => validQuestion && validAnswerCount && validAnswers.every(p => p), [validQuestion, validAnswerCount, validAnswers]);

    useEffect(() => {
        const l = answers.length;
        const d = asnwerCount - l;

        if (d > 0) {
            setAnswers([...answers, ...new Array(d).fill("")]);
        } else if (d < 0) {
            setAnswers([...answers.filter((_, i) => i < asnwerCount)]);
        }
    }, [asnwerCount]);

    const onSubmit = useCallback(() => {
        if (validForm === false) {
            return;
        }

        const data = new URLSearchParams();
        data.append("quiz_id", id?.toString() || "0");
        data.append("question", question);

        answers.forEach((a, i) => {
            if (i === 0) { return; }
            data.append("answer", a);
        })

        data.append("correctAnswer", answers[0]);

        fetch(Settings.serverUrl + "addWholeQuestion", { method: "POST", body: data });
    }, [validForm]);

    if (id === undefined) {
        return (
            <Paper elevation={2} id="question-add">
                Quiz does not exist
            </Paper>
        )
    }

    return (
        <Paper elevation={2} id="question-add">
            <TextField
                className='input'
                value={question}
                onChange={(e) => {
                    setQuestion(e.target.value);
                }}
                error={validQuestion === false}
                multiline={true}
                maxRows={4}
                label="Question"
                variant="outlined"
                required={true}
            />

            <TextField
                className='input spacer'
                value={asnwerCount}
                onChange={(e) => {
                    setAnswerCount(parseInt(e.target.value));
                }}
                error={validAnswerCount === false}
                type="number"
                label="Question count"
                variant="outlined"
                required={true}
            />

            {answers.map((a, index) => {
                let i = index;

                return <TextField
                    key={i}
                    className='input'
                    value={answers[i]}
                    onChange={(e) => {
                        setAnswers([...answers.map((a, index) => index === i ? e.target.value : a)])
                    }}
                    error={validAnswers[i] === false}
                    label={(i === 0 ? "Correct" : "Incorrect") + " answer"}
                    variant="outlined"
                    required={true}
                />
            }
            )}

            <Button
                className='button'
                onClick={onSubmit}
                variant="contained"
                disabled={validForm === false}
            >Create</Button>
        </Paper>
    );
};

export { QuestionAdd };