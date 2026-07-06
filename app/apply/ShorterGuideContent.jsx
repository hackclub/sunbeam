export default function ShorterGuideContent() {
	return (
		<div
			className="outfit w-full"
			style={{
				backgroundColor: "rgb(250,240,212)",
				backgroundImage: "url('/imgs/sand4.webp')",
				backgroundSize: "100% auto",
				backgroundRepeat: "repeat-y",
			}}
		>

			{/* SECTION 1: HEADER */}
			<div className="text-center pt-[6vh] pb-[4vh]">
				<p className="galindo" style={{ fontSize: "3.10vw", color: "#359BBF", lineHeight: 1.4 }}>
					(SHORTENED) QUICKSTART GUIDE
				</p>
				<p className="galindo" style={{ fontSize: "2.33vw", color: "#72BFDA", lineHeight: 1.4 }}>
					(very important!!)
				</p>
			</div>

			{/* SECTION 2: WELCOME BOX */}
			<div className="flex justify-center mb-[1vh] w-[100vw]" style={{ padding: "0 7.2%"}}>
				<div
					className="relative rounded-3xl bg-white text-center"
					style={{ border: "4px solid #0E387A", padding: "2vw", width: "60vw" }}
				>
					<p style={{ fontSize: "1.6vw", color: "#0E387A", lineHeight: 1, marginBottom: "1.5vh" }}>
						Welcome welcome welcome! This page is a very brief guide that you can read to get an idea of what to expect as an organizer.
					</p>
					<p style={{ fontSize: "1.6vw", color: "#0E387A", lineHeight: 1, fontWeight: 700 }}>
						Once you read this guide you'll be able to sign up to host your own Sunbeam Social!
					</p>
					<div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
					<div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
				</div>
			</div>

			{/* SECTION 3: RAY + REWARDING */}
			<div className="flex justify-center pt-[7vh] pb-[3vh]">
				<img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "10vw" }} className="object-contain" />
			</div>

			<div className="text-center pb-[3vh]" style={{ padding: "0 9.1% 3vh" }}>
				<p style={{ fontSize: "2.1vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
					Organizing a Sunbeam is gonna be very rewarding because:
				</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "0 9.1%", gap: "2vw", marginBottom: "4vh" }}>
				{[
					{ img: "rewarding-1.webp", caption: "you'll meet so many different people" },
					{ img: "rewarding-3.webp", caption: "you'll enjoy snacks and food that YOU pick (leave some for the attendees tho hahaa)" },
					{ img: "rewarding-2.webp", caption: "you'll make new professional connections with venues + sponsors" },
					{ img: "rewarding-4.webp", caption: "you get to hang out with friends !!" },
				].map(({ img, caption }, i) => (
					<div key={i} className="flex flex-col items-center">
						<img
							src={`/imgs/guide/${img}`}
							alt=""
							style={{ width: "100%", height: "auto", display: "block" }}
						/>
						<p className="text-center mt-[1vh]" style={{ fontSize: "1.3vw", color: "rgb(46,88,155)"}}>
							{caption}
						</p>
					</div>
				))}
			</div>

			<div className="text-center" style={{ padding: "0 9.1% 2vh" }}>
				<p style={{ fontSize: "1.4vw", fontWeight: 500, color: "rgb(46,88,155)", lineHeight: 1.9 }}>
					BUT there are things that absolutely must be done before so you can enjoy the event on the day.
				</p>
			</div>

			{/* SECTION 4: PART ZERO */}
			<div className="galindo text-center pt-[3vh] pb-[2vh]">
				<p style={{ fontSize: "2vw", lineHeight: 1.3, marginBottom: "1vh" }}>
					<span style={{ color: "#C54390" }}>PART ZERO:</span>
					<span style={{ color: "#359BBF" }}> WHAT IS A SOCIAL CODING EVENT?!</span>
				</p>
			</div>

			<div style={{ display: "flex", padding: "0 7.4% 1vh", gap: "3vw", alignItems: "flex-start"}}>
				<div style={{ flex: "1 1 0", minWidth: 0 }}>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						Now, one big reason that there aren't that many girls doing software or hardware is because it sometimes seems very "nerdy" or "masculine" or intimidating to join. (We know this isn't true 😉) SO we decided to run Sunbeam socials!
					</p>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						<strong>Sunbeam is a social coding event:</strong> a day-long hangout where girls can make projects together, chat with friends and new people, learn to code FROM SCRATCH, and of course enjoy delicious food.
					</p>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						We want every Sunbeam social to have a friendly, chill, and supportive environment that helps even complete beginners make something they're proud of.
					</p>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5 }}>
						This event is more of a <strong>SOCIAL coding get together</strong> than a hackathon!!!
					</p>
				</div>
				<div style={{ flexShrink: 0, width: "9vw", background: "#FBF0F3", display: "flex", flexDirection: "column", gap: "0.5vh", padding: "0.5vw", border: "2px solid #0E387A", transform: "rotate(5deg)", transformOrigin: "top center", position: "relative", left: '1vw', top: '-0.5vw' }}>
					{[1, 2, 3, 4, 5].map((n) => (
						<img
							key={n}
							src={`/imgs/guide/sidebar-${n}.webp`}
							alt=""
							style={{ width: "100%", display: "block", position: "relative", right: '0.1vw', transform: "rotate(-2deg)", transformOrigin: "top center"  }}
						/>
					))}
				</div>
			</div>




			{/* SECTION 5: PART ONE - SETTING UP */}
			<div className="galindo text-center pt-[1vh]">
				<p style={{ fontSize: "2vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART ONE:</span>
					<span style={{ color: "#359BBF" }}> WHAT WE PROVIDE</span>
				</p>
			</div>

			<div style={{ padding: "4vh 7.4%" }}>

				<div style={{ flex: "1 1 0", fontSize: "1.8vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.4}}>
						<p style={{ padding: "0.5vw 0"}}>
							<span style={{fontWeight: 600}}>1) THE HACK CLUB SLACK!! </span> And the #sunbeam channels - a place to ask questions and chat with others (kind of similar to discord?)
						</p>
                        <p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>2) (avengers) Assemble a team of 3-6 organizers! </span> We'll help you find girls in your area :)
						</p>
                        <p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>3) A custom city@sunbeam.hackclub.com email </span> and a HCB account to receive our funding
						</p>
                        <p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>4) A custom Sunbeam website for YOUR event </span> and help to set it up with your specific event details
						</p>
                        <p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>5) Budget templates </span> to track your costs and the money we give you :)
						</p>
                        <p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>6) Payouts FROM US!!</span> That’s right - for every signup you get for your Sunbeam Social, we’ll send you $$ to run your event!
						</p>
						<p style={{ padding: "0.5vw 0" }}>
							<span style={{fontWeight: 600}}>7) Service Hours!</span> Track how many hours you organize on a neat spreadsheet and we'll sign off on them for you to use
						</p>
				</div>
            </div>

			{/* Budget photos 3+2 with captions */}
			<div style={{marginLeft: "7.4%", marginRight: "7.4%", marginBottom: "5vh"}}>

							<div style={{ display: "flex", gap: "3vw", alignItems: "center" }}>
							{/* Left: text */}
							<div style={{ flex: "1 1 0" }}>
								<p style={{ fontSize: "2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1vh" }}>
									<strong>$/Signup</strong> is based on the <strong>number of signups you have.</strong>
								</p>
								<p style={{ fontSize: "1.74vw", fontWeight: 400, color: "#359BBF", lineHeight: 1.4, textDecoration: "underline" }}>
									These rates are for <strong>North America</strong>: more guidance on international payouts coming soon
								</p>
							</div>

							{/* Right: payout table */}
							<div style={{ flexShrink: 0, border: "2px solid #0E387A", borderRadius: "10px", overflow: "hidden", width: "30vw" }}>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div style={{ background: "rgba(243,147,180,0.65)", padding: "0 2vw", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
										<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}># of signups</p>
									</div>
									<div style={{ background: "rgba(249,166,54,0.65)", padding: "0 2vw", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
										<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>$/Signup</p>
									</div>
								</div>
								{[["0-59", "$8.50"], ["60-119", "$10.00"], ["120+", "$12.00"]].map(([range, rate], i) => (
									<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
										<div style={{ textAlign: "center", borderRight: "2px solid #0E387A", borderTop: "2px solid #0E387A", background: "rgba(255,255,255,0.65)" }}>
											<p style={{ fontSize: "2vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{range}</p>
										</div>
										<div style={{ textAlign: "center", borderTop: "2px solid #0E387A", background: "rgba(255,255,255,0.65)" }}>
											<p style={{ fontSize: "2vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{rate}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

			{/* PART TWO HEADER */}
			<div className="galindo text-center pt-[3vh]">
				<p style={{ fontSize: "2vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART TWO:</span>
					<span style={{ color: "#359BBF" }}> LOCKING IN!!</span>
				</p>
			</div>

			<div style={{ padding: "4vh 7.4%", display: "flex", alignItems: "center", gap: "3vw" }}>
				<div style={{ flex: "1 1 0", fontSize: "1.8vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.4}}>
					<p style={{ padding: "0.5vw 0"}}>
						<span style={{fontWeight: 600}}>1) Find a home... (venue) </span> This will be your top priority!
					</p>
					<p style={{ padding: "0.5vw 0" }}>
						<span style={{fontWeight: 600}}>2) Get money </span> from sponsors.
					</p>
					<p style={{ padding: "0.5vw 0" }}>
						<span style={{fontWeight: 600}}>3) Outreach </span> to girls in your area to get more signups.
					</p>
				</div>
				<img src="/imgs/guide/shark.webp" alt="" style={{ width: "18vw", flexShrink: 0 }} />
			</div>

			{/* PART THREE HEADER */}
			<div className="galindo text-center pt-[5vh] pb-[3vh]">
				<p style={{ fontSize: "2vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART THREE:</span>
					<span style={{ color: "#359BBF" }}> THE DAY OF 🌟</span>
				</p>
			</div>

			<div style={{ flex: "1 1 0", padding: "0 7.4%", fontSize: "1.8vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.4}}>
					<p style={{ padding: "0.5vw 0"}}>
						<span style={{fontWeight: 600}}>1) Make a run of show </span> so you know what your organizers are doing and when, which will save time running from room to room to find each other.
					</p>
					<p style={{ padding: "0.5vw 0" }}>
						<span style={{fontWeight: 600}}>2) Run an awesome event! </span> We'll give you the "Key rules for organizers" which you can read OUT LOUD to your team before your event.
					</p>
			</div>

			{/* RESOURCES + SUPPORT */}
			<div style={{ padding: "3vw 7.4% 5vh" }}>
				<p style={{ fontSize: "2vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
					Resources + Support
				</p>
				<p className="text-center" style={{ fontSize: "1.5vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh" }}>
					Organizing Sunbeam is going to be one of the hardest things you've done so far. The Hack Club team is here to support you through the process, and promise to be reliable partners while you work on Sunbeam!
				</p>
				<p className="text-center" style={{ fontSize: "1.5vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
					That being said, Hack Club HQ is not organizing this event directly. We will do everything we can to help you have great ownership, but we expect you to take ownership of your event, be proactive, reach out to us when you need support and be an equally reliable partner.
				</p>

				{/* Support table */}
				<div style={{ maxWidth: "60vw", margin: "0 auto", border: "2px solid #0E387A", borderRadius: "10px", overflow: "hidden" }}>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
						<div style={{ background: "rgb(249,166,54)", padding: "1vh 1vw", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.3vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Contact method</p>
						</div>
						<div style={{ background: "rgb(249,166,54)", padding: "1vh 1vw", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.3vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Expected response time</p>
						</div>
						<div style={{ background: "rgb(249,166,54)", padding: "1vh 1vw", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.3vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>When to use</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								Asking a question in #sunbeam-help in the Hack Club Slack.
							</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								24 hours or less.
							</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								Any general questions! Especially useful for things that other Sunbeamers can answer for you.
							</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								Requesting a 30-minute call with a Sunbeam team member.
							</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								3-4 days in advance, varies by who you need to talk to.
							</p>
						</div>
						<div style={{ background: "#FFC7DA", padding: "1vh 1vw" }}>
							<p style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
								Complicated situations that need context or getting back on track.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* WHAT'S NEXT */}
			<div style={{ padding: "0 7.4% 6vh" }}>
				<p style={{ fontSize: "2vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
					What's next?
				</p>
				<p className="text-center" style={{ fontSize: "1.8vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.7 }}>
					Thank you so much for reading this short guide. We would really appreciate any feedback in <a href="https://hackclub.enterprise.slack.com/archives/C0BERFQND0U" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-organizers</a>, and we're super excited to work with you soon.<br></br><br></br> Let the sun beam in your city!<br></br><br></br>
					<span style={{ fontWeight: 600 }}>Written by: Safia and Yanella, with the help of <a>Renran</a>. ♥️</span>
					<br></br><br></br>
					<span style={{ fontSize: "1.74vw", fontWeight: 700, color: "#C54390", fontStyle: "italic" }}>To continue, you'll need to sign in with Hack Club, so we can keep track of your application!</span>
				</p>
			</div>

		</div>
	);
}
