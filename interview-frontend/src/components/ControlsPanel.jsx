export default function ControlsPanel({ role, setRole, difficulty, setDifficulty, duration, setDuration }) {
  return (
    <div className="my-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
      
      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-2 font-semibold text-gray-700">Job Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="Backend Developer">Backend Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Fullstack Developer">Fullstack Developer</option>
        </select>
      </div>

      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-2 font-semibold text-gray-700">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-2 font-semibold text-gray-700">
          Duration (minutes): <span className="font-normal text-gray-600">{duration}</span>
        </label>
        <input
          type="range"
          min="15"
          max="120"
          step="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full cursor-pointer accent-green-500"
        />
      </div>
      
    </div>
  );
}
