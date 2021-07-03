$(document).ready(function() {
    // When Connected to a Mobile Device
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.innerHTML = '';

        swal({
            icon: 'error',
            title: '잠시만요!',
            text: '아마 모바일 기기로 접속한 것 같아요. 죄송하지만, 이 사이트는 모바일 기기를 지원하지 않아요.',
            button: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        });
    }
});