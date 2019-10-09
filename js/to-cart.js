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