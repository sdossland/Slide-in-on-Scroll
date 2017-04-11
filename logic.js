/**
 * Created by sophia on 3/17/17.
 */
document.addEventListener("DOMContentLoaded", function() {
  //helps to optimize performance of scroll event as it limits how often the event handler is run
  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      //allows func arg to be called in proper context
      var context = this,
          //combines all arguments passed into func
          args = arguments;
      //function to be passed in as the first arg of the setTimeOut function
      var later = function() {
        //removes numeric ID that is assigned during the setTimeOut function
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  //cannot select 'img' elements because offset properties return based on parent element (which we want to be img tag)
  const images = document.querySelectorAll('.slide-in');

  function slideImage() {
    images.forEach(image => {
      //when half the image is within the screen (in terms of pixels)
      const slideIn = (window.scrollY + window.innerHeight) - image.height / 2;
      //bottom of image in pixels
      const bottomOfImage = image.offsetTop + image.height;
      //when the px of image is greater than those of the top of the image
      const halfImageDisplayed = slideIn > image.offsetTop;
      //when px of bottom of image is not less than px currently scrolled from top
      const notScrolledPastImage = bottomOfImage > window.scrollY;
      if (halfImageDisplayed && notScrolledPastImage) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', debounce(slideImage));

});