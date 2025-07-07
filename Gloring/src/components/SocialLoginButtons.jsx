import React from 'react'

const SocialLoginButtons = () => {

    const KAKAO_AUTH_URL = "http://localhost:8090/gloring/oauth2/authorization/kakao";
    const GOOGLE_AUTH_URL = "http://localhost:8090/gloring/oauth2/authorization/google";

  return (
    <div className='social-login-container'>
        <a href={GOOGLE_AUTH_URL} className='social-btn google'>
            Google로 로그인
        </a>
        <a href={KAKAO_AUTH_URL} className='social-btn kakao'>
            카카오 로그인
        </a>
    </div>
  )
}

export default SocialLoginButtons