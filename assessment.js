'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) { //result-area に、なにかタグがある限りループ
        element.removeChild(element.firstChild);
    }

}
/**
 * 診断処理を実行して、指定した要素に結果を表示する。
 * @param {HTMLElement} element HTMLの要素
 */

function createAssessmentResult(element) {
    // result-area に h3 タグで"診断結果"という文字を表示
    const h3 = document.createElement('h3') // h3 タグを作る
    h3.innerText = '診断結果'; // h3 タグに診断結果の文字列を設定
    element.appendChild(h3) // result-area に h3 変数を設定
}
assessmentButton.onclick = function () {
    let userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前の入力がなかった場合は処理を終了する
        return;
    }

    // すでにある診断結果を削除
    removeAllChildren(resultDivided);

    // 診断結果の表示
    createAssessmentResult(resultDivided);
    // 診断処理を実行
    const result = assessment(userName);

   // tweet ボタンの表示
   // a タグを作って属性を設定する
    removeAllChildren(tweetDivided)
    const a = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';
    a.setAttribute ('href', hrefValue);
    a.setAttribute ('class','twitter-hashtag-button');
    a.setAttribute ('data-text' , result);
    a.innerText = 'Tweet #あなたのいいところ'
    // a タグをHTML に追加する
    tweetDivided.appendChild(a);

    // script タグを作る
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);


   
    // result-area に p タグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    resultDivided.appendChild(p);

}
userNameInput.onkeydown = event => {
    if(event.key === 'Enter') {
        assessmentButton.onclick();
    }
}
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string}　診断結果
 */
function assessment(userName) {
    // userName （文字列）を数値 （漢字だと5桁）に変換
    //　すべての文字を足し算する
    var userNameNumber = 0;
    for (let i = 0; i < userName.length; i++) {
        // userName （文字列）を数値 （漢字だと5桁）に変換  
        userNameNumber += userName.charCodeAt(i);
    }

    //回答結果の範囲（0～15）
    var answerNumber = userNameNumber % answers.length;
    //診断結果
    var result = answers[answerNumber];
    result.replace(/\{userName\}/g, userName); //置換
    return result.replace(/\{userName\}/g, userName); //置換; //診断結果

}
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'

);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
