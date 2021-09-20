window.onload = function () {
    //VARIABLES
    const travellerBtn = document.querySelector('#travellers'),
          incrementBtn = document.querySelector('#increment'),
          decrementBtn = document.querySelector('#decrement'),
          miniform = document.querySelector('.above-form'),
          indicator = document.querySelector('#indicator');


    //FUNCTION INVOKE
    getOpnSection();
    activateItems('.booking__menu-item','.booking__menu-link');

    //EVENTS
    document.addEventListener('click', menu);
    // document.addEventListener('click', bookMenu);
    miniform.addEventListener('click', setPersonAmount);



    //FUNCTIONS
    function setPersonAmount(e) {
        let res = indicator.value;
        if(e.target.id === 'increment' && indicator.value < 15){
            res++;
        }else if(e.target.id === 'decrement' && indicator.value > 0){
            res--;
        }
        indicator.value = res;
        travellerBtn.value = res;
        travellerBtn.innerHTML = `${res} travellers`;
    }
    function getOpnSection() {
        if(localStorage.getItem('section') === null){
            localStorage.setItem('section', JSON.stringify('flight'));
            document.querySelector(`[data-trip="flight"]`).classList.add('active');
        }else{
            const section = `[data-trip="${JSON.parse(localStorage.getItem('section'))}"]`,
                  item = document.querySelector(section).closest(".booking__menu-item");
                  item.classList.add('active');
        }
    }

    function activateItems(itemClss, linkClss) {
        const links = document.querySelectorAll(linkClss),
        items = document.querySelectorAll(itemClss);
        for(let i = 0; i < links.length; i++){
          let selectedSection = links[i].dataset.trip;
          links[i].addEventListener('click', function(e){
              e.preventDefault();
              for(let ii = 0; ii < links.length; ii++){
                  links[ii].classList.remove('active');
                  items[ii].classList.remove('active');
              }
              items[i].classList.add('active');
              localStorage.setItem('section', JSON.stringify(selectedSection));
              console.log(links[i].dataset.trip);
          })
        }
    }

    function menu(e, btn ='.burger', menu ='.menu-nav', item = '.menu__item') {
        const targetElement = e.target;
        if(!targetElement.closest(item) && document.querySelector(btn).classList.contains('_active')){
            document.querySelector(menu).classList.remove('_active');
            document.querySelector(btn).classList.remove('_active');
        }else if(targetElement.closest(btn)){
            targetElement.closest(btn).classList.toggle('_active');
            document.querySelector(menu).classList.toggle('_active');
        }
    }




}