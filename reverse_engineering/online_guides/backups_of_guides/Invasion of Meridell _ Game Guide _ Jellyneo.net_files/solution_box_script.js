var SolutionBox = {
  next: function(setID) {
    var levelID = $('.solution-box-' + setID + '-level.current').data('next');
    SolutionBox.show(setID, levelID, 'exitLeft');
  },
  prev: function(setID) {
    var levelID = $('.solution-box-' + setID + '-level.current').data('prev');
    SolutionBox.show(setID, levelID, 'exitRight');
  },
  replay: function(levelID) {
    var $levelImg = $('#solution-img-' + levelID);
    var levelImgSrc = $levelImg.attr('src');
    $levelImg.attr('src', levelImgSrc);
  },
  show: function(setID, levelID, fromDirection) {
    if(fromDirection == 'exitLeft') {
      var exitDir = 'left';
      var entranceDir = 'right';
    } else {
      var exitDir = 'right';
      var entranceDir = 'left';
    }
    $('#solution-box-content').css('min-height', $('#solution-box-content').height() + 'px');
    $('.solution-box-' + setID + '-level.current').toggle('slide', { direction: exitDir, easing: 'easeInOutCubic' }, 100, function() {
      $('.solution-box-' + setID + '-level.current').removeClass('current');
      $('#solution-lvl-' + levelID).toggle('slide', { direction: entranceDir }, 200).addClass('current');
      $('#solution-box-selector-' + setID).val(levelID);
      $('#solution-box-content').css('min-height', '');
    });
  }
};

$(document).ready(function() {
  $('.solution-box-nav.next').click(function() {
    var setID = $(this).data('set-id');
    SolutionBox.next(setID);
  });

  $('.solution-box-nav.prev').click(function() {
    var setID = $(this).data('set-id');
    SolutionBox.prev(setID);
  });

  $('.solution-box-replay').click(function() {
    var levelID = $(this).data('level-id');
    SolutionBox.replay(levelID);
  });

  $('.solution-box-selector').change(function() {
    var setID = $(this).data('set-id');
    var levelID = $(this).val();
    SolutionBox.show(setID, levelID, 'exitLeft');
  });
});