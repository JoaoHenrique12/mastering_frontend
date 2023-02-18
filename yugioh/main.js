function add_listeners(){
    let div = document.querySelectorAll("div.card");

    for (l of div) {
        l.addEventListener('click', flip_card);
        l.addEventListener('click', check_match);
    }

}
function stop_listeners() {
    let div = document.querySelectorAll("div.card");

    for (l of div) {
        l.removeEventListener('click', flip_card);
        l.removeEventListener('click', check_match);
    }
}

// Global Variables

var global_number_replics = 0;
var global_number_clicks = 0;
var global_init_time;

// Functions

function start_timer() {
    let div = document.querySelectorAll("div.card");
    global_init_time = (new Date).getTime();
    for (l of div) 
        l.addEventListener('click', count_click);
}

function count_click(){
    global_number_clicks++;
}

function miliseconds_format(ms) {

    ms = Number(ms);

    let minutes = Math.floor((ms / 1000 / 60) % 60);
    let seconds =  Math.floor((ms / 1000) % 60);

    if ( minutes <= 0 )
        minutes = '00';
    else if (minutes < 10)
        minutes = '0' + minutes;

    if ( seconds <= 0 )
        seconds = '00';
    else if (seconds < 10)
        seconds = '0' + seconds;


    let formated = minutes + ':' + seconds;

    return formated;
}

function check_win() {
    let number_cards_arena = document.querySelector("div#arena").childElementCount;

    if (number_cards_arena === 0) {
        let player_name = sessionStorage.getItem('player_name');
        let total_time =  miliseconds_format((new Date).getTime() - global_init_time);

        let div_win = document.querySelector("div#end_game");
        div_win.style.display = 'flex';

        let text_div_win = div_win.querySelector('p');

        text_div_win.innerHTML = text_div_win.innerHTML.replace('player_name', player_name);
        text_div_win.innerHTML = text_div_win.innerHTML.replace('time_spent', total_time);
        text_div_win.innerHTML = text_div_win.innerHTML.replace('number_clicks', global_number_clicks);
        text_div_win.innerHTML = text_div_win.innerHTML.replace('number_replics', global_number_replics);

        console.log(text_div_win.innerHTML);
    }
}

function check_match(){
    let cards_fliped =  capture_active_cards();

    if( cards_fliped.length < 2)
        return;

    let are_twin = check_twin_cards(cards_fliped);

    cards_fliped = cards_fliped.sort();
    if( cards_fliped[0] != cards_fliped[1])
        cards_fliped = cards_fliped.reverse();

    if ( !are_twin )
    {
        stop_listeners();
        setTimeout(function(cards_fliped) {for(c of cards_fliped) flip_card(c)}, 600,cards_fliped);
        setTimeout(add_listeners, 599);
    }
    else if ( are_twin && (global_number_replics + 1) === cards_fliped.length)
    {
        stop_listeners();
        setTimeout(function(cards_fliped) {for(c of cards_fliped) c.remove();check_win();}, 600,cards_fliped);
        setTimeout(add_listeners, 599);
    }

}

function flip_card(element) {
    let img = undefined;
    try {
        img = this.querySelector('img[alt=back]');
    }catch(error) {
        img = element.querySelector('img[alt=back]');
    }
    img.style.visibility = (img.style.visibility === 'hidden') ? 'visible' : 'hidden';
}

function capture_active_cards () {

    let all_cards = document.querySelectorAll("div.card");

    let cards_fliped = [];

    for( c of all_cards){
        let img = c.querySelector('img[alt=back]');
        if( img.style.visibility === 'hidden')
            cards_fliped.push(c);
    }

    return cards_fliped;
}

function check_twin_cards(cards_fliped){
    let name = cards_fliped[0].classList[1];
    for (let c of cards_fliped)
        if (c.classList[1] != name)
            return false;
    return true;
}

function clone_cards(){
    console.log("Clonning cards.");

    number_replics = Number(sessionStorage.getItem('replics')) >= 1 ? Number(sessionStorage.getItem('replics'))  : 1;
    global_number_replics = number_replics;
    console.log(number_replics);


    div_cards = document.querySelectorAll('div.card');
    for (div_card of div_cards) {
        console.log("Create div :" + div_card.classList[1]);

        for(let  i of Array(number_replics).keys())
            { let div = div_card.cloneNode(true); div_card.after(div); }
    }
}

function shuffle_cards() {
    console.log("Shuffling cards.");

    let div_cards = document.querySelectorAll('div.card');
    let shuffled_cards = shuffle(div_cards);

    console.log(shuffled_cards);

    for ( card of div_cards )
        card.remove();

    let arena = document.querySelector('div#arena');
    for ( card of shuffled_cards )
        arena.appendChild(card);
}

function shuffle(array) {
    array = Array.from(array);

    let new_array = [];

    while(array.length !== 0 )
    {
        randomIndex = Math.floor(Math.random() * array.length);
        new_array.push(array[randomIndex]);
        array.splice(randomIndex,1);
    }

    return new_array;
}