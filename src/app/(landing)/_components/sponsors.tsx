"use client";

const Sponsors = () => {
  const conveyorAnimation = `
    @keyframes submarine {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
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
            src="https://i.imgur.com/E19UZDm.png"
            alt="Submarine"
            className="w-auto h-full"
            style={{ height: "500px" }}
          />
          <div
            className="sponsor mx-4 w-30 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "15%",
              transform: "translate(-175%, 223%)",
            }}
          >
            <img
              src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
              alt="Sponsor-1-Google"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "30%",
              transform: "translate(-255%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 2"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "45%",
              transform: "translate(-337%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 3"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "60%",
              transform: "translate(-417%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 4"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "75%",
              transform: "translate(-500%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 5"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "90%",
              transform: "translate(-580%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 6"
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="sponsor mx-4 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "90%",
              transform: "translate(-356%, 223%)",
            }}
          >
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Sponsor 7"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
