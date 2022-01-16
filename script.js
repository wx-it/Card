// basic data fetching is done just need to update the contents of html using the data
// currently we are only getting three characters

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

const charactersID = [
  40, 40882, 14, 246, 89028, 73935, 145342, 145341, 13, 17, 62,
];

let i = 0;
const h3 = document.getElementsByTagName("h3");
const img = document.getElementsByTagName("img");
const p = document.getElementsByTagName("p");

function updateUI(name, description, image) {
  h3[i].innerText = name.full;
  img[i].src = image.large;
  img[i].setAttribute("alt", name.full);
  p[i].innerText = description;
  i++;
}

// so that we don't generate the same randomID again and again
const isIDGeneratedAlready = [];
for (let j = 0; j < 3; j++) {
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
    updateUI(name, description, image);

    if (data && j == 2) {
      document.querySelector(".card_grid").classList.add("show");
      document.querySelector(".card_grid").classList.remove("hide");

      document.getElementsByTagName("h1")[0].classList.add("loading-hide");
      document.getElementsByTagName("h1")[0].classList.remove("loading-show");
    }
  });
}
