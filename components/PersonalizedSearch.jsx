import { useState } from "react";

function PersonalizedSearch() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(Array);

  const optionSelected = (answer) => {
    if (currentSelected.includes(answer)) {
      const newArray = currentSelected.filter((element) => element != answer);
      setCurrentSelected(newArray);
    } else {
      setCurrentSelected([...currentSelected, answer]);
    }
  };

  const switchQuestions = (btn) => {
    if(btn === 'back') return setCurrentQuestion((prev) => prev - 1);
    return setCurrentQuestion((prev) => prev + 1);
  };

  const submitPreferences = () => {
    const cuisines = currentSelected.filter(elem => questions[0].answers.includes(elem))
    const intolerences = currentSelected.filter(elem => questions[1].answers.includes(elem))
    const diet = currentSelected.filter(elem => questions[2].answers.includes(elem))
    fetchPreferences(cuisines, intolerences, diet)
  };
  
  const fetchPreferences = (cuisines, intolerences, diet) => {
    const cuisineString = cuisines.join()
    const intolerencesString = intolerences.join()
    const dietString = diet.join()
    console.log(cuisineString, intolerencesString, dietString)
  }

  const notSelected =
    "border-slate-300 rounded-full border-[5px] flex items-center justify-center cursor-pointer min-w-[120px] max-w-[120px] h-[120px] hover:border-slate-400";
  const selected =
    "border-red-500 rounded-full border-[5px] flex items-center justify-center cursor-pointer min-w-[120px] max-w-[120px] h-[120px] hover:border-red-600";
  const btns = "border-red-500 rounded-xl border-2 w-fit py-1 px-4 hover:border-red-600"

  return (
      <div className="bg-white shadow-2xl rounded-xl h-fit w-[80vw] p-4 flex flex-col items-center gap-y-5">
      <h2 className="font-semibold text-xl">
        {questions[currentQuestion].question}
      </h2>
      <div className="flex items-center justify-between gap-x-3 overflow-x-auto w-full py-2">
        {questions[currentQuestion].answers.map((answer, index) => {
          return (
            <div
              key={index}
              onClick={() => optionSelected(answer)}
              className={
                currentSelected.includes(answer) ? selected : notSelected
              }
            >
              <span className="text-center">{answer}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-3 items-center">
        {currentQuestion != 0 && (
          <button
            className={`text-red-500 ${btns} hover:text-red-600`}
            onClick={() => switchQuestions("back")}
          >
            Back
          </button>
        )}
        <button
          className={`bg-red-500 text-white ${btns} hover:bg-red-600`}
          onClick={
            currentQuestion + 1 === questions.length
              ? () => submitPreferences()
              : () => switchQuestions("next")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PersonalizedSearch;

const questions = [
  {
    question: "What cuisines do you prefer?",
    answers: [
      "Italian",
      "French",
      "Chinese",
      "Japanese",
      "Mexican",
      "American",
      "Mediterranean",
      "Middle Eastern",
    ],
  },
  {
    question: "Do you have any allergies?",
    answers: [
      "Dairy",
      "Peanut",
      "Seafood",
      "Gluten",
      "Egg",
      "Soy",
      "Wheat",
      "Shellfish",
    ],
  },
  {
    question: "Do you follow any diet?",
    answers: [
      "Vegetarian",
      "Vegan",
      "Lacto-Vegetarian",
      "Ovo-Vegetarin",
      "Low FODMAP",
    ],
  },
];
