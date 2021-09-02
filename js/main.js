// function for data fetch from api
const fetchData = async (searchKey) => {
  document.getElementById("total-book").textContent = "";
  spinnerShow("block");
  containerShow("none");
  try {
    const result = await fetch(
      `https://openlibrary.org/search.json?q=${searchKey}`
    );
    const data = await result.json();

    showData(data);
  } catch (error) {
    spinnerShow("none");
    document.getElementById("search-result").innerHTML = `
    <h3 class='text-light'>No Data Found</h3>
    `;
  }
};

// function for receving search key word by clicking search button
document.getElementById("search-btn").addEventListener("click", () => {
  const searchKey = document.getElementById("search-field").value;
  fetchData(searchKey);

  document.getElementById("search-field").value = "";
});

// function for showing api data in ui
const showData = (bookList) => {
  document.getElementById(
    "total-book"
  ).innerText = `Total Book: ${bookList.numFound}`;

  const container = document.getElementById("search-result");
  container.textContent = "";

  if (bookList.docs.length === 0) {
    container.innerHTML = `
      <h3 class='text-white'>No Data Found</h3>
      `;
  }

  bookList.docs.slice(0, 32).forEach((book) => {
    const img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const alternateImg =
      "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
    const div = document.createElement("div");
    div.innerHTML = `
 <div class='book-img'>   ${book.cover_i ? ` <img src=${img}>` : `<img src=${alternateImg}>`
      } </div>
    <p> Book Name: ${book.title}  </p>
    <p>  First Publish Date : ${book.first_publish_year}</p>
    <p> Publisher: ${book.publisher?.[0]} </p>
    <p> Author Name: ${book.author_name?.[0]} </p>

    `;

    div.classList.add("book");
    container.appendChild(div);
  });
  containerShow("block");
  spinnerShow("none");
};

// show spinner function
const spinnerShow = (display) => {
  if (display === "none") {
    document.getElementById("spinner").style.display = "none";
  } else {
    document.getElementById("spinner").style.display = "block";
  }
};

// books container show or not function
const containerShow = (display) => {
  if (display === "none") {
    document.getElementById("search-result").style.display = "none";
  } else {
    document.getElementById("search-result").style.display = "grid";
  }
};