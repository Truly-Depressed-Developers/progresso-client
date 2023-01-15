import "./PointsHistoryElement.scss";
import { TableCell, TableRow } from "@mui/material";
import { PointsHistoryData } from "../../types/PointsHistoryData";

type Props = PointsHistoryData

const PointsHistoryElement = (props: Props): JSX.Element => {
    return (
        <TableRow
            key={props.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" align="center">
                {props.points}
            </TableCell>
            <TableCell align="center">{props.skill}</TableCell>
            <TableCell align="center">{props.activity_type}</TableCell>
            <TableCell align="center">{props.activity_name}</TableCell>
            <TableCell align="center">{new Date(props.timestamp).toLocaleString()}</TableCell>
        </TableRow>
    );
}

export { PointsHistoryElement };