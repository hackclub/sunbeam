

export default function ClosedApps() {
    return (
        <div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center"
            style={{
                background: "rgba(250,240,212,0.9)",

                transition: "opacity 0.7s ease",
            }}
        >
            <h1
                className="galindo pink-outlined-text text-center mb-[4vh]"
                style={{ fontSize: "3.5vw" }}
            >
                Apps are closed! 
            </h1>

            <p>Applications are currently in review. We hope to return applications by Wednesday, July 15th.</p>

        </div>
    )
}