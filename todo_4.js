const outDisp = document.getElementById('out-disp');                                                               //タスク出力ノード取得
const filter = document.getElementsByName('filter');                                                               //ラジオノード取得
function displayTodos(task) {                                                                                      //画面表示用関数定義
  const createRows = outDisp.insertRow();                                                                           //新規テーブル行作成
  const createIdCells = createRows.insertCell();                                                                    //新規セル作成-ID列
  const createCommentCells = createRows.insertCell();                                                               //新規セル作成-コメント列
  const createStatusCells = createRows.insertCell();                                                                //新規セル作成-状態列

  const workBtn = document.createElement('input');                                                                  //初期画面表示ボタン作成-作業中
  workBtn.type = 'button';
  workBtn.style.margin = '0 0.25em 0 0';                                                                            //ボタン間の間隔調整
  workBtn.value = task[task.length - 1].status;                                                                     //初期値代入

  const deleteBtn = document.createElement('input');                                                                //初期画面表示ボタン作成-削除
  deleteBtn.type = 'button';
  deleteBtn.style.margin = '0 0 0.25em 0';                                                                          //ボタン間の間隔調整
  deleteBtn.value = '削除';                                                                                         //初期値代入

  createIdCells.innerHTML = outDisp.rows.length - 2;                                                                //画面出力-ID列
  createCommentCells.innerHTML = task[task.length - 1].task;                                                        //画面出力-コメント列
  createStatusCells.appendChild(workBtn);                                                                           //画面出力-状態列
  createStatusCells.appendChild(deleteBtn);                                                                         //画面出力-状態列

  for (var filVal = "", filLen = filter.length; filLen--;){                                                         //以下ラジオボタン-完了の場合の処理
    if (filter[filLen].checked) {                                                                                    //チェックされているラジオボタンを取得
      var filVal = filter[filLen].value;                                                                              //ラジオボタンの値を取得
      break;
    }
  }
  if(filVal === 'finish') {                                                                                         //ラジオボタンが完了の場合
    workBtn.parentNode.parentNode.style.display = 'none';                                                            //追加行は非表示
  };

  workBtn.addEventListener('click', function() {                                                                    //作業中ボタン押下時処理
    if(workBtn.value === '作業中') {                                                                                 //タスク状態＝作業中
      workBtn.value = '完了';                                                                                         //タスク状態変更-完了
    } 
    else {                                                                                                           //タスク状態≠作業中
      workBtn.value ='作業中';                                                                                        //タスク状態変更変更-作業中
    }
  });

  deleteBtn.addEventListener('click', function() {                                                                  //削除ボタン押下時処理
    this.parentNode.parentNode.remove();                                                                             //削除ボタン押下行削除
    renum = 0;                                                                                                       //再採番初期値取得
    for(let idRowCount = 1, rowLen = outDisp.rows.length; idRowCount < rowLen; idRowCount++ ) {                      //ID列の既存追加タスク行分処理
      outDisp.rows[idRowCount].cells[0].innerHTML = renum;                                                            //再採番処理
      renum++;
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  filter.forEach(function(e) {                                                                                       //フィルタリング処理
    e.addEventListener('change', function(){
      const workFil = document.getElementById('work');                                                                 //ラジオボタンノード取得-作業中
      if(workFil.checked) {                                                                                            //以下、作業中チェック状態の処理
        for (let statusRowCount = 1, rowLen = outDisp.rows.length; statusRowCount < rowLen; statusRowCount++) {
          const statusColumn = outDisp.rows[statusRowCount].cells[2];                                                   //状態列取得
          if(statusColumn.firstElementChild.value === '完了') {                                                         //状態列値-完了：非表示
            statusColumn.parentNode.style.display = 'none';                                  
          }
          else {                                                                                                        //状態列値-完了以外：表示
            statusColumn.parentNode.style.display = '';
          }
        }
      }
      const finFil = document.getElementById('finish');                                                                //ラジオボタンノード取得-完了
      if(finFil.checked) {                                                                                             //以下、完了チャック状態の処理
        for (let statusRowCount = 1, rowLen = outDisp.rows.length; statusRowCount < rowLen; statusRowCount++) {
          const statusColumn = outDisp.rows[statusRowCount].cells[2];                                                   //状態列取得
          if(statusColumn.firstElementChild.value === '作業中') {                                                       //状態列値-作業中：非表示
            statusColumn.parentNode.style.display = 'none';
          }
          else {                                                                                                        //状態列値-作業中以外：表示
          statusColumn.parentNode.style.display = '';
          }
        }
      }
      const allFil = document.getElementById('all');
      if(all.checked) {                                                                                                //以下、全てチェック状態の処理
        for (let statusRowCount = 1, rowLen = outDisp.rows.length; statusRowCount < rowLen; statusRowCount++) {
          const statusRowColumn = outDisp.rows[statusRowCount].cells[2];                                                //状態列値取得
          statusRowColumn.parentNode.style.display = '';                                                                //全てを表示
        }
      }
    });
  });
  const todos = [];                                                                                                  //タスクリスト管理用配列宣言
  document.getElementById('push-task').addEventListener('click', function() {                                        //以下追加ボタン押下時処理
  const getTask = document.getElementById('get-task');                                                               //タスク入力ノード取得
  let todo = {                                                                                                       //タスク取得様オブジェクト宣言
    task: getTask.value,                                                                                              //タスク入力値取得
    status: '作業中'                                                                                                  //状態初期値取得
  }
  todos.push(todo);                                                                                                  //タスクリストへ追加
  displayTodos(todos);                                                                                               //画面表示用関数実行
  getTask.value = '';                                                                                                //画面タスク入力値クリア
  });
});


