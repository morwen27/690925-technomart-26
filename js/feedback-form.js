var feedbackLink = document.querySelector(".modal-button"); //Находим кнопку вызова формы обратной связи
var feedbackForm = document.querySelector(".feedback-form"); //Находим разметку формы обратной связи
var closeFeedbackForm = feedbackForm.querySelector(".close-button"); //Находим кнопку, которая закрывает ФОС
var userName = feedbackForm.querySelector("[name=name]"); //Находим инпут для логина, чтобы при клике поставить в него фокус
var userMail = feedbackForm.querySelector("[name=mail]");
var feedbackMessage = feedbackForm.querySelector("[name=message]");
var form = feedbackForm.querySelector(".feedback-form > form"); //Находим разметку формы, чтобы проверить ее поля на обязательность заполнения
var deleteClassError = function () {
	feedbackForm.classList.remove("feedback-form-error");
};


//Выясняем, работает ли localStorage, чтобы избежать ошибки и прерывания работы скрипта

var isStorageSupport = true;
var storageName = ""; //Переменная для записи ответа из хранилища по поводу имени пользователя
var storageEmail = ""; //Переменная для записи ответа из хранилища по поводу email пользователя

try {
	storageName = localStorage.getItem("userName"); //Пробуем записать в переменную значение имени пользователя, если такое уже есть в хранилище
	storageEmail = localStorage.getItem("userMail");
} catch (err) {
	isStorageSupport = false; //В случае если в хранилище ничего нет, в переменную isStorageSupport записывает false, и мы теряем всякую надежду на хранилище
}

//Выяснили

//Открываем форму по нажатию кнопки. Проверяем, что нам возвратило хранилище, и ставим фокус в зависимости от результата

feedbackLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedbackForm.classList.add("feedback-form-show");
	userName.focus();

	if (storageName) {
		userName.value = storageName;
		userMail.focus();
		if (storageEmail) {
			userMail.value = storageEmail;
			feedbackMessage.focus();
		} else {
			userName.focus();
		}
	}
});

//Проверяем, все ли заполнено, что должно быть заполнено. Если чего-то нет, отменяем действие по умолчанию. Если же все заполнено, то данные отправляются. А еще при условии поддержки localStorage, туда записываются данные из форм. 

form.addEventListener("submit", function (evt) {
	if (!userName.value || !userMail.value || !feedbackMessage.value) {
		evt.preventDefault();		
		feedbackForm.classList.remove("feedback-form-error");
		feedbackForm.offsetWidth = feedbackForm.offsetWidth;
		feedbackForm.classList.add("feedback-form-error");
		//var timeoutId = setTimeout(deleteClassError, 1000);
		//clearTimeout(timeoutId);
	} else {
		if (isStorageSupport) {
			localStorage.setItem("userName", userName.value);
			localStorage.setItem("userMail", userMail.value);
		}
	}
});

//Закрываем форму. Сначала кнопкой, потом клавишей.

closeFeedbackForm.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedbackForm.classList.remove("feedback-form-show");
	feedbackForm.classList.remove("feedback-form-error");
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (feedbackForm.classList.contains("feedback-form-show")) {
			evt.preventDefault();
			feedbackForm.classList.remove("feedback-form-show");
			feedbackForm.classList.remove("feedback-form-error");
		}
	}
});
