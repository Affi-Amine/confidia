import React from "react";
import { useParams } from "react-router-dom";
import QuizJson from "../../JSON/Quiz.json";
import "../../sass/Pages/Quiz/QuizForm.scss";
import useGlobalParam from "../../Store/useGlobalParam";
import NotFound from "../NotFound";

export default function QuizForm() {
  const { language } = useGlobalParam();
  const { id } = useParams();
  const quiz = QuizJson.find((e) => e.title === id);
  if (!quiz) return <NotFound />;
  return (
    <div className="QuizForm">
      <iframe
        title={quiz.title}
        src={quiz.urlQuiz[language]}
        allowFullScreen
      ></iframe>
    </div>
  );
}
