// Selector.jsx
import { useNavigate } from "react-router-dom";

export default function Selector() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/roadmap?level=beginner")}>Beginner</button>
            <button onClick={() => navigate("/roadmap?level=intermediate")}>Intermediate</button>
            <button onClick={() => navigate("/roadmap?level=advanced")}>Advanced</button>
        </div>
    );
}