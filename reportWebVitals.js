import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>🧠 Brain Pressure Predictor</h1>

            <button onClick={() => navigate("/patient")}>
                👤 Patient
            </button>

            <br /><br />

            <button onClick={() => navigate("/doctor")}>
                👨‍⚕️ Doctor
            </button>
        </div>
    );
}

export default Home;