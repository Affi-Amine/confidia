import React, { useEffect, useState } from "react";
import axios from "axios";

function InfoPage({ endpoint, title }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(endpoint);
        if (response.status === 200) {
          const htmlContent = JSON.parse(response.data.policy).content;
          setContent(htmlContent);
        } else {
          setError(`Failed to load ${title}.`);
        }
      } catch (err) {
        setError(`Failed to load ${title}. Please try again later.`);
        console.error(`Error fetching ${title}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint, title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default InfoPage;