$(document).ready(function() {
    // When Connected to a Mobile Device
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.innerHTML = '';

        swal({
            icon: 'error',
            title: '잠시만요!',
            text: '아마 모바일 기기로 접속한 것 같아요. 죄송하지만, 이 사이트는 모바일 기기를 지원하지 않아요.',
            button: false,
            closeOnClickOutside: false
        });
    }

    const deleteButtons = document.getElementsByClassName('mod-delete');

    for (let element of deleteButtons) {
        element.addEventListener('click', deleteMod);
    }
});

// Mod Search
function modSearch() {
    input = document.getElementById('search');
    filter = input.value.toUpperCase();

    modArticles = document.getElementById("articles");
    modList = modArticles.getElementsByClassName('mod');

    for (i = 0; i < modList.length; i++) {
        const modTitle = modList[i].getElementsByClassName("mod-title")[0];
        const txtValue = modTitle.innerText;

        if (input.value === "") {
            modTitle.innerHTML = txtValue;
            modList[i].style.display = "";
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            const startPosition = txtValue.toUpperCase().indexOf(filter);
            const endPosition = txtValue.toUpperCase().indexOf(filter) + input.value.length;

            const searched = txtValue.substring(startPosition, endPosition);
            const left = txtValue.substring(0, startPosition);
            const right = txtValue.substring(endPosition, txtValue.length);

            modTitle.innerHTML = `${left}<span class="searched">${searched}</span>${right}`;

            modList[i].style.display = "";
        } else {
            modList[i].style.display = "none";
        }
    }
}

function openAddModSection() {
    const addModSection = document.getElementById("add-mod-section");
    const addModForm = document.getElementById("add-mod-form");

    addModForm.classList.toggle("hide");
    addModSection.classList.toggle("on-open");
}

// Click "Delete Mod Button" Event Handler
function deleteMod(event) {
    swal({
        icon: 'warning',
        title: '잠시만요!',
        text: '정말 이 모드를 삭제할까요? 이 작업은 되돌릴 수 없어요!',
        buttons: ['취소', '이해했고, 진행합니다'],
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            swal({
                icon: 'warning',
                title: '정말 삭제할까요?',
                text: '마지막 확인이에요. 삭제 버튼을 누르면 당신이 지우려는 모드의 모든 정보가 삭제돼요.',
                buttons: ['취소', '알겠으니 그냥 지워요!'],
                dangerMode: true
            }).then((willDelete) => {
                if (willDelete) {
                    $.post("manage/delete", {
                        id: event.target.parentElement.parentElement.parentElement.id
                    });

                    location.reload();
                }
            });
        }
    });
}