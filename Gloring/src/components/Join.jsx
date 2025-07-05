import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./Join.css";

const Join = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  // 입력 상태 관리
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [isSelfInput, setIsSelfInput] = useState(true);

  // 이메일 중복체크 관련 상태
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  
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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 이메일 중복체크 버튼 클릭 시
  const handleEmailCheck = () => {
    const fullEmail = `${emailId}@${emailDomain}`;
    if (!emailId || !emailDomain) {
      setEmailCheckMessage('이메일을 모두 입력해주세요.');
      setIsEmailChecked(false);
      return;
    }
    if (!validateEmail(fullEmail)) {
      setEmailCheckMessage('올바른 이메일 형식이 아닙니다.');
      setIsEmailChecked(false);
      return;
    }
    // 예시 중복 이메일 리스트 (실제 서비스에서는 서버에서 체크)
    const existingEmails = ['test@naver.com', 'hello@gmail.com'];
    if (existingEmails.includes(fullEmail)) {
      setEmailCheckMessage('이미 사용 중인 이메일입니다.');
      setIsEmailChecked(false);
    } else {
      setEmailCheckMessage('사용 가능한 이메일입니다!');
      setIsEmailChecked(true);
    }
  };

  // 회원가입 제출
  const goToLogin = (e) => {
    e.preventDefault();
    if (!isEmailChecked) {
      setEmailCheckMessage('이메일 중복체크를 해주세요.');
      return;
    }

    const userData = {
      name: name,
      pw: password,
      emailId: emailId,
      email: emailDomain
    };

    setCookie('user', JSON.stringify(userData), { path: '/', maxAge: 86400 });
    // 실제 회원가입 로직 (API 호출 등) 추가
    console.log("회원가입 정보:", {
      name,
      password,
      email: `${emailId}@${emailDomain}`
    });
    navigate("/Login");
  };

  return (
    <div className='join'>
      <div className='join-from'>
        <h2>회원가입</h2>
        <form onSubmit={goToLogin}>
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
