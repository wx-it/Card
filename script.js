// global variables
const charactersID = [
  40, 40882, 14, 246, 89028, 73935, 145342, 145341, 13, 17, 62,
];
let numberOfCards = 3;
const h3 = document.getElementsByTagName("h3");
const img = document.getElementsByTagName("img");
const p = document.getElementsByTagName("p");
let cards = null;

const fetchData = async (id) => {
  var query = `
query ($id: Int) {
  Character(id:$id) {
    id
    name {
      full
      native
    }
    image {
      large
      medium
    }
    description
  }
}
`;

  const variables = {
    id: id,
  };

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  return await fetch(url, options)
    .then(async (response) => {
      const json = await response.json();
      return response.ok ? json : Promise.reject(json);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const showLoading = () => {
  const cardGrid = document.querySelector(".card_grid");
  cardGrid.classList.add("hide");
  cardGrid.classList.remove("show");
  document.getElementsByTagName("h1")[0].style.display = "flex";
};

const hideLoading = () => {
  const cardGrid = document.querySelector(".card_grid");
  cardGrid.classList.add("show");
  cardGrid.classList.remove("hide");
  document.getElementsByTagName("h1")[0].style.display = "none";
};

function updateUI(name, description, image, index) {
  h3[index].innerText = name.full;
  img[index].src = image.large;
  img[index].setAttribute("alt", name.full);
  p[index].innerText = description;

  if (index === numberOfCards - 1) {
    hideLoading();
    cards = document.querySelectorAll(".Card");
  }
}

const showCards = () => {
  const isIDGeneratedAlready = [];
  for (let j = 0; j < numberOfCards; j++) {
    const randomID =
      charactersID[Math.floor(Math.random() * charactersID.length)];

    if (isIDGeneratedAlready.includes(randomID)) {
      j--;
      continue;
    } else {
      isIDGeneratedAlready.push(randomID);
    }

    fetchData(randomID).then(({ data }) => {
      const { name, description, image } = data.Character;
      updateUI(name, description, image, j);
    });
  }
};

const searchACharacter = () => {
  const id = Number(document.getElementById("idInput").value);
  if (!id) {
    alert("Please provide a valid ID");
    return;
  }

  showLoading();
  fetchData(id)
    .then(({ data }) => {
      cards[1].style.display = "none";
      cards[2].style.display = "none";
      numberOfCards = 1;
      const { name, description, image } = data.Character;
      updateUI(name, description, image, 0);
    })
    .catch((error) => {
      console.log(error);
      hideLoading();
      alert("Please provide a valid ID");
    });
};

showCards();
