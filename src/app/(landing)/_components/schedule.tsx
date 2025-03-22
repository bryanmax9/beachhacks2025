import React from "react";
import "./schedule.css";

const scheduleData = [
  {
    day: "Saturday 3/22",
    events: [
      { time: "9:00 AM - 10:00 AM", description: "Check In" },
      { time: "10:00 AM - 10:30 AM", description: "Opening Ceremony" },
      {
        time: "10:30 AM",
        description: "Hacking Begins! Good luck and have fun :)",
      }, {
        time: "10:30 AM - 10:45 AM",
        description: "Team-Matching",
      },
      {
        time: "10:45 AM - 11:45 AM",
        description: "Patient Safety 101 Workshop",
      },
      {
        time: "12:00 PM - 1:00 PM",
        description: "DAIN AI Workshop",
      },

      { time: "1:00 PM - 1:30 PM", description: "Lunch" },
      { time: "1:30 PM - 2:30 PM", description: "GitHub Workshop" },
      {
        time: "2:00 PM - 4:00 PM",
        description:
          "Cyber Competition-cyber security  booth, check out anytime in between for the competition.",
      },
      { time: "2:45 PM - 3:45 PM", description: "API Workshop" },
      { time: "4:00 PM - 5:00 PM", description: "Google Workshop" },
      { time: "5:15 PM - 6:15 PM", description: "AI w/ Startup Founder" },
      {
        time: "6:30 PM - 7:30 PM",
        description: "Dinner & Cybersecurity Workshop",
      },
      { time: "7:30 PM - 8:30 PM", description: "AI Club Workshop" },
      { time: "9:00 PM - 10:00 PM", description: "VR Club Workshop" },
      { time: "10:30 PM - 11:30 PM", description: "LeetCode Competition" },
    ],
  },
  {
    day: "Sunday 3/23",
    events: [
      { time: "7:00 AM - 8:00 AM", description: "Breakfast" },
      { time: "*10:30 AM", description: "Submission Hard Deadline" },
      { time: "11:00 AM - 12:30 PM", description: "Judging" },
      { time: "12:30 PM - 1:00 PM", description: "Closing Ceremony" },
    ],
  },
];

const Schedule = () => {
  return (
    <div id="schedule" className="schedule-background">
      <div className="schedule-container">
        <h1 className="schedule-header">Event Schedule</h1>
        {scheduleData.map((dayItem) => (
          <div className="schedule-day" key={dayItem.day}>
            <h2 className="schedule-day-title">{dayItem.day}</h2>
            <ul className="schedule-events">
              {dayItem.events.map((event, index) => (
                <li className="schedule-event" key={index}>
                  <span className="event-time">{event.time}</span>
                  <span className="event-description">{event.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
