import { Alert, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Settings } from '../../settings';
import { QuizCategory } from '../../types/QuizCategory';

import "./QuizAdd.scss";

type Props = {};

const QuizAdd = (props: Props): JSX.Element => {
    const [categories, setCategories] = useState<QuizCategory[]>([]);
    const [category, setCategory] = useState(1);
    const [name, setName] = useState("");
    const [questionCount, setQuestionCount] = useState(10);
    const [reward, setReward] = useState(5);

    const validSkill = useMemo(() => category > 0 && category <= categories.length, [category, categories]);
    const validName = useMemo(() => name.length >= 3, [name]);
    const validQuestionCount = useMemo(() => questionCount >= 3, [questionCount]);
    const validReward = useMemo(() => reward >= 1, [reward]);

    const validForm = useMemo(() => validSkill && validName && validQuestionCount && validReward, [validSkill, validName, validQuestionCount, validReward]);

    const onSubmit = useCallback(() => {
        if (validForm === false) {
            return;
        }

        const data = new URLSearchParams();
        data.append("skill_id", category.toString());
        data.append("name", name);
        data.append("questionCount", questionCount.toString());
        data.append("reward", reward.toString());

        fetch(Settings.serverUrl + "addQuiz", { method: "POST", body: data });

        setCategory(1);
        setName("");
        setQuestionCount(0);
        setReward(0);
    }, [validForm]);

    useEffect(() => {
        (async () => {
            const response = await fetch(Settings.serverUrl + "getCategories", { method: "GET" })
            const data = (await response.json()).data as QuizCategory[];

            console.log(data);

            if (data === undefined) {
                return;
            }

            setCategories(data);
        })();
    }, []);

    if (categories.length === 0) {
        return <Paper elevation={2} id="quiz-add" />
    }

    return (
        <Paper elevation={2} id="quiz-add">
            <TextField
                className='input'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                error={validName === false}
                label="Quiz name"
                variant="outlined"
                required={true}
            />

            <TextField
                className='input'
                value={questionCount}
                onChange={(e) => {
                    setQuestionCount(parseInt(e.target.value));
                }}
                error={validQuestionCount === false}
                type="number"
                label="Question count"
                variant="outlined"
                required={true}
            />

            <TextField
                value={category}
                label="Skill"
                variant='outlined'
                className='input'
                select={true}
                error={validSkill === false}
                onChange={(e) => setCategory(typeof e.target.value === "string" ? parseInt(e.target.value) : e.target.value)}
            >
                {categories.map(c =>
                    <MenuItem key={c.id + c.name} value={c.id}>{c.name}</MenuItem>
                )}
            </TextField>

            <TextField
                className='input'
                value={reward}
                onChange={(e) => {
                    setReward(parseInt(e.target.value));
                }}
                error={validReward === false}
                type="number"
                label="Reward"
                variant="outlined"
                required={true}
            />

            <Button
                className='button'
                onClick={onSubmit}
                variant="contained"
                disabled={validForm === false}
            >Create</Button>
        </Paper>
    );
};

export { QuizAdd };