/* Animate the "events" page */
window.addEventListener("DOMContentLoaded", function() {
  var carousel = document.querySelector('.carousel');
  var slidesContainer = document.querySelector('.carousel-images');
  var slides = Array.from(document.querySelectorAll('.carousel-slide'));
  var nextBtn = document.querySelector('.carousel-btn.next');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var dotsContainer = document.querySelector('.carousel-dots');

  if (!carousel || slides.length === 0 || !nextBtn || !prevBtn || !dotsContainer) return;

  var firstClone = slides[0].cloneNode(true);
  var lastClone = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  var currentIndex = 1;
  slidesContainer.insertBefore(lastClone, slides[0]);

  slides = Array.from(document.querySelectorAll('.carousel-slide'));

  if (slides.length > 0 && nextBtn && prevBtn && dotsContainer) {
    var autoSlide = true;
    var slideInterval = setInterval(showNextSlide, 4000);
    var restartTimer = null;

    for (let i = 1; i < slides.length - 1; i++) {
      let dot = document.createElement('span');
      dot.addEventListener('click', function () {
        goToSlide(i);
        pauseAndRestart();
      });
      dotsContainer.appendChild(dot);
    }

    nextBtn.addEventListener('click', function() {
      showNextSlide();
      pauseAndRestart();
    })

    prevBtn.addEventListener('click', function() {
      showPrevSlide();
      pauseAndRestart();
    })

    function updateSlides() {
      var containerWidth = carousel.offsetWidth;
      var slideWidth = slides[0].offsetWidth + 20;
      var offset = (containerWidth - slideWidth) / 2 - (currentIndex * slideWidth);

      slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      slidesContainer.style.transform = 'translateX(' + offset + 'px)';

      var dots = dotsContainer.querySelectorAll('span');
      if (dots.length > 0) {
        var realIndex = currentIndex;
        if (realIndex === 0) realIndex = slides.length - 2;
        if (realIndex === slides.length - 1) realIndex = 1;
        dots.forEach(function(dot, i) {
          dot.classList.remove('active-dot');
          if (i == realIndex - 1) {
            dot.classList.add('active-dot');
          }
        })
      }
    }

    function pauseAndRestart() {
      clearInterval(slideInterval);
      clearTimeout(restartTimer);
      autoSlide = false;

      restartTimer = setTimeout(function () {
        slideInterval = setInterval(showNextSlide, 4000);
        autoSlide = true;
      }, 5000);
    }

    slidesContainer.addEventListener("transitionend", function () {
      if (currentIndex < 0 || currentIndex >= slides.length) return;

      clearInterval(slideInterval);
      slideInterval = setInterval(showNextSlide, 4000);

      if (slides[currentIndex].isEqualNode(firstClone)) {
        slidesContainer.style.transition = "none";
        currentIndex = 1;

        var containerWidth = carousel.offsetWidth;
        var slideWidth = slides[0].offsetWidth + 20;
        var offset = (containerWidth - slideWidth) / 2 - (currentIndex * slideWidth);
        slidesContainer.style.transform = 'translateX(' + offset + 'px)';

        void slidesContainer.offsetWidth;
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      }

      if (slides[currentIndex].isEqualNode(lastClone)) {
        slidesContainer.style.transition = "none";
        currentIndex = slides.length - 2;

        var containerWidth = carousel.offsetWidth;
        var slideWidth = slides[0].offsetWidth + 20;
        var offset = (containerWidth - slideWidth) / 2 - (currentIndex * slideWidth);
        slidesContainer.style.transform = 'translateX(' + offset + 'px)';

        void slidesContainer.offsetWidth;
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      }
    });

    function showNextSlide() {
      if (currentIndex >= slides.length - 1) return;
      currentIndex++;
      updateSlides();
    }

    function showPrevSlide() {
      if (currentIndex <= 0) return;
      currentIndex--;
      updateSlides();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlides();
    }

    updateSlides();
  }
})

/* Animate the "projects" page */
window.addEventListener("DOMContentLoaded", function() {
  var searchInputProject = document.getElementById("project-search");
  var projectLinks = document.querySelectorAll('.project-link');
  var projectGrid = document.querySelector('.project-grid');

  if (searchInputProject && projectLinks.length > 0) {
    searchInputProject.addEventListener("input", filterProject);
    window.addEventListener("scroll", showOnScrollP);
    window.addEventListener("load", showOnScrollP);

    function showOnScrollP() {
      projectLinks.forEach(function(link) {
        var Pcard = link.querySelector('.project-card');
        if (link.classList.contains('hidden'))return;
        if (link.style.display === 'none') return;

        var PcardTop = Pcard.getBoundingClientRect().top;

        if (PcardTop < window.innerHeight - 50) {
          Pcard.classList.add("show");
        }
        else {
          Pcard.classList.remove("show");
        }
      });
    }

    function filterProject() {
      var searchPterm = searchInputProject.value.toLowerCase();
      var matchedLinksP = [];
      var nonMatchedLinksP = [];

      if (searchPterm === "") {
        projectLinks.forEach(function(link) {
          var Pcard = link.querySelector('.project-card');
          
          link.style.display = 'block';
          Pcard.classList.remove('hidden', 'hide-animate');
          void Pcard.offsetWidth;
          Pcard.classList.add('project-visible', 'show');
          projectGrid.appendChild(link);
        })
      }
      else {
        projectLinks.forEach(function(link) {
          var Pcard = link.querySelector('.project-card');
          var PcardText = Pcard.innerText.toLowerCase();
          var matches = PcardText.includes(searchPterm);

          if (matches) {
            matchedLinksP.push(link);
            Pcard.classList.remove('hidden', 'hide-animate');
            Pcard.classList.add('project-visible');

            Pcard.classList.remove('show');
            void Pcard.offsetWidth;
            Pcard.classList.add('show');
          } 
          else {
            nonMatchedLinksP.push(link);
            Pcard.classList.remove('show');
            Pcard.classList.add('hide-animate');

            setTimeout(function() {
              link.style.display = 'none';
              Pcard.classList.add('hidden');
              Pcard.classList.remove('project-visible');
            }, 400);
          }
        });
      }
    }
  }
})

/* Animate the "lessons" page */
window.addEventListener("DOMContentLoaded", function() {
  var searchInputLesson = document.getElementById("lesson-search");
  var lessonLinks = document.querySelectorAll('.lesson-link');
  var lessonGrid = document.querySelector('.lesson-grid');

  if (searchInputLesson && lessonLinks.length > 0) {
    searchInputLesson.addEventListener("input", filterLessons);
    window.addEventListener("scroll", showOnScrollL);
    window.addEventListener("load", showOnScrollL);

    function showOnScrollL() {
      lessonLinks.forEach(function(link) {
        var Lcard = link.querySelector('.lesson-card');
        if (link.style.display === 'none') return;

        var LcardTop = Lcard.getBoundingClientRect().top;

        if (LcardTop < window.innerHeight - 50) {
          Lcard.classList.add("show");
        }
        else {
          Lcard.classList.remove("show");
        }
      });
    }

    function filterLessons() {
      var searchLterm = searchInputLesson.value.toLowerCase();
      var matchedLinksL = [];
      var nonMatchedLinksL = [];

      if (searchLterm === "") {
        lessonLinks.forEach(function(link) {
          var Lcard = link.querySelector('.lesson-card');
          link.style.display = 'block';
          Lcard.classList.remove('hidden', 'hide-animate');
          void Lcard.offsetWidth;
          Lcard.classList.add('show');
          lessonGrid.appendChild(link);
        })
      }
      else {
        lessonLinks.forEach(function(link) {
          var Lcard = link.querySelector('.lesson-card');
          var LcardText = Lcard.innerText.toLowerCase();
          var matches = LcardText.includes(searchLterm);

          if (matches) {
            matchedLinksL.push(link);
            Lcard.classList.remove('hidden', 'hide-animate');
            Lcard.classList.add('lesson-visible');
            Lcard.style.display = 'block';

            Lcard.classList.remove('show');
            void Lcard.offsetWidth;
            Lcard.classList.add('show');
          } 
          else {
            nonMatchedLinksL.push(link);
            Lcard.classList.remove('show');
            Lcard.classList.add('hide-animate');
            
            setTimeout(function() {
              link.style.display = 'none';
              Lcard.classList.add('hidden');
              Lcard.classList.remove('hide-animate');
            }, 400);
          }
        });
      }
    }
  }
})

/* Animate the individual lesson pages */
document.addEventListener('DOMContentLoaded', function() {
  var quizQuestionHeaders = document.querySelectorAll('.quiz-question-header');

  quizQuestionHeaders.forEach(function (header) {
    header.addEventListener('click', function() {
      var container = this.closest('.quiz-question-container');
      var answerContent = container.querySelector('.quiz-answer-content');

      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        answerContent.style.maxHeight = answerContent.scrollHeight + 'px';
      }
      else {
        answerContent.style.maxHeight = '0';
      }
    })
  })
})

/* Animate the hero-header */
document.addEventListener('DOMContentLoaded', function() {
  var titleBox = document.querySelector(".hero-title-box");

  if (titleBox) {
    window.addEventListener("scroll", moveTitleBox);

    function moveTitleBox() {
      var scrollY = window.scrollY;
      var offset = scrollY * 0.2;

      titleBox.style.transform = "translateY(" + offset + "px)";
    }
  }
})

/* Animate the navbar */
document.addEventListener("DOMContentLoaded", function() {
  var lastScroll = window.pageYOffset;
  var navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", checkScroll);

  function checkScroll() {
    var currentScroll = window.pageYOffset;
    var scrollDelta = currentScroll - lastScroll;

    if (Math.abs(scrollDelta) < 10) {
      return;
    }

    if (scrollDelta > 0 && currentScroll > 60) {
      navbar.classList.add("hidden");
    }
    else if (scrollDelta < 0) {
      navbar.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  }

    var navbar = document.querySelector(".navbar");
    var navbarLogo = document.querySelector(".navbar-logo");
    var navLinks = document.querySelectorAll(".nav-box");

    if (navbar && navbarLogo) {
        navbarLogo.addEventListener("click", function() {
            navbar.classList.toggle("nav-open");
        });

        navLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                if (navbar.classList.contains("nav-open")) {
                    navbar.classList.remove("nav-open");
                }
            });
        });
    }
});