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

// Functions

function capture_active_cards () {

    let all_cards = document.querySelectorAll("div.card");

    let cards_fliped = [];

    for( c of all_cards){
        let img = c.querySelector('img[alt=back]');
        if( img.style.visibility === 'hidden')
            cards_fliped.push(c);
    }

    console.log(cards_fliped);


    if ( cards_fliped.length === 2 )
    {
        stop_listeners();
        setTimeout(check_match, 600, cards_fliped);
        setTimeout(add_listeners, 599);
    }

}

function check_match(cards_fliped) {

    let card1 = cards_fliped.pop();
    let card2 = cards_fliped.pop();

    let card_name1 = card2.getAttribute('id');
    let card_name2 = card1.getAttribute('id');

    if ( check_twin_strings( card_name1, card_name2 ) ) 
        { card1.remove(); card2.remove(); }
    else 
        { card1.click(); card2.click(); }
}

function check_twin_strings(smaller_string,bigger_string){

    let sufix_twin = "-twin";

    if (smaller_string.length > bigger_string.length) {
        [smaller_string, bigger_string] = [bigger_string,smaller_string];
    }

    let i = 0;
    while ( smaller_string[i] === bigger_string[i] && i < smaller_string.length)
        i++;

    while ( bigger_string[i] === sufix_twin[i - smaller_string.length] && i < bigger_string.length)
        i++;
    
    if ( i === bigger_string.length)
        return true;

    return false;
}

function flip_card(element) {
    console.log("Flip card");
    let img = undefined;
    try {
        img = this.querySelector('img[alt=back]');
    }catch(error) {
        img = element.querySelector('img[alt=back]');
    }
    img.style.visibility = (img.style.visibility === 'hidden') ? 'visible' : 'hidden';

    capture_active_cards();
}

function clone_cards(){
    console.log("Clonning cards.");

    div_cards = document.querySelectorAll('div.card');
    for (div_card of div_cards) {
        console.log("Create div :" + div_card.getAttribute('id'));

        let div = div_card.cloneNode(true);
        div.setAttribute('id', `${div.getAttribute('id')}-twin`);

        div.style.backgroundImage = `url(assets/cards/${div_card.getAttribute('id')}.jpg)`;

        div_card.after(div);
    }
}