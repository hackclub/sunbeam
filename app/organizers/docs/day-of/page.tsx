import DocsPage from "../_components/DocsPage";

export default function DocsVenue() {
  return (
    <DocsPage>
      <div>
        
        <p className="galindo text-center pt-[6vh] pb-[4vh]" style={{ fontSize: "3.10em", color: "#D88127", lineHeight: 1.2 }}>
          Day-of!
        </p>

        {/* txt box w ray */}
        <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
          <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "0.25em solid #0E387A", padding: "3.5em 5em" }}>
            <p style={{ fontSize: "1.94em", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
              It's go time!!! YAYAYAY
            </p>
            <div style={{ position: "absolute", bottom: "-1em", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "1em solid transparent", borderRight: "1em solid transparent", borderTop: "1em solid #0E387A" }} />
            <div style={{ position: "absolute", bottom: "-0.75em", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "1em solid transparent", borderRight: "1em solid transparent", borderTop: "1em solid white", zIndex: 1 }} />
          </div>
        </div>
        <div className="flex justify-center pt-[7vh] pb-[3vh]">
          <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22em" }} className="object-contain" />
        </div>
        <div>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Congrats! Hours staring at screens, late nights answering emails, worsening dark circles… You’ve now made it. <br/>
            <br></br>
            But… To make your Sunbeam the best event possible, here are: <br></br>
            <br></br>
            THE THREE LAWS for organizers.
          </p>
        </div>

        {/* law 1 */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> Law 1: </span>
            <span style={{ color: "#359BBF" }}> Be 100x your usual friendliness</span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            We all know that one barista or server. Or ridiculously extroverted person. Today, YOU are <span style={{fontStyle: "italic"}}>them.</span><br></br>
            <br></br>
            There are two ways to maximise your driendliness: <br/>
            Either (1) talk to as many people as you can <br/>
            Or (2) talk to the same people as often as possible<br></br>
            <br/>
            The best organisers do a combination of both, checking in with every single team every 2 hours or so. You should feel like your running laps at your event!<br/>
            <br/>
            You may ask: “How would I start a convo without being weird?” Don’t worry, I gotchu. Here are some ideas:
          </p>
          <ul style={{ listStyleType: "disc", paddingLeft: "3em", marginTop: "1.5vh" }}>
            <li style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
              Ask to take a photo of the team
            </li>
            <li style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
              Ask about their project and ideas
            </li>
            <li style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
              Ask if they want to brainstorm / need help / how they like it so far
            </li>
            <li style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
              Ask if they've had lunch / drinks / seen any of the snacks
            </li>
          </ul>  
        </div>

        {/* law 2 */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
            <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
              <span style={{ color: "#C54390" }}>Law 2:</span>
              <span style={{ color: "#359BBF" }}> NO phone in front of participants </span>
            </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
            You know that awkward moment when someone you want to talk to is glued to their phone? <br/>
            <br></br>
            Yes. Exactly. Participants need to feel like you’re approachable. So… DO NOT use your phone in front of them. Or any electronics (laptops, Ipad, etc.) It makes you look busy or unavailable or worse– uninterested. <br></br>
            Run to the washrooms. Hide behind a table. I don’t care. PHONES in POCKETS. Always.
          </p>
        </div>

        {/* law 3 */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.9em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}>Law 3:</span>
            <span style={{ color: "#359BBF" }}> Take breaks</span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
            You’re human. You will burn out. Take 10 min breaks in the organiser’s room (YES YOU DO NEED ONE). <br></br>
            <br></br>
            If you have a bigger team, it’s helpful if you SCHEDULE each organiser’s breaks so that no one feels like they need to keep working if everyone else is on a break. And keep snacks in the org room ;)
          </p>
        </div>

        {/* Shark + speech bubble row */}
      <div style={{ display: "flex", alignItems: "center", gap: "2em", marginBottom: "2vh", marginTop: "1vh" }}>

        {/* Shark */}
        <img src="/imgs/guide/shark.webp" alt="Shark" style={{ width: "0", maxWidth: "28em", flex: 1 }} />

        {/* Right: speech bubble + reach out text */}
        <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", paddingBottom: "2vh", alignSelf: "flex-end" }}>

          {/* Speech bubble with left-pointing arrow */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative", flexShrink: 0, width: "1em", alignSelf: "center" }}>
              <div style={{ width: 0, height: 0, borderTop: "1em solid transparent", borderBottom: "1em solid transparent", borderRight: "1em solid #0E387A" }} />
              <div style={{ position: "absolute", top: "50%", left: "0.25em", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "1em solid transparent", borderBottom: "1em solid transparent", borderRight: "1em solid white" }} />
            </div>
            <div style={{ border: "0.25em solid #0E387A", background: "white", padding: "2.5vh 3em", flex: "1 1 0", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "4em", borderRadius: "1em", overflow: "hidden" }}>
              <p style={{ fontSize: "2.33em", fontWeight: 400, color: "rgb(216,129,39)", textAlign: "center", lineHeight: 1.4 }}>
                Take a deep breath. YOU GOT THIS! (remember to enjoy as well; you deserve it!)
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </DocsPage>
  );
}