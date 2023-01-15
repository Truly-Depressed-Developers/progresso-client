import { Achievement } from "./Achievement"
import { Skill } from "./Skill"

export type UserProfileResponse = {
    single: {
        username: string,
        title: string,
        bio: string,
        profile_photo_id: string
    }[],
    skills: Skill[],
    achievements: Achievement[]
}