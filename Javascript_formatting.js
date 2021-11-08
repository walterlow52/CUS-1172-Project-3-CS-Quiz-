const quiz_application = {
  app_view: "#view_intro",
  app_question: -1,
  app_quiz: "",
  app_model: {},
  app_correct: 0,
  app_incorrect: 0
}

async function fetch_data(quiz_id, quizChoice) {
let network = "";
  if (quizChoice == "questions") {
   network = 'https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3/questions'
}
  else if (quizChoice == "questions2") {
   network = 'https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3_quiz2/questions2'
}
let network_data = `${network}`;
//let network_data = `${network}/${quizChoice}/${quiz_id}`;
const retrieve = await fetch(network);
const data = await retrieve.json();

quiz_application.app_model = data;
question_view(quiz_application);
update(quiz_application);
	
document.getElementById("totalCorrect").innerHTML = quiz_application.app_correct + quiz_application.app_incorrect;
  if (quiz_id == 1) {
   document.getElementById("totalIncorrect").innerHTML = 0;
}
  else {
   document.getElementById("totalIncorrect").innerHTML = +(((quiz_application.app_correct / (quiz_application.app_correct + quiz_application.app_incorrect)) * 100).toFixed(2));
}
  return (data);
}

document.addEventListener('DOMContentLoaded', () => {
  quiz_application.app_view = "#view_intro";
  quiz_application.app_model = {
    action: "questions",
    action2: "questions2"
}
  update(quiz_application);
	
document.querySelector("#quiz_view").onclick = (e) => {
  handle_quiz(e)
  }
});

let user_name = "";
let quiz_timeSeconds = 0;

function handle_quiz(e) {
  if (quiz_application.app_view == "#view_intro") {
   user_name = document.getElementById("userName").value;
    if (user_name == "") {
     user_name = "@unknown_quiz_user";
}
  if (e.target.dataset.action == "questions") {
   time = setInterval(setTime, 1000);
   minute_i = document.getElementById("minutes");
   second_i = document.getElementById("seconds");
   quiz_application.app_quiz = "questions";
   quiz_application.app_question = 0;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
}
  else if (e.target.dataset.action == "questions2") {
   time = setInterval(setTime, 1000);
   minute_i = document.getElementById("minutes");
   second_i = document.getElementById("seconds");
   quiz_application.app_quiz = "questions2";
   quiz_application.app_question = 0;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
   }
}

if (quiz_application.app_view == "#MC_view") {
 if (e.target.dataset.action == "submit") {
  let MCchoices = document.getElementsByName("choice");
  let user_response;
  for (let i = 0; i < MCchoices.length; i++) {
    if (MCchoices[i].checked) {
     user_response = MCchoices[i].value;
   }
}

isCorrect = check_answer(user_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}

if (quiz_application.app_view == "#checkbox_view") {
 if (e.target.dataset.action == "submit") {
  var checkboxes = document.getElementsByName("box");
  var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
  }
}
	
isCorrect = check_answer(checkboxesChecked, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}
	
if (quiz_application.app_view == "#trueORfalse_view") {
 if (e.target.dataset.action == "answer") {
  isCorrect = check_answer(e.target.dataset.answer, quiz_application.app_model);
   if (isCorrect) {
    quiz_application.app_correct++;
}
   else {
    quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}
	
if (quiz_application.app_view == "#text_view") {
 if (e.target.dataset.action == "submit") {
  user_response = document.querySelector(`#${quiz_application.app_model.answerFieldId}`).value;
  isCorrect = check_answer(user_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}
	
if (quiz_application.app_view == "#multi_text_view") {
 if (e.target.dataset.action == "submit") {
  user_response1 = document.querySelector(`#${quiz_application.app_model.answerFieldId1}`).value;
  user_response2 = document.querySelector(`#${quiz_application.app_model.answerFieldId2}`).value;
	
let multi_answers = [];
multi_answers.push(user_response1);
multi_answers.push(user_response2);
	
isCorrect = check_answer(multi_answers, quiz_application.app_model);
 if (isCorrect) {
  quiz_application.app_correct++;
}
 else {
  quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}		
	
if (quiz_application.app_view == "#completion") {
 clearInterval(time);
	
 let finalScore = +(((quiz_application.app_correct / (quiz_application.app_incorrect + quiz_application.app_correct)) * 100).toFixed(2));
  if (finalScore >= 80) {
   document.getElementById("end_of_quiz").innerHTML = "Final Score: " + finalScore + "% <br> Congratulations " + user_name + ", you have passed the quiz!";
}
  else {
   document.getElementById("end_of_quiz").innerHTML = "Final Score: " + finalScore + "% <br> Sorry " + user_name + ", you have failed this quiz.";
}
	
if (e.target.dataset.action == "main_page") {
 quiz_timeSeconds = 0;
 second_i.innerHTML = pad(0);
 minute_i.innerHTML = pad(0);
	
quiz_application.app_view = "#view_intro";
quiz_application.app_question = -1,
quiz_application.app_quiz = "",
quiz_application.app_model = {},
quiz_application.app_correct = 0,
quiz_application.app_incorrect = 0
quiz_application.app_model = {
   action: "questions",
   action2: "questions2"
}
update(quiz_application);
}
 else if (e.target.dataset.action == "retake_quiz") {
  quiz_timeSeconds = 0;
  second_i.innerHTML = pad(0);
  minute_i.innerHTML = pad(0);
  time = setInterval(setTime, 1000);
	
quiz_application.app_question = 0,
quiz_application.app_correct = 0,
quiz_application.app_incorrect = 0
fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
      }
   }  
}
	
let minute_i = "";
let second_i = "";
let time = 0;
	
function setTime() {
  ++quiz_timeSeconds;
  second_i.innerHTML = pad(quiz_timeSeconds % 60);
  minute_i.innerHTML = pad(parseInt(quiz_timeSeconds / 60));
}
	
function pad(val) {
  var valString = val + "";
   if (valString.length < 2) {
    return "0" + valString;
} else {
    return valString;
  }
}

function check_answer(user_answer, model) {
  if (quiz_application.app_model.questionType == "checkbox" || quiz_application.app_model.questionType == "multi_text_input") {
   if (JSON.stringify(user_answer) === JSON.stringify(model.correctAnswer)) {
    return true;
  }
}
  else {
   if (user_answer == model.correctAnswer) {
    return true;
   }
}
return false;
}

let quiz_questions = 20;

function update_question(quiz_application) {
  if (quiz_application.app_question < (quiz_questions - 1)) {
   quiz_application.app_question = quiz_application.app_question + 1;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
}
  else {
   quiz_application.app_question = -2;
   quiz_application.app_model = {};
  }
}
	
function question_view(quiz_application) {
  if (quiz_application.app_question == -2) {
   quiz_application.app_view = "#completion";
   return;
}
	
  if (quiz_application.app_model.questionType == "true_false") {
   quiz_application.app_view = "#trueORfalse_view";
}
  else if (quiz_application.app_model.questionType == "text_input") {
   quiz_application.app_view = "#text_view";
}
  else if (quiz_application.app_model.questionType == "multiple_choice") {
   quiz_application.app_view = "#MC_view";
}
  else if (quiz_application.app_model.questionType == "checkbox") {
   quiz_application.app_view = "#checkbox_view";
}
  else if (quiz_application.app_model.questionType == "multi_text_input") {
   quiz_application.app_view = "#multi_text_view";
}
}
	
function grading_view (isCorrect) {
  if (isCorrect == true) {
   quiz_application.app_view = "#positive";
}
  else {
   quiz_application.app_view = "#negative";
  }
}
	
function quiz_explanation() {
  quiz_application.app_view = "#explanation_id";
}
	
function feedback_view (isCorrectVal) {
  if (!isCorrectVal) {
   new Promise(function (resolve, reject) {
   setTimeout(resolve, 1000);
}).then(function () {
  if (!isCorrectVal) {
   quiz_explanation();
   update(quiz_application);
}
});
}
  if (isCorrectVal) {
   new Promise(function (resolve, reject) {
   setTimeout(resolve, 1000);
}).then(function () {
   update_question(quiz_application);
   question_view(quiz_application);
   update(quiz_application);
   document.getElementById('quiz_view').click();
});
}
}

function next (e) {
  update_question(quiz_application);
  question_view(quiz_application);
  update(quiz_application);
}

function update (quiz_application) {
  const html_element = template_view(quiz_application.app_model, quiz_application.app_view)
  document.querySelector("#quiz_view").innerHTML = html_element;
}
	
const template_view = (model, view) => {
  template_source = document.querySelector(view).innerHTML;
  var template = Handlebars.compile(template_source);
  var html_app_element = template({...model, ...quiz_application})
  return html_app_element
}
