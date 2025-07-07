import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Join.css";
import axios from 'axios';

const Join = () => {
  const navigate = useNavigate();

  // 입력 상태 관리
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [isSelfInput, setIsSelfInput] = useState(true);

  const email = `${emailId}@${emailDomain}`;

  // 이메일 중복체크 관련 상태
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  
  const handleSignup = async (e) => {
  e.preventDefault();

  if(!isEmailChecked) {
    setEmailCheckMessage('이메일 중복체크를 해주세요')
    return;
  }

  try {
    const response = await axios.post(`http://localhost:8090/gloring/auth/signup`, {
      name,
      password,
      email
    });

    console.log("회원가입 성공:", response.data);

    navigate("/Login")

  } catch (error) {

    console.error("회원가입 실패:", error);
    alert("회원가입 중 오류가 발생했습니다.")

  }
};
  
  // 이메일 도메인 선택/직접입력 핸들러
  const DomainChange = (e) => {
    const value = e.target.value;
    if (value === 'self') {
      setIsSelfInput(true);
      setEmailDomain('');
    } else {
      setIsSelfInput(false);
      setEmailDomain(value);
    }
  };

  // 이메일 형식 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 중복체크 버튼 클릭 시
  const handleEmailCheck = async() => {
    if (!validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.")
      return
    }

    try {
      const response = await axios.post("http://localhost:8090/gloring/users/check-email", {
        email: email
      })

      if (response.data.duplicate) {
        alert("이미 사용 중인 이메일입니다.")
        setEmailCheckMessage('사용 불가능한 이메일입니다.')
      } else {
        alert("사용 가능한 이메일입니다!")
        setIsEmailChecked(true)
        setEmailCheckMessage('')
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패: ", error)
      alert("서버 오류로 이메일 확인에 실패했습니다.")
    }
  };

  return (
    <div className='join'>
      <div className='join-from'>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
          {/* 이름 입력 */}
          <div className='join-input-group'>
            <p>이름</p>
            <input 
              type='text' 
              placeholder='이름을 입력해주세요' 
              name='name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          {/* 이메일 입력 + 중복체크 */}
          <div className='join-input-group'>
            <p>이메일</p>
            <div className='join-email-group'>
              <input 
                type='text' 
                placeholder='이메일 아이디'
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setIsEmailChecked(false);
                }}
              />
              <span> @ </span>
              <input 
                type='text' 
                value={isSelfInput ? emailDomain : ''} 
                placeholder='직접 입력'
                onChange={(e) => {
                  if (isSelfInput) {
                    setEmailDomain(e.target.value);
                    setIsEmailChecked(false);
                  }
                }}
                readOnly={!isSelfInput}
              />
            </div>
            <select onChange={DomainChange} value={isSelfInput ? 'self' : emailDomain}>
              <option value="">선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
              <option value="self">직접 입력</option>
            </select>
            {/* 중복체크 메시지 */}
            {emailCheckMessage && (
              <div className="email-check-message">{emailCheckMessage}</div>
            )}
            {/* 이메일 중복체크 버튼 (회원가입 버튼과 동일한 스타일) */}
            <button
              type="button"
              className="join-submit-button email-check-btn"
              onClick={handleEmailCheck}
              style={{ marginTop: '10px' }}
            >
              이메일 중복체크
            </button>
          </div>

          {/* 비밀번호 입력 */}
          <div className='join-input-group'>
            <p>비밀번호</p>
            <input 
              type='password' 
              placeholder='비밀번호를 입력해주세요' 
              name='pw'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 회원가입 버튼 */}
          <input 
            type='submit'
            value="회원가입하기"
            className="join-submit-button"
          />
        </form>
      </div>
    </div>
  );
};

export default Join;
