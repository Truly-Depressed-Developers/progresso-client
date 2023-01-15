import { Box, Paper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Settings } from '../../settings';
import { categoriesData, categoriesDataRes, LeaderboardAllSumData, LeaderboardAllSumDataRes, LeaderboardOneCatData, LeaderboardOneCatDataRes } from '../../types/Leaderboards';

import "./Leaderboard.scss";

type Props = {};

const Leaderboard = (props: Props) => {

    const [leaderboardData, setLeaderboardData] = useState<LeaderboardAllSumData[] | LeaderboardOneCatData[]>([]);
    const [categories, setCategories] = useState<categoriesData[]>([]);

    const [categoryID, setCategoryID] = useState(-1);

    useEffect(() => {
        (async () => {
            const response = await fetch(Settings.serverUrl + "skillLeaderboardSumAllSkills");
            const data = (await response.json()) as LeaderboardAllSumDataRes;

            console.log(data);
            setLeaderboardData(data.data);

            const response2 = await fetch(Settings.serverUrl + "getCategories");
            const data2 = (await response2.json()) as categoriesDataRes;

            console.log(data2);
            setCategories(data2.data);
        })()
    }, []);

    const onChangeLeaderboardData = async (newValue: number) => {
        if (newValue == -1) {
            const response = await fetch(Settings.serverUrl + "skillLeaderboardSumAllSkills");
            const data = (await response.json()) as LeaderboardAllSumDataRes;

            console.log(data);
            setLeaderboardData(data.data);
        } else {
            const response = await fetch(Settings.serverUrl + "skillLeaderboardBySkill?skill_id=" + newValue);
            const data = (await response.json()) as LeaderboardOneCatDataRes;

            console.log(data);
            setLeaderboardData(data.data);
        }
    }

    const onTab = (event: React.SyntheticEvent, newValue: number) => {
        setCategoryID(newValue);
        onChangeLeaderboardData(newValue);
    };

    return (
        <div id="leaderboard">
            <Box className="tabBox" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={categoryID} onChange={onTab} aria-label="basic tabs example" variant='scrollable'>
                    <Tab value={-1} label="All" />
                    {categories.map((e, i) => <Tab value={e.id} label={e.name} key={e.id} />)}
                </Tabs>
            </Box>
            <Paper className="leaderPaper" elevation={5}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Lp.</TableCell>
                            <TableCell align='center'>Nickname</TableCell>
                            <TableCell align='center'>Points</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {leaderboardData.map((e, i) => <TableRow key={`row_${i}`} className={i % 2 == 0 ? "color" : ""}>
                            <TableCell scope='row'>{i + 1}</TableCell>
                            <TableCell align='center'>{e.username}</TableCell>
                            <TableCell align='center'>{e.points}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export { Leaderboard };