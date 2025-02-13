let statistic = document.querySelector(".contaner_h3")
let question = document.querySelector(".frage")
let answers = document.querySelectorAll(".ant")  
let start_button = document.querySelector(".start-btn")
let container_main = document.querySelector(".main")
let container_start = document.querySelector(".start")
let container_start_h3 = document.querySelector(".h3")
let total_answers_given = 0
let correct_answers = 0
let signs = ["+", "-", "*", "/"]


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // The loop repeats until there are elements to mix
    randomIndex = Math.floor(Math.random() * currentIndex); // Select the remaining element.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Swapping with the current element.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Returning the shuffled array
}

let cookie = false
let cookies = document.cookie.split("; ")

for(let i = 0; i < cookies.leigth; i += 1){
    if (cookies[i].split("=")[0] == " name_sookie") {
        cookies[i].split("=")[1]
        break
}}

if (cookie) {
    let data = cookie.split("/")
    container_start_h3.innerHTML = `<h3>Last time you gave ${data[0]} correct answer out of ${data[1]}.
    Accuracy is ${Math.round(data[1] * 100 / data[0])}%.</h3>`
}

my_array = [1, 2, 3, 4, 5] // Initial array
shuffle(my_array)  // Shuffle the array
function randint(min, max){
    return Math.round(Math.random() * (max, min) + min)
}

function getsign() {
    return signs[randint(0,3)]
}

class Question{
    constructor() {
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getsign()
        this.question = `${a} ${sign} ${b}`
        if (sign == "+") {this.correct = a + b}
        else if (sign == "-") {this.correct = a - b}
        else if (sign == "*") {this.correct = a * b}
        else if (sign == "/") {this.correct = a / b}
        this.answer = [
            randint(this.correct - 15, this.corret -1),
            randint(this.correct - 15, this.corret -1),
            this.correct,
            randint(this.correct + 1, this.corret +15),
            randint(this.correct + 1, this.corret +15)
        ]
        shuffle(this.answers)
    }
    display () {
        question.innerHTML = this.frage
        for (let i = 0; i < 5; i += 1){
            answers[i].innerHTML = this.antworten[i]
        }
   } 
}

start_button.addEventListener('click', function() {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    current_question = new Question()
    current_question.display()
    correct_answers = 0
    total_answers_given = 0
    setTimeout(function() {
    let new_cookie = `name_sookie${correct_answers}/${total_answers_given};max-age:10000`
    document.cookie = new_cookie
    container_main.style.display = 'none'
    container_start.style.display = 'flex'
    container_start_h3.innerHTML = `<h3>You have given ${correct_answers} correct answers out of ${total_answers_given}. Accuracy is ${Math.round(correct_answers * 100 / total_answers_given)}%.</h3>`
    }, 10000)
})


for (let i = 0; i < answers.length; i += 1) {
    answers[i].addEventListener('click', function() {
        if (answers[i].innerHTML == current_question.correct) {
            correct_answers += 1
           answer_buttons[i].style.background = "#00FF00"
           anime({
                targets: answer_buttons[i],
                background: "#FFFFFF",
                duration: 500,
                delay: 100,
                easing: 'linear'
           })
        } else {
            answers[i].style.background = "#FF0000"
            anime({
                targets: answer_buttons[i],
                background: "#FFFFFF",
                duration: 500,
                delay: 100,
                easing: 'linear'
           })
        }
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}
