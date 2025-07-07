import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const OAuthRedirectPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get("token")

        if (token) {
            localStorage.setItem("accessToken", token)
            navigate("/")
        } else {
            alert("로그인 실패")
            navigate("/login")
        }
    }, [location])

    return (
    <div>로그인 처리 중입니다...</div>
  )
}

export default OAuthRedirectPage