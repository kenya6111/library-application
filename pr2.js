const config = {
    url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
    parentId: "target"
}

// isbnを受け取って、コンソールにその本のデータを表示するlogBookCall関数を作成してください。isbnを受け取った後、名前空間のurlに追加し、fetch関数を使ってデータを取得してください。 

// 本に関するデータが多いので、console.logでデータ構造を確認した後はコメントアウトしましょう。
// 本のタイトル(title)を取得し、コンソールに出力してください。
// 本のurl(url)を取得し、コンソールに出力してください。
// 本のページ数(number_of_pages)を取得し、コンソールに出力してください。

// ここからJavaScriptを記述してください。

const searchbtn = document.getElementById('searchButton');

searchbtn.addEventListener('click' , (event)=>{
    event.preventDefault()
    const isbn = document.getElementById('isbnInput').value;
    logBookCall(isbn);
});

function logBookCall(data){

    const fullurl = config.url +data;
    fetch(fullurl).then(data=> data.json()).then(data => {
        console.log(data);
        // console.log(res['ISBN:0451526538'].url);
        // console.log(res['ISBN:0451526538'].key);
        const parentEle = document.getElementById(config.parentId);
        parentEle.innerHTML = ''; // 既存の内容をクリア
        for(let bookKey  in data){
            let currentBook = data[bookKey];
            let subjects = currentBook.subjects.map(subject => subject.name).join(", ");


            let inputContent=`
                <h4 class="mb-2">results</h4>
                <div class="card header border-color">
                    <div class="card-body">
                        <h5 class="card-title">${currentBook.title}</h5>
                        <h6 class="card-subtitle mb-2 ">${currentBook.authors[0].name}</h6>
                        <p class="card-text">$12.11</p>
                        <p class="card-text">${subjects}</p>
                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item header border-color">Page: ${currentBook.number_of_pages}</li>
                            <li class="list-group-item header border-color">Publisher: ${currentBook.publishers[0].name}</li>
                            <li class="list-group-item header border-color">Published Date: ${currentBook.publish_date}</li>
                            <li class="list-group-item header border-color">Categories: Biography & Autobiography</li>
                        </ul>
                    </div>
                </div>`;
            parentEle.innerHTML=inputContent;

        }

    });

}
