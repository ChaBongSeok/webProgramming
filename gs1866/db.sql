-- DATABASE name = web_project

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userEmail` TEXT NOT NULL,
    `userPwd` TEXT NOT NULL,
    `userName` TEXT NOT NULL,
    `userGender` TEXT,
    `userBirth` TEXT
);

INSERT INTO `user` 
(`userEmail`, `userPwd`, `userName`, `userGender`, `userBirth`)
VALUES 
('test001@gmail.com', '111111', 'test01', '남성', '650230'),
('test002@gmail.com', '222222', 'test02', '남성', '720105'),
('test003@gmail.com', '333333', 'test03', '남성', '850525'),
('test004@naver.com', '444444', 'test04', '여성', '000505'),
('test005@naver.com', '555555', 'test05', '여성', '950215'),
('test006@daum.net', '666666', 'test06', '남성', '990125'),
('test007@daum.net', '777777', 'test07', '남성', '850525');