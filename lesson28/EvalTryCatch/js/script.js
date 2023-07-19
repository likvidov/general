// Функция filterByType принимает два аргумента тип, данные и фильтрует в зависимости от типа
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// метод убирает блоки с результами
	hideAllResponseBlocks = () => {
		//получаем массив блоков response 
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//через метод forEach перебираем массив и меняем стиль на скрытия блока
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// метод показа блока с получение аргуметов селектора блока, сообщения и span селектора
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//скрываем все блоки
		hideAllResponseBlocks();
		//получем переданный нам блок селектора и меняем ему стиль display на block
		document.querySelector(blockSelector).style.display = 'block';
		// если аргумент spanSelector не пустой
		if (spanSelector) {
			//получаем его и меняем текст на переданный аргумент msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// метод отображения ошибки с получением аргумента сообщения и вызова метода показа блока об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// метод отображения результата с получением аргумента сообщения и вызова метода показа блока об успешной
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// метод отображения блока без результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//метод фильтрации по типу принимает два аргумента тип и значение
	tryFilterByType = (type, values) => {
		// через обработчик ошибок пробуем отработать код
		try {
			// через функцию eval выполняем функцию фильтрации типов и данных и присоедняем их в строку через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// формируем сообщение, проверяем длину строки valuesArray
			const alertMsg = (valuesArray.length) ?
				//если не пустая то выводим тип и данные
				`Данные с типом ${type}: ${valuesArray}` :
				//если пустая то вывод что данного типа нет
				`Отсутствуют данные типа ${type}`;
			//вызываем метод показа результа и передаем сформированное сообщение
			showResults(alertMsg);
			//если при обработки кода получилась ошибка
		} catch (e) {
			//то вызываем метод показа ошибки и передаем ее туда
			showError(`Ошибка: ${e}`);
		}
	};
//Получение кнопки "Фильтровать"
const filterButton = document.querySelector('#filter-btn');

//Навещиваем обработчик событий по клику
filterButton.addEventListener('click', e => {
	//Получаем поле 'Тип данных'
	const typeInput = document.querySelector('#type');
	//Получаем поле 'Данные'
	const dataInput = document.querySelector('#data');

	//Проверка поле данные не пустоту
	if (dataInput.value === '') {
		//Вызываем метод кастомной валидации сообщений элемента
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//Вызываем метод чтобы не показывало результат
		showNoResults();
	} else {
		//если поле данных не пустое, то очищаем кастомное сообщение валидации
		dataInput.setCustomValidity('');
		//отменяем стандратное поведение
		e.preventDefault();
		//вызываем метод фильтрации по типу и передаем туда тип и данные
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

