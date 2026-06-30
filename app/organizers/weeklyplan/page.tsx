import Link from "next/link";
// import GuideContent from "./GuideContent"

export default function Weeklyplan() {
    return (
        <div 
            className="outfit w-full"
			style={{
            backgroundColor: "rgb(250,240,212)",
            backgroundImage: "url('/imgs/sandNoFade.webp')",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
			}}
        >
            {/* back btn */}
            <div style={{ position: "relative", }}>
                <p className="galindo" style={{ position: "absolute", top:10, left:20, fontSize: "2.5vw", color: "#D88127", lineHeight: 1.2 }}>
					<Link href="/organizers"> ←Back</Link>
				</p>
            </div>

            {/* title */}
			<div className="text-center pt-[6vh] pb-[4vh]">
				<p className="galindo" style={{ fontSize: "2.91vw", color: "#359BBF", lineHeight: 1.2 }}>
					9 Week Organizer Plan
				</p>
			</div>

            {/* txt bubble */}
			<div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
				<div
					className="relative rounded-3xl bg-white text-center w-full"
					style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}
				>
					<p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                        Here is a rough guideline of where you should be every week until your Sunbeam social. Don’t panic if you’re a bit behind, DM someone from the team and we’ll be happy to help you!
                    </p>
					<div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
					<div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
				
                </div>   
			</div>

            {/* ray */}
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
                <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>

            <div style= {{ margin: "8rem"}}>
                {/* week1 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 1 </span><br />
                            <span style={{ color: "#359bbf" }}>July 1 - 4 </span><br />
                            <span style={{ color: "#d88127" }}>Launch! </span><br />
                        </p>
                    </div>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. sign up to be an organizer in your city! (wait for approval - you'll receive a email from us soon)<br />
                            2. once approved, join <a href="https://hackclub.enterprise.slack.com/archives/C0BCUSTJQTG" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-organizers</a>{" "}<br />
                            3. share feedback on our ULTIMATE ORGANIZER GUIDE<br />
                            4. join the very first check in call
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 2 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. sign up to be an org if you haven't already!<br />
                            2. tell your friends to sign up for their (or your) city as well<br />
                            3. read the ULTIMATE ORGANIZER GUIDE<br />
                            4. attend check-in call #2
                        </p>
                    </div>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 2 </span><br />
                            <span style={{ color: "#359bbf" }}>July 5 - 11 </span><br />
                            <span style={{ color: "#d88127" }}>Find co-orgs </span><br />
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 3 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 3 </span><br />
                            <span style={{ color: "#359bbf" }}>July 12 - 18 </span><br />
                            <span style={{ color: "#d88127", textDecoration: "line-through" }}>Avengers</span><span style={{ color: "#d88127" }}> Sunbeamers assemble! </span><br />
                        </p>
                    </div>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. sign up to be an org if you haven't already!<br />
                            2. get to know your other organizers<br />
                            3. create a canvas in your #sunbeam-city-orgs channel and add 10+ venues to email with info and contacts<br />
                            4. attend check-in call #3<br />
                            <br />
                            POC:<br />
                            1. create #sunbeam-city for your city<br />
                            2. check your emails to set up your event's HCB and custom city@sunbeam.hackclub.com email
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 4 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. email every venue in your spreadsheet (only 1 per venue tho!)<br />
                            2. start making prospectus<br />
                            3. make your event's website<br />
                            4. attend check-in call #4<br />
                            <br />
                            POC:<br />
                            1. create #sunbeam-city for your city<br />
                            2. check your emails to set up your event's HCB and custom city@sunbeam.hackclub.com email
                        </p>
                    </div>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 4 </span><br />
                            <span style={{ color: "#359bbf" }}>July 19 - 25 </span><br />
                            <span style={{ color: "#d88127" }}>venue! </span><br />
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 5 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 5 </span><br />
                            <span style={{ color: "#359bbf" }}>July 26 - 31 </span><br />
                            <span style={{ color: "#d88127" }}>venue & sponsors! </span><br />
                        </p>
                    </div>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. add 30 more venues to email<br />
                            2. finish prospectus & create a sponsor contact list<br />
                            3. make insta (and other socials!) account using your city@sunbeam.hackclub.com email<br />
                            4. start making budget<br />
                            5. attend check-in call #5
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 6 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. secure that venue!<br />
                            2. start outreach - put up 5 posters each!<br />
                            3. make 5 social media posts to advertise<br />
                            4. email 10 more sponsors and finish budget<br />
                            5. start looking for food options (and merch/prizes if you have enough moola)<br />
                            6. attend check-in call #6
                        </p>
                    </div>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 6 </span><br />
                            <span style={{ color: "#359bbf" }}>Aug 1 - 8 </span><br />
                            <span style={{ color: "#d88127" }}>venue & outreach! </span><br />
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 7 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 7 </span><br />
                            <span style={{ color: "#359bbf" }}>Aug 9 - 15 </span><br />
                            <span style={{ color: "#d88127" }}>outreach <br /> ... and food! </span><br />
                        </p>
                    </div>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. secure that venue!!!<br />
                            2. MORE outreach! - post 5 more social media posts<br />
                            3. email more sponsors & finish budget<br />
                            4. start looking for food options (and merch/prizes if you have enough moola)<br />
                            5. attend check-in call #7
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 8 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. secure that venue!!!<br />
                            2. even MORE outreach!<br />
                            3. email more sponsors & finish budget<br />
                            4. finalize food options as well as merch/prizes<br />
                            5. attend check-in call #8
                        </p>
                    </div>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 8 </span><br />
                            <span style={{ color: "#359bbf" }}>Aug 16 - 22 </span><br />
                            <span style={{ color: "#d88127" }}>outreach! </span><br />
                        </p>
                    </div>
                </div>
    <br></br>
                {/* week 9 */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Week 9 </span><br />
                            <span style={{ color: "#359bbf" }}>Aug 23 - 28</span><br />
                            <span style={{ color: "#d88127" }}>finalize everything! </span><br />
                        </p>
                    </div>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. outreach, outreach, OUTREACH!<br />
                            2. yes, even MORE outreach!<br />
                            3. finalize food options<br />
                            4. make organizer run of show<br />
                            5. attend last check-in call<br />
                            <br />
                            Make sure you have EVERYTHING you need for the social! Go check out the venue if possible and do a run-through with your orgs to map out the event. 
                        </p>
                    </div>
                </div>

                {/* sunbeam */}
                <br />
                <br />
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "66.667%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                            1. take a deep breath, you got this! <br />
                            2. read through the DAY-OF LAWS in the quickstart guide with your orgs one more time <br />
                            3. have fun : )
                        </p>
                    </div>
                    <div style={{ width: "33.333%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3, textAlign: "center" }}>
                            <span style={{ color: "#C54390" }}>Sunbeam </span><br />
                            <span style={{ color: "#359bbf" }}>Aug 29 </span><br />
                            <span style={{ color: "#d88127" }}>yay!!! </span><br />
                        </p>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div>
                <div className="flex justify-center pt-[7vh] pb-[3vh]">
                    <img src="/imgs/weeklyplan/footer.webp" alt="pics" style={{ width: "100%" }} className="object-contain" />
                </div>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh", textAlign: "center" }}>
                    Written by: Yanella and Safia ♡
                </p>
            </div>

            
        </div>
    );
};