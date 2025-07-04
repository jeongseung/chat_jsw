import React, { useEffect, useState } from 'react'

export default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState("up")
    const [lastScrollY, setLastScrollY] = useState(0)

    const handleScroll = () => {
        // 현재 스크롤 위치 가져오기
        const currentScrollY = window.scrollY

        // 스크롤을 아래로 내렸고 (현재 위치 > 이전 위치)
        // 스크롤 위치가 0보다 클 때만 'down'으로 설정 (맨 위에서 시작하자마자 내려가는 것 제외)
        // 'down' 상태가 아니면 (즉, 'up'이거나 처음 시작) 'down'으로 변경
        if (currentScrollY > lastScrollY && currentScrollY > 0 && scrollDirection !== 'down') {
            setScrollDirection('down')
        }

        // 스크롤을 위로 올렸고 (현재 위치 < 이전 위치)
        // 'up'상태가 아니면 'up'으로 변경
        else if (currentScrollY < lastScrollY && scrollDirection !== 'up') {
            setScrollDirection('up')
        }

        setLastScrollY(currentScrollY);
    }

    useEffect(() => {
        // scroll 이벤트 발생 시 handleScroll 함수 실행
        window.addEventListener('scroll', handleScroll)


        // 컴포넌트가 언마운트 될 때 이벤트 리스너 정리
        // 메모리 누수를 방지하고 불필요한 실행 방지
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY, scrollDirection]) //lastScrollY 와 scrollDirection이 변경될 때마다 이펙트 실행

    return scrollDirection
}
