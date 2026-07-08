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
              Find a Venue
            </p>

            {/* txt box w ray */}
            <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
              <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                  Without a venue, you don't have an event. You <span style={{fontStyle: "italic"}}>need</span> a venue. Lock in!
                </p>
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
                <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
              </div>
            </div>
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
              <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>

            {/* what is */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 1. </span>
                <span style={{ color: "#359BBF" }}> WHAT EVEN IS A VENUE?</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                This may sound silly, but you need to decide what criteria you need your venue to have. You'll also need to bring food and snacks into the venue, so you may need to check whether that's possible.
              </p>
              <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginBottom: "2.5vh" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
                  Features we require/recommend:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                    A closed-off area so only participants are able to enter and leave at the right times
                  </li>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                    A tv, projector, and/or speakers for workshops and opening/closing ceremonies
                  </li>
                  <li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                    A big open space with tables for people to hang out and work
                  </li>
                </ul>
            </div>   

            <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46, 88, 155)", lineHeight: 1.6 }}>
              One more thing: think about <span style={{ fontStyle: "italic" }}>vibes</span>. The event space should kind of "align" with the branding - maybe cozy, or sunny, or just a really social place to chat!
            </p>
            </div>

            {/* picking */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
                <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                  <span style={{ color: "#C54390" }}>2.</span>
                  <span style={{ color: "#359BBF" }}> PICKING THE VENUE</span>
                </p>
            </div>
  
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                My favourite way to find cool places is literally just google maps. A good starting place is searching for the following types of locations in your event area, but don't feel like you can't try castles, museums, or any other event spaces…
              </p>
            </div>
            {/* table */}
            <div style={{ border: "2px solid #0E387A", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr" }}>
                <div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "1.5vh 1.5vw", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
                  <p style={{ fontSize: "1.8vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>Space Type</p>
                </div>
                <div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "1.5vh 1.5vw", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
                  <p style={{ fontSize: "1.8vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>Why it works</p>
                </div>
                <div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "1.5vh 1.5vw", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
                  <p style={{ fontSize: "1.8vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>Tip</p>
                </div>
  
                {[
                  {
                    title: "Makerspaces",
                    desc: "Already designed to be fun to code in! Plus the working culture often encourages young people and non-profits in tech.",
                    tip: "Make your email subject line OUTRAGEOUS. \"80 teens in [makerspace name]?!\" got me 5/5 replies, two of them were yeses.",
                  },
                  {
                    title: "Community / youth centres",
                    desc: "Obviously they'll support charity events, and they tend to be cozy and comfortable for teens to enjoy.",
                    tip: "Frame it as how it can help the local community and reduce inequality in your local area. Bonus points for local \"inside jokes\" ;)",
                  },
                  {
                    title: "Schools / colleges / universities",
                    desc: "Planned for teenagers to learn and collaborate. Try to find a private school because they are usually nicer ;)",
                    tip: "Flattery tends to work here, ask to use their \"astounding facilities\" for an educational event.",
                  },
                  {
                    title: "Libraries",
                    desc: "Super cozy and cute, just make sure you have a large enough room and remember that your event will NOT be silent.",
                    tip: "Similarly to community centres, focus on the local impact.",
                  },
                  {
                    title: "Start-up offices",
                    desc: "Free snacks, ping pong tables, open desks - what else do you need? Growing businesses love advertising themselves.",
                    tip: "Customize specifically to the person you're messaging, often start-up employees will have details on LinkedIn.",
                  },
                ].map((venue, i, arr) => {
                  const isLast = i === arr.length - 1;
                  const cellStyle = {
                    padding: "2vh 1.5vw",
                    borderBottom: isLast ? undefined : "2px solid #0E387A",
                    background: "white",
                  };
                  return (
                    <div key={venue.title} style={{ display: "contents" }}>
                      <div style={{ ...cellStyle, borderRight: "2px solid #0E387A", display: "flex", alignItems: "center" }}>
                        <p style={{ fontSize: "1.6vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.5 }}>
                          {venue.title}
                        </p>
                      </div>
                      <div style={{ ...cellStyle, borderRight: "2px solid #0E387A" }}>
                        <p style={{ fontSize: "1.5vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.5 }}>
                          {venue.desc}
                        </p>
                      </div>
                      <div style={cellStyle}>
                        <p style={{ fontSize: "1.5vw", fontWeight: 400, color: "#359BBF", lineHeight: 1.5 }}>
                          {venue.tip}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* emailing */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.9vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>3.</span>
                <span style={{ color: "#359BBF" }}> EMAILING</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                Once you have your mega-list of spaces, you need to reach out to them. A lot of the times people underestimate how important <span style={{fontStyle: "italic"}}>what</span> you say is, so here's how to do it right:
              </p>
              <div style={{ marginBottom: "4vh" }}>
                <p style={{ fontSize: "2.62vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.4, marginBottom: "1.5vh" }}>
                  Step One: Finding someone to contact
                </p>
                <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
                  Try not to use generic email addresses (ex: info@xyz). Look for managers, CEOs, PR leads, etc. Going through website portals is very finicky. Don't assume you'll get to actual people directly, assume your message will go into the void.
                </p>
                {/* step 1 */}
                <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginLeft: "3vw" }}>
                  <p style={{ fontSize: "2.33vw", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
                    Tools:
                  </p>
                  <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      <strong>LinkedIn:</strong> build rapport to eventually work up to venue offers
                    </li>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                      <strong>Apollo.io:</strong> find email addresses of the people you find on LinkedIn
                    </li>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                      <strong>RocketReach.co:</strong> another tool to find emails
                    </li>
                  </ul>
                </div> 
                {/* step 2 */}
                <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                  <p style={{ fontSize: "2.62vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.4, marginBottom: "2vh" }}>
                    Step Two: Writing the email
                  </p>
                  {/* table */}
                  <div style={{ border: "2px solid #0E387A", marginBottom: "3vh", borderRadius: "10px", overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                      <div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "0 2vw", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
                        <p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>DON'T ❌</p>
                      </div>
                      <div style={{ backgroundColor: "rgba(243,147,180,1)", padding: "0 2vw", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
                        <p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>DO ✅</p>
                      </div>
                      <div style={{ backgroundColor: "white", padding: "2vh 2vw", borderRight: "2px solid #0E387A" }}>
                        <ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                            Use ChatGPT to write the WHOLE thing (maybe use it to correct spelling)
                          </li>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                            Be overly professional - you'll seem spammy and/or scammy
                          </li>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                            Mass email - people can tell, and it gets you NOWHERE
                          </li>
                        </ul>
                      </div>
                      <div style={{ backgroundColor: "white", padding: "2vh 2vw" }}>
                        <ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                            KILL YOUR WORDS - be concise, get to the point
                          </li>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                            CUSTOMISE to the exact recipient - research who you're emailing
                          </li>
                          <li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                            Write how you would to a teacher or grandparent
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="text-center" style={{ fontSize: "2.04vw", fontWeight: 400, color: "#359BBF", lineHeight: 1.6, marginLeft: "3vw" }}>
                    Ten customized emails is a million times better than a thousand mass emails. If you can, go to a workshop about writing effective emails & get feedback before sending! We'll hold a couple to get you guys started.
                  </p>

                  {/* shark bubble txt */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "2vw", marginBottom: "2vh" }}>
                    <img src="/imgs/guide/shark.webp" alt="Shark" style={{ width: "28vw", flexShrink: 0 }} />
                    <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", paddingBottom: "2vh" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ position: "relative", flexShrink: 0, width: "22px", alignSelf: "center" }}>
                          <div style={{ width: 0, height: 0, borderTop: "18px solid transparent", borderBottom: "18px solid transparent", borderRight: "22px solid #0E387A" }} />
                          <div style={{ position: "absolute", top: "50%", left: "4px", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "18px solid transparent", borderBottom: "18px solid transparent", borderRight: "22px solid white" }} />
                        </div>
                        <div style={{ border: "4px solid #0E387A", background: "white", padding: "2.5vh 3vw", flex: "1 1 0", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100px", borderRadius: "10px", overflow: "hidden" }}>
                          <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
                            Checkout the email templates provided in the 
                            <a
                              href="sunbeam.hackclub.com/organizers/resources"
                              className="text-orange-dark underline hover:decoration-wavy"
                            >
                              Resources Tab
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* next stpes */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>4.</span>
                <span style={{ color: "#359BBF" }}> NEXT STEPS</span>
              </p>
            </div>

            <div style={{ padding: "0 7.4% 4vh" }}>
              <div style={{ marginBottom: "3vh" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.4, marginBottom: "1vh" }}>
                  If you get a "yes!" …now what?
                </p>
                <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginLeft: "3vw" }}>
                  Be nice to them, maybe they'll host another event in the future!
                </p>
              </div>
 
              <div style={{ marginBottom: "3vh" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.4, marginBottom: "1vh" }}>
                  If you get a "sorry we can't…"
                </p>
                <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginLeft: "3vw" }}>
                  Ask for monetary donations, food, supplies, or mentors. They answered, which means congrats! They care!
                </p>
              </div>
 
              <div>
                <p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.4, marginBottom: "1.5vh" }}>
                  If you get ghosted: <span style={{fontWeight: 400}}>follow. up.</span>
                </p>
                <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginLeft: "3vw" }}>
                  <ul style={{ listStyleType: "disc", paddingLeft: "3vw" }}>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Follow-up every 3-5 business days! Reach out to another employee! Call them!
                    </li>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Email their *shivers* general email.
                    </li>
                    <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
                      Being relentless is what gets you a good venue. (BUT spamming can result in being blacklisted!)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* advice */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>5.</span>
                <span style={{ color: "#359BBF" }}> NICHE ADVICE</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 8vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.5vh" }}>
                <strong>GAMBLER MINDSET!</strong> Think of the meme of that miner giving up digging just before finding the diamonds. Don't be like him, email just one more venue 🥺
              </p>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                Add some of your own voice into the email - as you can see I use loads of exclamation marks, as long as you aren't unprofessional, you ARE allowed to show your excitement!
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