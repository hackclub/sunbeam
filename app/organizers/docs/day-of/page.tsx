import DocsSidebar from "../../../../components/DocsSidebar"
import MobileNavbar from "../../../../components/MobileNavbar"

export default function DocsVenue() {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <DocsSidebar />
      {/* desktop content */}
      <div className="max-lg:hidden flex flex-1 flex-col h-full min-h-0">
        <div className="flex flex-1 flex-col h-full min-h-0 overflow-y-auto">
          <div style={{ padding: "10px" }}>
            
            <p className="galindo text-center pt-[6vh] pb-[4vh]" style={{ fontSize: "3.10vw", color: "#D88127", lineHeight: 1.2 }}>
              Day-of!
            </p>

            {/* txt box w ray */}
            <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
              <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                  It's go time!!! YAYAYAY
                </p>
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
                <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
              </div>
            </div>
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
              <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>
            <div>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Congrats! Hours staring at screens, late nights answering emails, worsening dark circles… You’ve now made it. <br/>
                <br></br>
                But… To make your Sunbeam the best event possible, here are: <br></br>
                <br></br>
                THE THREE LAWS for organizers.
              </p>
            </div>

            {/* law 1 */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> Law 1: </span>
                <span style={{ color: "#359BBF" }}> Be 100x your usual friendliness</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                We all know that one barista or server. Or ridiculously extroverted person. Today, YOU are <span style={{fontStyle: "italic"}}>them.</span><br></br>
                <br></br>
                There are two ways to maximise your friendliness: <br/>
                Either (1) talk to as many people as you can <br/>
                Or (2) talk to the same people as often as possible<br></br>
                <br/>
                The best organisers do a combination of both, checking in with every single team every 2 hours or so. You should feel like you're running laps at your event!<br/>
                <br/>
                You may ask: “How would I start a convo without being weird?” Don’t worry, I gotchu. Here are some ideas:
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Ask to take a photo of the team
                </li>
                <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Ask about their project and ideas
                </li>
                <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Ask if they want to brainstorm / need help / how they like it so far
                </li>
                <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Ask if they've had lunch / drinks / seen any of the snacks
                </li>
              </ul>  
            </div>

            {/* law 2 */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
                <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                  <span style={{ color: "#C54390" }}>Law 2:</span>
                  <span style={{ color: "#359BBF" }}> NO phone in front of participants </span>
                </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                You know that awkward moment when someone you want to talk to is glued to their phone? <br/>
                <br></br>
                Yes. Exactly. Participants need to feel like you’re approachable. So… DO NOT use your phone in front of them. Or any electronics (laptops, Ipad, etc.) It makes you look busy or unavailable or worse– uninterested. <br></br>
                Run to the washrooms. Hide behind a table. I don’t care. PHONES in POCKETS. Always.
              </p>
            </div>

            {/* law 3 */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.9vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>Law 3:</span>
                <span style={{ color: "#359BBF" }}> Take breaks</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                You’re human. You will burn out. Take 10 min breaks in the organiser’s room (YES YOU DO NEED ONE). <br></br>
                <br></br>
                If you have a bigger team, it’s helpful if you SCHEDULE each organiser’s breaks so that no one feels like they need to keep working if everyone else is on a break. And keep snacks in the org room ;)
              </p>
            </div>

            {/* Shark + speech bubble row */}
					<div style={{ display: "flex", alignItems: "flex-end", gap: "2vw", marginBottom: "2vh", marginTop: "1vh" }}>

						{/* Shark */}
						<img src="/imgs/guide/shark.webp" alt="Shark" style={{ width: "28vw", flexShrink: 0 }} />

						{/* Right: speech bubble + reach out text */}
						<div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", paddingBottom: "2vh" }}>

							{/* Speech bubble with left-pointing arrow */}
							<div style={{ display: "flex", alignItems: "center" }}>
								<div style={{ position: "relative", flexShrink: 0, width: "22px", alignSelf: "center" }}>
									<div style={{ width: 0, height: 0, borderTop: "18px solid transparent", borderBottom: "18px solid transparent", borderRight: "22px solid #0E387A" }} />
									<div style={{ position: "absolute", top: "50%", left: "4px", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "18px solid transparent", borderBottom: "18px solid transparent", borderRight: "22px solid white" }} />
								</div>
								<div style={{ border: "4px solid #0E387A", background: "white", padding: "2.5vh 3vw", flex: "1 1 0", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100px", borderRadius: "10px", overflow: "hidden" }}>
									<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(216,129,39)", textAlign: "center", lineHeight: 1.4 }}>
                    Take a deep breath. YOU GOT THIS! (remember to enjoy as well; you deserve it!)
									</p>
								</div>
							</div>
						</div>
          </div>
          </div>
        </div>
      </div> 
      {/* end of destop view */}



      <MobileNavbar/>
      {/* mobile content */}
      <div
        className="lg:hidden flex items-center justify-center h-screen text-center px-[5%]"
        style={{ fontSize: "20px", fontWeight: 400, color: "#2E599C", lineHeight: 1.6 }}
      >
        <p>Please view this tab on a computer to see every document.</p>
      </div>



    </div>
    // end of return
  );
}