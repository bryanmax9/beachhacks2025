"use client";

import React, { useEffect, useState } from "react";
import { updateUserAcceptanceStatus } from "@/(api)/userApplicationServices";

export default function SetUserAcceptance() {
    const [selected, setSelected] = useState<string|null>(null);
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>,uuid: string) => {
        event.preventDefault();
        // only submit if admin chose a valid option
        if(selected==null) return;

        await updateUserAcceptanceStatus(uuid, selected);
        console.log(uuid, selected);
    }
    useEffect(()=>{
        console.log(selected);
    },[selected])
    return (
    <div >
        <form className="flex flex-col w-fit"
        onSubmit={(e)=>handleSubmit(e,"061f8aef-a6f5-4218-b16c-3e5978f01442")}>
        <label>
            <input type="radio" onChange={() => setSelected("ACCEPTED")} name="acceptance"/>
            ACCEPTED
        </label>
        <label>
            <input type="radio" onChange={() => setSelected("DECLINED")} name="acceptance"/>
            DECLINED
        </label>
        <label>
            <input type="radio" onChange={() => setSelected("WAITLISTED")} name="acceptance"/>
            WAITLISTED
        </label>
        <button className="bg-blue-500" type="submit" >submit</button>
        </form>
    </div>
    )
}