const FARBA = {
  WH: window.innerHeight,

  WW: document.documentElement.clientWidth,

  isTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints,

  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  }
};

(function() {
  let ornt = window.innerWidth > window.innerHeight ? 'land' : 'port'
  let prev = window.innerHeight;
  let vh = prev * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('load', () => {   
      setTimeout(()=>{ 
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },1)
  });

  window.addEventListener('resize', () => {
    let current = window.innerWidth > window.innerHeight ? 'land' : 'port'

    let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      ornt = current

    if (ornt !== current) {      
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      ornt = current
    }
  });
})();

$(document).on("scroll", ".screen.screen-promo", function() {
  console.info('scroll');
});

//делаем превьюшки фоток и навешиваем на них события
function buildPreviews(swiper) {
  const imgs = document.querySelectorAll('.benefits-slide-img img')
  const previews = document.querySelector('.benefits-previews')
  if (!imgs.length || !previews) return


  document.querySelectorAll('.benefits-slide-img img').forEach((el,index) => {
    const clone = el.cloneNode()
    clone.removeAttribute('class')
    const preview = document.createElement('div')
    preview.className = index === 0 ? 'benefits-preview active' : 'benefits-preview'
    preview.appendChild(clone)
    previews.appendChild(preview)


    preview.addEventListener('click',(e) => {
      e.preventDefault()

      swiper.slideTo(index)
      document.querySelectorAll('.benefits-preview').forEach(item => item.classList.remove('active'))
      preview.classList.add('active')
    })
  })


  swiper.on('slideChange', function(inst) {
    const current = inst.activeIndex
    document.querySelectorAll('.benefits-preview').forEach(item => item.classList.remove('active'))
    document.querySelectorAll('.benefits-preview')[current].classList.add('active')
  })
}

const benefitsSwiper = new Swiper('.benefits-slider', {
  autoHeight: true,
  navigation: {
    nextEl: '.benefits-next',
    prevEl: '.benefits-prev',
  },
});

buildPreviews(benefitsSwiper);

(function () {
  if (!document.querySelector('.screen-promo-btn.benefits') || !document.querySelector('.screen.screen-main-contest')) return

  document.querySelectorAll('.screen-promo-btn.benefits').forEach((el) => {
    el.addEventListener('click', (e) => {      
      e.preventDefault()
      document.querySelector('.screen.screen-main-contest').scrollIntoView({behavior: "smooth"})
    })
  })

}());

// (function () {
//   if (!document.querySelector('.contest-steps .ui-btn') || !document.querySelector('.screen-contest-form')) return

//   document.querySelectorAll('.contest-steps .ui-btn').forEach((el) => {
//     el.addEventListener('click', (e) => {
//       e.preventDefault()
//       document.querySelector('.screen-contest-form').scrollIntoView({behavior: "smooth"})
//     })
//   })
// }());

// скролл по клику на кнопку "принять участие" к форме конкурса
(function () {
  if (!document.querySelector('.contest-steps .ui-btn')) return
  document.querySelectorAll('.contest-steps .ui-btn').forEach((el) => {
    el.addEventListener('click', (e) => {    
      e.preventDefault();

      if (window.location.pathname === '/contest') {
        if (document.querySelector('.screen-contest-form')) {
          document.querySelector('.screen-contest-form').scrollIntoView({
            behavior: "smooth"
          });
        }
      } else if (window.location.pathname === '/') {
        window.location.href = '/contest?contest=1';
      }
    })
  })
}());

(function () {
  if (!document.querySelector('.screen-plans-pagination__create') || !document.querySelector('.screen-contest-form')) return

  document.querySelectorAll('.screen-plans-pagination__create').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('.screen-contest-form').scrollIntoView({behavior: "smooth"})
    })
  })
}());

function vhFix() {
  let ornt = window.innerWidth > window.innerHeight ? 'land' : 'port'
  let prev = window.innerHeight;
  let vh = prev * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('load', () => {
    setTimeout(()=>{
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },1)
  });

  window.addEventListener('resize', () => {
    let current = window.innerWidth > window.innerHeight ? 'land' : 'port'
    if (ornt !== current) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      ornt = current
    }
  });
}
vhFix();

// Проверка localStorage

if (localStorage.getItem('age_confirm') && localStorage.getItem('age_confirm') === 'Y') {
  document.querySelector('.agree').classList.add('enter')
  document.querySelector('.screens').classList.remove('non-scroll')
  setTimeout(()=> {
    document.querySelector('.agree').remove()
  },750)
} else {
  document.querySelector('.agree').classList.add('visible')
}


// Проверка возраста

// (function () {
//   if (!document.querySelector('.agree-date')) return

//   document.querySelector(".agree-date").addEventListener("submit", function(event) {   
//     event.preventDefault(); 
 
//     const day = parseInt(document.getElementById("day").value);
//     const month = parseInt(document.getElementById("month").value);
//     const year = parseInt(document.getElementById("year").value);
    
//     const currentDate = new Date();
//     const birthDate = new Date(year, month - 1, day);
    
//     let age = currentDate.getFullYear() - birthDate.getFullYear();
    
//     if (currentDate.getMonth() < birthDate.getMonth() ||
//         (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
//       age--; // Уменьшаем возраст, если день рождения в текущем году еще не наступил
//     }
    
//     if(day && month && year) {
//       if (age < 18) {
//       document.querySelector('.agree-date-error-text').classList.remove('hidden')      
//       document.querySelector('.agree-date-inputs .year').classList.add('error')
//       } else {
//         document.querySelector('.agree').classList.add('enter')
//         document.querySelector('.screens').classList.remove('non-scroll')
//         setTimeout(()=> {
//           document.querySelector('.agree').remove()
//         },500)
//         localStorage.setItem('age_confirm','Y')
//       }
//     }    
//   });

// })();

// подтверждение возраста
(function() {
  const confirmButton = document.querySelectorAll('.agree-confirm-btn');
  const noConfirmText = document.querySelector('.agree-no__confirm');

  const content = document.querySelector('.agree-wrapper');
  const cookiesText = document.querySelector('.agree-cookie');

  confirmButton.forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      if(ev.target.getAttribute('data-answer') === 'yes') {       
        document.querySelector('.agree').classList.add('enter')
        document.querySelector('.screens').classList.remove('non-scroll')
        setTimeout(()=> {
          document.querySelector('.agree').remove()
        },500)
        localStorage.setItem('age_confirm','Y')
      } 
      if(ev.target.getAttribute('data-answer') === 'no') {       
        noConfirmText.classList.remove('hidden');
        content.classList.add('hidden');
        cookiesText.classList.add('hidden');
      } 
    });
  })
})();

// document.addEventListener('DOMContentLoaded', function() {
//   const dayInput = document.getElementById('day');
//   const monthInput = document.getElementById('month');
//   const yearInput = document.getElementById('year');

//   // Ограничение ввода только числами и проверка на максимальные значения
//   dayInput.addEventListener('input', function(event) {
//     removeError();
    
//     let inputValue = event.target.value;
//     inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
//     inputValue = inputValue.slice(0, 2); // Ограничиваем ввод до двух символов
  
//     if (inputValue.length === 2 && inputValue[0] === '0') {
//       inputValue = '0' + inputValue[1]; // Восстанавливаем ведущий ноль
//     }
  
//     const numericValue = parseInt(inputValue); // Преобразуем в число
  
//     if (isNaN(numericValue) || numericValue < 0 || numericValue > 31) {
//       inputValue = ''; // Сбрасываем значение, если оно некорректно
//     }
  
//     event.target.value = inputValue; // Устанавливаем значение
//   });
  
//   monthInput.addEventListener('input', function(event) {
//     removeError();

//     let inputValue = event.target.value;
//     inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
//     inputValue = inputValue.slice(0, 2); // Ограничиваем ввод до двух символов
  
//     if (inputValue.length === 2 && inputValue[0] === '0') {
//       inputValue = '0' + inputValue[1]; // Восстанавливаем ведущий ноль
//     }
  
//     const numericValue = parseInt(inputValue); // Преобразуем в число
  
//     if (isNaN(numericValue) || numericValue < 0 || numericValue > 12) {
//       inputValue = ''; // Сбрасываем значение, если оно некорректно
//     }
  
//     event.target.value = inputValue; // Устанавливаем значение
//   });

//   yearInput.addEventListener('input', function(event) {
//     removeError()
//     let inputValue = event.target.value;
//     inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
//     inputValue = inputValue.slice(0, 4); // Ограничиваем ввод до четырех символов
//     event.target.value = inputValue;
//   });

//   // Переход к следующему полю после ввода
//   dayInput.addEventListener('input', function() {
//     if (this.value.length >= 2) {
//       monthInput.focus();
//     }
//   });

//   monthInput.addEventListener('input', function() {
//     if (this.value.length >= 2) {
//       yearInput.focus();
//     }
//   });

//   // очистка сообщения и цвета бордера при ошибке входа  
//   function removeError() {
//     document.querySelector('.agree-date-inputs .year').classList.remove('error');
//     document.querySelector('.agree-date-error-text').classList.add('hidden');
//   }
// });


// // расположение навигации слайдера

// window.addEventListener('resize', function() {
//   if (!document.querySelector('.swiper-slide-active .benefits-slide-inner') || !document.querySelector('.benefits-nav')) return;

//   const sliderTextBlock = document.querySelector('.swiper-slide-active .benefits-slide-inner .benefits-slide-descr');
//   const textBlockHeight = sliderTextBlock.offsetHeight;

//   const sliderNavigation = document.querySelector('.benefits-nav');

//   // Получаем текущую ширину окна браузера
//   const windowWidth = window.innerWidth;

//   // Проверяем условие разрешения для установки значения top
//   if (windowWidth <= 992) {
//     sliderNavigation.style.top = `${textBlockHeight + 70}px`;
//   } else if (windowWidth <= 1180) {
//     sliderNavigation.style.top = `${textBlockHeight + 110}px`;
//   } else if (windowWidth <= 1366) {
//     sliderNavigation.style.top = `${textBlockHeight + 130}px`;
//   } else if (windowWidth <= 1680) {
//     sliderNavigation.style.top = `${textBlockHeight + 160}px`;
//   } else {
//     sliderNavigation.style.top = `${textBlockHeight + 220}px`;
//   }
// });

// // Выполнить первоначальное задание значения top при загрузке страницы
// window.addEventListener('load', function() {
//   if (!document.querySelector('.swiper-slide-active .benefits-slide-inner') || !document.querySelector('.benefits-nav')) return;

//   const sliderTextBlock = document.querySelector('.swiper-slide-active .benefits-slide-inner .benefits-slide-descr');
//   const textBlockHeight = sliderTextBlock.offsetHeight;

//   const sliderNavigation = document.querySelector('.benefits-nav');

//   // Получаем текущую ширину окна браузера
//   const windowWidth = window.innerWidth;

//   // Проверяем условие разрешения для установки значения top
//   if (windowWidth <= 992) {
//     sliderNavigation.style.top = `${textBlockHeight + 70}px`;
//   } else if (windowWidth <= 1180) {
//     sliderNavigation.style.top = `${textBlockHeight + 110}px`;
//   } else if (windowWidth <= 1366) {
//     sliderNavigation.style.top = `${textBlockHeight + 130}px`;
//   } else if (windowWidth <= 1680) {
//     sliderNavigation.style.top = `${textBlockHeight + 160}px`;
//   } else {
//     sliderNavigation.style.top = `${textBlockHeight + 220}px`;
//   }
// });


// (function() {
//   if(!document.querySelector('.burger-btn') || !document.querySelector('.header-nav ul')) return

//   const menuBtn = document.querySelector('.burger-btn');
//   const menu = document.querySelector('.header-nav ul');

//   menuBtn.addEventListener('click', openMenu);

//   function openMenu() {
//     menu.classList.toggle('active')
//   }

// })()


// стилизация селекта
(function() {
  if(!document.querySelector('.screen-plans-select select')) return

  $('.screen-plans-select select').styler();
})();

// стилизация чекбокса
(function() {
  if(!document.querySelector('.screen-contest-form-confirm input')) return

  $('.screen-contest-form-confirm input').styler();
})();


$(document).on("click", ".mfp-link", function () {
  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function(){
          $('.mfp-wrap').addClass('not_delay');
          $('.mfp-popup').addClass('not_delay');
        },700);

        document.documentElement.style.overflow = 'hidden'
      },

      close: function() {
        document.documentElement.style.overflow = ''
      }
    }
  });
  return false;
});


$(document).ready(function () {
  $("form.contest-form").validate({
    submitHandler: function(form, event) {    
      event.preventDefault()
      form.reset()

      var a = $('.screen-contest-form-bottom button');
      $.magnificPopup.open({
        items: { src: a.attr("data-href") },
        type: "ajax",
        overflowY: "scroll",
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        ajax: {
          tError: "Error. Not valid url",
        },
        callbacks: {
          open: function () {
            setTimeout(function(){
              $('.mfp-wrap').addClass('not_delay');
              $('.mfp-popup').addClass('not_delay');
            },700);
    
            document.documentElement.style.overflow = 'hidden'

            $(document).on('click', '.popup-button-moderation', function() {
              $.magnificPopup.close();
            });
          },
    
          close: function() {           
            document.documentElement.style.overflow = ''
          }
        }
      });     
    },
    // errorPlacement: function(error, element) {
    //   // Ничего не делать
    // }
    rules: {
      contest_first_name: {
        required: true,
      },
      contest_last_name: {
        required: true,
      },
      contest_email: {
        email: true,
      },
      contest_text: {
        required: true,
      }        
    },
    messages: {
      contest_first_name: "Пожалуйста, введите ваше имя",
      contest_last_name: "Пожалуйста, введите вашу фамилию",
      contest_email: {
        required: "Пожалуйста, введите ваш адрес электронной почты",
        email: "Пожалуйста, введите корректный адрес электронной почты"
      },
      contest_text: "Пожалуйста, заполните это поле"
    }
  });
});


// отображение кол-ва карточек в зависимости от разрешения

(function() {
  if(!document.querySelector('.screen-plans-cards') || !document.querySelector('.screen-plans-cards__wrapper')) return
  function updateScreenPlansItems() {
    const screenPlansCards = document.querySelector('.screen-plans-cards');
    const screenPlansItems = screenPlansCards.querySelectorAll('.screen-plans-cards__wrapper');
    console.log(screenPlansItems);
    if (window.innerWidth < 768) {
      if (screenPlansItems.length > 4) {
        for (let i = 4; i < screenPlansItems.length; i++) {
          screenPlansItems[i].style.display = 'none';
        }
      }
    } else if (window.innerWidth < 1025) {
      for (let i = 0; i < screenPlansItems.length; i++) {
        screenPlansItems[i].style.display = '';
      }
      if (screenPlansItems.length > 6) {
        for (let i = 6; i < screenPlansItems.length; i++) {
          screenPlansItems[i].style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < screenPlansItems.length; i++) {
        screenPlansItems[i].style.display = '';
      }
    }
  }
  
  updateScreenPlansItems();
  window.addEventListener('resize', updateScreenPlansItems);
})();


(function() {
  if(!document.querySelector('.burger-btn') || !document.querySelector('.header-nav ul')) return

  const menuBtn = document.querySelector('.burger-btn');
  const menu = document.querySelector('.header-nav ul');

  menuBtn.addEventListener('click', openMenu);

  function openMenu() {
    menu.classList.toggle('active')
    document.querySelector('.burger-btn span').classList.toggle('active')
  }

})();

// очистка инпута поиска
(function() {
  if(!document.querySelector('.screen-plans-search button.cross') || !document.querySelector('.screen-plans-search input')) return

  const cross = document.querySelector('.screen-plans-search button.cross');
  const input = document.querySelector('.screen-plans-search input');

  cross.addEventListener('click', removeInputValue);

  function removeInputValue() {
    input.value = '';
  }

})();

// slider


// (function() {
//   if(!document.querySelector('.screen.screen-slider')) return

//   let state = 1;

//   const prew = document.querySelector('.prew');
//   const next = document.querySelector('.next');

//   next.addEventListener('click', nextSlider);
//   prew.addEventListener('click', prewSlider);

//   function nextSlider() {
//     if (state < 3) {
//       state++
//     } else {
//       state = 1
//     }

//     // next.classList.remove('disabled')
//     // prew.classList.remove('disabled')

//     changeView()  
//   }

//   function prewSlider() {
//     if (state > 1) {
//       state--
//     } else {
//       state = 3
//     }

//     // next.classList.remove('disabled')
//     // prew.classList.remove('disabled')

//     changeView()  
//   }


//   function changeView() {
//     if (state === 1) {
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.remove('second', 'first')
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.add('third')
  
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.remove('first', 'third')
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.add('second')
  
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.remove('third', 'second')
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.add('first')
  
  
//       document.querySelector('.slider-right .slider-item-bg.second').classList.remove('yellow', 'orange', 'brown')
//       document.querySelector('.slider-right .slider-item-bg.second').classList.add('green')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.remove('yellow', 'brown', 'green')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.add('orange')
  
  
//       document.querySelector('.screen-slider').classList.remove('brown', 'green')
//       document.querySelector('.screen-slider').classList.add('orange')
  
  
//       document.querySelectorAll('.slider-content').forEach((el) => {
//         el.classList.remove('active')
//       })
//       document.querySelector('.slider-content.first').classList.add('active')
  
  
//       // prew.classList.add('disabled')
//     }

//     if (state === 2) {
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.remove('second', 'third')
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.add('first')
  
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.remove('first', 'second')
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.add('third')
  
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.remove('third', 'first')
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.add('second')
  
  
//       document.querySelector('.slider-right .slider-item-bg.second').classList.remove('yellow', 'brown', 'green')
//       document.querySelector('.slider-right .slider-item-bg.second').classList.add('orange')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.remove('yellow', 'orange', 'green')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.add('brown')
  
  
//       document.querySelector('.screen-slider').classList.remove('orange', 'brown')
//       document.querySelector('.screen-slider').classList.add('green')
  
  
//       document.querySelectorAll('.slider-content').forEach((el) => {
//         el.classList.remove('active')
//       })
//       document.querySelector('.slider-content.second').classList.add('active')
//     }

//     if (state === 3) {
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.remove('second', 'third')
//       document.querySelector('.slider-images .slider-image:nth-child(3)').classList.add('first')
  
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.remove('first', 'second')
//       document.querySelector('.slider-images .slider-image:nth-child(2)').classList.add('third')
  
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.remove('third', 'first')
//       document.querySelector('.slider-images .slider-image:nth-child(1)').classList.add('second')
  
  
//       document.querySelector('.slider-right .slider-item-bg.second').classList.remove('yellow', 'orange', 'green')
//       document.querySelector('.slider-right .slider-item-bg.second').classList.add('brown')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.remove('yellow', 'orange', 'brown')
//       document.querySelector('.slider-right .slider-item-bg.third').classList.add('green')
  
  
//       document.querySelector('.screen-slider').classList.remove('orange', 'green')
//       document.querySelector('.screen-slider').classList.add('brown')
  
  
//       document.querySelectorAll('.slider-content').forEach((el) => {
//         el.classList.remove('active')
//       })
//       document.querySelector('.slider-content.third').classList.add('active')
  
//       // next.classList.add('disabled')
//     }
//   }  

//   // свайп слайдера
//   let slider = document.querySelector('.slider-right');
//   let isDragging = false;
//   let startX = null;
  
//   function handleDragStart(event) {
//     isDragging = true;
//     startX = event.clientX || event.touches[0].clientX;
//   }
  
//   function handleDragMove(event) {
//     if (!isDragging || !startX) return;
  
//     let diffX = (event.clientX || event.touches[0].clientX) - startX;
  
//     if (diffX > 50) {
//       // swipe right   
//       prewSlider();
//       startX = null;
//       isDragging = false;
//     } else if (diffX < -50) {
//       // swipe left     
//       nextSlider();
//       startX = null;
//       isDragging = false;
//     }
//   }
  
//   function handleDragEnd(event) {
//     isDragging = false;
//   }
  
//   slider.addEventListener('mousedown', handleDragStart);
//   slider.addEventListener('mousemove', handleDragMove);
//   slider.addEventListener('mouseup', handleDragEnd);
//   slider.addEventListener('touchstart', handleDragStart);
//   slider.addEventListener('touchmove', handleDragMove);
//   slider.addEventListener('touchend', handleDragEnd);

// })();

// для слайдера с двумя изображениями
(function() {
  if(!document.querySelector('.screen.screen-slider')) return

  let state = 1;

  const prew = document.querySelector('.prew');
  const next = document.querySelector('.next');

  next.addEventListener('click', nextSlider);
  prew.addEventListener('click', prewSlider);

  function nextSlider() {
    if (state === 1) {
      state = 2;
    } else {
      state = 1;
    }
  
    changeView();
  }
  
  function prewSlider() {
    if (state === 1) {
      state = 2;
    } else {
      state = 1;
    }
  
    changeView();
  }


  function changeView() {
    if (state === 1) {     
      document.querySelector('.slider-images .slider-image:nth-child(2)').classList.remove('first');
      document.querySelector('.slider-images .slider-image:nth-child(2)').classList.add('second');
  
      document.querySelector('.slider-images .slider-image:nth-child(1)').classList.remove('second');
      document.querySelector('.slider-images .slider-image:nth-child(1)').classList.add('first');
  
      document.querySelector('.slider-right .slider-item-bg.second').classList.remove('orange');
      document.querySelector('.slider-right .slider-item-bg.second').classList.remove('brown');
      document.querySelector('.slider-right .slider-item-bg.second').classList.add('green');
  
      document.querySelector('.screen-slider').classList.remove('green');
      document.querySelector('.screen-slider').classList.add('orange');
  
      document.querySelectorAll('.slider-content').forEach((el) => {
        el.classList.remove('active');
      });
      document.querySelector('.slider-content.first').classList.add('active');
    }
  
    if (state === 2) {
      document.querySelector('.slider-images .slider-image:nth-child(1)').classList.remove('first');
      document.querySelector('.slider-images .slider-image:nth-child(1)').classList.add('second');
  
      document.querySelector('.slider-images .slider-image:nth-child(2)').classList.remove('second');
      document.querySelector('.slider-images .slider-image:nth-child(2)').classList.add('first');
  
      document.querySelector('.slider-right .slider-item-bg.second').classList.remove('yellow');
      document.querySelector('.slider-right .slider-item-bg.second').classList.add('brown');
  
      document.querySelector('.screen-slider').classList.remove('orange');
      document.querySelector('.screen-slider').classList.add('green');
  
      document.querySelectorAll('.slider-content').forEach((el) => {
        el.classList.remove('active');
      });
      document.querySelector('.slider-content.second').classList.add('active');
    }
  } 

  // свайп слайдера
  let slider = document.querySelector('.slider-right');
  let isDragging = false;
  let startX = null;
  
  function handleDragStart(event) {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
  }
  
  function handleDragMove(event) {
    if (!isDragging || !startX) return;
  
    let diffX = (event.clientX || event.touches[0].clientX) - startX;
  
    if (diffX > 50) {
      // swipe right   
      prewSlider();
      startX = null;
      isDragging = false;
    } else if (diffX < -50) {
      // swipe left     
      nextSlider();
      startX = null;
      isDragging = false;
    }
  }
  
  function handleDragEnd(event) {
    isDragging = false;
  }
  
  slider.addEventListener('mousedown', handleDragStart);
  slider.addEventListener('mousemove', handleDragMove);
  slider.addEventListener('mouseup', handleDragEnd);
  slider.addEventListener('touchstart', handleDragStart);
  slider.addEventListener('touchmove', handleDragMove);
  slider.addEventListener('touchend', handleDragEnd);

})();

// скролл до слайдера при загрузке, если есть query-пареметр more=1

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get('more');

  if (paramValue) {
    if (!document.querySelector('.screen-slider')) return;

    setTimeout(() => {
      document.querySelector('.screen-slider').scrollIntoView({
        behavior: "smooth"
      });
    }, 10)   

    urlParams.delete('more');
    const newUrl = urlParams.toString() ? `${window.location.pathname}?${urlParams}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }
});

// скролл до формы при загрузке, если есть query-пареметр contest=1
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get('contest');

  if (paramValue) {
    if (!document.querySelector('.screen-contest-form')) return;

    setTimeout(() => {
      document.querySelector('.screen-contest-form').scrollIntoView({
        behavior: "smooth"
      });
    }, 10)   

    urlParams.delete('contest');
    const newUrl = urlParams.toString() ? `${window.location.pathname}?${urlParams}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }
});

// пагиниция экрана карточек конкурса
(function() {
  if(!document.querySelector('.pagination-pages') || !document.querySelector('.pagination-btn') || !document.querySelector('.pagination__arrows .next') || !document.querySelector('.pagination__arrows .prew')) return


  const pagination = document.querySelector('.pagination-pages');
  const totalPages = pagination.querySelectorAll('.pagination-btn').length;

  let currentPage = 1; 
  let isFirstLoad = true;

  pagination.addEventListener('click', evt => {
    if (evt.target.classList.contains('pagination-btn')) {
      currentPage = +evt.target.textContent;
      updatePagination();
    }
  });

  const nextBtn = document.querySelector('.pagination__arrows .next');
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  const prevBtn = document.querySelector('.pagination__arrows .prew');
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }  
  });

  function updatePagination() {

    pagination.innerHTML = '';  

    let pagesToShow;

    if (totalPages <= 2) {
      pagesToShow = [...Array(totalPages).keys()].map(i => i + 1);
    } else if (currentPage <= 2) {
      pagesToShow = [1, 2, totalPages];
    } else if (currentPage >= totalPages - 1) {
      pagesToShow = [1, totalPages - 1, totalPages];
    } else {
      pagesToShow = [currentPage - 1, currentPage, totalPages];
    }

    if (!pagesToShow.includes(1)) {
      pagesToShow.unshift(1);
    }
    
    let prevPage = 0;

    for (let page of pagesToShow) {
      
      if (page - prevPage !== 1 && totalPages > 2) {
        
        const dots = document.createElement('span');
        dots.classList.add('pagination-dots');
        dots.textContent = '...';
        pagination.appendChild(dots); 
      }

      const btn = document.createElement('a');
      btn.textContent = page;
      btn.classList.add('pagination-btn');
      
      if (page === currentPage) {
        btn.classList.add('active');
      }
      
      prevPage = page;
      
      pagination.appendChild(btn);
    }

    if (totalPages > 2 && pagesToShow[pagesToShow.length - 1] < totalPages) {
    
      const dots = document.createElement('span');
      dots.classList.add('pagination-dots');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

    const lastBtn = document.createElement('a');
    lastBtn.textContent = totalPages;
    lastBtn.classList.add('pagination-btn');
    // pagination.appendChild(lastBtn);

    isFirstLoad = false;  

    updateButtons();
  }

  function updateButtons() {
    nextBtn.classList.remove('disabled');
    prevBtn.classList.remove('disabled');

    if (currentPage === 1) {
      prevBtn.classList.add('disabled');
    }

    if (currentPage === totalPages) {
      nextBtn.classList.add('disabled');
    }  
  }

  updatePagination();

})();