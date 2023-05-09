# typed\_sync

![Patolino typing](https://i.giphy.com/media/48zjXYRwBg5IQ/giphy.webp)


## About

This project aims to create a typing effect from scratch. The basic knowledge 
required to build it is:
- [CSS] Keyframes, to create cursor animations.
- [CSS] Pseudo-elements.
- [ JS ] [Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) to append one letter after another in each element after an amount of time using setTimeout() function.
- [ JS ] Function [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), to create the typing effect it self by appending one letter after a few milisseconds.
- [ JS ] [Async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), cause each typed text is dispatched one by one.


## How to use it

You could copy and paste [main.js](main.js), and lines 7 to 24 from
[style.css](style.css) into your code.
Then just add the function trigger to your HTML and finnaly add the class
.typed-text in element wich you wish this effect.