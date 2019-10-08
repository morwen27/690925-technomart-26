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
