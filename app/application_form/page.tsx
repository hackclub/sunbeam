import "../globals.css";

export default function ApplicationForm() {
  return (
    <div
      className="overflow-x-hidden"
      style={{
        backgroundImage: 'url("/imgs/sand.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* water + foam */}
      <div className="">
        <div className="absolute inset-0 h-[33vh] overflow-hidden">
          <img
            src="/imgs/water.png"
            className="w-full h-full object-cover object-bottom animate-[2s_infinite_alternate_ease-in-out_waveShift]"
            alt=""
          />
        </div>

        <img
          src="/imgs/foam.png"
          className="absolute bottom-[50vh] left-[0vw] z-5 w-[100vw] animate-[2s_infinite_alternate_ease-in-out_waveShift]"
          alt=""
        />
      </div>

      {/* everything else */}
      <div className="absolute top-[50vh] left-[50vw] transform -translate-x-1/2 translate-y-8 w-full">
        <h2 className="text-[50px] text-center galindo text-orange-dark">
          So you want to organize a Sunbeam Social in your city...
        </h2>
        <img
          src="/imgs/next.png"
          alt="Next Button"
          className="mx-auto transform scale-80 duration-200 hover:scale-85 hover:rotate-2 active:scale-75 active:-rotate-5"
        />
      </div>

      <img
        src="/imgs/ray1.png"
        alt=""
        className="absolute bottom-[8vh] right-[10vh] transform scale-140"
      ></img>
    </div>
  );
}

export function PersonalInfo() {
  return (
    <div>
      <h2>Personal Information</h2>
    </div>
  );
}

export function EventDetails() {
  return (
    <div>
      <h2>Event Details</h2>
    </div>
  );
}

export function TechnicalExperience() {
  return (
    <div>
      <h2>Technical Experience</h2>
    </div>
  );
}

export function HackathonExperience() {
  return (
    <div>
      <h2>Event Details</h2>
    </div>
  );
}

export function ThankYou() {
  return (
    <div>
      <h2>Event Details</h2>
    </div>
  );
}
