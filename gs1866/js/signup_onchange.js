//이메일(아이디)이 입력되었는지 확인하는 메소드
const check_email = () => {
    let email = document.getElementById("userEmail");

    if (email.value !== '') {
        document.getElementById('help_email').innerHTML = "";
    } else {
        document.getElementById('help_email').innerHTML = "필수 정보입니다.";
        document.getElementById('help_email').style.color="red";
    }
};

//입력중에 비밀번호와 재확인 번호가 일치하는 지를 확인하는 메소드
const check_pw = () => {
    let pw1 = document.getElementById("userPwd");
    let pw2 = document.getElementById("userPwdch");

    if(pw1.value !== '' && pw2.value !== '') {
        if(pw1.value === pw2.value) {
            document.getElementById('pw_same').innerHTML = "비밀번호가 일치합니다.";
            document.getElementById('pw_same').style.color="green";
            document.getElementById('pwLength').innerHTML = "";
        }
        else {
            document.getElementById('pw_same').innerHTML = "비밀번호가 일치하지 않습니다.";
            document.getElementById('pw_same').style.color="red";
        }
    } else {
        document.getElementById('pw_same').innerHTML = "필수 정보입니다.";
        document.getElementById('pwLength').innerHTML = "필수 정보입니다.";
    }

    if (pw1.value.length < 4 || pw1.value.length > 20) {
        document.getElementById('pwLength').innerHTML = "4~20자내로 사용가능합니다.";
        document.getElementById('pw_same').innerHTML = "다시 입력해주세요.";
    }
};

//이름이 입력되었는지 확인하는 메소드
const check_name = () => {
    let name = document.getElementById("userName");

    if (name.value !== '') {
        document.getElementById('help_name').innerHTML = "";
    } else {
        document.getElementById('help_name').innerHTML = "필수 정보입니다.";
        document.getElementById('help_name').style.color="red";
    }
}
