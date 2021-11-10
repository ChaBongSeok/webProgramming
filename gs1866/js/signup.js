const signup = async () => {
    const userEmail = document.getElementById("userEmail").value; //유저 Email 겸 아이디
    const userPwd = document.getElementById("userPwd").value; //유저 비밀번호
    const userName = document.getElementById("userName").value; //유저 이름
    const userGender = document.getElementById("userGender").value; //유저 성별
    const userBirth = document.getElementById("userBirth").value; //유저 생일

    if (userEmail && userPwd && userName) { //필수 정보가 있는 경우
      try {
        const response = await axios.post("../php/signup.php", {
            userEmail: userEmail,
            userPwd: userPwd,
            userName: userName,
            userGender: userGender,
            userBirth: userBirth,
        });
        if (response.data) {
          console.log(response.data);
          alert("회원가입에 성공하였습니다.");
          location.href="../index.html";
        } else {
          console.log("입력 실패");
          alert("이미 있는 아이디입니다.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("필수정보를 입력해주세요.");
    }
  };