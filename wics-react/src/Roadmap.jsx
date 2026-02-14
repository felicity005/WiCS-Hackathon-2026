// Roadmap.jsx
import { useLocation } from "react-router-dom";

const CONTENT = {
    beginner: { color: "#2b8a3e", title: "Beginner Roadmap", skills: ["Basics", "Syntax", "Small Projects"] },
    intermediate: { color: "#1f78b4", title: "Intermediate Roadmap", skills: ["State", "Routing", "Testing"] },
    advanced: { color: "#8a2be2", title: "Advanced Roadmap", skills: ["Performance", "Architecture", "Scale"] },
};

export default function Roadmap() {
    const params = new URLSearchParams(useLocation().search);
    const level = (params.get("level") || "beginner").toLowerCase();
    const data = CONTENT[level] || CONTENT.beginner;

    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ color: data.color }}>{data.title}</h1>

            <div style={{ border: `2px solid ${data.color}`, borderRadius: 8, padding: 16, maxWidth: 600 }}>
                {data.skills.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ width: 12, height: 12, background: data.color, borderRadius: 3, marginRight: 12 }} />
                        <div>{s}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}