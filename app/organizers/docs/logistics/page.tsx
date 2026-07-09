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
              Logistics...
            </p>

            {/* txt box w ray */}
            <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
              <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                  It's all in the details... (aka Logistics)
                </p>
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
                <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
              </div>
            </div>
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
              <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>

            {/* run of show */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 1. </span>
                <span style={{ color: "#359BBF" }}> RUN OF SHOW</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                A run of show is a fleshed-out schedule <span style={{ fontStyle: "italic" }}>for organizers</span> that detail everything that’s happening before, during, and after the social coding event in each room and what each organiser is doing.
              </p>
              <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginBottom: "2.5vh" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
                  People you might need the day of (please ask them in advanced!):
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                    Someone with a car to run errands
                  </li>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                    Mentors with software/hackathon experience (recommended not required)
                  </li>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                    Adult supervisors (One for every ~35 attendees: a responsible organiser, or parent of an organiser, who is <span style={{ fontWeight: 700 }}>over 18</span> typically works, make sure they can be trusted of course; the venue may also have someone available) 
                  </li>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                    Person trained in first-aid (important!!! you can use your event funds if you really need to so that one of your organizers can get a first aid certification)
                  </li>
                </ul>
              </div>  
            </div>

            {/* projects */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
                <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                  <span style={{ color: "#C54390" }}>2.</span>
                  <span style={{ color: "#359BBF" }}> SHIPPED PROJECTS </span>
                </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                ALL teams need a SHIPPED Project. PLEASE make this clear at the OPENING CEREMONY
              </p>
            </div>
            <div style={{ border: "2px solid #0E387A", marginBottom: "3vh", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ backgroundColor: "rgba(243,147,180,1)", padding: "0 2vw", height: "50px", width:"100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
                  <p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>YES ✅</p>
                </div>
                <div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "0 2vw", height: "50px", width:"100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
                  <p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>NO ❌</p>
                </div>
                <div style={{ backgroundColor: "white", padding: "2vh 2vw", borderRight: "2px solid #0E387A" }}>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Published on github pages, vercel, itch.io, or very easily downloadable on github.
                    </li>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Playable on someone else's computer
                    </li>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Code is on a github repository
                    </li>
                  </ul>
                </div>
                <div style={{ backgroundColor: "white", padding: "2vh 2vw" }}>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Youtube Video Link
                    </li>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      A private project (not public)
                    </li>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Google Drive link
                    </li>
                    <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Local host link
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                It is on <span style={{fontWeight: 700}}>you</span>, Point of Contact or organizer, if people don't ship. We chose you to run a good event. This is how we measure if you do a good job.
              </p>
            </div>

            {/* voting */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.9vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>3.</span>
                <span style={{ color: "#359BBF" }}> VOTING</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                Submissions WILL be pushed back by <span style={{fontWeight: 700}}>30 minutes</span> (historically acurate fact, even at the most successful events). This half an hour will possibly be the most stressful part of your event as you'll have 30+ teens struffling with last minute bugs, issues, and fixes.<br/>
                <br/>
                Voting will be done through podium.hackclub.com. Submitting their projects through Podium automatically ensures their project is shippable (aka playable on another device). <br/>
                <br/>
                Podium will check if someone’s link works and is viable, and once they’re approved you can give attendees’ their t-shirts!<br/>
                <br/>
                Podium allows peer-voting. We encourage you to set up a booth-like space and for participants to circulate and vote their favorite on Podium. Expo/science fair style. People will walk around to see demos of others’ projects and, once everyone has gone around, open voting on your event and let people choose their favorites!
              </p>
            </div>

            {/* next stpes */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>4.</span>
                <span style={{ color: "#359BBF" }}> Prizes</span>
              </p>
            </div>

            <div style={{ padding: "0 7.4% 4vh" }}>
              <div style={{ marginBottom: "3vh" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginLeft: "3vw" }}>
                  Say it out loud: The point of a hackathon is not the prize. <br></br>
                  We want a helpful, encouraging environment. Not a competitive, Banking-esque one. <br/>
                  <br/>
                  Giving a prize for the top 3 is usually the deal, but this can change depending on your event (and budget). <br></br>
                  Also, most events have “special categories” like Funniest or Best Design. These are organizer’s-pick, so that’ll have more logistics (organizers will have to gather in a room and talk, etc).
                </p>
              </div>
            </div>
 
            {/* waivers */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>5.</span>
                <span style={{ color: "#359BBF" }}> WAIVERS</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 8vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.5vh" }}>
                <strong>Use the parent emails in the sign-up form.</strong> We’ll email all parents 3 weeks before the hackathon to remind them the event is happening, and a week before the hackathon to remind them to sign their child’s waiver, and ask them to tell other parents so they can spread the word. But we want you to as well. <br></br>
                <br></br>
                They’re parents, so they have sympathy towards kids (especially since they’re a parent of teenagers). Use it.
                <br></br><br></br>
                Just don’t spam.
              </p>
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