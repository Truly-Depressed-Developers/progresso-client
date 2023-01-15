import "./User.scss";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { UserAvatar } from "../../components/UserAvatar";
import { UserBio } from "../../components/UserBio";
import { UserSkills } from "../../components/UserSkills";
import { UserAchievements } from "../../components/UserAchievements";



type Props = {}

const User = (props: Props): JSX.Element => {
    const { id } = useParams();

    return (
        <div id="profile">
            <div id="profile-container">
                <div>
                    <UserAvatar />
                    <UserBio />
                </div>

                <div>
                    <UserSkills />
                    <UserAchievements />
                </div>
            </div>
        </div>
    );
}

export { User };