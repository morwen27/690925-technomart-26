//1. Карта

var mapLink = document.querySelector(".link-map"); //Находим ссылку на карту
var map = document.querySelector(".modal-map"); //и разметку модальной карты
var closeMap = map.querySelector(".close-button"); //и кнопку закрытия

//По клику открываем карту
mapLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	map.classList.add("map-show");
});

//По нажатию клавиши или мышью - закрываем

closeMap.addEventListener("click", function (evt) {
	evt.preventDefault();
	map.classList.remove("map-show");
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (map.classList.contains("map-show")) {			
			map.classList.remove("map-show");
		}
	}
});

//2. Форма обратной связи

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


//3. Модальное окно добавления товара в корзину 

var buyLink = document.querySelector(".to-cart"); //Находим первую кнопку "Купить", ибо про делегирование мы еще не знаем :(
var modalToCart = document.querySelector(".modal-to-cart"); //Находим разметку модального окна, оповещающего о добавлении товара в корзину
var closeModalToCart = modalToCart.querySelector(".close-button"); //Находим кнопкe-закрывалку
var linkContinue = modalToCart.querySelector(".сontinue-shopping"); //Находим кнопку "Продолжить покупки"
var order = modalToCart.querySelector(".to-order"); //Находим кнопку "Оформить заказ"

//Вешаем событие

buyLink.addEventListener("click", function (evt) {
	evt.preventDefault();	
	modalToCart.classList.add("modal-to-cart-show");
});

//Закрываем

closeModalToCart.addEventListener("click", function (evt) {
	evt.preventDefault();
	modalToCart.classList.remove("modal-to-cart-show");
});

linkContinue.addEventListener("click", function (evt) {
	evt.preventDefault();
	modalToCart.classList.remove("modal-to-cart-show");
});

order.addEventListener("click", function (evt) {
	evt.preventDefault();
	modalToCart.classList.remove("modal-to-cart-show");
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (modalToCart.classList.contains("modal-to-cart-show")) {			
			modalToCart.classList.remove("modal-to-cart-show");
		}
	}
});