library = [];

const book_instance_wrapper = document.querySelector(".book_instance_wrapper");
const add_book_btn = document.querySelector(".add_book_btn");
let new_book_form = document.querySelector(".new_book_form");
let cross = document.querySelector(".cross");
let body = document.querySelector("body");

add_book_btn.addEventListener("click", function () {
	new_book_form.style.cssText = "display: flex";
});

cross.addEventListener("click", function () {
	new_book_form.style.cssText = "display: none";
});

let bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", function (event) {
	event.preventDefault(); //чтобы форма не отправлялась на сервер
	new_book_form.style.cssText = "display: none";
	let valueFromForm = formManipulation.serializeForm(bookForm);
	let book = makeNewBook(valueFromForm);
	displayBook(book);
});

let formManipulation = {
	serializeForm(formNode) {
		const { elements } = formNode; //elements содержит в себе все элементы управления и поля этой формы
		let formValues = Array.from(elements)
			.filter((item) => !!item.name)
			.map(function (element) {
				const { name, type } = element;
				let value;
				if (type === "checkbox") {
					//чтобы значение чекбокса было тру либо фолз
					value = element.checked;
				} else {
					value = element.value;
				}
				return { name, value };
			});
		return formValues;
	},
};

class Book {
	constructor(arrayValueFromForm) {
		this.title = arrayValueFromForm[0].value;
		this.author = arrayValueFromForm[1].value;
		this.pages = arrayValueFromForm[2].value;
		this.isRead = arrayValueFromForm[3].value;
	}
}

function makeNewBook(arrayValueFromForm) {
	var book = new Book(arrayValueFromForm);
	library.push(book);
	return book;
}

function displayBook(book) {
	let book_instance = document.createElement("div");
	book_instance_wrapper.appendChild(book_instance);
	book_instance.classList.add("book_instance");

	let title_display = document.createElement("h3");
	title_display.textContent = book.title;
	title_display.classList.add("title_display");
	book_instance.appendChild(title_display);

	let author_display = document.createElement("p");
	author_display.textContent = book.author;
	author_display.classList.add("author_display");
	book_instance.appendChild(author_display);

	let pages_display = document.createElement("p");
	pages_display.textContent = book.pages + " pages ";
	pages_display.classList.add("pages_display");
	book_instance.appendChild(pages_display);

	let isRead_btn_display = document.createElement("button");
	if (book.isRead === true) {
		isRead_btn_display.textContent = "Read";
		isRead_btn_display.style.background = "#71EDA2";
	} else {
		isRead_btn_display.textContent = "Not read";
		isRead_btn_display.style.background = "#ED7171";
	}
	isRead_btn_display.classList.add("isRead_btn_display");
	book_instance.appendChild(isRead_btn_display);

	//чтобы можно было изменять кнопку isRead
	isRead_btn_display.addEventListener("click", function () {
		if (book.isRead === true) {
			book.isRead = false;
			isRead_btn_display.textContent = "Not read";
			isRead_btn_display.style.background = "#ED7171";
		} else {
			book.isRead = true;
			isRead_btn_display.textContent = "Read";
			isRead_btn_display.style.background = "#71EDA2";
		}
	});
	//чтобы можно было изменять кнопку isRead

	let remove_btn_display = document.createElement("button");
	remove_btn_display.textContent = "Remove";
	remove_btn_display.classList.add("remove_btn_display");
	book_instance.appendChild(remove_btn_display);

	//удаление книги
	remove_btn_display.addEventListener("click", function () {
		let bookIndex = library.indexOf(book);
		library.splice(bookIndex, bookIndex + 1);
		book_instance_wrapper.removeChild(book_instance);
	});
	//удаление книги
}
