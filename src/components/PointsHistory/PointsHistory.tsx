import "./PointsHistory.scss";
import Paper from "@mui/material/Paper";
import { PointsHistoryData } from "../../types/PointsHistoryData";
import { PointsHistoryElement } from "../PointsHistoryElement";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type Props = {
    history: PointsHistoryData[]
}

const PointsHistory = (props: Props): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Points</TableCell>
                        <TableCell align="right">Activity type</TableCell>
                        <TableCell align="right">Activity name</TableCell>
                        <TableCell align="right">Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.history.map(el => (
                        <PointsHistoryElement
                            key={el.id}
                            id={el.id}
                            points={el.points}
                            activity_type={el.activity_type}
                            activity_name={el.activity_name}
                            timestamp={el.timestamp}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { PointsHistory };