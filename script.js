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

// luffy
fetchData(40).then(({ data }) => {
  const { name, description, image } = data.Character;
  updateUI(name, description, image);
});

// eren
fetchData(40882).then(({ data }) => {
  const { name, description, image } = data.Character;
  updateUI(name, description, image);
});

// itachi
fetchData(14).then(({ data }) => {
  const { name, description, image } = data.Character;
  updateUI(name, description, image);

  // for loading screen
  if (data) {
    document.querySelector(".card_grid").classList.add("show");
    document.querySelector(".card_grid").classList.remove("hide");

    document.getElementsByTagName("h1")[0].classList.add("loading-hide");
    document.getElementsByTagName("h1")[0].classList.remove("loading-show");
  }
});
