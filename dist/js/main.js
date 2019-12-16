/*
document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
  	modal.classList.toggle('modal--visible');
  }

  modalBtn.forEach(element => {
  	element.addEventListener('click',switchModal);
  });

  closeBtn.addEventListener('click', switchModal)

});
*/
$(document).ready(function(){
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
      modal.toggleClass('modal--visible');
  }); 
  closeBtn.on('click',function () {
      modal.toggleClass('modal--visible');
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.button-up').fadeIn();
    } else {
        $('.button-up').fadeOut();
    }
  });
    
  $('.button-up').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
  });

});
