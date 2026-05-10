from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

# ==========================================
# 1. LOAD AND TRAIN VITAL SIGNS MODEL
# ==========================================
df = pd.read_csv("../Dataset.csv", low_memory=False)

# Clean column names
df.columns = df.columns.str.strip()

# Features used for the Random Forest model
features = ["HR", "O2Sat", "SBP", "MAP", "DBP", "Resp"]

# Convert feature columns to numeric
for col in features:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# Clean target column
df["Risk"] = df["Risk"].astype(str).str.strip()

# Remove rows with missing values in required columns
df = df.dropna(subset=features + ["Risk"])

# Keep only valid labels
df = df[df["Risk"].isin(["Low", "Moderate", "High"])]

# Prepare training data
X = df[features]
y = df["Risk"]

# Train Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
model.fit(X, y)

# ==========================================
# 2. LOAD SYMPTOM COMBINATION DATASET
# ==========================================
symptom_df = pd.read_csv(
    "../PhysioNeuro.csv",
    encoding="utf-8-sig",
    sep=None,
    engine="python"
)

# Clean column names
# Clean and normalize column names
symptom_df.columns = (
    symptom_df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

print("PhysioNeuro columns:", symptom_df.columns.tolist())

# Clean all text values to avoid matching issues
for col in symptom_df.columns:
    symptom_df[col] = symptom_df[col].astype(str).str.strip()

# ==========================================
# 3. RISK MAPPING FUNCTIONS
# ==========================================
risk_to_num = {
    "Low": 1,
    "Moderate": 2,
    "High": 3
}

num_to_risk = {
    1: "Low",
    2: "Moderate",
    3: "High"
}


def get_symptom_risk(data):
    """
    Looks up the clinical symptom risk from PhysioNeuro.csv
    based on the user's selected symptom values.
    """

    match = symptom_df[
        (symptom_df["vomiting"] == str(data.get("vomiting", "")).strip()) &
        (symptom_df["headache"] == str(data.get("headache", "")).strip()) &
        (symptom_df["seizures"] == str(data.get("seizures", "")).strip()) &
        (symptom_df["dizziness"] == str(data.get("dizziness", "")).strip()) &
        (symptom_df["blurred_vision"] == str(data.get("blurredVision", "")).strip()) &
        (symptom_df["pupil"] == str(data.get("pupil", "")).strip()) &
        (symptom_df["consciousness"] == str(data.get("consciousness", "")).strip())
    ]

    # If no exact match is found, default to Low
    if match.empty:
        print("No matching symptom combination found.")
        return "Low"

    return str(match.iloc[0]["clinical_symptom_risk"]).strip()


def combine_risks(vitals_risk, symptom_risk):
    """
    Uses the conservative rule:
    overall_risk = max(vitals_risk, symptom_risk)
    """
    vitals_score = risk_to_num.get(vitals_risk, 1)
    symptom_score = risk_to_num.get(symptom_risk, 1)

    overall_score = max(vitals_score, symptom_score)

    return num_to_risk[overall_score]


# ==========================================
# 4. PREDICTION API
# ==========================================
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        # --------------------------
        # Predict vitals-based risk
        # --------------------------
        input_data = [[
            float(data.get("HR", 0)),
            float(data.get("O2Sat", 0)),
            float(data.get("SBP", 0)),
            float(data.get("MAP", 0)),
            float(data.get("DBP", 0)),
            float(data.get("Resp", 16))
        ]]

        vitals_risk = model.predict(input_data)[0]

        # --------------------------
        # Lookup symptom-based risk
        # --------------------------
        clinical_symptom_risk = get_symptom_risk(data)

        # --------------------------
        # Combine both risks
        # --------------------------
        overall_risk = combine_risks(
            vitals_risk,
            clinical_symptom_risk
        )

        # --------------------------
        # Return all three risks
        # --------------------------
        return jsonify({
            "vitals_risk": vitals_risk,
            "clinical_symptom_risk": clinical_symptom_risk,
            "overall_risk": overall_risk
        })

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({
            "error": str(e)
        }), 500


# ==========================================
# 5. RUN SERVER
# ==========================================
if __name__ == "__main__":
    app.run(port=5000, debug=True)