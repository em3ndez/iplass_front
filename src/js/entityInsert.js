$(document).on('click', '#ajax', function(){
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
  
  $.ajax({
        type:"post",                // method = "POST"
        url:"/iplass/test_tenant/api/mtp/entity/test",  // POST送信先のURL
        data:JSON.stringify(formJson),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
      　headers: {
            'X-Auth-Id' : 'admin@test_tenant',
            'X-Auth-Password' : '11111111',
            'X-Requested-With' : 'XMLHttpRequest'
        },
        success: function(json_data) {   // 200 OK時
            // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
            if (!json_data[0]) {    // サーバが失敗を返した場合
                alert("Transaction error. " + json_data[1]);
                return;
            }
            // 成功時処理
            location.reload();
            alert(json_data[0]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            button.attr("disabled", false);  // ボタンを再び enableにする
        }
    });
});
