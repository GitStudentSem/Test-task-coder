const vacancy = document.getElementById("vacancy"); // Блок вакансий
const vacancyInput = vacancy.querySelectorAll("input"); // Инпуты в вакансиях
const vacancyButton = document.getElementById("vacancy-next"); // Конопка вакансий
const exp = document.getElementById("exp"); // блок опыта
const grade = document.getElementById("grade"); // блок градации
const resultBlock = document.getElementById("result"); // Блок результата
const result = resultBlock.querySelector("p"); // Текст результата
const resultButton = document.getElementById("again"); // Кнопка начать сначала
let percent = 0; // Шанс взятия на работу
let count = 0; // Счетчик блоков

const tryAgain = () => {
  // Сброс всех счетчиков
  count = 0;
  percent = 0;
  // Сброс всех форм
  const inputs = document.querySelectorAll("input");
  // Сброс значений в инпутах
  inputs.forEach((input) => {
    if (input.checked || input.value != "") {
      input.checked = false;
      input.value = "";
    }
  });
  resultButton.removeEventListener("click", tryAgain);
  exp.removeAttribute("data-work");
  grade.removeAttribute("data-work");
  resultBlock.classList.remove("active");
  vacancy.classList.add("active");
};

// Определние вакансии
const definingVacancies = () => {
  vacancyInput.forEach((input) => {
    if (input.checked && input.id === "designer") {
      exp.setAttribute("data-work", "designer");
      grade.setAttribute("data-work", "designer");
      vacancy.classList.remove("active");
      exp.classList.add("active");
      designer();
    } else if (input.checked && input.id === "frontend") {
      exp.setAttribute("data-work", "frontend");
      grade.setAttribute("data-work", "frontend");
      vacancy.classList.remove("active");
      exp.classList.add("active");
      frontend();
    } else if (input.checked && input.id === "tester") {
      vacancy.classList.remove("active");
      resultBlock.classList.add("active");
      result.innerHTML = "К сожалению, нам с тобой не по пути";
      resultButton.innerHTML = "Возможно";
      resultButton.addEventListener("click", tryAgain);
    }
  });
};
vacancyButton.addEventListener("click", definingVacancies);

const showResult = () => {
  resultBlock.classList.add("active");
  resultButton.innerHTML = "Начать сначала";
  Math.round(percent);
  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }
  if (percent <= 50) {
    result.innerHTML = "К сожалению, нам с тобой не по пути";
  } else if (percent > 80) {
    result.innerHTML = "Проверь почту, там уже лежит оффер";
  } else {
    result.innerHTML = "Ну если больше никто не придёт, то возьмём тебя";
  }
  resultButton.addEventListener("click", tryAgain);
};

const nextCount = () => {
  count += 1;
};

const nextQuestion = (block, nextFunction) => {
  block[count].classList.remove("active");
  nextCount();
  nextFunction();
};

const showBlock = (block) => {
  block[count].classList.add("active");
};

const defineInputs = (block) => {
  return (inputs = block[count].querySelectorAll("input"));
};

const defineButtons = (block) => {
  return (button = block[count].querySelector("button"));
};

const designer = () => {
  const designer = document.querySelectorAll("[data-work='designer']"); // Получаю ветку вопросов дизайнера
  // первый вопрос
  const expQuestion = () => {
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);

    button.addEventListener("click", function expListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "exp-1") {
          percent += 20;
          nextQuestion(designer, programmQuestion);
          button.removeEventListener("click", expListener);
        } else if (input.checked && input.id === "exp-2") {
          percent += 10;
          nextQuestion(designer, programmQuestion);
          button.removeEventListener("click", expListener);
        } else if (input.checked && input.id === "exp-3") {
          percent += 0;
          nextQuestion(designer, programmQuestion);
          button.removeEventListener("click", expListener);
        }
      });
    });
  };
  expQuestion();

  // Второй вопрос
  const programmQuestion = () => {
    showBlock(designer);
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);
    button.addEventListener("click", function programmListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "programm-1") {
          percent += 15;
          nextQuestion(designer, fontQuestion);
          button.removeEventListener("click", programmListener);
        } else if (input.checked && input.id === "programm-2") {
          percent -= 10;
          nextQuestion(designer, fontQuestion);
          button.removeEventListener("click", programmListener);
        } else if (input.checked && input.id === "programm-3") {
          percent += 0;
          nextQuestion(designer, fontQuestion);
          button.removeEventListener("click", programmListener);
        }
      });
    });
  };

  // Третий вопрос
  const fontQuestion = () => {
    showBlock(designer);
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);
    button.addEventListener("click", function fontListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "font-1") {
          percent += 20;
          button.removeEventListener("click", fontListener);
          nextQuestion(designer, whiteQuestion);
        } else if (input.checked && input.id === "font-2") {
          percent += 10;
          button.removeEventListener("click", fontListener);
          nextQuestion(designer, whiteQuestion);
        } else if (input.checked && input.id === "font-3") {
          percent += 30;
          button.removeEventListener("click", fontListener);
          nextQuestion(designer, whiteQuestion);
        } else if (input.checked && input.id === "font-4") {
          percent -= 5;
          button.removeEventListener("click", fontListener);
          nextQuestion(designer, whiteQuestion);
        }
      });
    });
  };

  // Четвертый вопрос
  const whiteQuestion = () => {
    showBlock(designer);
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);
    button.addEventListener("click", function whiteListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "white-1") {
          percent += 15;
          button.removeEventListener("click", whiteListener);
          nextQuestion(designer, whichWayQuestion);
        } else if (input.checked && input.id === "white-2") {
          percent += 5;
          button.removeEventListener("click", whiteListener);
          nextQuestion(designer, whichWayQuestion);
        } else if (input.checked && input.id === "white-3") {
          percent -= 10;
          button.removeEventListener("click", whiteListener);
          nextQuestion(designer, whichWayQuestion);
        }
      });
    });
  };

  // Пятый вопрос
  const whichWayQuestion = () => {
    showBlock(designer);
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);
    button.addEventListener("click", function whichWayListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "which-way-1") {
          percent += 20;
          button.removeEventListener("click", whichWayListener);
          if (percent > 50) {
            nextQuestion(designer, gradeQuestion);
          } else {
            nextQuestion(designer, showResult);
          }
        } else if (input.checked && input.id === "which-way-2") {
          percent += 10;
          button.removeEventListener("click", whichWayListener);
          if (percent > 50) {
            nextQuestion(designer, gradeQuestion);
          } else {
            nextQuestion(designer, showResult);
          }
        } else if (input.checked && input.id === "which-way-3") {
          percent += 5;
          button.removeEventListener("click", whichWayListener);
          if (percent > 50) {
            nextQuestion(designer, gradeQuestion);
          } else {
            nextQuestion(designer, showResult);
          }
        }
      });
    });
  };

  // Шестой вопрос
  const gradeQuestion = () => {
    showBlock(designer);
    let inputs = defineInputs(designer);
    let button = defineButtons(designer);
    button.addEventListener("click", function gradeListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "grade-1") {
          percent *= 1.5;
          nextQuestion(designer, showResult);
          button.removeEventListener("click", gradeListener);
        } else if (input.checked && input.id === "grade-2") {
          percent *= 1.2;
          nextQuestion(designer, showResult);
          button.removeEventListener("click", gradeListener);
        } else if (input.checked && input.id === "grade-3") {
          percent *= 0.7;
          nextQuestion(designer, showResult);
          button.removeEventListener("click", gradeListener);
        }
      });
    });
  };
};

const frontend = () => {
  const frontend = document.querySelectorAll("[data-work='frontend']"); // Получаю ветку вопросов дизайнера
  // первый вопрос
  const expQuestion = () => {
    let inputs = defineInputs(frontend);
    let button = defineButtons(frontend);

    button.addEventListener("click", function expListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "exp-1") {
          percent += 20;
          button.removeEventListener("click", expListener);
          nextQuestion(frontend, divQuestion);
        } else if (input.checked && input.id === "exp-2") {
          percent += 10;
          button.removeEventListener("click", expListener);
          nextQuestion(frontend, divQuestion);
        } else if (input.checked && input.id === "exp-3") {
          percent += 0;
          button.removeEventListener("click", expListener);
          nextQuestion(frontend, divQuestion);
        }
      });
    });
  };
  expQuestion();

  // Второй вопрос
  const divQuestion = () => {
    showBlock(frontend);
    let inputs = defineInputs(frontend);
    let button = defineButtons(frontend);

    button.addEventListener("click", function divListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "div-1") {
          percent += 15;
          button.removeEventListener("click", divListener);
          nextQuestion(frontend, jsQuestion);
        } else if (input.checked && input.id === "div-2") {
          percent += 10;
          button.removeEventListener("click", divListener);
          nextQuestion(frontend, jsQuestion);
        } else if (input.checked && input.id === "div-3") {
          percent -= 5;
          button.removeEventListener("click", divListener);
          nextQuestion(frontend, jsQuestion);
        }
      });
    });
  };

  // Третий вопрос
  const jsQuestion = () => {
    showBlock(frontend);
    let inputs = defineInputs(frontend);
    let button = defineButtons(frontend);

    button.addEventListener("click", function jsListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "js-1") {
          percent -= 30;
          button.removeEventListener("click", jsListener);
          nextQuestion(frontend, phpQuestion);
        } else if (input.checked && input.id === "js-2") {
          percent += 5;
          button.removeEventListener("click", jsListener);
          nextQuestion(frontend, phpQuestion);
        } else if (input.checked && input.id === "js-3") {
          percent += 20;
          button.removeEventListener("click", jsListener);
          nextQuestion(frontend, phpQuestion);
        }
      });
    });
  };

  // Четвертый вопрос
  const phpQuestion = () => {
    showBlock(frontend);
    let button = defineButtons(frontend);

    button.addEventListener("click", function numberLustener() {
      let input = frontend[count].querySelector("input");
      if (Number(input.value < 0 || Number(input.value) > 10)) {
        input.value = "";
      } else if (input.value != "") {
        if (Number(input.value) === 0) {
          percent += 20;
          button.removeEventListener("click", numberLustener);
          nextQuestion(frontend, daysQuestion);
        } else {
          percent -= 50;
          button.removeEventListener("click", numberLustener);
          nextQuestion(frontend, daysQuestion);
        }
      }
    });
  };

  // Пятый вопрос
  const daysQuestion = () => {
    showBlock(frontend);
    let inputs = defineInputs(frontend);
    let button = defineButtons(frontend);

    button.addEventListener("click", function daysListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "days-1") {
          percent -= 20;
          button.removeEventListener("click", daysListener);
          if (percent > 40) {
            nextQuestion(frontend, gradeQuestion);
          } else {
            nextQuestion(frontend, showResult);
          }
        } else if (input.checked && input.id === "days-2") {
          percent += 5;
          button.removeEventListener("click", daysListener);
          if (percent > 40) {
            nextQuestion(frontend, gradeQuestion);
          } else {
            nextQuestion(frontend, showResult);
          }
        } else if (input.checked && input.id === "days-3") {
          percent += 20;
          button.removeEventListener("click", daysListener);
          if (percent > 40) {
            nextQuestion(frontend, gradeQuestion);
          } else {
            nextQuestion(frontend, showResult);
          }
        }
      });
    });
  };

  // Шестой вопрос
  const gradeQuestion = () => {
    showBlock(frontend);
    let inputs = defineInputs(frontend);
    let button = defineButtons(frontend);
    button.addEventListener("click", function gradeListener() {
      inputs.forEach((input) => {
        if (input.checked && input.id === "grade-1") {
          percent *= 1.8;
          button.removeEventListener("click", gradeListener);
          nextQuestion(frontend, showResult);
        } else if (input.checked && input.id === "grade-2") {
          percent *= 1.3;
          button.removeEventListener("click", gradeListener);
          nextQuestion(frontend, showResult);
        } else if (input.checked && input.id === "grade-3") {
          percent *= 0.6;
          button.removeEventListener("click", gradeListener);
          nextQuestion(frontend, showResult);
        }
      });
    });
  };
};
