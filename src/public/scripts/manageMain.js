// Script for manageMain.ejs

$(document).ready(function() {
    // Delete Button of Mod Articles
    const deleteButtons = document.getElementsByClassName('mod-delete');

    for (let element of deleteButtons) {
        element.addEventListener('click', deleteMod);
    }

    // Hide Loading Scene
    hideLoader();

    // Add/Remove Input Fields
    $("#field-add").click(() => {
        const lastField = $("#support-mod-field div:last");
        const intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        const fieldWrapper = $(`<div class="fieldwrapper" id="field${intId}">`);

        fieldWrapper.data("idx", intId);

        const versionInput = $(
            `<input type="text" class="fieldname version-field"
            id="version${intId}" name="supportversion[${intId}]" pattern="(\\d{2,3})(\\s(\\d{2,3}))*"
            title="지원하는 게임의 버전을 r을 빼고 적어주세요. 두 개 이상이라면 띄어쓰기로 나누어 주세요. (예시: 71 또는 68 75)">`
        );

        const downloadLinkInput = $(
            `<input type="text" class="fieldname" 
            id="download${intId}" name="downloadlink[${intId}]" pattern="(http|https|ftp|telnet|news|mms)?:\\/\\/.+"
            title="주소를 입력해 주세요.">`
        );
        const removeButton = $('<input type="button" class="remove" value="지우기">');

        fieldWrapper.append(versionInput);
        fieldWrapper.append(downloadLinkInput);
        fieldWrapper.append(removeButton);

        $("#support-mod-field").append(fieldWrapper);

        removeButton.click(() => {
            $(this).parent().remove();
        });

        $('.version-field').keyup((event) => {
            const target = $("#" + event.target.id);

            if (target.val().includes(' ') === true) {
                target.val(target.val().replace(' ', ''));
            }
        });
    });
});

function hideLoader() {
    const loader = document.getElementById("loading-scene");
    const modArticles = document.getElementById("mod-articles");
    
    modArticles.classList.toggle("hide");
    scroll(0, 0);

    setTimeout(() => {
        loader.classList.toggle("hide-animation");
    }, 550);
}


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

function toggleAddModSection() {
    const modArticles = document.getElementById("mod-articles");
    const addModSection = document.getElementById("add-mod-section");

    modArticles.classList.toggle("hide-animation");
    modArticles.classList.toggle("show-animation");

    addModSection.classList.toggle("hide-animation");
    addModSection.classList.toggle("show-animation");
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