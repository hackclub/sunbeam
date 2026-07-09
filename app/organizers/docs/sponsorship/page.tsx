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
              Getting Money
            </p>

            {/* txt box w ray */}
            <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
              <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                  Welcome to the trenches of sponsorship. You’ll likely send a ridiculous number of emails over the next month. No worries! We got your back.
                </p>
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
                <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
              </div>
            </div>
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
              <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>
            <p style={{ fontSize: "1.94vw", color: "#D88127", lineHeight: 1.6, marginBottom: "2vh" }}>
              Note: sponsorship is not absolutely necessary for your event, but it can help make your event even cooler!
            </p>

            {/* budeget */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 1. </span>
                <span style={{ color: "#359BBF" }}> Making a Budget </span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Checkout the 
                <a
                  href="sunbeam.hackclub.com/organizers/resources"
                  className="text-orange-dark underline hover:decoration-wavy"
                >
                  Resources Tab
                </a>
                for budget templates! <br/>
                <br/>
                Keep track of every single item you plan to buy for your event, and make sure you update it after you make purchases (especially if taxes raise the cost). <br/>
                Search up snack prices on Amazon and Costco, make sure the price per person doesn’t get too high. <br/><br/>
                Keep track of how much you’re spending per unit and per person. If a 36-pack of chips costs $50, each bag of chips costs ~$1.4. This unit price helps keep things in perspective and helps you decide what to keep and what to not get.
              </p>
            </div>

            {/* companies */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
                <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                  <span style={{ color: "#C54390" }}>2.</span>
                  <span style={{ color: "#359BBF" }}> Find Companies</span>
                </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Start small. One of the BIGGEST mistakes first-time hackathon organizers make is to cold email the biggest companies they can think of (intel, microsoft, etc). This won’t work 99% of the time unless you have a good contact. <br/>
                <br/>
                Chances are, there are a ton of local companies you’ve never heard of that would be more than happy to sponsor and have a surprising amount of money to spare. It also doesn’t just have to be tech companies! Reach out to restaurants, small businesses, bakeries, and community-oriented businesses. <br/>
                 <br/> 
                Where to start? <br/>
                Companies that:

                
              </p>

              <div style={{ padding: "0 7.4% 4vh" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #0E387A",
                  fontSize: "2.03vw",
                  lineHeight: 1.5,
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        width: "22%",
                        verticalAlign: "top",
                        fontWeight: 700,
                        color: "#0E387A",
                      }}
                    >
                      you have connections to
                    </td>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 400,
                        color: "#359BBF",
                      }}
                    >
                      Start here! (Parents' work, your job, your friends' work, etc. Every adult you know works at a company, use it.)
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 700,
                        color: "#0E387A",
                      }}
                    >
                      align with the mission
                    </td>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 400,
                        color: "#359BBF",
                      }}
                    >
                      If your event is about coding education and getting, find edtech companies
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 700,
                        color: "#0E387A",
                      }}
                    >
                      are in your area
                    </td>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 400,
                        color: "#359BBF",
                      }}
                    >
                      Don't be scared! CEOs are people too. You'll have a better chance with decently-higher up people, so maybe don't contact all the CEOs in San Francisco. LinkedIn is great for finding names for the mid-range of important people.
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 700,
                        color: "#0E387A",
                      }}
                    >
                      have sponsored similar events
                    </td>
                    <td
                      style={{
                        border: "1px solid #0E387A",
                        padding: "1.6vh 1.5vw",
                        verticalAlign: "top",
                        fontWeight: 400,
                        color: "#359BBF",
                      }}
                    >
                      Look at Devpost, MLH, and even something like your school boosters
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>

            {/* prospectus */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 3. </span>
                <span style={{ color: "#359BBF" }}> Writing your Prospectus </span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Checkout the 
                <a
                  href="sunbeam.hackclub.com/organizers/resources"
                  className="text-orange-dark underline hover:decoration-wavy"
                >
                  Resources Tab
                </a>
                for prospectus examples! Don't copy them word for word. Customize it to YOUR event! <br/>
                <br/>
                  A prospectus is a 2-4 page document that essentially contains everything a sponsor needs to know about your event and why/how they should support it.
                  <br/><br/>
                  Note: We’re a 501(c)(3) nonprofit organization! <strong>US companies</strong> have tax-reduction benefits. 
                </p>
            </div>

            {/* email */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 4. </span>
                <span style={{ color: "#359BBF" }}> Email time </span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Send the prospectus for the 2nd email (let them know you have one in the first email, but do NOT send it in the first email)! REPLY QUICKLY. DO NOT leave them for more than three hours, reply WITHIN THE DAY. <br/>
                <br/>
                Don’t overwhelm them with information. Try to jump on a call or meet them in person to explain everything. Emails are easy to refuse, but a puppy-eyed teen? Not as much.  
              </p>
            </div>

            {/* follow up */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 5. </span>
                <span style={{ color: "#359BBF" }}> Follow up </span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                It is pretty common to get ghosted but being persistent can help a lot! Keep it Short ‘n Sweet. <br/>
                <br/>
                Reply to the original email thread OR send a new email.
              </p>
              <div style={{ background: "#9CD4E7", padding: "2.5vh 3vw", borderRadius: "10px", marginLeft: "3vw" }}>
                <p style={{ fontSize: "2.33vw", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
                  Example Follow up Email:
                </p>
                <p style={{ fontSize: "1.9vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
                  Hi [name], 

                  Just wanted to follow up and make sure you received our previous email. <br/>
                  <br/>
                  Please let me know if you have any questions. I'd love to jump in a call and discuss details/constraints! If [company] can't host us, no worries. 
                  <br></br><br></br>
                  Thank you again, <br></br>
                  [name]
                </p>
                </div> 
            </div>

            {/* repeat */}
            <div className="galindo text-center pt-[5vh] pb-[3vh]">
              <p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
                <span style={{ color: "#C54390" }}> 6. </span>
                <span style={{ color: "#359BBF" }}> Repeat </span>
              </p>
            </div>
            <div style={{ padding: "0 7.4% 4vh" }}>
              <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
                Email as many sponsors as possible. It shouldn't be your first priority, but more money does give you freedom to buy better food, prizes, and merch.
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