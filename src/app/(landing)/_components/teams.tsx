import TeamWidget from "./team_widget"
import pfp from "../_images/profilepic.png"
export default function TeamsComponent() {
    return(
        <div className="flex flex-wrap gap-x-16 gap-y-10 justify-center align-center items-center mt-1">
            <TeamWidget name="first last" role="dev" image={pfp}/>
        </div>
    )
}