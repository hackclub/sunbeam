// import Link from "next/link";
import Image from "next/image";

export default function GuideContent() {
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
				<img src="/imgs/guide/ray.webp" alt="Ray" style={{ width: "22vw" }} className="object-contain" />
			</div>

			<div className="text-center pb-[3vh]" style={{ padding: "0 9.1% 3vh" }}>
				<p style={{ fontSize: "2.33vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4 }}>
					Organizing a Sunbeam is gonna be very rewarding because:
				</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "0 9.1%", gap: "4vh 4vw", marginBottom: "4vh" }}>
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

			<div style={{ display: "flex", padding: "0 7.4% 1vh", gap: "3vw", alignItems: "flex-start"}}>
				<div style={{ flex: "1 1 0", minWidth: 0 }}>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						Now, one big reason that there aren't that many girls doing software or hardware is because it sometimes seems very "nerdy" or "masculine" or intimidating to join. (We know this isn't true 😉) SO we decided to run Sunbeam socials!
					</p>
					<br></br>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						<strong>Sunbeam is a social coding event:</strong> a day-long hangout where girls can make projects together, chat with friends and new people, learn to code FROM SCRATCH, and of course enjoy delicious food.
					</p>
					<br></br>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5, marginBottom: "1.5vh" }}>
						We want every Sunbeam social to have a friendly, chill, and supportive environment that helps even complete beginners make something they're proud of.
					</p>
					<br></br>
					<p style={{ fontSize: "1.72vw", color: "rgb(46,88,155)", lineHeight: 1.5 }}>
						This event is more of a <strong>SOCIAL coding get together</strong> than a hackathon!!!
					</p>
				</div>
				<div style={{ flexShrink: 0, width: "13vw", background: "#FBF0F3", display: "flex", flexDirection: "column", gap: "0.5vh", padding: "0.5vw", border: "2px solid #0E387A", transform: "rotate(5deg)", transformOrigin: "top center", position: "relative", left: '1vw', top: '-0.5vw' }}>
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
						<p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#2E599C", lineHeight: 1.4, marginBottom: "1.5vh" }}>
							1) JOIN HACK CLUB SLACK!! And the #sunbeam channels:
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.6, marginLeft: "3vw"}}>
							SUPER IMPORTANT!! Slack is how we communicate with organizers. If your city doesn't have a Sunbeam channel yet, make one (in the format: #sunbeam-city, e.g. #sunbeam-london).
						</p>
					</div>
				</div>

				{/* Step 2: Team */}
				<div style={{ marginBottom: "5vh" }}>
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "#2E599C", lineHeight: 1.4, marginBottom: "1.5vh" }}>
								2) (avengers) Assemble a team of 3-6 organizers!
							</p>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.6, marginBottom: "1.5vh", marginLeft: "3vw" }}>
								Reach out to people you enjoy working with! Start with a slack channel and a shared to-do list (including steps in this guide!) Delegate tasks based on what people want to do.
							</p>
						</div>
					</div>

					<div style={{ display: "flex"}}>
						<p style={{ fontSize: "2.04vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginBottom: "3vh", marginRight: "2vw"}}>
							Just remember - other people will be filling this form out too, so if you don't know that many girls in your area yet, we'll help you find them! <br></br><br></br> And one more thing: if your friends aren't very technical or coding-oriented, they can volunteer on the day to help the event run smoothly.
						</p>
					
						<div style={{ flexShrink: 0, width: "40.5vw", position: "relative", top: "-1vw" }}>
							<img src="/imgs/guide/team-photo.webp" alt="Team photo" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					{/* YUP/NOPE table */}
					<div style={{ border: "2px solid #0E387A", marginBottom: "3vh", borderRadius: "10px", overflow: "hidden" }}>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
							<div style={{ backgroundColor: "rgba(243,147,180,1)", padding: "0 2vw", height: "50px", width:"100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>YUP ✅</p>
							</div>
							<div style={{ backgroundColor: "rgba(249,166,54,1)", padding: "0 2vw", height: "50px", width:"100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
								<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>NOPE ❌</p>
							</div>
							<div style={{ backgroundColor: "white", padding: "2vh 2vw", borderRight: "2px solid #0E387A" }}>
								<ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
									<li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
										Diverse set of skills (ex: Sponsorship, Web Dev, Marketing, Web Dev for workshops)
									</li>
									<li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
										Good vibes and willing to put 100x enthusiasm for the day-of
									</li>
								</ul>
							</div>
							<div style={{ backgroundColor: "white", padding: "2vh 2vw" }}>
								<ul style={{ listStyleType: "disc", paddingLeft: "1.5vw" }}>
									<li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
										Creating a huge team (inefficient)
									</li>
									<li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
										Too small of a team (NOT 1 person)
									</li>
									<li style={{ fontSize: "1.94vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, marginTop: "1.5vh" }}>
										Trying to organize everything with fancy project management tools
									</li>
								</ul>
							</div>
						</div>
					</div>

					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
						I'd HIGHLY suggest meeting your team in-person or doing calls often to get to know everyone. Good vibes = happy team = fun organizing.
					</p>
				</div>

				{/* Step 3: Custom email + HCB */}
				<div style={{ marginBottom: "5vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						3) Get a custom email and HCB
					</p>

					{/* Email row: text left, gmail+seal right */}
					<div style={{ display: "flex", gap: "3vw", alignItems: "center", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.6, flex: "1 1 0", marginLeft: "3vw" }}>
							Want a city@sunbeam.hackclub.com email? This will be coming to event PoCs soon! This is a shared Google Workspace account that the team can use to send out mass, personalised communications to attendees, and should be the contact email listed on your website so people can ask you questions.
						</p>
						<div style={{ flexShrink: 0, width: "18vw", position: "relative" }}>
							<img src="/imgs/guide/hcb-setup.webp" alt="Gmail" style={{ width: "100%", display: "block" }} />
							<img src="/imgs/sunbeam.webp" alt="" style={{ position: "absolute", bottom: "5vw", left: "50%", transform: "translateX(-50%)", width: "10vw" }} />
						</div>
					</div>

					{/* HCB row: logo left, text right */}
					<div style={{ display: "flex", gap: "3vw", alignItems: "center", marginLeft: "3vw" }}>
						<img src="/imgs/guide/hcb-logo.webp" alt="HCB logo" style={{ flexShrink: 0, width: "8vw" }} />
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.6, flex: "1 1 0" }}>
							You will also receive an email to activate your very own HCB account to manage your Sunbeam event's finances. Make sure to keep an eye on your inbox to receive these important updates!!!
						</p>
					</div>
				</div>

				{/* Steps 4 + 5 with website template on right */}
				<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start" }}>

					{/* Left: steps 4 and 5 */}
					<div style={{ flex: "1 1 0", minWidth: 0 }}>

						{/* Step 4: Website */}
						<div style={{ marginBottom: "5vh" }}>
							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
								4) Setup YOUR Sunbeam website:
							</p>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginLeft: "3vw" }}>
								Individual city website templates will be sent out where you can then customize the schedule and sponsor list.
							</p>
						</div>

						{/* Step 5: Budget */}
						<div>
							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
								5) Make a Budget (template here)
							</p>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
								A <strong>good</strong> Sunbeam social generally only needs three things:
							</p>
							<ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginBottom: "2vh", marginLeft: "3vw"  }}>
								<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
									Food
								</li>
								<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
									Food
								</li>
								<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
									Food (Please buy water if needed)
								</li>
							</ul>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2vh", marginLeft: "3vw" }}>
								... And maybe supplies. ;)
							</p>
							<p style={{ fontSize: "2.62vw", fontWeight: 400, color: "#C54390", lineHeight: 1.4, marginBottom: "8vh", marginLeft: "3vw" }}>
								But a <strong>GREAT</strong> Sunbeam social needs:
							</p>
						</div>
					</div>

					{/* Right: website template + caption */}
					<div style={{ flexShrink: 0, width: "30vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1vh", position: "relative", top: "2vw" }}>
						<img src="/imgs/guide/website-template.webp" alt="Website template" style={{ width: "100%" }} />
						<p style={{ fontSize: "1.74vw", fontWeight: 600, color: "#0E387A"}}>cool...</p>
					</div>
				</div>

			</div>

			{/* Budget photos 3+2 with captions */}
			<div style={{marginLeft: "7.4%", marginRight: "7.4%", marginBottom: "5vh"}}>
							<div>
								<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2vw", marginBottom: "2vh" }}>
									{[
										{ n: 1, caption: "GOOD FOOD (Chipotle, CAVA, snacks, drinks...)" },
										{ n: 2, caption: "Supplies (power strips, tablecloths, surprises, etc.)" },
										{ n: 3, caption: "Merch!!" },
									].map(({ n, caption }) => (
										<div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1vh" }}>
											<img src={`/imgs/guide/budget-${n}.webp`} alt="" style={{ width: "100%", display: "block" }} />
											<p style={{ fontSize: "1.74vw", fontWeight: 400, color: "#0E387A", textAlign: "center", lineHeight: 1.5 }}>{caption}</p>
										</div>
									))}
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2vw", padding: "0 16.7%", marginBottom: "3vh" }}>
									{[
										{ n: 4, caption: "Venue Decorations" },
										{ n: 5, caption: "Prizes" },
									].map(({ n, caption }) => (
										<div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1vh" }}>
											<img src={`/imgs/guide/budget-${n}.webp`} alt="" style={{ width: "100%", display: "block" }} />
											<p style={{ fontSize: "1.74vw", fontWeight: 400, color: "#0E387A", textAlign: "center", lineHeight: 1.5 }}>{caption}</p>
										</div>
									))}
									</div>
								</div>

							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
								Track your cost <strong>PER ATTENDEE</strong>. This will help prevent you from spending too much!<br></br> Well-planned budgets have: 
							</p>
							<ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginBottom: "3vh", fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
									<span style={{ textDecoration: "underline" }}>"Cost per attendee"</span> column for each item
								</li>
								<li>
									Must be done by [DATE TBD]. (but ideally finished <span style={{ textDecoration: "underline" }}><strong>AT LEAST</strong> two weeks earlier</span>)
								</li>
							</ul>

							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
									Estimate your <strong>attendees</strong> as <strong>50%</strong> of total signups. Half of the people who sign up don’t show up! (unfortunately ☹️)
							</p>

							<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1vh" }}>
								Payouts FROM US!!
							</p>
							
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "3vh" }}>
								That’s right - for every signup you get for your Sunbeam Social, we’ll send you $$ to run your event!
							</p>

							<p className="text-center" style={{ fontSize: "2.62vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1vh" }}>
								<strong>$/Signup</strong> is based on the <strong>number of signups you have.</strong>
							</p>
							<p className="text-center" style={{ fontSize: "1.74vw", fontWeight: 400, color: "#359BBF", lineHeight: 1.4, marginBottom: "3vh", textDecoration: "underline" }}>
								These rates are for <strong>North America</strong>: more guidance on international payouts coming soon
							</p>

							{/* Payout table */}
							<div style={{ border: "2px solid #0E387A", marginBottom: "2vh", borderRadius: "10px", overflow: "hidden" }}>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div style={{ background: "rgba(243,147,180,0.65)", padding: "0 2vw", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #0E387A", borderBottom: "2px solid #0E387A" }}>
										<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}># of signups</p>
									</div>
									<div style={{ background: "rgba(249,166,54,0.65)", padding: "0 2vw", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #0E387A" }}>
										<p style={{ fontSize: "1.94vw", fontWeight: 500, color: "#0E387A", textAlign: "center" }}>$/Signup</p>
									</div>
								</div>
								{[["0-59", "$8.50"], ["60-119", "$10.00"], ["120+", "$12.00"]].map(([range, rate], i) => (
									<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
										<div style={{ padding: "2vh 2vw", textAlign: "center", borderRight: "2px solid #0E387A", borderTop: "2px solid #0E387A", background: "rgba(255,255,255,0.65)" }}>
											<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{range}</p>
										</div>
										<div style={{ padding: "2vh 2vw", textAlign: "center", borderTop: "2px solid #0E387A", background: "rgba(255,255,255,0.65)" }}>
											<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)" }}>{rate}</p>
										</div>
									</div>
								))}
							</div>

							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
								That's a lot of moola! Outreach to your community will be your BFF for this!
							</p>
						</div>

			{/* PART TWO HEADER */}
			<div className="galindo text-center pt-[5vh] pb-[3vh]">
				<p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART TWO:</span>
					<span style={{ color: "#359BBF" }}> LOCK IN!!</span>
				</p>
			</div>

			<div style={{ padding: "4vh 7.4%" }}>

				{/* 1) Venue */}
				<div style={{ marginBottom: "5vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						1) Finding a home... (Venue)
					</p>
					<div style={{ display: "flex", alignItems: "flex-start"}}>
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6}}>
								Your Sunbeam social cannot happen if you don't have a venue. You could have a million dollars in sponsors but none of it matters if you have nowhere to host your participants. Finding a venue is arguably the most important part of hosting a hackathon. Lock in.
							</p>
						</div>
						<div style={{ flexShrink: 0, width: "18.1vw" }}>
							<img src="/imgs/guide/venue.webp" alt="Venue" style={{ width: "100%", display: "block" }} />
						</div>
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
									<p style={{ fontSize: "2.33vw", fontWeight: 800, color: "rgb(216,129,39)", textAlign: "center", lineHeight: 1.4 }}>
										This should be your first priority!!!
									</p>
								</div>
							</div>

							{/* Reach out text */}
							<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginTop: "3vh" }}>
								Reach out to cafes, makerspaces, libraries, and even your school if you're in a pinch.
							</p>
						</div>
					</div>

					{/* Blue callout box */}
					<div style={{ background: "rgba(161,214,233,1)", padding: "2.5vh 3vw", borderRadius: "10px", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
							What makes an awesome venue: 
						</p>
						<ul style={{ listStyleType: "disc", paddingLeft: "3vw", marginTop: "1.5vh" }}>
							<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
								It's free!! Don't drop $5000 on a venue that's 2 rooms and a couch. 
							</li>
							<li style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6 }}>
								Roomy (Minimum: One main space, small organizer room, washrooms, TV/projector, speakers/PA)
							</li>
						</ul>
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
						<div style={{ flexShrink: 0, width: "26vw", position: "relative", top: "4vw" }}>
							<img src="/imgs/guide/sponsors-ai.webp" alt="Sponsors" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					<p className="text-center galindo" style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.4, marginBottom: "3vh" }}>
						Here's how to start:
					</p>

					{/* 3 columns of sponsor list items */}
					<div className="text-center" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0 2vw", marginBottom: "3vh", alignItems: "start" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Compile a list of companies your team have personal connections with. (ex: parents, mentors, club leaders)
						</p>
						<p style={{ fontSize: "2.52vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, width: "24vw" }}>
							Make a list of tech companies of all sizes with offices/hq near you.
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Compile a list of food companies. INCLUDING smaller businesses and ones that have done charity stuff before.
						</p>
					</div>

					{/* Surfboard + text */}
					<div style={{ display: "flex", alignItems: "center", gap: "3vw", marginBottom: "3vh" }}>

						{/* Surfboard with rotated text overlay */}
						<div style={{ position: "relative", flexShrink: 0, width: "52.7vw" }}>
							<img
								src="/imgs/guide/surfboard-yellow.webp"
								alt=""
								style={{ width: "100%", display: "block" }}
							/>
							<div style={{ position: "absolute", left: "54%", top: "47%", transform: "translate(-50%, -50%) rotate(-7deg)", width: "37vw", textAlign: "center" }}>
								<p style={{ fontSize: "2.33vw", fontWeight: 700, color: "#0E387A", lineHeight: 1.5 }}>
									Everyone on your team can definitely get at least one sponsor!
								</p>
							</div>
						</div>

						{/* Spreadsheets text — right-aligned, no rotation */}
						<div style={{ flex: "1 1 0" }}>
							<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, textAlign: "right" }}>
								Spreadsheets will save you for this, and you can delegate one person to find contacts, one person to email, etc.
							</p>
						</div>
					</div>
				</div>

				{/* 3) Outreach */}
				<div>
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, flexShrink: 0 }}>
							3) Outreach
						</p>
						<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#0E387A", lineHeight: 1.6, flex: "1 1 0" }}>
							Outreach is an ESSENTIAL part of hackathons. No participants → No event. But how do you reach the ✨right people?✨
						</p>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-center", marginBottom: "3vh" }}>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-1.webp" alt="" style={{ width: "100%", display: "block" }} />
						</div>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0", alignSelf: "center" }}>
							Email CS teachers: Make a video with your team and ask them to CC their students or post in their announcements app!
						</p>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-center", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0", alignSelf: "center" }}>
							Email local organizations and clubs: Robotics teams, your student council, CS clubs, etc
						</p>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-3.webp" alt="" style={{ width: "100%", display: "block" }} />
						</div>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-2.webp" alt="" style={{ width: "100%", display: "block" }} />
						</div>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0", alignSelf: "center" }}>
							Print out posters and put them up at schools, libraries, even the gym or your car windows.
						</p>
					</div>

					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, flex: "1 1 0", alignSelf: "center" }}>
							Post in parent group chats! Facebook, Whatsapp, WeChat. This is VERY effective in reaching beginners.
						</p>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-5.webp" alt="" style={{ width: "100%", display: "block" }} />
						</div>
					</div>
					
					<div style={{ display: "flex", gap: "3vw", alignItems: "flex-start", marginBottom: "3vh" }}>
						<div style={{ flexShrink: 0, width: "21.3vw" }}>
							<img src="/imgs/guide/outreach-4.webp" alt="" style={{ width: "100%", display: "block" }} />
						</div>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, alignSelf: "center" }}>
						Post on Instagram and social media! This is where people can discover your event. AND people will trust your event more if they see it's on instagram and has nice branding.
						</p>
					</div>
				</div>
			</div>

			{/* PART THREE HEADER */}
			<div className="galindo text-center pt-[5vh] pb-[3vh]">
				<p style={{ fontSize: "2.91vw", lineHeight: 1.3 }}>
					<span style={{ color: "#C54390" }}>PART THREE:</span>
					<span style={{ color: "#359BBF" }}> THE DAY OF 🌟</span>
				</p>
			</div>

			<div style={{ padding: "4vh 7.4% 5vh" }}>
				<div style={{ marginBottom: "4vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						1) Make a run of show...
					</p>
					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh", marginLeft: "3vw" }}>
						Run of show = time block it. You need to know what your organizers are doing and when, which will save time running from room to room to find each other.
					</p>
					<p style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh", marginLeft: "3vw" }}>
						PLEASE <span style={{ fontWeight: 500 }}>leave a 30 minute window after submissions are due</span> for last-minute issues. Trust us. (see a sample run of show here.)
					</p>
				</div>

				<div style={{ marginBottom: "4vh" }}>
					<p style={{ fontSize: "2.62vw", fontWeight: 700, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "1.5vh" }}>
						2) Run an awesome event!
					</p>
					<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "2.5vh", marginLeft: "3vw" }}>
						<span style={{ fontWeight: 500 }}>Key rules for organizers</span> (Please read OUT LOUD with your team on a team sync or the morning of the event):
					</p>

					{/* Yellow rules box */}
					<div style={{ background: "rgba(255,226,142,0.7)", padding: "4vh 4vw", margin: "0 auto", maxWidth: "74.8vw", borderRadius: "10px"}}>
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
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2vw" }}>
					<div style={{ background: "rgb(249,166,54)", padding: "2.5vh 2vw", minHeight: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Contact method</p>
					</div>
					<div style={{ background: "rgb(249,166,54)", padding: "2.5vh 2vw", minHeight: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>Expected response time</p>
					</div>
					<div style={{ background: "rgb(249,166,54)", padding: "2.5vh 2vw", minHeight: "164px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.33vw", fontWeight: 600, color: "#0E387A", textAlign: "center" }}>When to use</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Asking a question in #sunbeam-help in the Hack Club Slack.
						</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							24 hours or less.
						</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Any general questions! Especially useful for things that other Sunbeamers can answer for you.
						</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							Requesting a 30-minute call with a Sunbeam team member.
						</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							You can usually book a call 3-4 days in advance! This will vary for who you need to talk to.
						</p>
					</div>
					<div style={{ background: "#FFC7DA", padding: "2.5vh 2vw", borderRadius: "14px" }}>
						<p style={{ fontSize: "2.13vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6 }}>
							For more complicated situations that need context, or when you need to get back on track with the help of someone experienced.
						</p>
					</div>
				</div>

				{/* service hours */}
				<div>
					<p style={{ fontSize: "2.62vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
						Service Hours
					</p>
					<p className="text-center" style={{ fontSize: "2.33vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.6, marginBottom: "1.5vh" }}>
						Organizing a Sunbeam is going to take a lot of your time, so if you document how many hours you worked in a neat spreadsheet, Hack Club can sign off on them for you to use. 
					</p>
				</div>
				
			</div>

			{/* WHAT'S NEXT */}
			<div style={{ padding: "0 7.4% 6vh" }}>
				<p style={{ fontSize: "2vw", fontWeight: 800, color: "rgb(46,88,155)", lineHeight: 1.4, marginBottom: "2vh" }}>
					What's next?
				</p>
				<p className="text-center" style={{ fontSize: "1.8vw", fontWeight: 400, color: "rgb(46,88,155)", lineHeight: 1.7 }}>
					Thank you so much for reading this quickstart guide. We would really appreciate any feedback in <a href="https://hackclub.enterprise.slack.com/archives/C0BCUSTJQTG" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-organizers</a>{" "}, and we're super excited to work with you soon.<br></br><br></br> Let the sun beam in your city!<br></br><br></br> 
			
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/apply.webp"
							width={523}
							height={210}
							alt="apply!"
							className="w-[65vw] md:w-[25vw] h-auto mx-auto"
							sizes="(max-width: 768px) 65vw, 25vw"
						/>
					</a>
					<br></br>
					<span style={{ fontWeight: 600 }}>Written by: Safia and Yanella, with the help of Deven. ♥️</span>
				</p>
			</div>

		</div>
	);
}