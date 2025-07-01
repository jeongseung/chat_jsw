import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Join.css";

const Join = () => {
  const navigate = useNavigate();

  // 각 입력 필드를 위한 state
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');

  // ⭐️⭐️⭐️ 이메일 도메인 기본값 및 직접 입력 모드 초기화 ⭐️⭐️⭐️
  const [emailDomain, setEmailDomain] = useState('self'); // 기본값을 'self'로 설정
  const [isSelfInput, setIsSelfInput] = useState(true);   // isSelfInput을 true로 초기화

  const DomainChange = (e) => {
    const value = e.target.value;
    if (value === 'self') {
      setIsSelfInput(true); // 직접 입력 모드 활성화
      setEmailDomain(''); // 직접 입력 시 도메인 필드 초기화 (사용자가 입력하게)
    } else {
      setIsSelfInput(false); // 선택 모드 활성화
      setEmailDomain(value); // 선택된 도메인으로 설정
    }
  }
  
  const goToLogin = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(새로고침) 방지

    console.log("회원가입 정보:", {
        name,
        id,
        password,
        email: `${emailId}@${emailDomain}`
    });

    // 실제 회원가입 로직 (API 호출 등)은 여기에 추가
    navigate("/Login"); // 로그인 페이지로 이동
  }

  return (
    <div className='join'>
      {/* 폼 전체를 감싸는 컨테이너 */}
      <div className='join-from'>
        <h2>회원가입</h2> {/* 이미지처럼 H2가 폼 안에 위치 */}
        <form onSubmit={goToLogin}>
          {/* 이름 입력 그룹 */}
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

          {/* 아이디 입력 그룹 */}
          <div className='join-input-group'>
            <p>아이디</p>
            <input 
              type='text' 
              placeholder='아이디를 입력해주세요' 
              name='id'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 그룹 */}
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

          {/* 이메일 입력 그룹 */}
          <div className='join-input-group'>
            <p>이메일</p>
            <div className='join-email-group'>
              <input 
                type='text' 
                placeholder='이메일 아이디'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <span>@</span> {/* @ 기호를 span으로 감싸서 CSS 적용 */}
              <input 
                type='text' 
                value={isSelfInput ? '' : emailDomain} // isSelfInput이 true면 빈 문자열, 아니면 emailDomain 값
                placeholder='직접 입력'
                onChange={(e) => isSelfInput && setEmailDomain(e.target.value)}
                readOnly={!isSelfInput}
              />
            </div>
            <select onChange={DomainChange} value={emailDomain}>
              <option value="">선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
              <option value="self">직접 입력</option>
            </select>
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
  )
}

export default Join