import DocsPage from "../_components/DocsPage";

export default function DocsVenue() {
  return (
    <DocsPage>
      <div>
        
        <p className="galindo text-center pt-[6vh] pb-[4vh]" style={{ fontSize: "3.10em", color: "#D88127", lineHeight: 1.2 }}>
          Getting Money
        </p>

        {/* txt box w ray */}
        <div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
          <div className="relative rounded-3xl bg-white text-center w-full" style={{ border: "0.25em solid #0E387A", padding: "3.5em 5em" }}>
            <p style={{ fontSize: "1.94em", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
              Welcome to the trenches of sponsorship. You’ll likely send a ridiculous number of emails over the next month. No worries! We got your back.
            </p>
            <div style={{ position: "absolute", bottom: "-1em", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "1em solid transparent", borderRight: "1em solid transparent", borderTop: "1em solid #0E387A" }} />
            <div style={{ position: "absolute", bottom: "-0.75em", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "1em solid transparent", borderRight: "1em solid transparent", borderTop: "1em solid white", zIndex: 1 }} />
          </div>
        </div>
        <div className="flex justify-center pt-[7vh] pb-[3vh]">
          <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22em" }} className="object-contain" />
        </div>
        <p style={{ fontSize: "1.94em", color: "#D88127", lineHeight: 1.6, marginBottom: "2vh" }}>
          Note: sponsorship is not absolutely necessary for your event, but it can help make your event even cooler!
        </p>

        {/* budeget */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> 1. </span>
            <span style={{ color: "#359BBF" }}> Making a Budget </span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Checkout the{" "}
            <a
              href="/organizers/resources"
              className="text-orange-dark underline hover:decoration-wavy"
            >
              Resources Tab
            </a>{" "}
            for budget templates! <br/>
            <br/>
            Keep track of every single item you plan to buy for your event, and make sure you update it after you make purchases (especially if taxes raise the cost). <br/>
            Search up snack prices on Amazon and Costco, make sure the price per person doesn’t get too high. <br/><br/>
            Keep track of how much you’re spending per unit and per person. If a 36-pack of chips costs $50, each bag of chips costs ~$1.4. This unit price helps keep things in perspective and helps you decide what to keep and what to not get.
          </p>
        </div>

        {/* companies */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
            <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
              <span style={{ color: "#C54390" }}>2.</span>
              <span style={{ color: "#359BBF" }}> Find Companies</span>
            </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Start small. One of the BIGGEST mistakes first-time hackathon organizers make is to cold email the biggest companies they can think of (intel, microsoft, etc). This won’t work 99% of the time unless you have a good contact. <br/>
            <br/>
            Chances are, there are a ton of local companies you’ve never heard of that would be more than happy to sponsor and have a surprising amount of money to spare. It also doesn’t just have to be tech companies! Reach out to restaurants, small businesses, bakeries, and community-oriented businesses. <br/>
              <br/> 
            Where to start? <br/>
            Companies that:

            
          </p>

          <div style={{ padding: "0 7.4% 4vh" }}>
          <div
            className="grid-cols-1 sm:grid-cols-2"
            style={{
              display: "grid",
              width: "100%",
              borderCollapse: "collapse",
              border: "0.05em solid #0E387A",
              fontSize: "2.03em",
              lineHeight: 1.5,
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 700,
                color: "#0E387A",
              }}
            >
              you have connections to
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 400,
                color: "#359BBF",
              }}
            >
              Start here! (Parents' work, your job, your friends' work, etc. Every adult you know works at a company, use it.)
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 700,
                color: "#0E387A",
              }}
            >
              align with the mission
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 400,
                color: "#359BBF",
              }}
            >
              If your event is about coding education and getting, find edtech companies
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 700,
                color: "#0E387A",
              }}
            >
              are in your area
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 400,
                color: "#359BBF",
              }}
            >
              Don't be scared! CEOs are people too. You'll have a better chance with decently-higher up people, so maybe don't contact all the CEOs in San Francisco. LinkedIn is great for finding names for the mid-range of important people.
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 700,
                color: "#0E387A",
              }}
            >
              have sponsored similar events
            </div>
            <div
              style={{
                border: "0.05em solid #0E387A",
                padding: "1.6vh 1.5em",
                verticalAlign: "top",
                fontWeight: 400,
                color: "#359BBF",
              }}
            >
              Look at Devpost, MLH, and even something like your school boosters
            </div>
          </div>
        </div>
        </div>

        {/* prospectus */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> 3. </span>
            <span style={{ color: "#359BBF" }}> Writing your Prospectus </span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Checkout the{" "}
            <a
              href="/organizers/resources"
              className="text-orange-dark underline hover:decoration-wavy"
            >
              Resources Tab
            </a>{" "}
            for prospectus examples! Don't copy them word for word. Customize it to YOUR event! <br/>
            <br/>
              A prospectus is a 2-4 page document that essentially contains everything a sponsor needs to know about your event and why/how they should support it.
              <br/><br/>
              Note: We’re a 501(c)(3) nonprofit organization! <strong>US companies</strong> have tax-reduction benefits. 
            </p>
        </div>

        {/* email */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> 4. </span>
            <span style={{ color: "#359BBF" }}> Email time </span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Send the prospectus for the 2nd email (let them know you have one in the first email, but do NOT send it in the first email)! REPLY QUICKLY. DO NOT leave them for more than three hours, reply WITHIN THE DAY. <br/>
            <br/>
            Don’t overwhelm them with information. Try to jump on a call or meet them in person to explain everything. Emails are easy to refuse, but a puppy-eyed teen? Not as much.  
          </p>
        </div>

        {/* follow up */}
        <div className="galindo text-center pt-[5vh] pb-[3vh]">
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> 5. </span>
            <span style={{ color: "#359BBF" }}> Follow up </span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            It is pretty common to get ghosted but being persistent can help a lot! Keep it Short ‘n Sweet. <br/>
            <br/>
            Reply to the original email thread OR send a new email.
          </p>
          <div style={{ background: "#9CD4E7", padding: "2.5vh 3em", borderRadius: "1em", marginLeft: "3em" }}>
            <p style={{ fontSize: "2.33em", fontWeight: 800, color: "#D88127", lineHeight: 1.6 }}>
              Example Follow up Email:
            </p>
            <p style={{ fontSize: "1.9em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3em" }}>
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
          <p style={{ fontSize: "2.91em", lineHeight: 1.3 }}>
            <span style={{ color: "#C54390" }}> 6. </span>
            <span style={{ color: "#359BBF" }}> Repeat </span>
          </p>
        </div>
        <div style={{ padding: "0 7.4% 4vh" }}>
          <p style={{ fontSize: "2.33em", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "2.4vh" }}>
            Email as many sponsors as possible. It shouldn't be your first priority, but more money does give you freedom to buy better food, prizes, and merch.
          </p>
        </div>

      </div>
    </DocsPage>
  );
}