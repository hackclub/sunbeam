export default function GuideContent() {
	return (
		<div
			className="outfit w-full"
			style={{
				backgroundColor: "rgb(250,240,212)",
				backgroundImage: "url('/imgs/sand4.png')",
				backgroundSize: "100% auto",
				backgroundRepeat: "repeat-y",
			}}
		>

			{/* SECTION 1: HEADER */}
			<div className="text-center pt-[6vh] pb-[4vh]">
				<p className="galindo" style={{ fontSize: "3.10vw", color: "#359BBF", lineHeight: 1.2 }}>
					QUICKSTART GUIDE
				</p>
				<p className="galindo" style={{ fontSize: "2.33vw", color: "#72BFDA", lineHeight: 1.2 }}>
					(very important!!)
				</p>
			</div>

			{/* SECTION 2: WELCOME BOX */}
			<div className="flex justify-center mb-[1vh]" style={{ padding: "0 7.2%" }}>
				<div
					className="relative rounded-3xl bg-white text-center w-full"
					style={{ border: "4px solid #0E387A", padding: "3.5vw 5vw" }}
				>
					<p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, marginBottom: "2vh" }}>
						Welcome welcome welcome! This page is a very brief guide that you can read to get an idea of what to expect as an organizer.
					</p>
					<p style={{ fontSize: "1.94vw", color: "#0E387A", lineHeight: 1.6, fontWeight: 700 }}>
						Once you read this guide you'll be able to sign up to host your own Sunbeam Social!
					</p>
					<div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: "28px solid #0E387A" }} />
					<div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "23px solid white", zIndex: 1 }} />
				</div>
			</div>

			{/* SECTION 3: RAY + REWARDING */}
			<div className="flex justify-center pt-[7vh] pb-[3vh]">
				<img src="/imgs/guide/ray.png" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
			</div>

			<div className="text-center pb-[3vh]" style={{ padding: "0 9.1% 3vh" }}>
				<p style={{ fontSize: "2.33vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
					Organising a Sunbeam is gonna be very rewarding because:
				</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "0 9.1%", gap: "4vh 4vw", marginBottom: "4vh" }}>
				{[
					{ img: "rewarding-1.png", caption: "you'll meet so many different people" },
					{ img: "rewarding-3.png", caption: "you'll enjoy snacks and food that YOU pick (leave some for the attendees tho hahaa)" },
					{ img: "rewarding-2.png", caption: "you'll make new professional connections with venues + sponsors" },
					{ img: "rewarding-4.png", caption: "you get to hang out with friends !!" },
				].map(({ img, caption }, i) => (
					<div key={i} className="flex flex-col items-center">
						<img
							src={`/imgs/guide/${img}`}
							alt=""
							className="w-full"
							style={{aspectRatio: "350/230" }}
						/>
						<p className="text-center mt-[1.5vh]" style={{ fontSize: "1.55vw", color: "rgb(46,88,155)"}}>
							{caption}
						</p>
					</div>
				))}
			</div>

			<div className="text-center pb-[5vh]" style={{ padding: "0 9.1% 5vh" }}>
				<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
					BUT there are things that absolutely must be done before so you can enjoy the event on the day.
				</p>
			</div>

			{/* SECTION 4: PART ZERO */}
			<div className="galindo text-center pt-[5vh] pb-[3vh]">
				<p style={{ fontSize: "2.91vw", lineHeight: 1.3, marginBottom: "3vh" }}>
					<span style={{ color: "#C54390" }}>PART ZERO:</span>
					<span style={{ color: "#359BBF" }}> WHAT IS A SOCIAL CODING EVENT?!</span>
				</p>
			</div>

			<div style={{ display: "flex", padding: "0 7.4% 5vh", gap: "3vw", alignItems: "flex-start"}}>
				<div style={{ flex: "1 1 0", minWidth: 0 }}>
					<p style={{ fontSize: "2.33vw", color: "rgb(46,88,155)", lineHeight: 1.7, marginBottom: "6vh" }}>
						Now, one big reason that there aren't that many girls doing software or hardware is because it sometimes seems very "nerdy" or "masculine" or intimidating to join. (We know this isn't true 😉) SO we decided to run Sunbeam socials!
					</p>
					<p style={{ fontSize: "2.33vw", color: "rgb(46,88,155)", lineHeight: 1.7, marginBottom: "6vh" }}>
						<strong>Sunbeam is a social coding event:</strong> a day-long hangout where girls can make projects together, chat with friends and new people, learn to code FROM SCRATCH, and of course enjoy delicious food.
					</p>
					<p style={{ fontSize: "2.33vw", color: "rgb(46,88,155)", lineHeight: 1.7, marginBottom: "5vh" }}>
						We want every Sunbeam social to have a friendly, chill, and supportive environment that helps even complete beginners make something they're proud of.
					</p>
					<p style={{ fontSize: "2.33vw", color: "rgb(46,88,155)", lineHeight: 1.7 }}>
						This event is more of a <strong>SOCIAL coding get together</strong> than a hackathon!!!
					</p>
				</div>
				<div style={{ flexShrink: 0, width: "19vw", background: "#FBF0F3", display: "flex", flexDirection: "column", gap: "1vh", padding: "1vw", border: "2px solid #0E387A", transform: "rotate(5deg)", transformOrigin: "top center", position: "relative", left: '5vw' }}>
					{[1, 2, 3, 4, 5].map((n) => (
						<img
							key={n}
							src={`/imgs/guide/sidebar-${n}.png`}
							alt=""
							style={{ width: "100%", display: "block", position: "relative", right: '0.4vw', transform: "rotate(-2deg)", transformOrigin: "top center"  }}
						/>
					))}
				</div>
			</div>

			{/* SECTION 5: PART ONE - SETTING UP */}
			<div className="galindo text-center pt-[5vh] pb-[3vh]">
				<p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART ONE:</span>
					<span style={{ color: "#359BBF" }}> SETTING UP</span>
				</p>
			</div>

			<div style={{ padding: "4vh 7.4%" }}>

				{/* Step 1: Slack */}
				<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "5vh" }}>
					<div style={{ flex: "1 1 0" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#000000", lineHeight: 1.4, marginBottom: "1.5vh" }}>
							1) JOIN HACK CLUB SLACK!! And the #sunbeam channels:
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							<strong>SUPER IMPORTANT!!</strong> Slack is how we communicate with organisers. If your city doesn't have a Sunbeam channel yet, make one (in the format: #sunbeam-city, e.g. #sunbeam-london).
						</p>
					</div>
					<div style={{ flexShrink: 0, width: "12vw" }}>
						<img src="/imgs/guide/hcflag.png" alt="Hack Club flag" style={{ width: "100%" }} />
					</div>
				</div>

				{/* Step 2: Team */}
				<div style={{ marginBottom: "5vh" }}>
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
								2) (avengers) Assemble a team of 3-6 organisers!
							</p>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh" }}>
								Reach out to people you enjoy working with! Start with a slack channel and a shared to-do list (including steps in this guide!) Delegate tasks based on what people want to do.
							</p>
						</div>
						<div style={{ flexShrink: 0, width: "40.5vw" }}>
							<img src="/imgs/guide/team-photo.png" alt="Team photo" style={{ width: "100%", display: "block" }} />
						</div>
					</div>
					<p style={{ fontSize: "2.04vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "3vh" }}>
						Just remember - other people will be filling this form out too, so if you don't know that many girls in your area yet, we'll help you find them! And one more thing: if your friends aren't very technical or coding-oriented, they can volunteer on the day to help the event run smoothly.
					</p>

					{/* YUP/NOPE table */}
					<div style={{ border: "2px solid #0E387A", marginBottom: "3vh" }}>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
							<div style={{ background: "rgba(243,147,180,1)", padding: "0 2vw", height: "150px", display: "flex", alignItems: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A" }}>YUP ✅</p>
							</div>
							<div style={{ background: "rgba(249,166,54,1)", padding: "0 2vw", height: "150px", display: "flex", alignItems: "center", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A" }}>NOPE ❌</p>
							</div>
							<div style={{ background: "white", padding: "2vh 2vw", borderRight: "2px solid #0E387A" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
									Diverse set of skills (ex: Sponsorship, Web Dev, Marketing, Web Dev for workshops)
								</p>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
									Good vibes and willing to put 100x enthusiasm for the day-of
								</p>
							</div>
							<div style={{ background: "white", padding: "2vh 2vw" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
									Creating a huge team (inefficient)
								</p>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
									Too small of a team (NOT 1 person)
								</p>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
									Trying to organise everything with fancy project management tools
								</p>
							</div>
						</div>
					</div>

					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
						I'd HIGHLY suggest meeting your team in-person or doing calls often to get to know everyone. Good vibes = happy team = fun organising.
					</p>
				</div>

				{/* Step 3: Custom email + HCB */}
				<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "5vh" }}>
					<div style={{ flex: "1 1 0" }}>
						<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
							3) Get a custom email and HCB
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#000000", lineHeight: 1.6, marginBottom: "1.5vh" }}>
							Want a city@sunbeam.hackclub.com email? This will be coming to event PoCs soon! This is a shared Google Workspace account that the team can use to send out mass, personalised communications to attendees, and should be the contact email listed on your website so people can ask you questions.
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#000000", lineHeight: 1.6 }}>
							You will also receive an email to activate your very own HCB account to manage your Sunbeam event's finances. Make sure to keep an eye on your inbox to receive these important updates!!!
						</p>
					</div>
					<div style={{ flexShrink: 0, width: "18vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
						<img src="/imgs/guide/hcb-setup.png" alt="HCB setup" style={{ width: "100%" }} />
						<img src="/imgs/guide/hcb-logo.png" alt="HCB logo" style={{ width: "8vw" }} />
					</div>
				</div>

				{/* Step 4: Website */}
				<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "5vh" }}>
					<div style={{ flex: "1 1 0" }}>
						<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
							4) Setup YOUR Sunbeam website:
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Individual city website templates will be sent out where you can then customize the schedule and sponsor list.
						</p>
					</div>
					<div style={{ flexShrink: 0, width: "30vw" }}>
						<img src="/imgs/guide/website-template.png" alt="Website template" style={{ width: "100%" }} />
					</div>
				</div>

				{/* Step 5: Budget */}
				<div>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						5) Make a Budget (template here)
					</p>
					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2vh" }}>
						A good Sunbeam social generally only needs three things: Food Food Food (Please buy water if needed) … And maybe supplies. ;)
					</p>
					<p style={{ fontSize: "2.62vw", fontWeight: 600, color: "#0E387A", lineHeight: 1.4, marginBottom: "2vh" }}>
						But a GREAT Sunbeam social needs:
					</p>

					{/* Budget item boxes */}
					<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2vh 2vw", marginBottom: "3vh" }}>
						{[
							"GOOD FOOD (Chipotle, CAVA, snacks, drinks...)",
							"Merch!!",
							"Supplies (power strips, tablecloths, surprizes, etc.)",
							"Prizes",
							"Venue Decorations",
						].map((item, i) => (
							<div
								key={i}
								style={{ border: "2px solid #0E387A", padding: "2vh 1.5vw", background: "white", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
							>
								<p style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.5 }}>{item}</p>
							</div>
						))}
					</div>

					{/* Budget photos 3+2 */}
					<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5vw", marginBottom: "2vh" }}>
						{[1, 2, 3].map((n) => (
							<img key={n} src={`/imgs/guide/budget-${n}.png`} alt="" style={{ width: "100%", display: "block" }} />
						))}
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5vw", marginBottom: "3vh", padding: "0 16.7%" }}>
						{[4, 5].map((n) => (
							<img key={n} src={`/imgs/guide/budget-${n}.png`} alt="" style={{ width: "100%", display: "block" }} />
						))}
					</div>

					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
						Track your cost PER ATTENDEE. This will help prevent you from spending too much! Well-planned budgets have: "Cost per Attendee" column for each item. Must be done by [DATE TBD]. (but ideally finished AT LEAST two weeks earlier) Estimate your attendees as 50% of total signups. Half of the people who sign up don't show up! (unfortunately ☹️)
					</p>

					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1vh" }}>
						Payouts FROM US!!
					</p>
					<p className="text-center" style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1vh" }}>
						$/Signup is based on the number of signups you have.
					</p>
					<p className="text-center" style={{ fontSize: "1.74vw", fontWeight: 400, color: "#359BBF", lineHeight: 1.4, marginBottom: "3vh" }}>
						These rates are for North America: more guidance on international payouts coming soon
					</p>

					{/* Payout table */}
					<div style={{ border: "2px solid #0E387A", marginBottom: "2vh" }}>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
							<div style={{ background: "rgba(243,147,180,1)", padding: "0 2vw", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "2.33vw", fontWeight: 500, color: "rgb(46,88,155)", textAlign: "center" }}># of signups</p>
							</div>
							<div style={{ background: "rgba(249,166,54,1)", padding: "0 2vw", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "2.33vw", fontWeight: 500, color: "rgb(46,88,155)", textAlign: "center" }}>$/Signup</p>
							</div>
						</div>
						{[["0-59", "$8.50"], ["60-119", "$10.00"], ["120+", "$12.00"]].map(([range, rate], i) => (
							<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
								<div style={{ padding: "2vh 2vw", textAlign: "center", borderRight: "2px solid #0E387A", borderTop: "2px solid #0E387A" }}>
									<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{range}</p>
								</div>
								<div style={{ padding: "2vh 2vw", textAlign: "center", borderTop: "2px solid #0E387A" }}>
									<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{rate}</p>
								</div>
							</div>
						))}
					</div>

					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
						That's a lot of moola! Outreach to your community will be your BFF for this!
					</p>
				</div>
			</div>

			{/* PART TWO HEADER */}
			<div style={{ background: "#359BBF", padding: "2vh 5vw", textAlign: "center" }}>
				<p className="outfit" style={{ fontSize: "2.91vw", fontWeight: 400, color: "white" }}>
					PART TWO: LOCK IN!!
				</p>
			</div>

			<div style={{ padding: "4vh 7.4% 5vh" }}>

				{/* 1) Venue */}
				<div style={{ marginBottom: "5vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						1) Finding a home... (Venue)
					</p>
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "2vh" }}>
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2vh" }}>
								Your Sunbeam social cannot happen if you don't have a venue. You could have a million dollars in sponsors but none of it matters if you have nowhere to host your participants. Finding a venue is arguably the most important part of hosting a hackathon. Lock in.
							</p>
						</div>
						<div style={{ flexShrink: 0, width: "18.1vw" }}>
							<img src="/imgs/guide/venue.png" alt="Venue" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					{/* Callout box + shark */}
					<div style={{ position: "relative", marginBottom: "2vh", minHeight: "12vw" }}>
						<img
							src="/imgs/guide/shark.png"
							alt="Shark"
							style={{ position: "absolute", left: 0, bottom: 0, width: "33.7vw", zIndex: 0 }}
						/>
						<div style={{ display: "flex", justifyContent: "flex-end", position: "relative", zIndex: 1, marginBottom: "2vh" }}>
							<div
								style={{ border: "4px solid #0E387A", background: "white", padding: "2.5vh 3vw", width: "59.4vw", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "157px" }}
							>
								<p style={{ fontSize: "2.33vw", fontWeight: 800, color: "rgb(216,129,39)", textAlign: "center", lineHeight: 1.4 }}>
									This should be your first priority!!!
								</p>
							</div>
						</div>
					</div>

					<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2vh" }}>
						Reach out to cafes, makerspaces, libraries, and even your school if you're in a pinch.
					</p>

					{/* Blue callout box */}
					<div style={{ background: "rgba(161,214,233,1)", padding: "2.5vh 3vw", border: "2px solid #0E387A" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
							<strong>What makes an awesome venue:</strong> It's free!! Don't drop $5000 on a venue that's 2 rooms and a couch. Roomy (Minimum: One main space, small organiser room, washrooms, TV/projector, speakers/PA)
						</p>
					</div>
				</div>

				{/* 2) Get moneyyyy */}
				<div style={{ marginBottom: "5vh" }}>
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "2vh" }}>
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
								2) Get moneyyyy
							</p>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								Raising money can be one of the most tricky parts of running a hackathon! You may ask: "But I'm not an English student…I can't write emails!" (don't worry, we have templates!)
							</p>
						</div>
						<div style={{ flexShrink: 0, width: "26vw" }}>
							<img src="/imgs/guide/sponsors-ai.png" alt="Sponsors" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					<p className="text-center galindo" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.4, marginBottom: "3vh" }}>
						Here's how to start:
					</p>

					{/* 3 columns of sponsor list items */}
					<div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0 2vw", marginBottom: "3vh", alignItems: "start" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Compile a list of companies your team have personal connections with. (ex: parents, mentors, club leaders)
						</p>
						<p style={{ fontSize: "2.52vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, width: "21.3vw" }}>
							Make a list of tech companies of all sizes with offices/hq near you.
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Compile a list of food companies. INCLUDING smaller businesses and ones that have done charity stuff before.
						</p>
					</div>

					{/* Surfboard + text — surfboard in flow so parent gets its height */}
					<div style={{ position: "relative", marginBottom: "3vh" }}>
						<img
							src="/imgs/guide/surfboard-yellow.png"
							alt=""
							style={{ width: "52.7vw", display: "block" }}
						/>
						<div style={{ position: "absolute", left: "5vw", top: "50%", transform: "translateY(-50%)", width: "40vw" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.5 }}>
								Everyone on your team can definitely get at least one sponsor!
							</p>
						</div>
						<div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "42.7vw" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								Spreadsheets will save you for this, and you can delegate one person to find contacts, one person to email, etc.
							</p>
						</div>
					</div>
				</div>

				{/* 3) Outreach */}
				<div>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						3) Outreach
					</p>
					<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "3vh" }}>
						Outreach is an ESSENTIAL part of hackathons. No participants → No event. But how do you reach the ✨right people?✨
					</p>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-1.png" alt="" style={{ width: "100%", display: "block" }} />
						</div>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0" }}>
							Email CS teachers: Make a video with your team and ask them to CC their students or post in their announcements app!
						</p>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0" }}>
							Email local organizations and clubs: Robotics teams, your student council, CS clubs, etc
						</p>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-3.png" alt="" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-2.png" alt="" style={{ width: "100%", display: "block" }} />
						</div>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0" }}>
							Print out posters and put them up at schools, libraries, even the gym or your car windows.
						</p>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0" }}>
							Post in parent group chats! Facebook, Whatsapp, WeChat. This is VERY effective in reaching beginners.
						</p>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-5.png" alt="" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
						Post on Instagram and social media! This is where people can discover your event. AND people will trust your event more if they see it's on instagram and has nice branding.
					</p>
				</div>
			</div>

			{/* PART THREE HEADER */}
			<div style={{ background: "#C54390", padding: "2vh 5vw", textAlign: "center" }}>
				<p className="outfit" style={{ fontSize: "2.91vw", fontWeight: 400, color: "white" }}>
					PART THREE: THE DAY OF 🌟
				</p>
			</div>

			<div style={{ padding: "4vh 7.4% 5vh" }}>
				<div style={{ marginBottom: "4vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						1) Make a run of show...
					</p>
					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh" }}>
						Run of show = time block it. You need to know what your organisers are doing and when, which will save time running from room to room to find each other.
					</p>
					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
						PLEASE leave a 30 minute window after submissions are due for last-minute issues. Trust us. (see a sample run of show here.)
					</p>
				</div>

				<div style={{ marginBottom: "4vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						2) Run an awesome event!
					</p>
					<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2.5vh" }}>
						Key rules for organizers (Please read OUT LOUD with your team on a team sync or the morning of the event):
					</p>

					{/* Yellow rules box */}
					<div style={{ background: "rgba(255,226,142,0.7)", padding: "4vh 4vw", margin: "0 auto", maxWidth: "74.8vw" }}>
						<p style={{ fontSize: "2.18vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.8, marginBottom: "2.5vh" }}>
							<strong>100x your energy:</strong> know that one barista who smiles at you and always looks like they just met Olivia Rodrigo? Be exactly that. Extroverted to the point of too much. You want participants to have an "out of this world" experience 🥹
						</p>
						<p style={{ fontSize: "2.18vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.8, marginBottom: "2.5vh" }}>
							<strong>No phones allowed!</strong> DO NOT use your phone in front of participants – no matter what. When you want to use it, go to the washrooms, organizers' room, HQ's basement…
						</p>
						<p style={{ fontSize: "2.18vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.8, marginBottom: "2.5vh" }}>
							<strong>EVERYONE has to ship</strong> If you have 10 teams at your hackathon, all 10 must have a project that's visitable by anyone. If a team doesn't "ship" a project (meaning Podium doesn't approve it), then they can't get ANY merch. No t-shirt, no hoodie, no beanie, no squishmallow (whatever you end up doing). This is the best way to get people to make real stuff!!
						</p>
						<p style={{ fontSize: "2.18vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.8 }}>
							We are aiming for 100% ship rates. If your event has a ship rate less than 70%, you ran a subpar event and that reflects on you, the point of contact. We chose you because we trusted you to run a good event.
						</p>
					</div>
				</div>
			</div>

			{/* RESOURCES + SUPPORT */}
			<div style={{ padding: "0 7.4% 5vh" }}>
				<p style={{ fontSize: "2.62vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
					Resources + Support
				</p>
				<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh" }}>
					Organizing Sunbeam is going to be one of the hardest things you've done so far. The Hack Club team is here to support you through the process, and promise to be reliable partners while you work on Sunbeam!
				</p>
				<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
					That being said, Hack Club HQ is not organizing this event directly. We will do everything we can to help you have great ownership, but we expect you to take ownership of your event, be proactive, reach out to us when you need support and be an equally reliable partner.
				</p>

				{/* Support table */}
				<div style={{ border: "2px solid #0E387A" }}>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
						<div style={{ background: "rgb(249,166,54)", padding: "0 2vw", height: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Contact method</p>
						</div>
						<div style={{ background: "rgb(249,166,54)", padding: "0 2vw", height: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Expected response time</p>
						</div>
						<div style={{ background: "rgb(249,166,54)", padding: "0 2vw", height: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>When to use</p>
						</div>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "2px solid #0E387A" }}>
						<div style={{ background: "white", padding: "2.5vh 2vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								Asking a question in #sunbeam-help in the Hack Club Slack.
							</p>
						</div>
						<div style={{ background: "white", padding: "2.5vh 2vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								24 hours or less.
							</p>
						</div>
						<div style={{ background: "white", padding: "2.5vh 2vw" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								Any general questions! Especially useful for things that other Subeamers can answer for you.
							</p>
						</div>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
						<div style={{ background: "white", padding: "2.5vh 2vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								Requesting a 30-minute call with a Sunbeam team member.
							</p>
						</div>
						<div style={{ background: "white", padding: "2.5vh 2vw", borderRight: "2px solid #0E387A" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								You can usually book a call 3-4 days in advance! This will vary for who you need to talk to.
							</p>
						</div>
						<div style={{ background: "white", padding: "2.5vh 2vw" }}>
							<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								For more complicated situations that need context, or when you need to get back on track with the help of someone experienced.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* WHAT'S NEXT */}
			<div style={{ padding: "0 7.4% 6vh" }}>
				<p style={{ fontSize: "2.62vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
					What's next?
				</p>
				<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.7 }}>
					Thank you so much for reading this short guide. We would really appreciate any feedback in #sunbeam-organizers, and we're super excited to work with you soon. In the meantime, relax, read the full Ultimate Organizer's Guide, and remember: You're not just building a coding event. You're building a space where girls might code their very first project. Meet their best friend. Find their love ♥️ (for tech). You're building a space where girls will feel welcome. That's our Sunbeam. And we're so, so excited to see what you'll build. Written by: Safia and Yanella, with the help of Deven.
				</p>
			</div>

			{/* FOOTER */}
			<img src="/imgs/guide/footer.png" className="w-full block" alt="" />

		</div>
	);
}
