/*jshint devel:true */

(function() {
  "use strict";

  // Masonry

  var sectionRepos = $('#sectionRepos');

  sectionRepos.isotope({
    masonry: {
      columnWidth: 374,
      gutter: 20
    },
    transitionDuration: 0,
    itemSelector: '.repo',
  });

  $('#filterAll').click(function(){
    sectionRepos.isotope({ filter: '*' });

    return false;
  });

  $('#filterAndroid').click(function(){
    sectionRepos.isotope({ filter: '.android' });

    return false;
  });

  $('#filterIos').click(function(){
    sectionRepos.isotope({ filter: '.ios' });

    return false;
  });

  $('#filterWeb').click(function(){
    sectionRepos.isotope({ filter: '.web' });

    return false;
  });

  // Turn circle into filter
  function setRepoFilter(scrollPos) {
    var reposTop = $('#sectionRepos').offset().top - $(window).height();
    var careersTop = $('#sectionCareers').offset().top - $(window).height();
    var sectionFilter = $('#sectionFilter');
    var filterContainer = $('.filter-container');

    // Change navigation to circle if it's the scroll position is still at the start
    if (scrollPos < reposTop) {
      console.log('hello');
      sectionFilter.addClass('filter--circled');
    } else {
      sectionFilter.removeClass('filter--circled');
    }

    // Change fixed if scroll is above careers
    if (scrollPos > careersTop) {
      filterContainer.addClass('filter-container--static');
    } else {
      filterContainer.removeClass('filter-container--static');
    }
  }

  var windowScrollTop = $(window).scrollTop();
  setRepoFilter(windowScrollTop);

  $(window).scroll(function(){
    windowScrollTop = $(window).scrollTop();
    setRepoFilter(windowScrollTop);
  });

  // repo details page
  $('.repo__riser').on('click',function(){
    $('.modal__wrapper')
      .removeClass('modal__wrapper--hidden')
      .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $('.modal__content').removeClass('modal__content--hidden');
    });
  });

  $('.modal__close').on('click',function(){
    $('.modal__content')
    .addClass('modal__content--hidden')
    .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      $('.modal__wrapper').addClass('modal__wrapper--hidden');
    });
  });

}());
