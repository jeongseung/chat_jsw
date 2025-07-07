import React from 'react'
import "./SocialLoginButtons.css"
import kakaoIcon from "../assets/kakao_login_medium_narrow.png"
import googleIcon from "../assets/googleIcon.png"

const SocialLoginButtons = () => {

    const KAKAO_AUTH_URL = "http://43.201.67.86:8090/gloring/oauth2/authorization/kakao";
    const GOOGLE_AUTH_URL = "http://43.201.67.86:8090/gloring/oauth2/authorization/google";

    return (
        <div className="social-login-container">
            <a
                className="social-button google"
                href={GOOGLE_AUTH_URL}
            >
                <i className="fab fa-google"></i>
                <span>구글로 로그인</span>
            </a>
            <a
                className="social-button kakao"
                href={KAKAO_AUTH_URL}
            >
                <i className="fab fa-korvue"></i>
                <span>카카오톡으로 로그인</span>
            </a>
        </div>
    )
}

export default SocialLoginButtons