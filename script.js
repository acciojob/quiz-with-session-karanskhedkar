//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const handleSelection = (event) => {
  const question = event.target.parentElement;
  const answer = event.target.value;
  const remove = [];
  question.childNodes.forEach((element) => {
    if (element.textContent && !element.textContent.includes("?")) {
      if (answer !== element.textContent) {
        remove.push(element.textContent);
      }
    }
  });
  const temp = JSON.parse(sessionStorage.getItem("progress"));
  if (temp) {
    const temUpdated = temp.filter((ele) => !remove.includes(ele));
    sessionStorage.setItem("progress", JSON.stringify([...temUpdated, answer]));
  } else {
    sessionStorage.setItem("progress", JSON.stringify([answer]));
  }
};

// Display the quiz questions and choices
function renderQuestions() {
  const userAnswers = JSON.parse(sessionStorage.getItem("progress"));
  const questionsElement = document.getElementById("questions");
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.onchange = handleSelection;
      if (userAnswers && userAnswers.includes(choice)) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

const calculateScore = () => {
  const scoreElement = document.getElementById("score");
  const userAnswers = JSON.parse(sessionStorage.getItem("progress"));
  if (userAnswers) {
    scoreElement.innerText = `Your score is ${userAnswers.length} out of 5.`;
    localStorage.setItem("score",userAnswers.length);
  } else {
    scoreElement.innerText = `Your score is 0 out of 5.`;
    localStorage.setItem("score",0);
  }
};
