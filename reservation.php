<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<title>reservation</title>
	<link rel="stylesheet" href="message.css" />
	<link rel="stylesheet" href="nav.css" rel="stylesheet" type="text/css" /> <!-- type="text/css" や末尾の "/" はHTML5では省略可 --> 
	<link rel="stylesheet" href="sub_layout.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="reservation.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="./jquery.datetimepicker.css"/>
    <link rel="shortcut icon" href="images/favicon.png" />
    <script src="http://ajaxzip3.github.io/ajaxzip3.js"></script> <!-- 郵便番号 -->
</head>

<body>
 <div id="container">
	
    <?php include 'nav.html'; ?>
    
	<div id="contents">
	<h1>Reservation</h1>
	<h2>ご予約フォーム</h2>
	
   <form name="frm" action="" method="GET">
	
	  ■カレンダーよりご希望日を選択してください<br/>
	  <input type="text" name="yyk_dhms" id="yyk_dhms" placeholder="ご予約日" size="24" autocomplete="off" onchange="checkForm();"> 
	  <br/>
	  ■ご希望の時間、コースを選択してください<br/>
	  <input type="radio" name="kibo" id="lunch" onclick="dp_lunch();">
      <label for="lunch">ランチ</label>
      <input type="radio" name="kibo" id="dinner" onclick="dp_dinner();">
      <label for="dinner">ディナー</label>

      <!-- ↓消えている -->
      <div class="none" id="time_lunch">
      <select >
         <option>ご希望の時間</option>
        <option>11:30(ランチ)</option>
        <option>12:30(ランチ)</option>
      </select>
      <select name="course_lunch">
         <option>ご希望のコース</option>
         <option value="0">美食の歓びコース &yen;5,000</option>
         <option value="1">至福の午餐会コース &yen;6,000</option>
       </select>
      </div> 
      
      <!-- ↓消えている -->
      <div class="none" id="time_dinner">
      <select >
         <option>ご希望の時間</option>
         <option>17:30(ディナー)</option>
         <option>18:00(ディナー)</option>
      </select> 
      <select name="course_dinner">
         <option>ご希望のコース</option>
         <option value="2">ムニュKAGURA ～神楽～ &yen;10,500</option>
         <option value="3">大塚スペシャルディナー &yen;12,000</option>
      </select>
      </div>
      <br/>
      ■人数をご入力の上、合計金額をご確認ください<br/>
      <input type="num" id="num" name="num" placeholder="1-10" size="2" onchange="numCheck()">名様

      <input type="button" id="total_chk" value="税込合計">
      <input type="num" name="total_price" id="total_price"> 円
      <br/>
      ■代表者様のご連絡先をご入力ください<br />
      <label>電話番号 </label> 
      <input type="text" name="tel" id="tel" placeholder="000-0000-0000" >
      <br/>
      <label>メールアドレス</label>
      <input type="text" name="email" id="email" placeholder="osteria@ost.com" ><br />
      
      <label>郵便番号</label>
      <input type="text" name="zip1" maxlength="3" > - 
      <input type="text" name="zip2" maxlength="4" onchange="AjaxZip3.zip2addr('zip1','zip2','pref','city','addr');"><br>
      <label>都道府県</label>
      <input type="text" name="pref" maxlength="4">
      <label>市町村区</label>
      <input type="text" name="city"><br>
      <label>以降の住所と番地</label><br>

      <input type="text" name="addr" id="addr" size=60 <!-- onchange="addcheck() -->;">
      <!-- ↑　番地までの数字が含まれているかは、「送信ボタン」を押したタイミングでチェックするしかない。onchangeではイベントキャッチに問題あるということ。 -->
      <br />
      <input type="text" id="kana" name="kana" placeholder="フリガナ" size=60 onchange="kanacheck();">
      <br />

              お名前<br/>
      <input type="text" name="name" placeholder="例）伊太利亜　太郎" size="20" />
      <input type="text" id="name_kana" name="name_kana" placeholder="例）イタリア タロウ" size="20" />
      <br />
	
      ■特別なご要望がありましたらご記入ください。<br />
      <textarea name="message" rows="6" cols="50">
	  </textarea><br />

	  <input type="reset" value="リセット" />
	
	  <input type="button" value="確認" >
	  <input type="button"  onclick="addcheck()?submit():alert('入力に不備があります');" value="送信" /> 
                          <!-- id="sub"  テスト用 -->
   </form>
	

</div>
</div>

<!-- スクリプトのように重いものは下(bodyの上あたり)に置く 。順番も大事! -->

<!-- 日時選択 -->
<script src="./jquery.js"></script>   <!-- 1番め。  "./" は自分の同じフォルダ。なくてもよい。 -->                                      
<script scr="formval.js"></script> <!-- scriptをまるっとformval.jsファイルを作って切り取り貼り付け -->
<script src="./jquery.datetimepicker.js"></script>   <!-- 2番め -->
<script>
    $('#datetimepicker_dark').datetimepicker({theme:'dark'})

    //yyk_dhmsが主語(オブジェクト 物) = inputボックス
    //
	$('#yyk_dhms').datetimepicker({
        lang:'ja', //言語:日本語
        format:'Y/m/d',
		minDate : '-1970/01/01', 
		maxDate : '+1970/01/31',
		timepicker:false,
		allowTimes : ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'],
		//step : 30
	}); //スクリプトのカンマは、値と値をつないでいる
</script>	

<!-- 日時選択 -->
<script src="./jquery.js"></script>   <!-- 1番め。  "./" は自分の同じフォルダ。なくてもよい。 -->                                      
<script src="formval.js"></script>
<script src="./jquery.datetimepicker.js"></script>   <!-- 2番め -->
<script>
    $('#datetimepicker_dark').datetimepicker({theme:'dark'})

    //yyk_dhmsが主語(オブジェクト 物) = inputボックス
    //
	$('#yyk_dhms').datetimepicker({
        lang:'ja', //言語:日本語
        format:'Y/m/d',
		minDate : '-1970/01/01', 
		maxDate : '+1970/01/31',
		timepicker:false,
		allowTimes : ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'],
		//step : 30
	}); //スクリプトのカンマは、値と値をつないでいる
</script>	

</body>
</html>
