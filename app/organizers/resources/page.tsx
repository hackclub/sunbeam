"use client";

import { useState } from "react";
import DesktopSidebar from "../../../components/DesktopSidebar";
import MobileNavbar from "../../../components/MobileNavbar";
import { trackDynamicHoleInRuntimeShell } from "next/dist/server/app-render/dynamic-rendering";
import { transformAxis } from "framer-motion";

const CARDS = {
  venue: {
    title: "Venue Email Template",
    content: (
      <div>
        <p>
          <strong>Subject:</strong> Requesting Space for High School Social Coding Event for Girls by Girls <br/>
        </p>
        <p>Hi [name],</p>
        <br />
        <p>
          I'm ___, a __-year-old high school student from _____. This August, a couple of friends and
          I are organizing a social coding event for high school girls in ___!
        </p>
        <br />
        <p>
          August 29th, we're running Sunbeam, a __hr satellite social coding event for teen girls
          around the world. Sunbeam is a program run by Hack Club, a global, non-profit network of
          high school coding clubs where teenagers learn to code by building real projects, fostering
          a community of student-led creation through local clubs, online engagement, and events
          emphasizing hands-on learning and open-source contributions.
        </p>
        <br />
        <p>
          Learning to code through coding events helped me make some of my best memories and friends.
          It changed my life, making me feel more welcome in the tech world, and I want to bring that
          experience to more girls!
        </p>
        <br />
        <p>
          [venue name] is incredible. [something specific/personal to the venue like how their
          mission aligns with ours etc]
        </p>
        <br />
        <p>
          An event is nothing without a venue and we see your place as the perfect venue. We're
          wondering if [venue name] could donate your space to us on August 29th? We would need open
          space to code and have fun activities and a TV/projector with speakers. We are planning on
          hosting [number range] teens.
        </p>
        <br />
        <p>
          If donating your space is not possible, we would also welcome a financial donation or
          sponsorship.
        </p>
        <br />
        <p>I'd love to hear back from you and answer any questions or iron out details!</p>
        <br />
        <p>
          Best,
          <br />
          _____ (she/her) + Sunbeam City org team (____, ___, ____)
          <br />
          Hack club email
          <br />
          Personal email
          <br />
          sunbeam.hackclub.com
          <br />
          hackclub.com
        </p>
      </div>
    ),
  },
  sponsor: {
    title: "Sponsor Email Template",
    content: (
      <div>
        <p>
          <strong>Subject:</strong> Request to Sponsor high school social coding event for girls by
          girls
        </p>
        <br />
        <p>Hello [name],</p>
        <br />
        <p>
          I'm ______, a __-year-old high school student from _________. This August, a couple of
          friends and I are organizing a social coding event for high school girls in _________!
        </p>
        <br />
        <p>
          On August 29th, we're organizing Sunbeam [city name], a girls only __-hour high school
          social coding event for __ teen girls at [Venue]. Sunbeam is dreamed up by Hack Club, a
          global coding nonprofit supported by Dell, GitHub, and Open Sauce.
        </p>
        <br />
        <p>
          Learning to code through coding events helped me make some of my best memories and friends.
          It changed my life, making me feel more welcome in the tech world, and I want to bring that
          experience to more girls!
        </p>
        <br />
        <p>
          [Company] is incredible. [IMPORTANT! Why are you emailing this company? Be personal but
          1-2 sentences.]
        </p>
        <br />
        <p>
          I'd love to hear back from you, show you our prospectus and answer any questions or iron
          out details!
        </p>
        <br />
        <p>
          Best,
          <br />
          [name] (she/her) + Sunbeam [city name] org team (___, ____, ____)
          <br />
          Sunbeam email
          <br />
          Personal email
          <br />
          sunbeam.hackclub.com
          <br />
          hackclub.com
        </p>
        <br />
        <p>
          <em>
            P.S. If you are the wrong person to reach out to, I apologize. It'd be great if you
            could direct me to the right department/person!
          </em>
        </p>
      </div>
    ),
  },
  outreach: {
    title: "Outreach Email Templates",
    content: (
      <div
        className="grid-cols-1 md:grid-cols-2"
        style={{ display: "grid", gap: "2rem" }}
      >
        {/* Participants */}
        <div>
          <p style={{ fontSize: "1.7rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#d88127" }}>
            RSVP Email for Participants
          </p>
          <p>
            <strong>Subject:</strong> Free social coding event for teen girls by teen girls!
          </p>
          <br />
          <p>Hello _____,</p>
          <br />
          <p>
            Have you ever wanted to attend a girls-only social coding event, for free? Well now is
            your chance!
          </p>
          <br />
          <p>
            Come join us for Sunbeam, a __h Hack Club social event hosted for teen girls by teen
            girls, this August 29th, 2026. You will be able to code your very own video game, story,
            or website; attend workshops; meet cool new people; get merch and have tons of fun!
          </p>
          <br />
          <p>Participation is also completely free (including free food and merch)!</p>
          <br />
          <p>
            Please fill out this form if you are interested in attending or want to get more
            information! (Please put ____ for city) [insert form link]
          </p>
          <br />
          <p>Don't forget to share with your friends, no past coding experience is needed! Hope to see you there!</p>
          <br />
          <p>
            With love,
            <br />
            Sunbeam _____ Team
            <br />
            sunbeam.hackclub.com
            <br />
            Join our slack channel #sunbeam-!
          </p>
        </div>
        {/* Teachers */}
        <div>
          <p style={{ fontSize: "1.7rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#d88127" }}>
            Interest Email for Teachers
          </p>
          <p>
            <strong>Subject:</strong> Free coding social for High school girls — Organized by teen
            girls, for teen girls
          </p>
          <br />
          <p>Hello _____,</p>
          <br />
          <p>An amazing opportunity for high school girls interested in computer science is coming up!</p>
          <br />
          <p>
            Come join us for Sunbeam, a ___h Hack Club social coding event hosted for teen girls by
            teen girls, this August 29th, 2026. Participants will be able to code their very own
            video game, story, or website; attend workshops; meet cool new people; get merch and have
            tons of fun!
          </p>
          <br />
          <p>All skill levels welcome; NO past coding experience is needed to participate!</p>
          <br />
          <p>Participation is also completely free (including free food and merch)!</p>
          <br />
          <p>
            Please share this opportunity with your female students and let them fill out the sign-up
            form for more information: [link]. You can also check out our website at
            sunbeam.hackclub.com/city for more details.
          </p>
          <br />
          <p>We would love to see everyone there!</p>
          <br />
          <p>
            name (she/her) + Sunbeam ___ org team (__, __, __)
            <br />
            Hackclub email
            <br />
            Personal email
            <br />
            sunbeam.hackclub.com/city
            <br />
            hackclub.com
            <br />
            Join our slack channel #sunbeam-city!
          </p>
        </div>
      </div>
    ),
  },
  budget: {
    title: "Budget Template",
    content: (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          Use this template to track your event's income and expenses.
        </p>
        <a
          href="https://docs.google.com/spreadsheets/d/1DKfNBJ_kr_z_LMuTBE6Ou8UxFH6enp6TBBwQ7m2oO3M/edit?gid=0#gid=0"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "0.5rem 1.25rem",
            background: "#d88127",
            color: "white",
            borderRadius: "999px",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Open Budget Spreadsheet →
        </a>
      </div>
    ),
  },
  prospectus: {
    title: "Prospectus Template",
    content: (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          Use these examples as inspiration for your own sponsor prospectus.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a
            href="https://docs.google.com/document/d/1nVeRjS7xyMZ3PQhMp_mk65RN26rP7zhXsjLC2kdHpNI/edit?tab=t.0#heading=h.x7e5bm2qkdii"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#d88127",
              color: "white",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Example 1: Campfire Miami →
          </a>
          <a
            href="https://docs.google.com/document/d/1ORM_Fdx2UBn_plw6bmyN7ep540X0JUzXue-7huaZG1E/edit?tab=t.0#heading=h.x7e5bm2qkdii"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#d88127",
              color: "white",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Example 2: Daydream Boston →
          </a>
        </div>
      </div>
    ),
  },
  hours: {
    title: "Service Hours",
    content: (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          If your school requires you to have Service Hours, use this template to track the hours you've worked on Sunbeam to submit.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a
            href="https://docs.google.com/document/d/1MfQ4bqYCNcKnGB3jdcIbYycGV8VErmcMNZKYAY9wXdI/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#d88127",
              color: "white",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Log Sheet Template →
          </a>
        </div>
      </div>
    ),
  },
  hq: {
    title: "HQ Forms",
    content: (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          Use these with CAUTION. Only share them when necessary.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a
            href="https://docs.google.com/document/d/1tVdW5eC9mxGofrEDQ1xDiW1ui96ZBwPu/edit?usp=sharing&ouid=116778640831191755827&rtpof=true&sd=true"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#d88127",
              color: "white",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Donor Receipt →
          </a>
          <a
            href="https://hcb.hackclub.com/sunbeam-athena/fiscal_sponsorship_letter.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#d88127",
              color: "white",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Fiscal Sponsorship Letter →
          </a>
        </div>
      </div>
    ),
  },
};

function Card({ id, title, children, wide = false, short = false }: { id: string; title: string; children: React.ReactNode; wide?: boolean; short?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "1.25rem",
        boxShadow: "0 4px 32px rgba(14,56,122,0.10)",
        overflow: "hidden",
        gridColumn: wide ? "1 / -1" : undefined,
        display: "flex",
        flexDirection: "column",
        transform: "translateZ(0)",
        isolation: "isolate",
        height: "max-content",
      }}
    >
      {/* Card header — always visible, acts as toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: short ? "1.25rem 1.75rem" : "1.5rem 2rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          className="galindo"
          style={{
            fontSize: "2rem",
            color: "#C54390",
            lineHeight: 1.2,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: "1.4rem",
            color: "#C54390",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
            flexShrink: 0,
          }}
        >
          ▾
        </span>
      </button>

      {/* Expandable body */}
      {open && (
        <div
          style={{
            padding: short ? "0 1.75rem 1.5rem" : "0 2rem 2rem",
            fontSize: "1.3rem",
            color: "#0E387A",
            lineHeight: 1.7,
            borderTop: "1px solid rgba(197,67,144,0.15)",
            paddingTop: "1.25rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function OrganizerDocs() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DesktopSidebar />
      <MobileNavbar />

      {/* Main scrollable area */}
      <div
        className="p-4 pb-33 sm:p-8 sm:pb-46 lg:pb-8"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Page heading */}
        <h1
          className="galindo"
          style={{ fontSize: "2.91rem", color: "#0E387A", marginBottom: "0.25rem", textAlign: "center" }}
        >
          More Resources
        </h1>

        {/* Row 1: Venue + Sponsor side by side */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Card id="venue" title="📍 Venue Email Template">
            {CARDS.venue.content}
          </Card>
          <Card id="sponsor" title="💼 Sponsor Email Template">
            {CARDS.sponsor.content}
          </Card>
        </div>

        {/* Row 2: Outreach full width */}
        <Card id="outreach" title="📣 Outreach Email Templates" wide>
          {CARDS.outreach.content}
        </Card>

        {/* Row 3: Budget + Prospectus side by side */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Card id="budget" title="💰 Budget Template" short>
            {CARDS.budget.content}
          </Card>
          <Card id="prospectus" title="📄 Prospectus Template" short>
            {CARDS.prospectus.content}
          </Card>
        </div>

        {/* Row 4: service hours + hq side by side */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Card id="hours" title="🏫 Service Hours" short>
            {CARDS.hours.content}
          </Card>
          <Card id="hq" title="💵 HQ Forms" short>
            {CARDS.hq.content}
          </Card>
        </div>
      </div>
    </div>
  );
}
