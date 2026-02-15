import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Roadmap from "./Roadmap";
import "./App.css";

const QUIZ_SECTIONS = [
  { id: "math", label: "Math", options: ["Algebra", "Geometry", "Precalculus", "Calculus"] },
  { id: "science", label: "Science", options: ["Biology", "Chemistry", "Physics"] },
  { id: "programming", label: "Programming", options: ["Python", "JavaScript", "Java", "C++"] },
];

const ROADMAP_LENGTH = 9;

const SKILL_BANK = {
  Algebra: ["Linear equations", "Polynomials", "Functions and graphs"],
  Geometry: ["Angles and triangles", "Area and volume", "Coordinate geometry"],
  Precalculus: ["Trigonometry essentials", "Exponential models", "Limits intuition"],
  Calculus: ["Derivatives", "Integrals", "Optimization problems"],
  Biology: ["Cell structure", "Genetics", "Ecosystems"],
  Chemistry: ["Atomic structure", "Bonding", "Stoichiometry"],
  Physics: ["Motion and forces", "Energy", "Waves and electricity"],
  Python: ["Python syntax", "Data structures", "Mini automation scripts"],
  JavaScript: ["JS fundamentals", "DOM and events", "Async programming"],
  Java: ["OOP basics", "Collections", "Backend fundamentals"],
  "C++": ["Memory and pointers", "STL basics", "Algorithms in C++"],
};

const FALLBACK_SKILLS = [
  "Goal planning",
  "Learning habits",
  "Weekly review",
  "Challenge project",
  "Mock assessment",
];
const ROADMAP_STORAGE_KEY = "dynamicRoadmap";

function buildRoadmap(selectedTopics) {
  const dynamicSkills = [];

  selectedTopics.forEach((topic) => {
    (SKILL_BANK[topic] || []).forEach((skill) => {
      if (!dynamicSkills.includes(skill)) {
        dynamicSkills.push(skill);
      }
    });
  });

  FALLBACK_SKILLS.forEach((skill) => {
    if (!dynamicSkills.includes(skill)) {
      dynamicSkills.push(skill);
    }
  });

  return dynamicSkills.slice(0, ROADMAP_LENGTH);
}

function getRoadmapTitle(selectedTopics) {
  return selectedTopics.length > 0
    ? `${selectedTopics.slice(0, 2).join(" + ")} Roadmap`
    : "Starter STEM Roadmap";
}

function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    QUIZ_SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: [] }), {})
  );

  const selectedTopics = useMemo(
    () => QUIZ_SECTIONS.flatMap((section) => answers[section.id]),
    [answers]
  );

  function toggleAnswer(sectionId, option) {
    setAnswers((current) => {
      const hasOption = current[sectionId].includes(option);
      return {
        ...current,
        [sectionId]: hasOption
          ? current[sectionId].filter((value) => value !== option)
          : [...current[sectionId], option],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const skills = buildRoadmap(selectedTopics);
    const title = getRoadmapTitle(selectedTopics);
    const roadmapData = { title, skills };
    localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(roadmapData));
    navigate("/roadmap", { state: roadmapData });
  }

  return (
    <main className="app-shell">
      <section className="quiz-card">
        <h1>Build your skill roadmap</h1>
        <p>Pick subjects from the quiz. The roadmap path stays fixed, but each skill node is generated from your choices.</p>
        <form onSubmit={handleSubmit}>
          {QUIZ_SECTIONS.map((section) => (
            <fieldset key={section.id} className="quiz-section">
              <legend>{section.label}</legend>
              {section.options.map((option) => (
                <label key={option} className="quiz-option">
                  <input
                    type="checkbox"
                    checked={answers[section.id].includes(option)}
                    onChange={() => toggleAnswer(section.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <button className="primary-btn" type="submit">
            Generate Roadmap
          </button>
        </form>
      </section>
    </main>
  );
}

function RoadmapPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  let roadmapData = state;
  if (!roadmapData) {
    try {
      const stored = localStorage.getItem(ROADMAP_STORAGE_KEY);
      roadmapData = stored ? JSON.parse(stored) : null;
    } catch (error) {
      roadmapData = null;
    }
  }

  return (
    <main className="app-shell">
      <section className="roadmap-card">
        {roadmapData ? (
          <Roadmap title={roadmapData.title} skills={roadmapData.skills} />
        ) : (
          <div>
            <h2>No roadmap generated yet</h2>
            <p>Take the quiz to generate your subject-specific skills.</p>
          </div>
        )}
        <div className="action-row">
          <button className="primary-btn" type="button" onClick={() => navigate("/quiz")}>
            Retake quiz
          </button>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quiz" replace />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="*" element={<Navigate to="/quiz" replace />} />
    </Routes>
  );
}

export default App;
