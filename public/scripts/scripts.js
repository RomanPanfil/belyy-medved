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
}

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
  if (!document.querySelector('.screen-promo-btn.benefits') || !document.querySelector('.screen-benefits')) return

  document.querySelectorAll('.screen-promo-btn.benefits').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('.screen-benefits').scrollIntoView({behavior: "smooth"})
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
  setTimeout(()=> {
    document.querySelector('.agree').remove()
  },750)
} else {
  document.querySelector('.agree').classList.add('visible')
}


// Проверка возраста

(function () {
  if (!document.querySelector('.agree-date')) return

  document.querySelector(".agree-date").addEventListener("submit", function(event) {   
    event.preventDefault(); 
 
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    
    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      age--; // Уменьшаем возраст, если день рождения в текущем году еще не наступил
    }
    
    if(day && month && year) {
      if (age < 18) {
      document.querySelector('.agree-date-error-text').classList.remove('hidden')      
      document.querySelector('.agree-date-inputs .year').classList.add('error')
      } else {
        document.querySelector('.agree').classList.add('enter')
        setTimeout(()=> {
          document.querySelector('.agree').remove()
        },500)
        localStorage.setItem('age_confirm','Y')
      }
    }    
  });

})()

document.addEventListener('DOMContentLoaded', function() {
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');

  // Ограничение ввода только числами и проверка на максимальные значения
  dayInput.addEventListener('input', function(event) {
    removeError();
    
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
    inputValue = inputValue.slice(0, 2); // Ограничиваем ввод до двух символов
  
    if (inputValue.length === 2 && inputValue[0] === '0') {
      inputValue = '0' + inputValue[1]; // Восстанавливаем ведущий ноль
    }
  
    const numericValue = parseInt(inputValue); // Преобразуем в число
  
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 31) {
      inputValue = ''; // Сбрасываем значение, если оно некорректно
    }
  
    event.target.value = inputValue; // Устанавливаем значение
  });
  
  monthInput.addEventListener('input', function(event) {
    removeError();

    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
    inputValue = inputValue.slice(0, 2); // Ограничиваем ввод до двух символов
  
    if (inputValue.length === 2 && inputValue[0] === '0') {
      inputValue = '0' + inputValue[1]; // Восстанавливаем ведущий ноль
    }
  
    const numericValue = parseInt(inputValue); // Преобразуем в число
  
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 12) {
      inputValue = ''; // Сбрасываем значение, если оно некорректно
    }
  
    event.target.value = inputValue; // Устанавливаем значение
  });

  yearInput.addEventListener('input', function(event) {
    removeError()
    const inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, ''); // Оставляем только числа
    inputValue = inputValue.slice(0, 4); // Ограничиваем ввод до четырех символов
    event.target.value = inputValue;
  });

  // Переход к следующему полю после ввода
  dayInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
      monthInput.focus();
    }
  });

  monthInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
      yearInput.focus();
    }
  });

  // очистка сообщения и цвета бордера при ошибке входа  
  function removeError() {
    document.querySelector('.agree-date-inputs .year').classList.remove('error');
    document.querySelector('.agree-date-error-text').classList.add('hidden');
  }
});


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