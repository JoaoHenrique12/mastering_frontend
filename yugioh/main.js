function add_listeners(){
    let div = document.querySelectorAll("div.card");

    for (l of div)
        l.addEventListener('click', flip_card);
}

function stop_listeners() {
    let div = document.querySelectorAll("div.card");

    for (l of div)
        l.removeEventListener('click', flip_card);
    
}

// Global Variables

var global_number_replics = 0;

// Functions

function flip_card(element) {
    let img = undefined;
    try {
        img = this.querySelector('img[alt=back]');
    }catch(error) {
        img = element.querySelector('img[alt=back]');
    }
    img.style.visibility = (img.style.visibility === 'hidden') ? 'visible' : 'hidden';

    let cards_fliped =  capture_active_cards();

    if( cards_fliped.length < 2)
        return;

    let are_twin = check_twin_cards(cards_fliped);

    if ( !are_twin )
    {
        stop_listeners();
        setTimeout(function(cards_fliped) {for(c of cards_fliped) c.click()}, 600,cards_fliped);
        setTimeout(add_listeners, 599);
    }
    else if ( are_twin && (global_number_replics + 1) === cards_fliped.length)
    {
        stop_listeners();
        setTimeout(function(cards_fliped) {for(c of cards_fliped) c.remove()}, 600,cards_fliped);
        setTimeout(add_listeners, 599);
    }
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

function clone_cards(number_replics){
    console.log("Clonning cards.");

    global_number_replics = number_replics;

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