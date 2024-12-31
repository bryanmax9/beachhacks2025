"use client";

const Sponsors = () => {
  const conveyorAnimation = `
    @keyframes submarine {
      0% { transform: translateX(155%); }
      100% { transform: translateX(-135%); }
    }
  `;

  return (
    <section className="sponsors-section">
      <link
        href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap"
        rel="stylesheet"
      />
      <style>{conveyorAnimation}</style>
      <div
        className="sponsors-header text-center text-5xl font-bold drop-shadow-md mb-6"
        style={{ fontFamily: "DynaPuff" }}
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
            src="https://i.imgur.com/raG2UgV.png"
            alt="Submarine"
            className="w-auto h-full"
          />
          <div
            className="sponsor mx-4 w-[128px] h-[125px] rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "15%",
              transform: "translate(14%, 21%)",
            }}
          >
            <img
              src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
              alt="Sponsor-1-Google"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-[128px] h-[125px] rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "30%",
              transform: "translate(8%, 21%)",
            }}
          >
            <img
              src="https://i.imgur.com/C9ZOPur.png"
              alt="Sponsor 2"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-[128px] h-[125px] rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "45%",
              transform: "translate(0%, 21%)",
            }}
          >
            <img
              src="https://img.uxcel.com/tags/balsamiq-1690452164916-2x.jpg"
              alt="Sponsor 3"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-[128px] h-[125px] rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "60%",
              transform: "translate(-5%, 21%)",
            }}
          >
            <img
              src="https://i.imgur.com/CIZvFIn.png"
              alt="Sponsor 4"
              className="w-full h-full object-contain"
              style={{ transform: "scale(1.879" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
