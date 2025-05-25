export default function ControlsPanel({ role, setRole, difficulty, setDifficulty, duration, setDuration }) {
  return (
    <div className="flex gap-4 flex-wrap my-4">
      <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded">
        <option value="Backend Developer">Backend Developer</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Fullstack Developer">Fullstack Developer</option>
      </select>

      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border p-2 rounded">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        min="5"
        max="60"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 rounded w-24"
        placeholder="Time (min)"
      />
    </div>
  );
}
