import React from 'react'
import {useNavigate} from "react-router-dom"
import "./Login.css";

const Login = ({setAuthenticate}) => {
    
    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    const goToHome = (e) => {
        e.preventDefault(); // 새로고침 방지?
        setAuthenticate(true); // 인증 성공을 true로 바꿈
        navigate("/")
    }

    const goToJoin = (e) => {
        e.preventDefault();
        navigate("/Join")
    }

  return (
    <div className='login'>
        <div className='login-form'>
        <h2>로그인</h2>
            <form>
                <div className='login-input'>
                    <p>이메일</p>
                    <input type='text' placeholder='이메일을 입력해주세요.' className='emailId'/> <br/>
                    <p>비밀번호</p>
                    <input type='password' placeholder='비밀번호를 입력해주세요.' className='pw'/>
                </div>
                <div className='btn'>
                    <label className='check'>
                    <input type='checkbox'/>
                    <span>이메일 저장하기</span>
                    </label>
                    <input type='submit'
                    className='login-button'
                    value="로그인"
                    onClick={goToHome}/> <br/> <hr/>
                    <div className='join-us'>
                    <p>가입이 필요하신가요?</p>
                    <input type='submit'
                    className='join-button'
                    value="회원가입"
                    onClick={goToJoin}/>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login