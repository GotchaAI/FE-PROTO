/**
 * 플레이어들이 그린 그림 데이터
 * 라운드 별 각각 하나씩 존재함
 */

import hammer from "assets/drawing.png";
import nangjang from "assets/nangjang.png";
import cat from "assets/cat.png";
import dog from "assets/dog.png";
import heart from "assets/heart.png";
import star from "assets/star.png";

const picturesData = {
    pictures: {
        1: {
            player1: hammer,
            player2: nangjang
        },
        2: {
            player1: cat,
            player2: dog
        },
        3: {
            player1: heart,
            player2: star
        }
    }
};

export default picturesData;