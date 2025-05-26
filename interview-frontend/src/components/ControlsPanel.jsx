export default function ControlsPanel({ role, setRole, difficulty, setDifficulty, duration, setDuration }) {
  return (
    <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div>
        <label className="block mb-1 font-medium">Job Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="Backend Developer">Backend Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Fullstack Developer">Fullstack Developer</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Duration (minutes)</label>
        <input
          type="number"
          min="5"
          max="60"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}
