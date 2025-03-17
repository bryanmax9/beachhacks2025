import { dynaPuff } from "@/assets/fonts";
import { cn } from "@/lib/utils";

export default function Schedule() {
  const schedule = [
    {
      day: "Saturday 3/22", events: [
        { time: "*9:00 AM - 10:00 AM", event: "Check in" },
        { time: "10:00 AM - 10:30 AM", event: "Opening Ceremony" },
        { time: "*10:30 AM", event: "Hacking Begins! Good luck and have fun :)" },
        { time: "10:45 AM	- 11:45 AM", event: "Patient Safety Workshop" },
        { time: "12:00 PM -	1:00 PM", event: "Dain AI Workshop" },
        { time: "1:00 PM - 1:30 PM", event: "Lunch" },
        { time: "1:30 PM - 2:30 PM", event: "GitHub Workshop" },
        { time: "2:45 PM - 3:45 PM", event: "API Workshop" },
        { time: "4:00 PM - 5:00 PM", event: "Google Workshop" },
        { time: "5:15 PM - 6:15 PM", event: "AI w/ Startup Founder" },
        { time: "6:30 PM - 7:30 PM", event: "Dinner & Cybersecurity Workshop" },
        { time: "7:30 PM - 8:30 PM", event: "AI Club Workshop" },
        { time: "9:00 PM - 10:00 PM", event: "VR Club Workshop" },
        { time: "10:30 PM - 11:30 PM", event: "LeetCode Competition" },
      ]
    },
    {
      day: "Sunday 3/23", events: [
        { time: "7:00 AM - 8:00 AM", event: "Breakfast" },
        { time: "*10:00 AM - 11:00 AM", event: "Project Submissions" },
        { time: "11:00 AM - 12:30 PM", event: "Judging" },
        { time: "12:30 PM - 1:00 PM", event: "Closing Ceremony" }
      ]
    }
  ];

  return (
    <div className="mb-10 p-5 text-center"  >
      {schedule.map((day, index) => (
        <div key={index} className="day-schedule mb-20">
          <h3
            className={cn(
              `text-5xl font-semibold text-center mb-8 text-gray-800`,
              dynaPuff.className
            )}>{day.day}</h3>
          <ul>
            {day.events.map((event, i) => (
              <li key={i} className="text-2xl my-1">
                <strong>{event.time}</strong>: {event.event}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
