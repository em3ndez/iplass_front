$(document).on('click', '#ajax', function(){
  var formData = $("form").serializeArray();
  var formJson = {};
  for (var i=0; i<formData.length; i++) {
    formJson[formData[i].name]=formData[i].value;
  }
  $('#request_json').html(JSON.stringify(formJson));
  
  $.ajax({
        type:"post",                // method = "POST"
        url:"/iplass/test_tenant/api/mtp/entity/test",  // POST送信先のURL
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
            $('#responce_json').html(JSON.stringify(responce));
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
    $("#form_1 tr:first").clone(true).insertAfter($("#form_1 tr:last"));
    $("#form_1 tr:last").append('<td></td>').trigger("create");
    $(".del:last").clone(true).attr('type','button').appendTo($("#form_1 td:last"));
});
$(document).on("click", ".del", function() {
    var target = $(this).parent().parent();
    target.remove();
});
