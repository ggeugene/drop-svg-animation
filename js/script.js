function animate(...options) {
    let promises = [];

    // if arguments has more than one option
    for(let option of options) {
        // if option.name is collection
        if(option.name.forEach) {

            // create promise for every element of collection
            option.name.forEach((elem) => {
                let promise = new Promise(resolve => {
                    for(let [key, value] of Object.entries(option.styles)) {
                        elem.style[key] = value;
                    }

                    //resolve promise ontransitionend
                    elem.addEventListener('transitionend', animationCompleted(elem, resolve));

                });
                
                //push promise of every element in array
                promises.push(promise);
                
            });

        } else {
            let promise = new Promise(resolve => {
                for(let [key, value] of Object.entries(option.styles)) {
                    option.name.style[key] = value;
                }
                option.name.addEventListener('transitionend', animationCompleted(option.name, resolve));

            });

            promises.push(promise);
            

        }
        
    }

    // return result when all promises are resolved
    return Promise.all(promises);
}

function animationCompleted(elem, resolve) {

    elem.addEventListener('transitionend', () => {
        elem.removeEventListener('transitionend', animationCompleted);
        resolve();
    });

}

window.addEventListener('load', function() {
    let menu = document.querySelectorAll('.nav-bar .animate');
    let phone = document.querySelector('.phone-img');
    let textBlock = document.querySelectorAll('.row .col-5 .animate');
    let svg1 = document.querySelector('.svg1');
    let svg2 = document.querySelector('.svg2');
    let svg3 = document.querySelector('.svg3');
    let svg4 = document.querySelector('.svg4');
    let reveal = document.querySelectorAll('.logo__link, .menu-nav, .screen-nav');

    animate({
        name: svg1,
        styles: {
            top: '-50px'
        }
    })
    .then(() => {
        svg2.style.visibility = 'visible';
        return animate({
            name: svg2,
            styles: {
                top: '-45px'
            }
        })
    })
    .then(() => {
        [svg1, svg2].forEach(elem => elem.style.visibility = 'hidden');
        return animate({
            name: svg3,
            styles: {
                opacity: 1,
            }
        })
    })
    .then(() => {
        return animate({
            name: svg3,
            styles: {
                top: '50%'
            }
        })
    })
    .then(() => {
        svg3.style.visibility = 'hidden';
        return animate({
            name: svg4,
            styles: {
                width: '450px'
            }
        }, {
            name: phone,
            styles: {
                opacity: 1,
                transform: 'translate(-30%, 7%)'
            }
        }, {
            name: reveal,
            styles: {
                opacity: 1
            }
        })
    })
    .then(() => {
        return animate({
            name: textBlock,
            styles: {
                opacity: 1,
                transform: 'translate(0%,0%)'
            }
        }, {
            name: svg4,
            styles: {
                transform: 'translate(25%, -50%)'
            }
        }, {
            name: phone,
            styles: {
                transform: 'translate(6%, 7%)'
            }
        })
    });
});