import "./User.scss";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Settings } from "../../settings";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { UserAvatar } from "../../components/UserAvatar";
import { UserBio } from "../../components/UserBio";
import { UserSkills } from "../../components/UserSkills";
import { UserAchievements } from "../../components/UserAchievements";
import { UserProfileResponse } from "../../types/UserProfileResponse";
import { PointsHistory } from "../../components/PointsHistory";



type Props = {}

const User = (props: Props): JSX.Element => {
    const { id } = useParams();

    const [profileData, setProfileData] = useState<UserProfileResponse | null>(null);

    useEffect(() => {
        (async () => {
            const fd = new URLSearchParams();
            fd.append("id", id?.toString() || "0");

            const result = await fetch(Settings.serverUrl + "getUserData?username=" + id, { method: "GET" });
            const data = (await result.json()).data as UserProfileResponse;

            console.log(data);

            if (data === undefined) {
                return;
            }


            setProfileData(data);
        })();
    }, []);

    return (
        <div id="profile">
            {profileData === null ?
                <Typography variant="body1">User not found</Typography> :
                <div id="profile-container">
                    <div id="top-panels">
                        <div>
                            <UserAvatar
                                username={profileData.single[0].username}
                                title={profileData.single[0].title}
                                photo_url_id={profileData.single[0].profile_photo_id}
                            />
                            <UserBio
                                bio={profileData.single[0].bio}
                            />
                        </div>

                        <div>
                            <UserSkills
                                skills={profileData.skills}
                            />
                            <UserAchievements
                                achievements={profileData.achievements}
                            />
                        </div>
                    </div>
                    <div id="points-history">
                        <PointsHistory
                            history={profileData.points_history}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export { User };