-- DATABASE name = web_project

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userEmail` TEXT NOT NULL,
    `userPwd` TEXT NOT NULL,
    `userName` TEXT NOT NULL,
    `userGender` TEXT,
    `userBirth` TEXT
);

-- 해쉬 때문에 직접 insert한 계정으로는 로그인을 할 수 없습니다.
-- 회원가입으로 만든 계정으로 로그인하시면 됩니다.
INSERT INTO `user` 
(`userEmail`, `userPwd`, `userName`, `userGender`, `userBirth`)
VALUES 
('test000@gmail.com', '111111', 'test000', '남성', '650230');
