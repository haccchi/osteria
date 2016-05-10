/* ランチorディナー選択	
  var time_lunch = document.getElementById('time_lunch');
    var time_dinner = document.getElementById('time_dinner');
    const tax = 1.08; //実行の過程で値が変わらないものはconst(定数)として宣言しておく
    var rykn_array = [5000,6000,10500,12000]; //配列 array
    
    function dp_lunch(){
       time_lunch.className="block" ;
       time_dinner.className="none" ;
    }
    function dp_dinner(){
       time_lunch.className="none" ;
       time_dinner.className="block" ;
    } 
    
      function total_chk(){
    var total_price = document.getElementById('total_price');

   // ↓セレクトメニューを選んだ値を取得するための文
    if(document.frm.lunch.checked){
         var menu = document.frm.course_lunch.options[document.frm.course_lunch.selectedIndex].value;
         } else if(document.frm.dinner.checked){
         var menu =    document.frm.course_dinner.options[document.frm.course_dinner.selectedIndex].value;
         } else{ 
         alert("ランチまたはディナーを選択してください");
       }
       //セレクトメニューで選んだ値を取得するための文
    total_price.value = (num * rykn_array[menu]*tax).toLocaleString(); 
   }//BOXの値がセレクトで選んだ値となる
   
   //total_chkは↓のように書き換えられる
   function total_chk(){
    var total_price = document.getElementById('total_price');
    var rl = document.frm.course_lunch;  //ラジオボタン ランチのid
    var rd = document.frm.course_dinner; //ラジオボタン ディナーのid
      
       if(document.frm.lunch.checked){  
       	//ランチにチェックが入っていたら .checkedの戻り値はtrueかfalse
         var menu = rl.options[rl.selectedIndex].value;
       } else if(document.frm.dinner.checked){  
       	      //ディナーにチェックが入っていたら
         var menu =  rd.options[rd.selectedIndex].value;
       } else{ 
         alert("ランチまたはディナーを選択してください");  //どっちにも入っていなかったら
       }
    total_price.value = (num * rykn_array[menu]*tax).toLocaleString(); 
   }//BOXの値がセレクトで選んだ値となる

//人数入力 
    function numCheck(){
    num =document.frm.num.value;
   	
    if(!num.match(/^[0-9]+$/) || 1 > num || num > 10 ){
  	alert("1～10までの半角数字で");
      }
    } 
    
    //電話・eメール・住所入力
     //電話番号チェック
     function telcheck(){
      var tel = document.frm.tel.value;
     // 対応形式「-」なしの6～11桁、「-」ありの時は13桁以下であるか否か
      if(!tel.match(/^[0-9-]{6,11}$|^[0-9-]{13}$/) ){
      alert("半角数字と-のみで入力してください");
       }
     }
    //eメールチェック
     function alphcheck(){
     var email = document.frm.email.value;
    // @前は「英数字_-」使用可、@後ひとつ以上の「.」があるか、「.」の後に2文字以上英数字が入っているか否か
     if(!email.match(/^[\w_-]+@[\w\.-]+\.\w{2,}$/) ){
      alert("半角英数字と -_@ のみで正しく入力してください");
     }
    }   
   //番地入力チェック
    function addcheck(){
    var addr = document.frm.addr.value;
   // 半角と全角の0-9まで  
    if(!addr.match(/[0-9０-９]/) ){
    return false;
      }else{
      	return true;
       } 
      }//関数内のreturnは呼び出し元に戻り値をかえして終了する

   //カタカナチェック
    function kanacheck(){
    var kana = document.frm.kana.value;
    
    if(!kana.match(/^[ァ-ン]+$/) ){
    alert("フリガナは全角カタカナで");
      }
    }
  
   function kanacheck(){
    var name_kana = document.frm.kana.value;
    
    if(!name_kana.match(/^[ァ-ン]+$/) ){
    return false;
      }else{
      	return true;
      }
    }
  
   //エンターキーで次のページに飛ばないようにする  
    document.onkeypress = enter;
    function enter(){
        if( window.event.keyCode == 13 ){
            return false;
        }
    }
 */   
//さらにjQueryで書き換えると以下のようになる
const tax = 1.08; //実行の過程で値が変わらないものは const(定数)と定義しておく
var rykn_array = [5000,6000,10500,12000]; //配列 array インデックスは自動的に0からふられる
var checkFlag = 0; //どこかにエラーがあれば1を代入
//必須項目を配列にする
//var getCheck = {"num":$('#num'),"tel":$('#tel'),"email":$('#email'),"addr":$('#addr'),"name_kana":$('#name_kana')};
var getCheck = [$('#num'), $('#tel'), $('#email'), $('#addr'), $('#name_kana')];    
   
 /* テスト  
  $('#sub').click(function(){ //送信ボタンのクリックイベント
          for( var i in getCheck ){ //配列をループして,取り出したキーをiに代入する
           //未入力の場合だけ色をつけたいので...
          if(getCheck[i].val()==""){
            getCheck[i].css('background-color','#ecc');	
           }	
         }
       }); */


$('#lunch').click(function(){  //ランチをクリック
  $('#time_lunch').show(800);$('#time_dinner').hide(500);
});
$('#dinner').click(function(){  //ディナーをクリック
  $('#time_dinner').show(800);$('#time_lunch').hide(500);
});


$('#num').change(function(){
  num = $('#num').val();
  if( !num.match( /^[0-9]+$/ ) ||  num >10 || num < 1 ){
     alert("半角数字で1~10で入力してください");
     $(this).css('background-color','#ecc').focus();
     $checkFlag=1; //エラーを持っている
  }else{
     $(this).css('background-color','#fff');
     $checkFlag=0; //エラーなし
   } 
 });


$('#total_chk').click( function(){
//選択されたセレクトメニューの値を取得
  //まず,ランチがチェックされていたらtrueを返す.ランチの合計を計算
  if( $('#lunch').prop('checked') ){
     var menu = 
    $('select[name="course_lunch"] option:selected').val();
 //または,ディナーがチェックされていたら  
  } else if( $('#dinner').prop('checked') ){
     var menu = 
    $('select[name="course_dinner"] option:selected').val();
 //または,どっちも選んでない場合   
  } else{
    alert("ランチかディナーを選択してください"); 
    }
   
   $('#total_price').val( (rykn_array[menu] * num * tax ).toLocaleString());  //合計して値を表示
 });
 
 
//電話・eメール・住所入力
     //電話番号チェック
     $('#tel').change(function(){
     	var tel = $('#tel').val();
     	// 対応形式「-」なしの6～11桁、「-」ありの時は13桁以下であるか否か
      if(!tel.match(/^[0-9-]{6,11}$|^[0-9-]{13}$/) ){
      alert("半角数字と-のみで入力してください");
      $(this).css('background-color','#ecc').focus();
        $checkFlag=1;
     }else{
      $(this).css('background-color','#fff');
     	$checkFlag=0;
      }
       });
 
     
    //eメールチェック
    $('#email').change(function(){
     var email = $('#email').val();
     // @前は「英数字_-」使用可、@後ひとつ以上の「.」があるか、「.」の後に2文字以上英数字が入っているか否か
     if(!email.match(/^[\w_-]+@[\w\.-]+\.\w{2,}$/) ){
      alert("半角英数字と -_@ のみで正しく入力してください");
      $(this).css('background-color','#ecc').focus();
        $checkFlag=1;
     }else{
      $(this).css('background-color','#fff');
     	$checkFlag=0;
      }
    });
 
     
   //番地入力チェック  //最終チェックも兼ねている
    //上にある → var getCheck = [$('#num'), $('#tel'), $('#email'), $('#addr'), $('#name_kana')]; 
    function addcheck(){
       //var addr = $('#addr').val();
       for( var i in getCheck ){ //配列をループして,取り出したキーをiに代入する
        //未入力の場合だけ色をつけたいので...
        if(getCheck[i].val()==""){
          getCheck[i].css('background-color','#ecc');	
           return false; //送信させない
       }else{ 
       	//入力されていたら,数字なのか,カタカナなのかなどをチェック
      	   if($checkFlag==1){
      	      return false; //送信させない
          }else{
           if(i==3){	 
           	// 半角と全角の0-9まで  
             if(!$('#addr').val().match(/[0-9０-９]/) ){
               $('#addr').css('background-color','#ecc').focus(); 
                 alert('番地まで入力してください');
                 return false; //送信させない
            }else{
               $('#addr').css('background-color','#fff').focus();
      	       } 
             } //番地チェックの終わり
           } //値チェックの終わり
         } //未入力チェックの終わり
       } //End for
      return true; //送信する	
    }; //End Function
   


   //カタカナチェック
  $('#kana').change(function(){
   	var kana = $('#kana').val();
   	if(!kana.match(/^[ァ-ン]+$/) ){
    alert("フリガナは全角カタカナで");    
    $(this).css('background-color','#ecc').focus();
       $checkFlag=1;
   }else{
    $(this).css('background-color','#fff');
       $checkFlag=0;
      }
     });
   
   //名前カタカナチェック
    $('#name_kana').change(function(){
      var name_kana = $('#name_kana').val();
      if(!name_kana.match(/^[ァ-ン]+$/) ){
      alert("フリガナは全角カタカナで");
      $(this).css('background-color','#ecc').focus();
        $checkFlag=1;
     }else{
      $(this).css('background-color','#fff');
        $checkFlag=0;
      }
     });
  
   //エンターキーで次のページに飛ばないようにする  
    document.onkeypress = enter;
    function enter(){
        if( window.event.keyCode == 13 ){
            return false;
        }
    } 
  