import Image from "next/image";

export default function SonbeamPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#000" }}>
      <Image
        src="/imgs/sonbeam.png"
        alt="Sonbeam"
        width={1063}
        height={1063}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
