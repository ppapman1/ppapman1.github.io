$(document).ready(function() {
    // When Connected to a Mobile Device
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.innerHTML = '';

        swal({
            icon: 'error',
            title: '잠시만요!',
            text: '아마 모바일 기기로 접속한 것 같아요. 데스크탑 버전의 A Dance of Fire and Ice에만 모드를 적용할 수 있어요.',
            button: false,
            closeOnClickOutside: false
        });

    } else {
        swal({
            icon: 'info',
            title: '잠시만요!',
            text: '이 사이트는 아직 어느 기능도 지원하지 않는 완성되지 않은 상태예요.'
        });
    }
});

// Mod Search
function modSearch() {
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    modArticles = document.getElementById("articles");
    modList = modArticles.getElementsByClassName('mod');

    for (i = 0; i < modList.length; i++) {
        modTitle = modList[i].getElementsByClassName("mod-name")[0];
        txtValue = modTitle.innerHTML;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            modList[i].style.display = "";
        } else {
            modList[i].style.display = "none";
        }
    }
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