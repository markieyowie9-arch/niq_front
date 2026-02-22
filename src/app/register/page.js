"use client";
import { useState } from "react";

function SecurityQuestionField() {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Security Question *</label>
        <select
          className="form-select"
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
          required
        >
          <option value="">Select a question</option>
          <option value="pet">What was your first pet's name?</option>
          <option value="school">What was your elementary school?</option>
          <option value="mother">What is your mother's maiden name?</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Answer *</label>
        <input
          type="text"
          className="form-control"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
    </>
  );
}

export default SecurityQuestionField;
