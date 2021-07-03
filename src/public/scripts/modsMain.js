// Script for modsMain.ejs

$(document).ready(function() {
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

function openDownloadSelect(supportVersion, downloadLink) {
    const supportVersionArray = JSON.parse(supportVersion);
    const downloadLinkArray = JSON.parse(downloadLink);
    let swalButtons = {};

    for (let i = 0; i < supportVersionArray.length; i++) {
        let _obj = {};
        _obj[i] = 'r' + supportVersionArray[i]

        swalButtons = Object.assign(_obj, swalButtons);
    }

    swal("이 모드는 여러 버전을 지원해요. 자신이 사용하고 있는 게임의 버전에 맞춰 다운로드 해 주세요.", {
        buttons: swalButtons
    }).then((resultNum) => {
        open(downloadLinkArray[resultNum]);
    });
}

function logoutButtonOver() {
    $('#username')[0].innerText = '로그아웃 하기';
}

function logoutButtonOut() {
    $('#username')[0].innerText = window.discordName;
}