export type SunriseMilestone = "html" | "css" | "js" | null;

export type SunriseCodeBlock = {
	filename: string;
	language: "html" | "css" | "js";
	code: string;
};

export type SunriseStep = {
	id: number;
	slug: `step${number}`;
	title: string;
	goal: string;
	estimatedTime: string;
	congratsMessage?: string;
	milestoneComplete: SunriseMilestone;
	checklist: string[];
	codeBlocks: SunriseCodeBlock[];
};

export const sunriseSteps: SunriseStep[] = [
	{
		id: 1,
		slug: "step1",
		title: "Project setup",
		goal: "Create index.html, style.css, and script.js in one folder.",
		estimatedTime: "3 min",
		milestoneComplete: null,
		checklist: [
			"Create the 3 files.",
			"Open index.html first.",
			"Keep filenames exact.",
		],
		codeBlocks: [{ filename: "index.html", language: "html", code: "" }],
	},
	{
		id: 2,
		slug: "step2",
		title: "HTML skeleton",
		goal: "Add doctype, html, head, and body.",
		estimatedTime: "4 min",
		milestoneComplete: null,
		checklist: [
			"Use <!doctype html>.",
			"Set <html lang=\"en\">.",
			"Add title and CSS link.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Basic Website</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body></body>
</html>`,
			},
		],
	},
	{
		id: 3,
		slug: "step3",
		title: "Add page sections",
		goal: "Create header, main, and footer structure.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Add <header> for top content.",
			"Add <main> for core content.",
			"Add <footer> for closing text.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>`,
			},
		],
	},
	{
		id: 4,
		slug: "step4",
		title: "Headings: h1, h2, h3",
		goal: "Build a proper heading hierarchy.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Use one h1 for page title.",
			"Use h2 for section title.",
			"Use h3 for subsection title.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<header>
  <h1>My Basic Website</h1>
  <p>Built from scratch with HTML, CSS, and JS.</p>
</header>
<main>
  <section>
    <h2>About</h2>
    <h3>Who made this?</h3>
  </section>
</main>`,
			},
		],
	},
	{
		id: 5,
		slug: "step5",
		title: "Paragraphs and text meaning",
		goal: "Use p, strong, and em inside your sections.",
		estimatedTime: "4 min",
		milestoneComplete: null,
		checklist: [
			"Add a paragraph under h2.",
			"Use strong for important words.",
			"Use em for emphasis.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<p>I am learning to build websites.</p>
<p><strong>Goal:</strong> finish a full basic website today.</p>
<p>This project is <em>beginner-friendly</em>.</p>`,
			},
		],
	},
	{
		id: 6,
		slug: "step6",
		title: "Links with a tag",
		goal: "Add a call-to-action link users can click.",
		estimatedTime: "4 min",
		milestoneComplete: null,
		checklist: [
			"Add one external link.",
			"Use clear link text.",
			"Keep it inside your main section.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">
  Visit Hack Club
</a>`,
			},
		],
	},
	{
		id: 7,
		slug: "step7",
		title: "Images with img",
		goal: "Add a profile or hero image with alt text.",
		estimatedTime: "4 min",
		milestoneComplete: null,
		checklist: [
			"Create imgs/ folder.",
			"Add one image file.",
			"Write descriptive alt text.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<img src="./imgs/profile.jpg" alt="Portrait of the site creator" />`,
			},
		],
	},
	{
		id: 8,
		slug: "step8",
		title: "Content blocks with div",
		goal: "Group related elements into reusable containers.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Wrap intro in .hero div.",
			"Wrap about in .card div.",
			"Use class names for styling.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<header class="hero">
  <div class="hero-inner">
    <h1>My Basic Website</h1>
    <p>Built from scratch with HTML, CSS, and JS.</p>
  </div>
</header>`,
			},
		],
	},
	{
		id: 9,
		slug: "step9",
		title: "Add skills list",
		goal: "Use ul and li for a clean feature list.",
		estimatedTime: "4 min",
		milestoneComplete: null,
		checklist: [
			"Add h2 section title.",
			"Add unordered list.",
			"Use 3 list items.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<section class="card">
  <h2>Skills I practiced</h2>
  <ul>
    <li>HTML structure</li>
    <li>CSS styling</li>
    <li>JavaScript interaction</li>
  </ul>
</section>`,
			},
		],
	},
	{
		id: 10,
		slug: "step10",
		title: "Complete HTML page",
		goal: "Finish the full page content before styling.",
		estimatedTime: "6 min",
		congratsMessage:
			"Congrats! HTML milestone complete — your full page structure is done.",
		milestoneComplete: "html",
		checklist: [
			"Header, main, and footer all exist.",
			"Headings are in good order.",
			"Link and image are visible.",
		],
		codeBlocks: [
			{
				filename: "index.html",
				language: "html",
				code: `<footer>
  <p>Made with love by me.</p>
</footer>
<script src="script.js"></script>`,
			},
		],
	},
	{
		id: 11,
		slug: "step11",
		title: "Start CSS base styles",
		goal: "Set default font, colors, and page background.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Set body font-family.",
			"Set text color.",
			"Set soft background color.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1f2a44;
  background: #eef8ff;
}`,
			},
		],
	},
	{
		id: 12,
		slug: "step12",
		title: "Style headings and paragraphs",
		goal: "Make text hierarchy clear and readable.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Increase h1 size.",
			"Set h2 color.",
			"Use line-height on p.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `h1 { font-size: 2.4rem; color: #2e599c; }
h2 { color: #d88127; }
p { line-height: 1.6; }`,
			},
		],
	},
	{
		id: 13,
		slug: "step13",
		title: "Box model and spacing",
		goal: "Use margin, padding, border, and border-radius.",
		estimatedTime: "6 min",
		milestoneComplete: null,
		checklist: [
			"Add spacing to .card.",
			"Round corners.",
			"Add a subtle border.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `.card {
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #0e387a22;
  border-radius: 16px;
  background: #ffffff;
}`,
			},
		],
	},
	{
		id: 14,
		slug: "step14",
		title: "Hero section styling",
		goal: "Make your header look like a main hero area.",
		estimatedTime: "6 min",
		milestoneComplete: null,
		checklist: [
			"Center hero text.",
			"Add top/bottom padding.",
			"Add gradient background.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `.hero {
  text-align: center;
  padding: 48px 20px;
  background: linear-gradient(to right, #d7ecff, #ffe9dc);
}`,
			},
		],
	},
	{
		id: 15,
		slug: "step15",
		title: "Layout width and centering",
		goal: "Keep content centered and not too wide.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Set max-width on main content.",
			"Center with margin auto.",
			"Add side padding.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `main {
  max-width: 760px;
  margin: 0 auto;
  padding: 20px;
}`,
			},
		],
	},
	{
		id: 16,
		slug: "step16",
		title: "Link and image styling",
		goal: "Make links and images polished and consistent.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Color your links.",
			"Add hover underline.",
			"Set image width and radius.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `a { color: #2e599c; font-weight: 700; }
a:hover { text-decoration: underline; }
img { width: 140px; border-radius: 999px; }`,
			},
		],
	},
	{
		id: 17,
		slug: "step17",
		title: "Button design and hover state",
		goal: "Create a styled button for interaction.",
		estimatedTime: "6 min",
		congratsMessage:
			"Great job! CSS milestone complete — your website now looks like a real product.",
		milestoneComplete: "css",
		checklist: [
			"Style button background and text.",
			"Add border-radius and padding.",
			"Add hover transform.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `button {
  background: #2a66ff;
  color: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
button:hover { transform: translateY(-1px); }`,
			},
		],
	},
	{
		id: 18,
		slug: "step18",
		title: "Responsive mobile tweak",
		goal: "Use a media query so your site fits phones.",
		estimatedTime: "5 min",
		milestoneComplete: null,
		checklist: [
			"Reduce h1 size for mobile.",
			"Reduce hero padding.",
			"Keep card spacing balanced.",
		],
		codeBlocks: [
			{
				filename: "style.css",
				language: "css",
				code: `@media (max-width: 700px) {
  h1 { font-size: 1.8rem; }
  .hero { padding: 32px 16px; }
  main { padding: 14px; }
}`,
			},
		],
	},
	{
		id: 19,
		slug: "step19",
		title: "Add JavaScript behavior",
		goal: "Make your button update text when clicked.",
		estimatedTime: "6 min",
		milestoneComplete: null,
		checklist: [
			"Add button id in HTML.",
			"Read it in script.js.",
			"Change text on click.",
		],
		codeBlocks: [
			{
				filename: "script.js",
				language: "js",
				code: `const button = document.getElementById("cheer-button");
if (!button) throw new Error("Missing #cheer-button");
button.addEventListener("click", () => {
  button.textContent = "Thanks for visiting my site!";
});`,
			},
		],
	},
	{
		id: 20,
		slug: "step20",
		title: "Final website complete",
		goal: "Review and publish your finished basic website.",
		estimatedTime: "7 min",
		congratsMessage:
			"Amazing! JavaScript milestone complete — you now have a full basic website from scratch.",
		milestoneComplete: "js",
		checklist: [
			"Test heading, links, image, and button.",
			"Fix any spacing issues you notice.",
			"Publish with Netlify or GitHub Pages.",
		],
		codeBlocks: [
			{
				filename: "result",
				language: "html",
				code: "Your website is complete and ready to share.",
			},
		],
	},
];

export function getSunriseStep(slug: string): SunriseStep | undefined {
	return sunriseSteps.find((step) => step.slug === slug);
}
