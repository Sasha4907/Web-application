$('#block').vide('ocean');

  var instance = $('#block').data('vide');
  var video = instance.getVideoObject();
  instance.destroy();

  $('#block2').vide({
    'mp4': 'ocean',
  });
});
