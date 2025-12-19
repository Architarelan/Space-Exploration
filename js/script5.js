const quizData = [
    { question: "What is the closest planet to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
    { question: "Which planet is known as the 'Red Planet'?", options: ["Jupiter", "Venus", "Saturn", "Mars"], answer: "Mars" },
    { question: "Which is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Earth"], answer: "Jupiter" },
    { question: "How many moons does Earth have?", options: ["1", "2", "4", "0"], answer: "1" },
    { question: "Which celestial body is known as the 'Evening Star'?", options: ["Venus", "Mars", "Mercury", "Jupiter"], answer: "Venus" },
    { question: "Who was the first person to walk on the Moon?", options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"], answer: "Neil Armstrong" },
    { question: "What is the name of our galaxy?", options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"], answer: "Milky Way" },
    { question: "Which planet has the most extensive ring system?", options: ["Uranus", "Neptune", "Jupiter", "Saturn"], answer: "Saturn" },
    { question: "What is the hottest planet in our solar system?", options: ["Mercury", "Venus", "Mars", "Jupiter"], answer: "Venus" },
    { question: "Which space telescope was launched in 1990 and remains in operation?", options: ["Chandra", "Hubble", "James Webb", "Kepler"], answer: "Hubble" },
    { question: "What force keeps planets in orbit around the Sun?", options: ["Magnetism", "Gravity", "Light", "Tides"], answer: "Gravity" },
    { question: "What is the term for a giant explosion that marks the end of a massive star’s life?", options: ["Supernova", "Nebula", "Black Hole", "White Dwarf"], answer: "Supernova" },
    { question: "Which planet is tilted on its side by about 98 degrees?", options: ["Saturn", "Uranus", "Neptune", "Mars"], answer: "Uranus" },
    { question: "What is the name of the first artificial satellite launched into space?", options: ["Apollo 11", "Voyager 1", "Sputnik 1", "Hubble"], answer: "Sputnik 1" },
    { question: "Which planet has the fastest winds in the solar system?", options: ["Jupiter", "Saturn", "Neptune", "Venus"], answer: "Neptune" },
    { question: "What is the name of the first human-made object to leave the solar system?", options: ["Apollo 13", "Voyager 1", "Pioneer 10", "New Horizons"], answer: "Voyager 1" },
    { question: "Which planet has a storm called the 'Great Red Spot'?", options: ["Saturn", "Jupiter", "Neptune", "Venus"], answer: "Jupiter" },
    { question: "How long does it take for light from the Sun to reach Earth?", options: ["1 second", "8 minutes", "1 hour", "24 hours"], answer: "8 minutes" },
    { question: "What is the name of NASA’s latest Mars rover, which landed in 2021?", options: ["Spirit", "Opportunity", "Perseverance", "Curiosity"], answer: "Perseverance" },
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

// Function to display quiz
function displayQuiz() {
    let quizHTML = "";
    quizData.forEach((item, index) => {
        quizHTML += `
            <div class="question">${index + 1}. ${item.question}</div>
            <div class="options">
                ${item.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}"> ${option}
                    </label>
                `).join("")}
            </div>
        `;
    });
    quizContainer.innerHTML = quizHTML;
}

// Function to calculate score
function calculateScore() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === item.answer) {
            score++;
        }
    });

    resultContainer.innerHTML = `<h2>Your Score: ${score} / ${quizData.length} 🌟</h2>`;
}

// Load quiz and set event listener
displayQuiz();
submitButton.addEventListener("click", calculateScore);
