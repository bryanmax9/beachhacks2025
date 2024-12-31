import PrizeWidget from "./prize_widget"
import test from "../_images/profilepic.png"
export default function Prizes() {
    return (
        <div>
            <h1 className="font-bold text-5xl text-center">$100000</h1>
            <div className="flex gap-10">
                <PrizeWidget name="sony headphonesw" image={test}/>
            </div>
        </div>
    )
}