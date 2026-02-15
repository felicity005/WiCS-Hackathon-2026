import "./Roadmap.css";

function getNodeStatus(index) {
  if (index === 0) {
    return "current";
  }
  return "locked";
}

export default function Roadmap({ title, skills }) {
  return (
    <div className="roadmap-shell">
      <h2>{title}</h2>
      <p className="roadmap-subtitle">Progress through each step in order.</p>

      <div className="roadmap-track">
        <div className="roadmap-line" />
        {skills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className={`roadmap-row ${index % 2 === 0 ? "left" : "right"}`}
          >
            <article className={`roadmap-node ${getNodeStatus(index)}`}>
              <span className="roadmap-unit">Unit {index + 1}</span>
              <h3>{skill}</h3>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
