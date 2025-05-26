import { useEffect } from "react";

export default function QuestionDisplay({ question }) {
    useEffect(() => {
        if (question) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(question);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);

            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, [question]);

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-lg">{question}</p>
        </div>
    );
}
