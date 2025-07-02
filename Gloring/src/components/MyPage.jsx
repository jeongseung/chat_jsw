import React from "react";
import "./MyPage.css";
import {useNavigate} from 'react-router-dom';

const MyPage = () => {

    const navigate = useNavigate();

    // 예시 사용자 정보
    const userInfo = {
        name: "강윤지",
        email: "nuyoo387@gmail.com",
    };

    const goToHome = (e) => {
        e.preventDefault(); // 새로고침 방지?
        navigate("/")
    }

    return (
        <div className="mypage-container">
        <h2>마이페이지</h2>

        <section className="user-info">
        <h3>내 정보</h3>
        <p><strong>이름:</strong> {userInfo.name}</p>
        <p><strong>이메일:</strong> {userInfo.email}</p>
        </section>

        <section className="calculator-data">
        <h3>계산 내역</h3>
        <ul>
            <li>순이익 : 000원</li>
            <li>순이익 : 000원</li>
        </ul>
        </section>

        <section className="settings">
        <h3>설정</h3>
        <button onClick={goToHome}>로그아웃</button>
        </section>
    </div>
    );
};

export default MyPage;