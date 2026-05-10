import React, { useState } from "react";
import "./styles.css";

function Doctor() {

    // -------- STATES --------
    const [patientId, setPatientId] = useState("");
    const [sbp, setSbp] = useState("");
    const [dbp, setDbp] = useState("");
    const [hr, setHr] = useState("");

    const [map, setMap] = useState(null);
    const [generalRisk, setGeneralRisk] = useState("");

    const [cpp, setCpp] = useState("");
    const [icp, setIcp] = useState(null);
    const [icpRisk, setIcpRisk] = useState("");

    const [tcd, setTcd] = useState("");
    const [onsd, setOnsd] = useState("");

    const [notes, setNotes] = useState("");

    // -------- GENERAL ANALYSIS --------
    const handleGeneral = () => {
        const MAP = (parseFloat(sbp) + 2 * parseFloat(dbp)) / 3;
        setMap(MAP);

        let risk = "Stable";
        if (MAP < 70) risk = "Low Perfusion";
        else if (MAP > 105) risk = "Hypertensive";

        setGeneralRisk(risk);
    };

    // -------- ICP CALCULATION --------
    const handleICP = () => {
        if (!map || !cpp) return;

        const ICP = map - parseFloat(cpp);
        setIcp(ICP);

        let risk = "Normal";
        if (ICP > 20) risk = "High ICP";
        else if (ICP > 15) risk = "Borderline";

        setIcpRisk(risk);
    };

    // -------- SAMPLE DATA --------
    const loadSample = () => {
        setPatientId("P-102");
        setSbp(120);
        setDbp(80);
        setHr(72);
        setCpp(70);
    };

    // -------- BADGE COLOR --------
    const getColor = (value) => {
        if (value === "High ICP" || value === "Low Perfusion") return "#e74c3c";
        if (value === "Borderline" || value === "Hypertensive") return "#f39c12";
        return "#2ecc71";
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>👨‍⚕️ Clinical Monitoring Dashboard</h2>

            <button onClick={loadSample}>Load Sample Patient</button>

            {/* ================= PATIENT SUMMARY ================= */}
            <div style={cardStyle}>
                <h3>Patient Summary</h3>

                <input
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                /><br />

                <p><b>Heart Rate:</b> {hr || "N/A"} bpm</p>
                <p><b>MAP:</b> {map ? map.toFixed(2) : "N/A"}</p>
                <p><b>ICP:</b> {icp !== null ? icp.toFixed(2) : "N/A"}</p>
            </div>

            {/* ================= GENERAL ================= */}
            <div style={cardStyle}>
                <h3>General Hemodynamic Analysis</h3>

                <input
                    type="number"
                    placeholder="SBP"
                    value={sbp}
                    onChange={(e) => setSbp(e.target.value)}
                /><br />

                <input
                    type="number"
                    placeholder="DBP"
                    value={dbp}
                    onChange={(e) => setDbp(e.target.value)}
                /><br />

                <input
                    type="number"
                    placeholder="Heart Rate"
                    value={hr}
                    onChange={(e) => setHr(e.target.value)}
                /><br /><br />

                <button onClick={handleGeneral}>Analyze</button>

                {map && (
                    <div>
                        <p>MAP: {map.toFixed(2)}</p>

                        <span style={{
                            backgroundColor: getColor(generalRisk),
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "8px"
                        }}>
                            {generalRisk}
                        </span>
                    </div>
                )}
            </div>

            {/* ================= INVASIVE ================= */}
            <div style={cardStyle}>
                <h3>ICP Estimation (CPP-Based)</h3>

                <input
                    type="number"
                    placeholder="Cerebral Perfusion Pressure (CPP)"
                    value={cpp}
                    onChange={(e) => setCpp(e.target.value)}
                /><br /><br />

                <button onClick={handleICP}>Compute ICP</button>

                {icp !== null && (
                    <div>
                        <p>ICP: {icp.toFixed(2)}</p>

                        <span style={{
                            backgroundColor: getColor(icpRisk),
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "8px"
                        }}>
                            {icpRisk}
                        </span>

                        {icp > 20 && (
                            <div style={{
                                backgroundColor: "#ffcccc",
                                padding: "10px",
                                marginTop: "10px",
                                borderRadius: "8px"
                            }}>
                                ⚠️ Critical Alert: Elevated intracranial pressure detected.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ================= NON-INVASIVE ================= */}
            <div style={cardStyle}>
                <h3>Non-Invasive Monitoring</h3>

                <input
                    placeholder="TCD Pulsatility Index (PI)"
                    value={tcd}
                    onChange={(e) => setTcd(e.target.value)}
                /><br />

                <input
                    placeholder="Optic Nerve Sheath Diameter (ONSD)"
                    value={onsd}
                    onChange={(e) => setOnsd(e.target.value)}
                /><br />

                <p style={{ fontSize: "14px", marginTop: "10px" }}>
                    These parameters support indirect assessment of intracranial dynamics.
                    AI-based prediction can be integrated in future.
                </p>
            </div>

            {/* ================= NOTES ================= */}
            <div style={cardStyle}>
                <h3>Clinical Notes</h3>

                <textarea
                    rows="4"
                    placeholder="Enter observations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
        </div>
    );
}

// -------- CARD STYLE --------
const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

export default Doctor;