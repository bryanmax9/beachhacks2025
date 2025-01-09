"use client";

import {cn} from "@/lib/utils";
import {dynaPuff} from "@/assets/fonts";

const Sponsors = () => {
  const conveyorAnimation = `
    @keyframes submarine {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <section className="sponsors-section">

      <style>{conveyorAnimation}</style>
      <div className={cn("sponsors-header text-center text-5xl font-bold drop-shadow-md mb-6", dynaPuff.className)}
      >
        <div className="inline-block px-6 py-2 bg-white/15 backdrop-blur-md rounded-full">
          <h2>Our Sponsors</h2>
        </div>
      </div>

      <div
        className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative"
        style={{ height: "600px" }}
      >
        <div
          className="submarine absolute flex items-center"
          style={{ animation: "submarine 20s linear infinite" }}
        >
          <img
            src="https://i.imgur.com/QBqZrF8.png"
            alt="Submarine"
            className="w-auto h-full"
          />
          <div
            className="sponsor w-[108px] h-[105px] rounded-full overflow-hidden flex items-center justify-center bg-white border-[10px]"
            style={{
              position: "absolute",
              top: "50%",
              left: "15%",
              transform: "translate(150%, 35%)",
              borderColor: "#BEBEBE",
            }}
          >
            <img
              src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
              alt="Sponsor-1-Google"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor w-[108px] h-[105px] rounded-full overflow-hidden flex items-center justify-center bg-white border-[10px]"
            style={{
              position: "absolute",
              top: "50%",
              left: "30%",
              transform: "translate(90%, 35%)",
              borderColor: "#BEBEBE",
            }}
          >
            <img
              src="https://i.imgur.com/C9ZOPur.png"
              alt="Sponsor-2-Wolfram"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor w-[108px] h-[105px] rounded-full overflow-hidden flex items-center justify-center bg-white border-[10px]"
            style={{
              position: "absolute",
              top: "50%",
              left: "45%",
              transform: "translate(30%, 35%)",
              borderColor: "#BEBEBE",
            }}
          >
            <img
              src="https://img.uxcel.com/tags/balsamiq-1690452164916-2x.jpg"
              alt="Sponsor-3-Balsamiq"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor w-[108px] h-[105px] rounded-full overflow-hidden flex items-center justify-center bg-white border-[10px]"
            style={{
              position: "absolute",
              top: "50%",
              left: "60%",
              transform: "translate(-30%, 35%)",
              borderColor: "#BEBEBE",
            }}
          >
            <img
              src="https://i.imgur.com/CIZvFIn.png"
              alt="Sponsor 4"
              className="w-full h-full object-contain"
              style={{ transform: "scale(1.879)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
