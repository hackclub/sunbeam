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
              Getting Girls to Sign up!
            </p>

            {/* txt box w ray */}
            <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
              <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                  Outreach is an IMPORTANT part of coding events. No participants = No event. But how do you reach the right people?
                </p>
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
                <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
              </div>
            </div>
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
              <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>
            <p style={{ fontSize: "1.94vw", color: "#D88127", lineHeight: 1.6, marginBottom: "2vh" }}>
              Note: only ~50% of sign-ups show up. Try to aim for sign ups to be 2x the amount of people you want to attend. The more the marrier! 
            </p>

            {/* schools */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 1. </span>
                <span style={{ color: "#359BBF" }}> Emailing Teachers</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                1) Find schools within a 30 mile radius (through Google Maps) and visit their websites. <br></br>
                2) Search for the staff/faculty directory and email all STEM teachers / homerooms. <br></br>
                3) Make the email applicable to them. (TIP: If your Director of Education has an email blast, ask them to include yout event in the newsletter.) <br></br>
                <br/>
                Checkout the 
                <a
                  href="sunbeam.hackclub.com/organizers/resources"
                  className="text-orange-dark underline hover:decoration-wavy"
                >
                  Resources Tab
                </a>
                for email templates!
              </p>
            </div>

            {/* local orgs */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
                <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                  <span style={{ color: "#C54390" }}>2.</span>
                  <span style={{ color: "#359BBF" }}> Local Organizations</span>
                </p>
            </div>
  
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                How many Hack Clubbers are part of FIRST Robotics? VEX? Other Hackathons? <br/>
                <br/>
                Reach out by shooting a quick DM or emailing local organizations / community groups asking if they could help you advertise! <br/>
                <br/>
                For example: <br/>
                </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Robotics Teams
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Previous high school hackathon organizers/participants 
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  CS Clubs
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Student Council
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Local Libraries / Community Centers
                </li>
              </ul>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                ... or any other youth groups! (Girl Scout, DECA, etc)
              </p>
            </div>

            {/* social media */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>3.</span>
                <span style={{ color: "#359BBF" }}> Social Media</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                It is a truth universally acknowledged that Gen Z (and Gen Alpha) are glued to their screens. Use that to your advantage!<br/>
                <br/>
                1) <span style={{fontWeight: 700 }}>Post your first post.</span> <br/>
                2) <span style={{fontWeight: 700 }}>Follow people</span> <br/>
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Go to schools, robotics teams, CS clubs, etc accounts
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Follow them and their followers 
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Repeat!
                </li>
              </ul>
              <p style={{ fontSize: "2.33vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                3) <span style={{fontWeight: 700 }}>Post regularly </span>
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                  Post small tibits of info (what to bring, faw, beginner-friendly, how fun it'll be, etc)
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Add visuals (maybe even do a video!) 
                </li>
                <li style={{ fontSize: "2.13vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1vh" }}>
                  Check out the 
                  <a
                    href="sunbeam.hackclub.com/organizers/branding"
                    className="text-orange-dark underline hover:decoration-wavy"
                  >
                    Branding Tab
                  </a>
                  for branding and post templates!
                </li>
              </ul>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "4vh" }}>
                Use Canva or Figma to make posts (it doesn't matter, just post regularly!)
              </p>
            </div>

            

            {/* parents */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>4.</span>
                <span style={{ color: "#359BBF" }}> Reach the Parents</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 8vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.5vh" }}>
                "Mom, can I go to a Hack Club event?" sounds like you're about to hack into the government... But if the mom sees it first on her feed or if another mom tells her about it, it goes from <span style={{fontStyle: "italic"}}>A Bad Influence to the Best Educational Event Ever</span>.<br/>
                <br/>
                Doing this step right will get you 30-40% of your signups, especially if your city hasn't had many coding events before. <br/>
                <br/>
                Ask your parents if they can post a short bit in their Facebook Groups / WhatsApp / etc to promote your social. Or, go post them yourself on Facebook Parent Groups, etc.
              </p>
              <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginLeft: "3vw" }}>
                  <p style={{ fontSize: "2.33vw", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
                    Example Parent Post:
                  </p>
                  <p style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
                    Your child interested in coding? On August 29th, we're organizing a 12h ALL-GIRLS high school social coding event called Sunbeam for 50+ girls at [venue]. <br/>
                    <br/>
                    The social is open to teen girls 13-18 years old. They'll get to:
                  </p>
                  <ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
                    <li style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Get into teams of three and create a website or game from scratch with help from other girls.
                    </li>
                    <li style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Have fun! Everything is FREE, including meals, snacks, drinks, T-shirts, prizes and more.
                    </li>
                    <li style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
                      Learn to code: any girl in any field can be techy!
                    </li>
                  </ul>
                  <p style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
                    For more information and sign up: [link]<br/>
                    <br/>
                    Your child doesn't need any previous experience; all they need to bring is a laptop, a charger, and a good mood! <br/>
                    [image of poster]
                  </p>
                </div> 
            </div>

            {/* posters */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}>5.</span>
                <span style={{ color: "#359BBF" }}> Posters!</span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 8vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.5vh" }}>
                Yes, people still touch grass. <br/> So, put up some physical posters around your town. You can put them up in schools (ask friends and teachers to help promote), on poles (with permission), in gyms, your car, your face... <br/>
                <br/>
                <span style={{ fontWeight: 700 }}>IMPORTANT:</span><br/>
                To make it as beginner friendly, and girl-pleasing as possible: remember to market your Sunbeam as a SOCIAL girls only event where you get to code and hang out with other cool girls. This will attract more girls who might be scared to attend a 'nerdy' hackathon.
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