window.addEventListener("load", function(event) {
    let textArea = document.getElementById('textArea');
    let butAdd = document.getElementById('butAdd');
    let deleteFirst = document.getElementById('deleteFirst');
    let deleteLast = document.getElementById('deleteLast');
    let list = document.getElementById('list');
// "прив'язка змінних до елементів html"
    loadPlaylist(); // функція, що завантажує дані з локального сховища (функція "описана" вкінці)

    butAdd.addEventListener("click", add) // обробник подій кнопки add за кліком
    function add(){
        // console.log(textArea.value);
        let songName = textArea.value;  // створення змінної і присвоїння їй значення яке вводимо до поля input
        let newElem = document.createElement("li"); // створення змінної в якій створюється новий елемент li
        newElem.innerHTML = songName; // присвоюємо новому елементу li значення, яке було введено в input(songName)
        list.appendChild(newElem); // "місце" куди "вставляємо" новий елемент li (у нашому випадку це <ul id=list>)
        save(songName); // викликаємо функцію для збереження нашого нового елементу, функція описана нижче
        textArea.value = ''
       
}


deleteFirst.addEventListener("click", delit)
function delit(){
    let playlistArray = getStoreArray('playList'); // викликаю масив
    playlistArray.shift();   // видаляю перше значення масиву
    console.log(playlistArray);
    localStorage.setItem('playList', JSON.stringify(playlistArray)); // перезаписую масив
    list.innerHTML = ""; // "очищаю" список щоб не було повтерення з попереднього списку
    loadPlaylist(); // заново завантажую масив зі змінами
}

deleteLast.addEventListener("click", delitBack)
function delitBack(){
    let playlistArray = getStoreArray('playList'); // викликаю масив
    playlistArray.pop();   // видаляю перше значення масиву
    console.log(playlistArray);
    localStorage.setItem('playList', JSON.stringify(playlistArray)); // перезаписую масив
    list.innerHTML = ""; // "очищаю" список щоб не було повтерення з попереднього списку
    loadPlaylist(); // заново завантажую масив зі змінами
}

function save(newSong){      // функція збереження нового елементу в локальному сховищі
        let playlistArray = getStoreArray('playList'); // створення змінної і "викликає" масив'playList' із локального сховища
        playlistArray.push(newSong); // додає значення вкінець масиву
        localStorage.setItem('playList', JSON.stringify(playlistArray)) // встановлює значення ключа та перетворює на рядок
        console.log(playlistArray)
}

function getStoreArray(key) {         // функція отримання масиву за ключем (вподальшому цей ключ буде 'playlist')
    var playlistArray = localStorage.getItem(key);  // створення змінної і отримуємо значення з локального сховища(яке пов'язане з ключем)
    if (playlistArray == null || playlistArray == "") {      // перевірка чи значення є null або пустий рядок
     playlistArray = new Array(); // створюється новий масив при виконанні умови
    }
    else {
     playlistArray = JSON.parse(playlistArray); // якщо умова не виконується парсить значення і присвоює змінній playListArray
    }
    return playlistArray; // повертає значення масиву
   }


function loadPlaylist(){     
    let playListload = getStoreArray('playList'); // викликаємо масив з локального сховища
    for (let i = 0; i<playListload.length; ++i){ // з допомогою лічильника "проходимся" по всьому масиву
    let newElem = document.createElement("li"); // створення змінної в якій створюється новий елемент li
    newElem.innerHTML = playListload[i];  // присвоюємо новому елементу li значення, яке було в масиві
    list.appendChild(newElem); // додаємо значення до ul
    }
}

  });


