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
    console.log("clonning.");
}

function destroy_card (card_label) {
    id_checkbox = card_label.getAttribute('for');
    checkbox = document.querySelector(`input#${id_checkbox}`);

    checkbox.remove();
    card_label.remove();
}