import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import "./Login.css";

const Login = ({setIsLoggedIn}) => {
    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    // 입력 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberEmail, setRememberEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    // 초기 이메일 자동 입력
    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail")
        if (savedEmail) {
            setEmail(savedEmail)
            setRememberEmail(true)
        }
    }, []) 

    const handleRememberEmailChange = (e) => {
        const checked = e.target.checked
        setRememberEmail(checked)

        if (!checked) {
            localStorage.removeItem("savedEmail")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8090/gloring/auth/login", {
            email: email,
            password: password
            });

            //로그인 성공 시 토큰 저장
            localStorage.setItem('token', response.data.accessToken)

            if (rememberEmail) {
                localStorage.setItem('savedEmail', email)
            } else {
                localStorage.removeItem('savedEmail')
            }
            setIsLoggedIn(true);
            setErrorMsg('')
            navigate('/')
        } catch (error) {
            // 로그인 실패 처리
            setErrorMsg('로그인 실패: 이메일 또는 비밀번호를 확인해주세요')
            console.error("로그인 실패:", error.response?.data || error.message);
        }
    };

    const goToJoin = (e) => {
        e.preventDefault();
        navigate("/Join")
    }

    return (
    <div className='login'>
        <div className='login-form'>
        <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div className='login-input'>
                    <p>이메일</p>
                    <input type='text' placeholder='이메일을 입력해주세요.' className='emailId'
                    value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
                    <p>비밀번호</p>
                    <input type='password' placeholder='비밀번호를 입력해주세요.' className='pw'
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <div className='btn'>
                    <label className='check'>
                    <input 
                        type='checkbox'
                        checked={rememberEmail}
                        onChange={handleRememberEmailChange}/>
                    <span>이메일 저장하기</span>
                    </label>
                    <input type='submit'
                    className='login-button'
                    value="로그인"
                    />
                    <br/> <hr/>
                    <div className='join-us'>
                    <p>가입이 필요하신가요?</p>
                    <button className='join-button' onClick={goToJoin}>회원가입</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login