$(document).on('click', '#ajax', function(){
  $('form').submit(function(){
  var formData = $("form").serializeArray();
  var formJson = "{";
  for (var i=0; i<formData.length; i++) {
    formJson = formJson + formData[i].name+" : "+formData[i].value
    if(i<formData.length-1){
      formJson = formJson + " , "
    }
  }
  formJson = formJson + " }"
  alert (formJson);
});
