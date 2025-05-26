import ReactMarkdown from "react-markdown";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FeedbackPanel({ ratings, feedbackText }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-left space-y-6 border border-green-200">
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Final Feedback Summary<span className="animate-dots">...</span>
      </h2>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-green-700">Your Performance (Based on your resume and the interview):</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ratings} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1e7dd" />
            <XAxis type="number" domain={[0, 10]} stroke="#15803d" />
            <YAxis dataKey="category" type="category" stroke="#15803d" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }} 
              labelStyle={{ color: "#166534" }} 
              itemStyle={{ color: "#166534" }} 
            />
            <Bar dataKey="score" fill="#22c55e" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown 
          components={{
            p: ({ node, ...props }) => <p className="text-green-900" {...props} />,
            strong: ({ node, ...props }) => <strong className="text-green-800" {...props} />,
          }}
        >
          {feedbackText}
        </ReactMarkdown>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-dots::after {
          content: '';
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes dots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
      `}</style>
    </div>
  );
}