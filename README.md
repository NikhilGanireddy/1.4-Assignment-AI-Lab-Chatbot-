# AI Lab Documentation

## CareerPrep AI: Interview Preparation Chatbot for Students and Early-Career Developers

## Student Name
Nikhil Ganireddy

## Course
AIML-500

## Assignment
AI Lab

## Product Link
https://ai-lab-chatbot-1-4-assignment.vercel.app/

---

## Introduction

For this AI Lab, I created CareerPrep AI, a chatbot prototype designed to help students and early-career developers prepare for interviews. The chatbot focuses on practical interview support through behavioral interview practice, technical interview preparation, resume help, project explanation guidance, and confidence coaching.

This project was developed using a design thinking approach, which was a central part of the guided AI Lab. The goal was not only to build a chatbot, but also to work through a real user problem, document the design process, and test how the assistant should behave. The AI Lab assignment requires both documentation and a link to the final product, and the guided materials emphasize building an AI chatbot or assistant using empathy, design thinking, prototyping, and testing.

---

## Purpose of the Project

The purpose of this project was to design and prototype an AI assistant that solves a real communication problem for a specific audience. Many students and early-career developers know their skills and projects, but they often struggle to explain them clearly in interviews. They may give weak answers, fail to structure project explanations, or feel unprepared when asked common interview questions.

CareerPrep AI was built to address that problem in a focused and practical way. Instead of creating a generic chatbot for everything, I designed a chatbot specifically for interview preparation. This made the assistant more useful, easier to test, and more aligned with actual user needs.

The guided AI Lab emphasizes user-centered thinking and starting with the problem first instead of jumping immediately to the solution. It also highlights that empathy in AI/ML helps ensure technology serves people fairly and effectively. That idea shaped this project from the beginning.

---

## Why I Chose This Problem

I chose interview preparation as the focus of this chatbot because it is a realistic and meaningful problem for students, especially those applying for internships or entry-level software roles. This problem is relevant to me as well, so I could approach it with more context and a better understanding of what users actually struggle with.

There were several reasons this was a strong fit for the AI Lab:

1. It has a clear target audience.
2. It solves a real communication problem.
3. It works well as a chatbot experience.
4. It allows structured testing.
5. It fits well with design thinking because the problem is strongly connected to user needs, confidence, and communication.

A lot of students can build projects, but not all of them can explain those projects well in interviews. That gap between technical ability and communication ability is exactly where this chatbot is useful.

---

## Design Thinking Process

The guided activity frames the chatbot build through the design thinking phases of Empathy, Define, Ideate, Prototype, and Test. It also explains that empathy helps identify user needs, the define phase translates insights into problem statements, the ideate phase explores solutions, the prototype phase builds simple testable versions, and the test phase gathers feedback on usability and behavior.

### 1. Empathy

The first step was to think about the people affected by the problem. The guided activity stresses that empathy is the first step in problem solving because it helps define the problem accurately before jumping to solutions. It also notes that empathy in AI/ML supports fairness and better user experiences.

For this project, the main users are:

- college students
- internship seekers
- early-career developers
- beginner software engineers
- students preparing for technical or behavioral interviews

The user pain points I identified were:

- difficulty answering interview questions clearly
- trouble organizing thoughts under pressure
- weak project explanations
- generic or unconvincing answers
- low interview confidence
- uncertainty about how to improve answers

This step helped me avoid making the chatbot too broad. Instead of trying to make an assistant for all student needs, I kept it focused on one meaningful area where a chatbot could provide direct value.

### 2. Define

In the define phase, I translated the user pain points into a focused problem statement. The guided materials describe this phase as turning user insights into problem statements and defining the scope and limitations of AI in solving the identified problem.

My problem statement was:

> Students and early-career developers need a structured way to practice interview communication so they can answer questions more clearly, explain projects better, and build confidence before applying for internships and entry-level roles.

This phase was important because it narrowed the scope of the project. It also made it clear that the chatbot should not try to replace a real mentor, guarantee outcomes, or act like an all-purpose AI assistant.

### 3. Ideate

The ideate phase involved brainstorming possible AI-based solutions. The guided activity explains that ideation includes exploring different AI approaches and balancing innovation with practicality, user value, and feasibility.

Some possible ideas I considered were:

- a general student productivity chatbot
- a study planner assistant
- a resume-writing assistant
- a career coaching bot
- an interview preparation chatbot

I selected the interview preparation chatbot because it had the strongest combination of feasibility, usefulness, clarity, and relevance. It allowed for more realistic testing and clearer design constraints than a broad assistant would.

During ideation, I also decided that the chatbot should have multiple focused modes rather than behaving as one vague assistant. That led to the following modes:

- Behavioral Interview
- Technical Interview
- Resume Help
- Project Explanation
- Confidence Coaching

This gave the product more structure and helped users understand exactly what kind of help they were getting.

### 4. Prototype

The guided materials describe the prototype phase as creating simple models to test concepts and refining them iteratively based on feedback.

I built the prototype as a Next.js web application with the following features:

- hero section
- mode selector
- interactive chat interface
- starter prompt buttons
- structured feedback cards
- design thinking notes section
- test scenarios section

The chatbot was designed as a working prototype rather than a fully integrated production AI system. It uses structured mock response logic to simulate how the assistant should respond in different scenarios. This allowed me to focus on user needs, response quality, guardrails, testing, and overall product design.

### 5. Test

The guided activity describes testing as validating assumptions with real users, evaluating usability and user experience, and watching for unintended consequences, fairness issues, and bias.

For this project, I used scenario-based testing to evaluate:

- whether the chatbot stayed within scope
- whether responses were useful and structured
- whether weak answers received helpful feedback
- whether dishonest or unrealistic requests were refused
- whether users would understand the purpose of each mode
- whether the interaction felt practical and clear

Testing helped me refine both the interface and the behavior rules of the assistant.

---

## Bot Plan

The guided activity gives a specific planning checklist for building the bot, including the objective, knowledge, what it should not do, engagement style, steps, conclusions, success criteria, and test scenarios. I used that checklist directly when planning CareerPrep AI.

### 1. What is the bot's objective?

The objective of CareerPrep AI is to help students and early-career developers improve their interview communication by practicing interview questions, reviewing answers, improving project explanations, and building confidence before interviews.

### 2. What kind of information or knowledge should the assistant use?

The assistant should use practical interview-preparation knowledge such as:

- common behavioral interview patterns
- STAR-style answer structure
- common technical interview topics for beginner frontend and full-stack roles
- guidance for explaining personal projects
- resume and self-introduction best practices
- communication and confidence tips

### 3. What should the assistant NOT do?

The assistant should not:

- invent fake experience
- create dishonest resume content
- guarantee a job or internship
- provide legal, medical, financial, or therapy advice
- pretend to know things it does not know
- provide vague feedback without explanation

These guardrails were important because a chatbot without limits quickly turns into a nonsense cannon.

### 4. How should the assistant engage with the user?

The assistant should be:

- direct
- practical
- supportive
- structured
- clear
- professional without sounding robotic

It should avoid exaggerated motivational language and should explain feedback in a helpful way.

### 5. Will images or other data be part of the interaction?

No. This version is text-based only. I intentionally kept the project focused so that I could build a clean prototype and test the assistant's conversational behavior without unnecessary complexity.

### 6. How should the assistant start?

The assistant starts with a short greeting that introduces what it can help with and encourages the user to select a mode or type a question.

Example opening:

> "Hi, I'm CareerPrep AI. I can help you practice behavioral interviews, technical interviews, project explanations, and resume-based answers. Pick a mode or type your first question."

### 7. Are there steps that should be followed by the bot?

Yes. The chatbot should generally follow this flow:

1. identify the user's goal
2. determine the interview mode
3. ask for missing context if necessary
4. provide guidance, a practice question, or answer feedback
5. explain weak points before rewriting
6. offer a stronger version or next step
7. encourage continued practice

### 8. How should the assistant reach a conclusion and how should it act when it does?

The assistant should conclude each interaction with a practical next step, such as:

- improve the answer based on feedback
- personalize the example answer
- try a follow-up interview question
- switch to another interview mode
- practice again with a revised response

### 9. What does a successful engagement with the assistant look like?

A successful interaction means the user leaves with:

- a clearer answer
- a more structured response
- a stronger way to explain a project
- practical feedback they can use immediately
- more confidence in interview preparation

### 10. Test scenarios for the parameters and instructions

I created the following main test scenarios:

1. Help the user answer "Tell me about yourself."
2. Help the user explain a portfolio project clearly.
3. Improve a weak interview answer.
4. Refuse a request to make up fake experience.
5. Refuse a request for guaranteed hiring success.

These scenarios were used to check whether the assistant followed its instructions and boundaries.

---

## Why I Did Not Use a Live LLM API

For this AI Lab, I focused on the chatbot's design, behavior, scope, and testing rather than connecting it to a live large language model API. The assignment requires documentation and a link to the chatbot or assistant, and the guided activity emphasizes planning, documenting the process, prototyping, and testing the assistant's behavior. It does not require a live model integration.

Because of that, I built a functional Next.js chatbot prototype with structured mock response logic. This allowed me to:

- focus on user-centered design
- test behavior more reliably
- enforce clear guardrails
- avoid API complexity and cost
- keep the project aligned with the learning goals of the lab

This decision also made the prototype more stable for demonstration and easier to document.

---

## Ideas and Insights

The guided activity requires documentation of ideas and insights from the beginning of the process.

Some of my key initial ideas and insights were:

- The chatbot should solve a real communication problem, not just exist as a novelty.
- The audience should be specific so the assistant feels intentional.
- A narrowly scoped chatbot is usually more useful than a broad one.
- Interview prep is a good fit because the problem is practical, relevant, and easy to test.
- Students often need more help with explaining themselves than with learning raw technical concepts.
- Structure matters. A weak answer is often not bad because of content alone, but because of poor clarity and organization.

One important insight from the design thinking portion of the AI Lab was that the problem should be understood from the user's perspective first. That shifted my thinking away from "what features can I add?" and toward "what does the user genuinely need help with?"

---

## Decisions and Rationales

The guided activity also asks for documentation of decisions and rationales.

### Decision 1: Build an interview-prep chatbot

I chose an interview-prep chatbot because it solved a clear, realistic problem and had an obvious target audience.

### Decision 2: Use a focused product scope

I decided not to make a general assistant. The narrower scope made the chatbot more useful, more believable, and easier to evaluate.

### Decision 3: Use five interview modes

I added the five modes to make the product feel organized and user-centered. Instead of dumping all help into one chat stream, users can choose the kind of support they need.

### Decision 4: Use structured feedback cards

I wanted the assistant to go beyond simple chat responses. The structured feedback cards make the experience more practical by showing:

- what worked
- what needs improvement
- a stronger version
- clarity score
- confidence score
- suggested next step

### Decision 5: Keep the project text-based

I intentionally did not add image uploads, audio, or other media. Keeping it text-based allowed me to stay focused on the core learning objective and produce a cleaner prototype.

### Decision 6: Use mock logic instead of a live LLM

I chose structured mock responses because they aligned well with the assignment's emphasis on documentation, planning, behavior design, and testing.

### Decision 7: Add refusal behavior

I built refusal behavior for fake experience, guaranteed hiring success, and unrelated high-risk topics because those are important boundaries for a responsible assistant.

---

## Iterations

The guided activity says to document how the solution evolved over time.

This project changed significantly through iteration.

### Initial idea

My earliest concept was a broad student support assistant. That idea was too vague and did not clearly demonstrate a strong use case.

### First revision

I narrowed the project to career preparation and interview support. This made the audience and problem much clearer.

### Second revision

I broke the chatbot into five modes. This improved structure and made the UI easier to understand.

### Third revision

I added starter prompt buttons so first-time users would know how to begin. This made the experience less intimidating.

### Fourth revision

I added structured feedback cards for answer review. This improved usefulness because the assistant was now helping users improve answers, not just responding to them.

### Fifth revision

I added explicit guardrails and refusal logic. This made the assistant feel more responsible and aligned with the ethical concerns discussed in the guided materials, such as fairness, unintended consequences, and proper boundaries.

### Sixth revision

I refined the UI to make it look more polished and portfolio-ready. The portfolio guidance also notes that class work often needs revision before it becomes a strong artifact, so this step mattered beyond just the assignment.

---

## Challenges and Solutions

The guided activity requires documenting challenges and how they were addressed.

### Challenge 1: Avoiding a generic chatbot demo

A lot of AI projects look like the same chat interface with a different title slapped on top. That would have made this artifact weak and forgettable.

**Solution:**
I gave the project a clear audience, a focused problem, multiple support modes, structured feedback, and design-thinking framing.

### Challenge 2: Balancing realism with scope

A live LLM integration might have made the chatbot more dynamic, but it would also add API setup, cost, testing complexity, and unstable outputs.

**Solution:**
I used mock response logic so I could focus on product design, UX, scope, and testing rather than backend complexity.

### Challenge 3: Defining the assistant's limits

Without clear boundaries, the chatbot could easily drift into dishonest or inappropriate behavior.

**Solution:**
I added refusal handling for fake experience, guaranteed outcomes, and unrelated legal, medical, financial, or therapy requests.

### Challenge 4: Making the assistant actually useful

A chatbot that only gives generic encouragement would be useless.

**Solution:**
I made the responses more structured and practical. The project explanation mode, for example, helps users talk about problem, solution, stack, and impact rather than just "tell me about your project."

### Challenge 5: Turning class work into something portfolio-worthy

A plain assignment submission is not always a strong artifact for a public portfolio.

**Solution:**
I designed the chatbot as a polished web application and framed it as a case study in design thinking, user-centered problem solving, and AI assistant behavior.

---

## Testing Process

The guided activity explains that testing should evaluate functionality, usability, user experience, and ethical concerns.

I used scenario-based testing to check whether the chatbot behaved correctly in realistic situations.

### Test Scenario 1: "Tell me about yourself"

**Goal:** Check whether the assistant can help a user structure a common behavioral answer.

**Expected behavior:** The assistant should guide the user toward a clear, role-relevant, concise response.

### Test Scenario 2: Explaining a project

**Goal:** Check whether the assistant helps users describe a technical project more clearly.

**Expected behavior:** The assistant should organize the explanation around problem, solution, stack, and impact.

### Test Scenario 3: Weak answer review

**Goal:** See whether the assistant can identify weak interview language and suggest improvements.

**Expected behavior:** The assistant should explain what is weak, suggest a stronger version, and provide structured feedback.

### Test Scenario 4: Fake experience request

**Goal:** Check whether the assistant refuses dishonest behavior.

**Expected behavior:** The assistant should refuse and redirect the user toward honest alternatives.

### Test Scenario 5: Guaranteed hiring success

**Goal:** Check whether the assistant avoids unrealistic claims.

**Expected behavior:** The assistant should refuse to guarantee results and instead focus on preparation and improvement.

These tests helped confirm whether the assistant's rules and design goals were actually working in practice.

---

## What I Learned

This AI Lab taught me that building an AI assistant is not just about plugging into a model and generating text. The more important part is defining the problem, understanding the user, setting boundaries, designing the interaction, and testing whether the assistant actually solves the intended problem.

I also learned that a focused chatbot is much stronger than a broad one. When the scope is clear, the assistant becomes easier to design, easier to test, and more useful to users.

Another major takeaway was the importance of documentation. The guided activity explains that documentation supports clarity, accountability, reflection, improvement, and reporting. I found that documenting the project made my design choices easier to evaluate and explain.

Finally, I learned that user-centered design matters even in technical AI work. A system can "work" in a technical sense and still be weak if it does not meet the actual needs of the user. That idea was one of the most valuable parts of the lab.

---

## Skills Demonstrated

Through this project, I demonstrated:

- design thinking
- user-centered problem solving
- chatbot planning and prototyping
- interface design
- structured testing
- documentation of decisions and process
- responsible AI boundary setting
- practical product design for a specific audience

These skills align with the AI Lab goal of using generative AI tools, analyzing outputs, and applying design thinking to develop an AI-based solution to a problem.

---

## Final Reflection

CareerPrep AI is a focused chatbot prototype built to solve a real communication problem for students and early-career developers. By using design thinking, I was able to shape the chatbot around user needs instead of just building a generic AI demo. The project challenged me to think more carefully about scope, usefulness, honesty, and interaction design.

I believe the final product is successful because it clearly addresses a defined user problem, follows a thoughtful planning process, includes guardrails, and provides a working prototype that can be tested and demonstrated. It also reflects the core purpose of the AI Lab: using AI tools and design thinking to create a meaningful solution while documenting the process from start to finish.
