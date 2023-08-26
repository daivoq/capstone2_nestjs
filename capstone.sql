/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(100) DEFAULT NULL,
  `duong_dan` varchar(250) DEFAULT NULL,
  `mo_ta` varchar(250) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `luu_anh_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` datetime DEFAULT NULL,
  PRIMARY KEY (`luu_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) DEFAULT NULL,
  `mat_khau` varchar(205) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 5, 1, '2023-07-30', 'nhiều lông dữ');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 5, 1, '2023-07-30', ':))');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 2, 1, '2023-07-30', 'trà sửa hay gì vậy');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 2, 10, '2023-07-30', 'ngầu đét'),
(5, 1, 10, '2023-07-30', 'thầy tui'),
(6, 3, 3, '2023-07-30', 'ăn dép không'),
(7, 3, 13, '2023-07-30', 'đi ăn phở nè'),
(8, 4, 13, '2023-07-30', 'chổ cũ nha m'),
(9, 4, 3, '2023-07-30', 'tổ ong hay gì??'),
(10, 4, 17, '2023-07-30', 'siuuu'),
(11, 1, 17, '2023-07-30', 'siuuu'),
(12, 2, 17, '2023-07-30', 'siuuu'),
(13, 3, 17, '2023-07-30', 'siuuu'),
(14, 5, 17, '2023-07-30', 'siuuu');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, '1690726861976_img1-user1.jpg', '/public/img/1690726861976_img1-user1.jpg', NULL, 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, '1690726874755_img2-user1.jpg', '/public/img/1690726874755_img2-user1.jpg', NULL, 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, '1690726888644_img3-user1.jpg', '/public/img/1690726888644_img3-user1.jpg', NULL, 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, '1690726898239_img4-user1.jpg', '/public/img/1690726898239_img4-user1.jpg', NULL, 1),
(5, '1690726982056_img1-user2.jpg', '/public/img/1690726982056_img1-user2.jpg', NULL, 2),
(6, '1690726992579_img2-user2.jpg', '/public/img/1690726992579_img2-user2.jpg', NULL, 2),
(7, '1690727004087_img3-user2.jpg', '/public/img/1690727004087_img3-user2.jpg', NULL, 2),
(8, '1690727014645_img4-user2.jpg', '/public/img/1690727014645_img4-user2.jpg', NULL, 2),
(9, '1690727088502_img1-user3.jpg', '/public/img/1690727088502_img1-user3.jpg', NULL, 3),
(10, '1690727098278_img2-user3.jpg', '/public/img/1690727098278_img2-user3.jpg', NULL, 3),
(11, '1690727109192_img3-user3.jpg', '/public/img/1690727109192_img3-user3.jpg', NULL, 3),
(12, '1690727117895_img4-user3.jpg', '/public/img/1690727117895_img4-user3.jpg', NULL, 3),
(13, '1690727192264_img1-user4.jpg', '/public/img/1690727192264_img1-user4.jpg', NULL, 4),
(14, '1690727200957_img2-user4.jpg', '/public/img/1690727200957_img2-user4.jpg', NULL, 4),
(15, '1690727209562_img3-user4.jpg', '/public/img/1690727209562_img3-user4.jpg', NULL, 4),
(16, '1690727222826_img4-user4.jpg', '/public/img/1690727222826_img4-user4.jpg', NULL, 4),
(17, '1690727306469_img1-user5.jpg', '/public/img/1690727306469_img1-user5.jpg', NULL, 5),
(18, '1690727314462_img2-user5.jpg', '/public/img/1690727314462_img2-user5.jpg', NULL, 5),
(19, '1690727322511_img3-user5.jpg', '/public/img/1690727322511_img3-user5.jpg', NULL, 5),
(20, '1690727329692_img4-user5.jpg', '/public/img/1690727329692_img4-user5.jpg', NULL, 5);

INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 5, 1, '2023-07-30 14:30:11');
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 2, 10, '2023-07-30 14:31:43');
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 1, 5, '2023-07-30 14:32:48');
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 3, 13, '2023-07-30 14:34:26'),
(5, 4, 17, '2023-07-30 14:36:43'),
(6, 1, 17, '2023-07-30 14:37:25'),
(7, 2, 17, '2023-07-30 14:37:55'),
(8, 3, 17, '2023-07-30 14:38:27');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'user1@gmail.com', '$2b$10$yk/Ns/5FE5Tcer9yVOnChefjdMNHuaXinf1lpCeMtFwnJownqFRca', 'user1', 23, '1690726844814_avatar1.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'user2@gmail.com', '$2b$10$R.5HpX2k9UXfwNTJ4EGnLebUjiYWBNtLqc6SqTuNIGTFxcbV9FuKm', 'user2', 23, '1690726961969_avatar2.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'user3@gmail.com', '$2b$10$P59FIBFIsOGHj6eMSv4IBOF4dj2oP6o/gmmUHrRsa3XvqefaL83e6', 'user3', 23, '1690727073645_avatar3.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'user4@gmail.com', '$2b$10$U3PRSHLp/V03hg3Ig4eV6ePBC2UwvaTy4If9iNGy6RCrbFJziUzGW', 'user4', 23, '1690727169801_avatar4.jpg'),
(5, 'user5@gmail.com', '$2b$10$5.dqXe1u7.GUV/89lA2TsuEGKEN8Ds9G.9s3R9bq/drfhyBx98Vza', 'user5', 23, '1690727289976_avatar5.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;