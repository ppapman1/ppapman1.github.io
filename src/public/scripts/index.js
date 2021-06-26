$(document).ready(function() {
    // When Connected to a Mobile Device
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.innerHTML = '';

        swal({
            icon: 'error',
            title: '잠시만요!',
            text: '아마 모바일 기기로 접속한 것 같아요. 데스크톱 버전의 A Dance of Fire and Ice에만 모드를 적용할 수 있어요.',
            button: false,
            closeOnClickOutside: false
        });

    }

    if ($('#username')[0]) {
        window.discordName = $('#username')[0].innerText;
    }
});

// Mod Search
function modSearch() {
    input = document.getElementById('search');
    filter = input.value.toUpperCase();

    modArticles = document.getElementById("articles");
    modList = modArticles.getElementsByClassName('mod');

    // If Search Mode is Find by Mod Title
    if ($('#title-mode')[0].checked) {
        for (i = 0; i < modList.length; i++) {
            let modFeature = modList[i].getElementsByClassName("mod-feature")[0];
            let modTitle = modList[i].getElementsByClassName("mod-name")[0];
            let txtValue = modTitle.innerText;

            modFeature.innerHTML = modFeature.innerText;

            if (input.value === "") {
                modTitle.innerHTML = txtValue;
                modList[i].style.display = "";
            } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
                let startPosition = txtValue.toUpperCase().indexOf(filter);
                let endPosition = txtValue.toUpperCase().indexOf(filter) + input.value.length;

                let searched = txtValue.substring(startPosition, endPosition);
                let left = txtValue.substring(0, startPosition);
                let right = txtValue.substring(endPosition, txtValue.length);

                modTitle.innerHTML = `${left}<span class="searched">${searched}</span>${right}`;

                modList[i].style.display = "";
            } else {
                modList[i].style.display = "none";
            }
        }
        // If Search Mode is Find by Mod Feature
    } else {
        for (i = 0; i < modList.length; i++) {
            let modFeature = modList[i].getElementsByClassName("mod-feature")[0];
            let modTitle = modList[i].getElementsByClassName("mod-name")[0];
            let txtValue = modFeature.innerText;

            modTitle.innerHTML = modTitle.innerText;

            if (input.value === "") {
                modFeature.innerHTML = txtValue;
                modList[i].style.display = "";
            } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
                let startPosition = txtValue.toUpperCase().indexOf(filter);
                let endPosition = txtValue.toUpperCase().indexOf(filter) + input.value.length;

                let searched = txtValue.substring(startPosition, endPosition);
                let left = txtValue.substring(0, startPosition);
                let right = txtValue.substring(endPosition, txtValue.length);

                modFeature.innerHTML = `${left}<span class="searched white">${searched}</span>${right}`;

                modList[i].style.display = "";
            } else {
                modList[i].style.display = "none";
            }
        }
    }
}

function changePlaceholder() {
    searchBar = document.getElementById("search")
    if ($('#title-mode')[0].checked) {
        searchBar.placeholder = '찾고픈 모드의 이름을 검색해보세요';
    } else {
        searchBar.placeholder = '찾고픈 모드의 기능을 검색해보세요';
    }
}

function logoutButtonOver() {
    $('#username')[0].innerText = '로그아웃 하기';
}

function logoutButtonOut() {
    $('#username')[0].innerText = window.discordName;
}
// __________________ NOT IMPLEMENTED YET __________________ // 

// const utils = {
//     isReady: false,

//     /**
//      * Get raw values from database to append them in your frontend
//      */
//     ConnectDB() {
//         // Do something
//     },

//     /**
//      * Append recieved data into frontend
//      * @param {*} data data to read
//      */
//     AppendData(data) {
//         if (data && utils.isReady) {
//             var articlesObject = document.getElementById("articles");

//             // Do Something
//         }
//     }
// }

// document.addEventListener("DOMContentLoaded", function() { 
//     utils.isReady = true;

//     // This is a ready event
//     // Try getting the mod data from database and then post it into main page
// });