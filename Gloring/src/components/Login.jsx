import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom"
import "./Login.css";

const Login = ({setAuthenticate, setIsLoggedIn}) => {
    const [cookies] = useCookies(['user']); // 쿠키에서 user 읽기
    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    // 입력 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await new Promise((r)=> setTimeout(r, 1000));

        try {
        const response = await axios.post("로그인 서버 주소", {
        email,
        password,
        });

        const result = response.data;

        // 로그인 성공 처리
        setLoginCheck(false);
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("email", result.email);
        sessionStorage.setItem("role", result.role);
        sessionStorage.setItem("storeid", result.storeId);

        console.log("로그인 성공, 이메일 주소: " + result.email);
        navigate("/");
        } catch (error) {
        // 로그인 실패 처리
        setLoginCheck(true);
        console.error("로그인 실패:", error.response?.data || error.message);
        }
    };

    const goToHome = (e) => {
        e.preventDefault(); // 새로고침 방지?
        let userData = null;
        
        if (cookies.user) {
            try {
                userData = typeof cookies.user === 'string' ? JSON.parse(cookies.user) : cookies.user;
            } catch {
                userData = cookies.user;
            }
        }

        if (!userData) {
            setErrorMsg('회원가입 정보가 없습니다.');
            return;
        }

        const fullEmail = `${userData.emailId}@${userData.email}`;
        if (email === fullEmail && password === userData.pw) {
            setAuthenticate(true);
            setIsLoggedIn(true);
            console.log("로그인 성공! isLoggedIn:", true);
            navigate('/');
        } else {
        setErrorMsg('이메일 또는 비밀번호가 일치하지 않습니다.');
        }    
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
                    <input type='text' placeholder='이메일을 입력해주세요.' className='emailId'
                    value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
                    <p>비밀번호</p>
                    <input type='password' placeholder='비밀번호를 입력해주세요.' className='pw'
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <div className='btn'>
                    <label className='check'>
                    <input type='checkbox'/>
                    <span>이메일 저장하기</span>
                    </label>
                    <input type='submit'
                    className='login-button'
                    value="로그인"
                    onClick={goToHome}
                    />
                    <br/> <hr/>
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