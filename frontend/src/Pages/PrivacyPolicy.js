import React, { useEffect, useState } from "react";
import axios from "axios";

function PrivacyPolicyPage() {
  const [policyContent, setPolicyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyContent = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/iubenda-policy/");
        if (response.status === 200) {
          // Extract only the HTML content part from the response
          const policyHtml = JSON.parse(response.data.policy).content;
          setPolicyContent(policyHtml);
        } else {
          setError("Failed to load privacy policy.");
        }
      } catch (err) {
        setError("Failed to load privacy policy. Please try again later.");
        console.error("Error fetching privacy policy:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyContent();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Privacy Policy</h2>
      {/* Render the privacy policy HTML */}
      <div
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: policyContent }}
      />
    </div>
  );
}

export default PrivacyPolicyPage;

// Inline styles object
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px"
  },
  content: {
    lineHeight: "1.6",
    color: "#444",
    fontSize: "1rem"
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#d35400",
    marginTop: "40px"
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#d35400",
    marginTop: "40px"
  }
};
