import Link from "next/link";

export default function Faq() {
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
					<Link href="/">Back</Link>
				</p>
            </div>

            {/* title */}
			<div className="text-center pt-[6vh] pb-[4vh]">
				<p className="galindo" style={{ fontSize: "2.91vw", color: "#359BBF", lineHeight: 1.2 }}>
					Participant FAQ
				</p>
			</div>

            {/* txt bubble */}
			<div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
				<div
					className="relative rounded-3xl bg-white text-center w-full"
					style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}
				>
					<p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                        Here are some commonly asked questions for participants. Read through these first, but if you have any additional questions, don’t hesitate to reach out!					
                    </p>
					<div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
					<div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
				
                </div>   
			</div>

            {/* ray */}
            <div className="flex justify-center pt-[7vh] pb-[3vh]">
                <img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
            </div>

            {/* questions */}
            <div className="text-center pt-[5vh] pb-[3vh] max-w-4xl mx-auto px-4 md:px-8">
				<p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>What is Hack Club? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Hack Club is a US-based charity that operates all around the world to get more young people involved in tech and coding. They've run events on an island, partnered with NASA, and hosted the world's largest all-girls high school hackathon!
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>What is Sunbeam? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Sunbeam is a series of social coding events, for girls by girls, running simultaneously in 20+ cities around the world!                
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>How much will it cost? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    NOTHING!!! All Sunbeam socials will be completely FREE! We will provide food, drinks, merch and prizes.
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>I've never coded before, can I still join? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Of course! Sunbeam socials are a relaxed and supportive space for all girls with different skill-levels. We'll have workshops to learn everything you need to know!
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>Do I need a parent to come with me? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Your parents can drop you off at the venue, however no one else is allowed inside the venue other than participants for safety reasons. If you're going with friends, it can also be fun to get the train/walk together to the event together!
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>Do I need to know anyone before I go? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    No, you'll get to know everyone on the day of, but don't hesitate to chat to other girls in the Slack channels and bring your in-person friends along too!    
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>How do I join the Slack channels? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Click <a href="https://slack.hackclub.com/" style={{ textDecoration: "underline"}}>HERE</a> and join the sunbeam channels. 
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>What do I need to bring the day of my social? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Food, snacks, and drinks will be provided on the day of, but please bring a laptop/ipad and anything else you need to code like a charger, mouse, keyboard, notepad, etc.
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>What if I have allergies/dietary restrictions?</span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    One you sign up, you'll receive a check-in form where you'll be able to let the organizers know about any health concerns and dietary requirements. We'll make sure to provide food options for everyone. 
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>Are we getting prizes? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    You'll get a custom t-shirt, [company]-recognized certificate, and a bunch of other free merch just for attening! Each social will also have peer-voted winners which will get extra prizes for best project/nicest graphics/funniest ideas too!
                </p>

                <br></br>
                <br></br>

                <p className="galindo" style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>Who can join? </span>
				</p>
                <p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
                    Any girl-identifying individual aged 13-18 (inclusive) can sign up to their local Sunbeam. You don't need any previous coding experience : )
                </p>
			</div>

            {/* footer */}
            <div>
                <div className="flex justify-center pt-[7vh] pb-[3vh]">
                <img src="/imgs/faq/footer.webp" alt="pics" style={{ width: "100%" }} className="object-contain" />
            </div>
            </div>

        </div>
    );
};