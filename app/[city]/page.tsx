import { notFound } from "next/navigation";
import Link from "next/link";
import FaqAccordion from "../../components/FaqAccordion";
import TshirtMapTeaser from "../../components/TshirtMapTeaser";

type ScheduleItem = { time: string; event: string };
type Sponsor = { name: string; logo: string };

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityParam = city.replace(/-/g, " ");

  let cityName = cityParam;
  let schedule: ScheduleItem[] = [];
  let sponsors: Sponsor[] = [];
  let loadError = false;

  // notFound() throws internally, so the fetch/status check must stay outside
  // any try/catch here — otherwise a real 404 gets swallowed as a generic error.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/get-city-details?city=${encodeURIComponent(cityParam)}`,
    { cache: "no-store" }
  ).catch((err) => {
    console.error(`[city page] failed to reach get-city-details for "${cityParam}":`, err);
    return null;
  });

  if (res === null) {
    loadError = true;
  } else if (res.status === 404) {
    notFound();
  } else if (!res.ok) {
    console.error(`[city page] get-city-details responded with status ${res.status} for "${cityParam}"`);
    loadError = true;
  } else {
    try {
      const data = await res.json();
      cityName = data.city ?? cityParam;
      schedule = Array.isArray(data.schedule) ? data.schedule : [];
      sponsors = Array.isArray(data.sponsors) ? data.sponsors : [];
    } catch (err) {
      console.error(`[city page] failed to parse details for "${cityParam}":`, err);
      loadError = true;
    }
  }

  return (
    <div className="relative bg-[url('/imgs/sandNoFade.webp')] bg-cover bg-center bg-no-repeat">
      {/* ── HERO ── */}
      <div className="relative min-h-[110vh] w-full">
        <div className="absolute inset-0 h-[110vh] overflow-hidden">
          <img
            src="/imgs/water.webp"
            className="w-full h-full object-cover object-bottom"
            alt=""
          />
        </div>

        {/* Shark */}
        <img
          src="/imgs/shark1.webp"
          className="absolute top-[-2vh] left-[2.5vw] z-10 w-[30vw] md:w-[17.5vw]"
          alt=""
        />

        {/* Foam wave */}
        <img
          src="/imgs/foam-fixed.png"
          className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full"
          alt=""
        />

        <div className="flex flex-col relative z-5">
          {/* Logo + video */}
          <div className="relative w-[80vw] mx-auto flex flex-col md:flex-row mt-[5vh] mb-[1vh]">
            <img
              src="/imgs/logo.svg"
              className="w-[80vw] md:w-[44vw] mx-auto md:mx-0 md:absolute md:bottom-[-6vh] md:left-0 mb-[3vh] md:mb-0"
              alt="Sunbeam"
            />
            {/* Spacer so video sits fully to the right of the logo (desktop only) */}
            <div className="hidden md:block md:w-[44vw] shrink-0" />
            {/* Launch video */}
            <div className="w-full md:w-[36vw] h-[25vh] md:h-[40vh] md:ml-auto rounded-sm overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/Ufmk9QW-XAs"
                title="Sunbeam Social launch video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <h1 className="galindo text-[5vh] leading-[5vh] md:leading-[8vh] text-center gradient-text mt-[1vh]">
            {cityName}
          </h1>

          <h2 className="galindo text-[3vh] px-[5vw] md:px-0 md:text-[4.5vh] text-[#2E599C] text-center mt-[7vh]">
            A social coding event for girls 13-18 around the world
          </h2>
          <h3 className="outfit text-[#0E387A] text-center text-[1.5vh] md:text-[3vh]">
            August 29th, 2026 || 20+ cities worldwide
          </h3>
          <div className="grid grid-cols-1 grid-rows-1">
            <h1 className="row-start-1 col-start-1 galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center pink-outlined-text-drop-shadow mt-[1.5vh]">
              No experience necessary - join today!
            </h1>
            <h1 className="row-start-1 col-start-1 galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center gradient-text mt-[1.5vh]">
              No experience necessary - join today!
            </h1>
          </div>

          <a
            href="https://forms.hackclub.com/sunbeam-signup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
          >
            <img
              src="/imgs/sign-up.webp"
              className="w-[65vw] md:w-[25vw] mx-auto"
              alt="apply!"
            />
          </a>
        </div>
      </div>

      {/* ── HOW-TO ── */}
      <div className="relative min-h-screen w-full pt-[26vh] flex flex-col items-center bg-[url('/imgs/sandNoFade.webp')] bg-cover bg-center">
        {/* sand transition from the foam above */}
        <img
          src="/imgs/sand.webp"
          className="w-full absolute top-0 z-0"
          alt=""
        />
        <img
          src="/imgs/ray1.webp"
          className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw]"
          alt=""
        />

        <div className="flex flex-col relative z-5 items-center justify-center">
          <h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[50vw] leading-[7.5vh] mb-[1vh]">
            What do you do at a Sunbeam Social?
          </h2>

          {/* Three cards */}
          <div className="w-[77.5vw] flex flex-col md:flex-row items-center justify-center gap-[3vw] my-[4vh]">
            <div className="w-full h-[67.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
              <div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
                <img src="/imgs/img1.webp" className="pb-[2vh]" alt="" />
                <h2 className="galindo text-center text-[4vh] text-[#C54390]">
                  SIGN UP
                </h2>
                <p className="outfit text-[2.25vh] text-center text-[#C54390]">
                  Sign up for a Sunbeam social in your area with the link below!
                </p>
              </div>
            </div>
            <div className="w-full h-[75vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
              <div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
                <img src="/imgs/img2.webp" className="pb-[2vh]" alt="" />
                <h2 className="galindo text-center text-[4vh] text-[#2E599C]">
                  TEAM
                </h2>
                <p className="outfit text-[2.25vh] text-center text-[#2E599C]">
                  Join a team of 1-3 people. Come in with your friends or meet
                  new friends at the social! No experience is needed - everyone
                  is welcome!
                </p>
              </div>
            </div>
            <div className="w-full h-[70vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
              <div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
                <img src="/imgs/img3.webp" className="pb-[2vh]" alt="" />
                <h2 className="galindo text-center text-[4vh] text-[#C79713]">
                  FUN!
                </h2>
                <p className="outfit text-[2.25vh] text-center text-[#C79713]">
                  August 29!! Have fun during the event: make friends, enjoy the
                  food/drinks, and learn from workshops!
                </p>
              </div>
            </div>
          </div>

          {/* tshirt & link 2 map */}
          <TshirtMapTeaser />

          {/* license plates */}
          <div className="m-12">
            <div className="flex flex-row flex-wrap m-4 gap-4 justify-center items-center">
              <div className="flex flex-row items-center gap-8">
                <img src="/imgs/plate1.webp" alt="build your project!" className="h-[30vh]" />
                <div className="pt-4 pb-8 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
                  <img src="/imgs/img-build.jpg" className="h-[30vh] border-1 border-blue-dark/50" />
                </div>
              </div>
              <div className="flex flex-row-reverse items-center gap-12">
                <img src="/imgs/plate2.png" alt="show it off!" className="h-[30vh]" />
                <div className="pt-4 pb-12 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50 transition-transform duration-300 hover:scale-105 hover:rotate-2">
                  <img src="/imgs/img-showitoff.jpg" className="h-[30vh] w-[34vh] object-cover object-top border-1 border-blue-dark/50" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
                <img src="/imgs/plate3.png" alt="get prizes!" className="h-[30vh]" />
                <div className="pt-4 pb-8 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
                  <img src="/imgs/img-trophies.jpg" className="h-[30vh] w-[34vh] object-cover border-1 border-blue-dark/50" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[url('/imgs/sandNoFade.webp')] w-full justify-center items-center flex flex-col">
            <Link
              href="/map"
              className="hover:scale-105 transition-all duration-200 pointer-events-auto cursor-pointer w-fit mx-auto -mt-[4vh] mb-[5vh] transform -rotate-3 hover:-rotate-5"
            >
              <img
                src="/imgs/surfboard_findsunbeam.png"
                className="w-[40vw] md:w-[20vw] mx-auto"
                alt="apply!"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="relative w-full overflow-hidden">
          <img
            src="/imgs/sandNoFade.webp"
            className="w-full object-cover absolute top-0 z-0"
            alt=""
          />
          <img
            src="/imgs/sandNoFade.webp"
            className="w-full absolute top-[100vh] object-cover  z-0"
            alt=""
          />

          <div className="relative mt-8 mb-8 mx-auto w-[70%] items-center flex flex-col py-[9vh] -pt-[2vh] z-5 overflow-hidden waterbg outline-2 rounded-2xl outline-blue-bright shadow-xl shadow-blue-dark/10">
            <div className="relative z-5 flex flex-col items-center w-[92%]">
              <div className="grid grid-rows-1 grid-flow-col">
                <h1 className="row-start-1 col-start-1 galindo text-5xl md:text-6xl text-center text-[#72BFDA] pink-outlined-text-drop-shadow mb-[0.25vh]">
                  Schedule
                </h1>
                <h1 className="row-start-1 col-start-1 galindo text-5xl md:text-6xl text-center text-[#72BFDA] pink-outlined-text-sm mb-[0.25vh]">
                  Schedule
                </h1>
              </div>

              <p className="outfit text-[#0E387A] text-[1.4vh] md:text-[1.8vh] text-center mb-[2vh]">
                Here&apos;s what to expect at Sunbeam {cityName}!
              </p>

              <div className="w-full bg-[#FBF6E7cF] border-[0.2vh] border-[#2E599C] rounded-[2vh] p-[2vh] md:p-[2.5vh]">
                {loadError ? (
                  <p className="outfit text-[#0E387A] text-[1.8vh] text-center py-[1vh]">
                    We couldn&apos;t load the schedule right now. Please check back later.
                  </p>
                ) : schedule.length === 0 ? (
                  <p className="outfit text-[#0E387A] text-[1.8vh] text-center py-[1vh]">
                    Schedule coming soon!
                  </p>
                ) : (
                  schedule.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row md:items-center gap-[0.4vh] justify-between md:gap-[2.5vw] py-[1.2vh] ${
                        index !== schedule.length - 1
                          ? "border-b-[0.15vh] border-[#2E599C33]"
                          : ""
                      }`}
                    >
                      <p className="outfit text-[#0E387A] text-[1.8vh] leading-snug min-w-0">
                        {item.event}
                      </p>
                      <p className="galindo text-[#C54390] text-[2vh] shrink-0 whitespace-nowrap">
                        {item.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      {/* FAQ */}
      <FaqAccordion />

      {/* Sand spacer before footer */}
      <div className="w-full h-[12.5vh] bg-[url('/imgs/sandNoFade.webp')] z-3" />

      {/* ── SPONSOR ── */}
      {sponsors.length > 0 && (
        <div className="relative min-h-screen w-full pt-[10vh] pb-[8vh] flex flex-col items-center z-3 overflow-hidden">
          <img
            src="/imgs/sand.webp"
            className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
            alt=""
          />

          <div className="flex flex-col relative z-5 items-center justify-center">
            <h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[80vw] leading-[7.5vh] mb-[1vh]">
              Thank you to our Sponsors!
            </h2>
            <div className="grid grid-cols-4 w-[90vw] gap-[3vw] mt-[3vh]">
              {sponsors.map((sponsor: Sponsor, index: number) => (
                <div
                  className="aspect-[1] w-full relative flex flex-col items-center justify-center"
                  key={index}
                >
                  <img
                    src={`/imgs/${index % 2 === 0 ? "star1" : "star2"}.webp`}
                    className="w-full absolute top-0 left-0 z-0"
                    alt=""
                  />
                  <div className="flex flex-col relative z-5 items-center justify-center w-[80%] mx-auto">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-[45%]"
                    />
                    <p className="text-[#0E387A] stroke-text-idk font-semibold galindo text-[3vh] leading-[3vh] text-center w-[80%] mx-auto">
                      {sponsor.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className="relative min-h-[80vh] w-full flex flex-col pt-[23vh] z-10">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/imgs/water2.webp"
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>
        <img
          src="/imgs/foam-fixed2.png"
          alt=""
          className="hidden md:block md:absolute top-[-15vh] left-0 z-10 w-full"
        />
        <img
          src="/imgs/ray2.webp"
          className="hidden md:absolute bottom-[2vh] right-0 z-5 w-[20vw]"
          alt=""
        />

        <div className="relative z-5 flex flex-col">
          {/* Footer headline */}
          <h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
            made with <b className="text-[#FFC7DA]">♡</b> by{" "}
            <a
              href="https://athena.hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Hack Club Athena
            </a>{" "}
            Team
          </h3>

          {/* Nav + description */}
          <div className="flex flex-col md:flex-row gap-[8vw] mt-[6vh] px-[5.3%]">
            {/* Left nav */}
            <div className="flex flex-row md:flex-col gap-[1.2vh] shrink-0">
              {[
                { label: "Hack Club", href: "https://hackclub.com" },
                { label: "Slack", href: "https://hackclub.com/slack" },
                { label: "Athena", href: "https://athena.hackclub.com" },
                { label: "Clubs", href: "https://hackclub.com/clubs" },
                {
                  label: "Code of Conduct",
                  href: "https://hackclub.com/conduct",
                },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="galindo text-black/50 md:text-[#D5F0E8] text-[3vw] md:text-[1.8vw] hover:underline leading-tight"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Right description */}
            <p className="outfit text-black/60 md:text-[#FAF0D3] text-[2.75vw] md:text-[1.5vw] leading-relaxed max-w-[80vw] md:max-w-[60vw]">
              Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
              high schoolers. We believe you learn best by building so
              we&apos;re creating community and providing grants so you can make
              awesome projects. In the past few years, we&apos;ve partnered with
              GitHub to run&nbsp;Summer of Making, hosted the&nbsp;world&apos;s
              longest hackathon on land, and ran&nbsp;Canada&apos;s largest high
              school hackathon.
              <br />
              <br />
              At Hack Club, students are building real projects every single
              day.
            </p>
          </div>

          {/* Copyright */}
          <p className="outfit text-[#FCF7E8] text-[0.75vw] mt-[4vh] text-center">
            © 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
          </p>
        </div>
      </div>
    </div>
  );
}
