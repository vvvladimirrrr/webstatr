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

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left',prev.width() + 10 + bullets.width() + 10);
  bullets.css('left',prev.width() + 10)

  new WOW().init();
  
  // валидация формы
  $('.modal__form').validate({
    errorClass: 'invalid',
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      // правило объект (блок)
      userEmail: {
        required: true,
        email: true
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее 15 букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: 'POST',
        url: 'send.php',
        data: $(form).serialize(),
        success: function(response){
          aletr('форма отправлена, мы свяжемся с вами через 10 минут');
          $(form)[0].reset();
          modal.removeClass('modal--visible');
        },
        error: function(response) {
          console.log('Ошибка загрузки: ' + response);
        }
      });
    }
  });

  //маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00',{placeholder: "+7 (__) ___-__-__"});

  //сощдание карты

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [55.786786, 49.142331],
          zoom: 17
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'dist/img/icon-map.png',
          // Размеры метки.
          iconImageSize: [32, 32],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      })

  myMap.geoObjects
    .add(myPlacemark)
});


});
