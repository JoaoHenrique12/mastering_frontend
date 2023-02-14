function add_listeners(){
    let label = document.querySelectorAll("label.card");
    let check_boxes = document.querySelectorAll("input[type=checkbox]");


    for (l of label)
        l.addEventListener('click', flip_card);

    for (c of check_boxes)
        c.addEventListener('change', check_match);
}

// Functions

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

function check_match(e) {
    cards_fliped = []

    check_boxes = document.querySelectorAll('input[type=checkbox]:checked');

    for ( check_box of check_boxes ) {
        cards_fliped.push(document.querySelector(`label[for=${check_box.getAttribute('id')}]`));
    }

    if ( cards_fliped.length !== 2 )
        return;

    console.log("Entrei");
    console.log(cards_fliped);

    let card2 = cards_fliped.pop();
    let card1 = cards_fliped.pop();

    let card_name1 = card2.getAttribute('for');
    let card_name2 = card1.getAttribute('for');

    
    if ( check_twin_strings( card_name1, card_name2 ) ) 
        { destroy_card(card1); destroy_card(card2); }
    else 
        { card1.click(); card2.click(); }
}

function flip_card(e) {
    img = this.querySelector('img[alt=back]');
    img.style.visibility = (img.style.visibility === 'hidden') ? 'visible' : 'hidden';
}

function clone_cards(){
    console.log("Clonning.");

    check_boxes = document.querySelectorAll('input[type=checkbox]');
    for( check_box of check_boxes){
        console.log("Create checkbox:" + check_box.getAttribute('id'));

        let input = check_box.cloneNode(true);
        input.setAttribute("id", `${check_box.getAttribute('id')}-twin`);

        check_box.after(input);
    }

    label_cards = document.querySelectorAll('label.card');
    for (label_card of label_cards) {
        console.log("Create label :" + label_card.getAttribute('for'));

        let label = label_card.cloneNode(true);
        label.setAttribute('for', `${label.getAttribute('for')}-twin`);

        label.style.backgroundImage = `url(assets/cards/${label_card.getAttribute('for')}.jpg)`;

        label_card.after(label);
    }
}

function destroy_card (card_label) {
    id_checkbox = card_label.getAttribute('for');
    checkbox = document.querySelector(`input#${id_checkbox}`);

    checkbox.remove();
    card_label.remove();
}