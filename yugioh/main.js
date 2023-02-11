function add_listeners(){
    var label = document.querySelectorAll("label.card");


    for (l of label)
        l.addEventListener('click', flip_card);
}


// Functions

function flip_card(e) {
    img = this.querySelector('img[alt=back]');
    img.style.visibility = (img.style.visibility === 'hidden') ? 'visible' : 'hidden';
}