import React, { useEffect, useState } from 'react';
import { QuizTile } from '../../components/QuizTile';
import { Settings } from '../../settings';
import { GetQuizesData, quizData } from '../../types/Quizes';

import "./Quizes.scss";

type Props = {};

const Quizes = (props: Props): JSX.Element => {

    const [quizList, setQuizList] = useState<quizData[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(Settings.serverUrl + "getQuizes");
            const data = (await response.json()) as GetQuizesData;

            console.log(data);

            setQuizList(data.data);
        })()
    }, []);

    return (
        <div id="quizes">
            <div className="quizList">
                {quizList.map(e => <QuizTile id={e.id} name={e.name} key={e.id} />)}
            </div>
        </div>
    );
};

export { Quizes };