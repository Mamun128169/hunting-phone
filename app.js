// variables
const defaultPhoneUrl =
  "https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089";
const defaultContainer = document.getElementById("iphone-container");
const searchBtn = document.getElementById("search-btn");
const phoneCardContainer = document.getElementById("phones-container");
const showAllBtn = document.getElementById("show-more-btn");
const searchInput = document.getElementById("search-input");
const notFoundContainer = document.getElementById("not-found-container");

// function for default phone
const defaultLoadedPhone = async () => {
  const defaultPhoneUrl =
    "https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089";

  const res = await fetch(defaultPhoneUrl);
  const data = await res.json();
  const phone = data.data;

  defaultContainer.innerHTML = `
    <h2 class="text-2xl md:text-7xl text-black font-bold ">${phone.name}</h2>
    <p class="text-center text-sm text-gray-600 max-w-[50%] px-4">There are many variations of Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit voluptate deserunt culpa. Lorem ipsum dolor sit amet</p>
    <button class="btn btn-info text-white">buy Now</button>
    <div class="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 mb-8">
    <img src="${phone.image}" alt="">
    <img class="md:scale-125" src="${phone.image}" alt="">
    <img src="${phone.image}" alt="">
    </div>
    `;
};

// default display of phone
defaultLoadedPhone();

const displayPhone = (phone) => {
  const div = document.createElement("div");
  div.classList = "card bg-base-100 shadow-xl";
  div.innerHTML = `
    <figure class="px-10 pt-10">
    <div class="w-[90%] h-auto px-10 py-8 rounded-lg bg-slate-100">
     <img src="${phone.image}" class="w-full" alt="Shoes" class="rounded-xl" />
    </div>
    </figure>
    <div class="card-body items-center text-center space-y-2">
                  <h2 class="card-title text-2xl font-semibold">${phone.phone_name}</h2>
                  <p class="text-sm text-gray-500 px-5">There are many variations of Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                  <h2 class="text-3xl font-bold text-gray-700">$999</h2>
                  <div class="card-actions">
                  <button class="btn btn-primary px-6" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
                  </div>
                  </div>
  `;

  phoneCardContainer.appendChild(div);
};

const loadPhone = async (searchText, isShowAll) => {
  let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  let phones = data.data;

  // Clear the previous phones and add new one
  phoneCardContainer.innerHTML = "";

  //  hide the error message initially
  notFoundContainer.classList.add("hidden");

  // show a not found card if no result found
  if (phones.length === 0 || searchText === "") {
    notFoundContainer.classList.remove("hidden");
    const mainDiv = notFoundContainer.querySelector("div");
    console.log(mainDiv);

    // clear the previous error message
    mainDiv.innerHTML = "";

    const notFoundDiv = document.createElement("div");
    notFoundDiv.classList =
      "w-[100%] mx-auto h-[50%] flex justify-center items-center px-3 md:px-6";
    notFoundDiv.innerHTML = `
    <div>
      <img src="./images/7265556.webp">
      <h2 class="text-xl text-red-800 md:text-3xl lg:text-5xl text-center font-bold ml-4">No Result Found!</h2>
    </div>
    `;

    mainDiv.appendChild(notFoundDiv);
    toggleLoadingSpinner(false);
    showAllBtn.classList.add("hidden");
    return;
  }

  //display showAll btn if there are more then 12
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // slice to get only first 12 results
  if (!isShowAll && phones.length > 12) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    displayPhone(phone);
  });

  toggleLoadingSpinner(false);
};

// handle the search button
searchBtn.addEventListener("click", () => {
  toggleLoadingSpinner(true);

  //get search value from input field
  let searchText = searchInput.value;
  loadPhone(searchText);
});


const toggleLoadingSpinner = (isLoading) => {
  const loader = document.getElementById("loader");

  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};


const handleShowAll = () => {
  let searchText = searchInput.value;
  loadPhone(searchText, true);
};


const handleShowDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  const phone = data.data;
  console.log(phone);

  //display details of the selected phone
  showDetails(phone);
  show_phone_modal.showModal();
};


const showDetails = (phone) => {
  const modalBoxContainer = document.getElementById("modal-box");

  modalBoxContainer.innerHTML = `
  <div class="flex flex-col gap-9 w-[90%] items-center">
    <div class="w-[90%] px-4 py-5 bg-slate-100 flex justify-center ">
      <img src="${phone.image}">
    </div>
    <div class="self-start space-y-3 text-gray-500">
      <h2 class="text-2xl font-semibold text-gray-800">${phone.name}</h2>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">Storage:</span>
       ${phone.mainFeatures.storage}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">DisplaySize:</span>
       ${phone.mainFeatures.displaySize}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">ChipSet:</span>
       ${phone.mainFeatures.chipSet}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">memory:</span>
       ${phone.mainFeatures.memory}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">slug:</span>
       ${phone.slug}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">releaseDate:</span>
       ${phone.releaseDate}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">GPS:</span>
       ${phone.others?.GPS ? phone.others.GPS : "No GPS Available"}
      </p>
      <p class="text-sm">
       <span class="text-lg font-semibold text-gray-700">USB:</span>
       ${phone.others?.USB || "No USB Ports Available"}
      </p>
    </div>
    <div class="modal-action self-end">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn btn-error px-7 text-white">Close</button>
    </form>
  </div>
  </div>
`;
};

// initially display phones(iphone)
loadPhone("iphone");
