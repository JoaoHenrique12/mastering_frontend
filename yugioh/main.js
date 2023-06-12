async function boot() {
  clone_cards();
  await shuffle_cards();
  flex_to_absolute();
  add_click_listeners();
  start_timer();
}

function add_click_listeners() {
  const div = document.querySelectorAll("div.card");

  for (const l of div) {
    l.addEventListener("click", flip_card);
    l.addEventListener("click", check_match);
    l.addEventListener("click", count_click);
  }
}
function stop_click_listeners() {
  const div = document.querySelectorAll("div.card");

  for (const l of div) {
    l.removeEventListener("click", flip_card);
    l.removeEventListener("click", check_match);
    l.addEventListener("click", count_click);
  }
}

// Global Variables

let global_number_replics = 0;
let global_number_clicks = 0;
let global_init_time;

// Functions

// deno-lint-ignore no-unused-vars
function start_timer() {
  global_init_time = new Date().getTime();
}

function count_click() {
  global_number_clicks++;
}

function miliseconds_format(ms) {
  ms = Number(ms);

  let minutes = Math.floor((ms / 1000 / 60) % 60);
  let seconds = Math.floor((ms / 1000) % 60);

  if (minutes <= 0) minutes = "00";
  else if (minutes < 10) minutes = "0" + minutes;

  if (seconds <= 0) seconds = "00";
  else if (seconds < 10) seconds = "0" + seconds;

  const formated = minutes + ":" + seconds;

  return formated;
}

function check_win() {
  const number_cards_arena =
    document.querySelector("div#arena").childElementCount;

  if (number_cards_arena === 0) {
    const player_name = sessionStorage.getItem("player_name");
    const total_time = miliseconds_format(
      new Date().getTime() - global_init_time
    );

    const div_win = document.querySelector("div#end_game");
    div_win.style.display = "flex";

    const text_div_win = div_win.querySelector("p");

    text_div_win.innerHTML = text_div_win.innerHTML.replace(
      "player_name",
      player_name
    );
    text_div_win.innerHTML = text_div_win.innerHTML.replace(
      "time_spent",
      total_time
    );
    text_div_win.innerHTML = text_div_win.innerHTML.replace(
      "number_clicks",
      global_number_clicks
    );
    text_div_win.innerHTML = text_div_win.innerHTML.replace(
      "number_replics",
      global_number_replics
    );

    console.log(text_div_win.innerHTML);
  }
}

function check_match() {
  let cards_fliped = capture_active_cards();

  if (cards_fliped.length < 2) return;

  const are_twin = check_twin_cards(cards_fliped);

  if (!are_twin) {
    stop_click_listeners();
    setTimeout(
      function (cards_fliped) {
        for (const c of cards_fliped) flip_card(c);
      },
      600,
      cards_fliped
    );
    setTimeout(add_click_listeners, 599);
  } else if (are_twin && global_number_replics + 1 === cards_fliped.length) {
    stop_click_listeners();
    setTimeout(
      function (cards_fliped) {
        for (const c of cards_fliped) c.remove();
        check_win();
      },
      600,
      cards_fliped
    );
    setTimeout(add_click_listeners, 599);
  }
}

function flip_card(element) {
  let img = undefined;
  try {
    img = this.querySelector("img[alt=back]");
  } catch (_error) {
    img = element.querySelector("img[alt=back]");
  }
  img.style.visibility =
    img.style.visibility === "hidden" ? "visible" : "hidden";
}

function capture_active_cards() {
  const all_cards = document.querySelectorAll("div.card");

  const cards_fliped = [];

  for (const c of all_cards) {
    const img = c.querySelector("img[alt=back]");
    if (img.style.visibility === "hidden") cards_fliped.push(c);
  }

  return cards_fliped;
}

function check_twin_cards(cards_fliped) {
  const name = cards_fliped[0].classList[1];
  for (const c of cards_fliped) if (c.classList[1] != name) return false;
  return true;
}

// deno-lint-ignore no-unused-vars
function clone_cards() {
  console.log("Clonning cards.");

  const number_replics =
    Number(sessionStorage.getItem("replics")) >= 1
      ? Number(sessionStorage.getItem("replics"))
      : 1;
  global_number_replics = number_replics;
  console.log(number_replics);

  const div_cards = document.querySelectorAll("div.card");
  for (const div_card of div_cards) {
    console.log("Create div :" + div_card.classList[1]);

    for (const _i of Array(number_replics).keys()) {
      const div = div_card.cloneNode(true);
      div_card.after(div);
    }
  }
}

// deno-lint-ignore no-unused-vars
function shuffle_cards() {
  return new Promise( resolve =>{
    console.log("Shuffling cards.");

    const div_cards = document.querySelectorAll("div.card");
    const shuffled_cards = shuffle(div_cards);

    console.log(shuffled_cards);

    for (const card of div_cards) card.remove();

    const arena = document.querySelector("div#arena");
    for (const card of shuffled_cards) arena.appendChild(card);

    resolve();
  })
}

function shuffle(array) {
  array = Array.from(array);

  const new_array = [];

  while (array.length !== 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    new_array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return new_array;
}


function flex_to_absolute() {
  const div = document.querySelectorAll("div.card");
  let top = [];
  let left = [];
  for ( card of div )
  {
    top.push(card.offsetTop);
    left.push(card.offsetLeft);
    console.log(`Top: ${top[top.length - 1]}, Left: ${left[left.length - 1]}`);
  }

  console.log(top);
  console.log(left);

  let i = 0;
  for ( card of div )
  {
    card.style.position = 'absolute';
    card.style.top = top[i] + 'px';
    card.style.left = left[i] + 'px';
    i++;
  }
  console.log("Executed");
}