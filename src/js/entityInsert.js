$(document).on('click', '#ajax', function(){
  var formData = $("form").serializeArray();
  var formJson = {};
  for (var i=0; i<formData.length; i++) {
    formJson[formData[i].name]=formData[i].value;
  }
  $('#request_url').html("URL: /iplass/test_tenant/api/mtp/entity/"+formData[0].value);
  $('#request_json').html("JSON: "+JSON.stringify(formJson));
  
  $.ajax({
        type:"post",                // method = "POST"
        url:"/iplass/test_tenant/api/mtp/entity/"+formData[0].value,  // POST送信先のURL
        data:JSON.stringify(formJson),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
      　headers: {
            'X-Auth-Id' : 'admin@test_tenant',
            'X-Auth-Password' : '11111111'
        },
        success: function(responce) {   // 200 OK時
            // 成功時処理
            //location.reload();
            $('#responce_json').html("JSON: "+JSON.stringify(responce));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            //button.attr("disabled", false);  // ボタンを再び enableにする
        }
    });
});


$(document).on("click", ".add", function() {
    $('#form_1 table').append($('<tr/>').append('<td/>'));
    $("#form_1 td:last").append($(".form-control").val());
    $("#form_1 tr:last").append('<td></td>');
    $("#form_1 td:last").append('<input type="text" class="json">');
    $("#form_1 input:last").attr('name',$(".form-control").val());
    $("#form_1 tr:last").append('<td></td>');
    $(".del:last").clone(true).attr('type','button').appendTo($("#form_1 td:last")).trigger('create');
    $("#form_1 .del:last").css({"width":"25px", "height":"25px", "border":"1px solid #ccc", "background":"#fff", "border-radius":"5px", "padding":"0", "margin":"0"});
});
$(document).on("click", ".del", function() {
    var target = $(this).parent().parent();
    target.remove();
});
