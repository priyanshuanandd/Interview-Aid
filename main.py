import os
import time
from datetime import datetime, timedelta
from dotenv import load_dotenv
import fitz  # PyMuPDF
import google.generativeai as genai

# Load environment variables
load_dotenv()


if not os.getenv("GEMINI_API_KEY"):
    raise EnvironmentError("GEMINI_API_KEY not found in environment variables.")

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-1.5-flash")



#SCRIPT 
def select_interview_config():
    print("🧑‍💻 Welcome to the AI Interview Bot Setup\n")

    # 🎚️ Difficulty Selector
    difficulty = input("Choose difficulty (easy / medium / hard): ").strip().lower()
    if difficulty not in ["easy", "medium", "hard"]:
        difficulty = "medium"

    # ⏱️ Duration Selector
    try:
        duration = int(input("Enter interview duration in minutes (default 30): "))
        if duration <= 0: raise ValueError
    except:
        duration = 30

    # 💼 Role Selector
    role = input("Enter job role (e.g., Backend Developer, Frontend Engineer): ").strip()
    if not role:
        role = "Software Developer"

    return difficulty, duration, role

# ----------------------------- Resume Extraction -----------------------------
def extract_resume_text(file_path: str) -> str:
    with fitz.open(file_path) as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text.strip()

# ------------------------- Question Generation ------------------------------
def get_questions_from_resume(resume_text: str, role: str, difficulty: str) -> list:
    prompt = (
        f"You are an AI interviewer for a {role} Software Engineer role.\n\n"
        f"Here is the candidate's resume:\n{resume_text}\n\n"
        f"Ask 10 {difficulty}-level interview questions (both technical and behavioral). "
        "Customize the questions based on the candidate’s resume and the role. "
        "Number the questions clearly in a list.Just output the questions and the first question for introducing himself and also introduce yourself before that"
    )
    response = model.generate_content(prompt)
    questions = [line.strip() for line in response.text.split('\n') if line.strip()]
    return questions

# ------------------------- Timed Interview Session --------------------------
def timed_interview_session(questions: list, duration_minutes: int = 30) -> list:
    print(f"\n🎤 Interview started! You have {duration_minutes} minutes.\n")
    end_time = datetime.now() + timedelta(minutes=duration_minutes)
    qa_pairs = []

    i = 0
    while datetime.now() < end_time and i < len(questions):
        question = questions[i]
        print(f"\nQ{i+1}: {question}")
        answer = input("Your Answer: ").strip()

        qa_pairs.append({
            "question": question,
            "answer": answer
        })
        i += 1

    print("\n🛑 Time's up! Generating overall feedback...\n")
    return qa_pairs

# ------------------------- Bulk Feedback from Gemini ------------------------
def get_bulk_feedback(qa_pairs, resume_text="") -> str:
    prompt = "You are an AI interview coach. A candidate completed a mock interview.\n\n"

    for i, pair in enumerate(qa_pairs, 1):
        prompt += f"Q{i}: {pair['question']}\nA{i}: {pair['answer']}\n\n"

    if resume_text:
        prompt += f"Candidate's resume:\n{resume_text}\n\n"

    prompt += (
        "Based on the answers and resume, give a very detailed feedback on:\n"
        "- Technical knowledge\n"
        "- Communication skills\n"
        "- Behavioral response quality\n"
        "- Suggestions for improvement\n"
        "- Overall performance and rating out of 10\n\n"
        "Be friendly, constructive, and specific."
    )

    response = model.generate_content(prompt)
    return response.text.strip()

# ------------------------- Main Function Entry ------------------------------
if __name__ == "__main__":
    resume_path = "sample_resume.pdf"

    # 🔧 Step 1: Get config from user
    difficulty, duration, role = select_interview_config()

    # 📄 Step 2: Extract resume and questions
    resume_text = extract_resume_text(resume_path)
    questions = get_questions_from_resume(resume_text, role, difficulty)

    # ⏳ Step 3: Run timed session
    qa_pairs = timed_interview_session(questions, duration_minutes=duration)

    # 🧾 Step 4: Get feedback
    final_feedback = get_bulk_feedback(qa_pairs, resume_text)

    print("\n📋 Final Feedback:\n")
    print(final_feedback)
