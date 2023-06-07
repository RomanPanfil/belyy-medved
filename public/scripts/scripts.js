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
  const previews = document.querySelector('.benefits-slider-previews')
  if (!imgs.length || !previews) return


  document.querySelectorAll('.benefits-slide-img img').forEach((el,index) => {
    const clone = el.cloneNode()
    clone.removeAttribute('class')
    const preview = document.createElement('div')
    preview.className = index === 0 ? 'benefits-slider-preview active' : 'benefits-slider-preview'
    preview.appendChild(clone)
    previews.appendChild(preview)


    preview.addEventListener('click',(e) => {
      e.preventDefault()

      swiper.slideTo(index)
      document.querySelectorAll('.benefits-slider-preview').forEach(item => item.classList.remove('active'))
      preview.classList.add('active')
    })
  })


  swiper.on('slideChange', function(inst) {
    const current = inst.activeIndex
    document.querySelectorAll('.benefits-slider-preview').forEach(item => item.classList.remove('active'))
    document.querySelectorAll('.benefits-slider-preview')[current].classList.add('active')
  })
}

const benefitsSwiper = new Swiper('.benefits-slider', {
  autoHeight: true,
  navigation: {
    nextEl: '.benefits-slider-next',
    prevEl: '.benefits-slider-prev',
  },
});

buildPreviews(benefitsSwiper);

(function () {
  if (!document.querySelector('.screen-promo-appeal.benefits') || !document.querySelector('.screen-benefits')) return

  document.querySelector('.screen-promo-appeal.benefits').addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.screen-benefits').scrollIntoView({behavior: "smooth"})
  })
}());

(function () {
  if (!document.querySelector('.screen-promo-appeal.promo') || !document.querySelector('.screen-promo')) return


  document.querySelector('.screen-promo-appeal.promo').addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.screen-promo').scrollIntoView({behavior: "smooth"})
  })
})();

(function () {
  if (!document.querySelector('.screen-promo-appeal.voting') || !document.querySelector('.screen-voting')) return

  document.querySelector('.screen-promo-appeal.voting').addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.screen-voting').scrollIntoView({behavior: "smooth"})
  })
})();

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


(function () {
  if (!document.querySelector('.agree-back')) return

  document.querySelector('.agree-back').addEventListener('click', (e) => {
    e.preventDefault()

    window.history.go(-1)
  })
}());


(function () {
  if (!document.querySelector('.agree-confirm')) return

  document.querySelector('.agree-confirm').addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.agree').classList.add('enter')
    setTimeout(()=> {
      document.querySelector('.agree').remove()
    },500)
    localStorage.setItem('age_confirm','Y')
  })
}());

if (localStorage.getItem('age_confirm') && localStorage.getItem('age_confirm') === 'Y') {
  document.querySelector('.agree').classList.add('enter')
  setTimeout(()=> {
    document.querySelector('.agree').remove()
  },750)
} else {
  document.querySelector('.agree').classList.add('visible')
}
