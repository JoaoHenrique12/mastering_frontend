function add_listeners(){
    let label = document.querySelectorAll("label.card");


    for (l of label)
        l.addEventListener('click', flip_card);
}


// Functions

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
        label.style.backgroundSize = 'cover';

        label_card.after(label);
    }
}

function destroy_card (card_label) {
    id_checkbox = card_label.getAttribute('for');
    checkbox = document.querySelector(`input#${id_checkbox}`);

    checkbox.remove();
    card_label.remove();
}