import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './Carousel.css'; // Carousel CSS 파일 임포트

// 양쪽으로 보이는 최대 카드 개수 (중앙 카드 제외)
// MAX_VISIBILITY가 1이면 중앙 카드 + 양쪽 1개씩 = 총 3개 카드가 보입니다.
const MAX_VISIBILITY = 1;

export default function Carousel({ children, activeIndex, onSetActive }) {
    // const [active, setActive] = useState(0); // 0부터 시작하는 인덱스로 변경
    const count = React.Children.count(children);

    const active = activeIndex

    return (
        <div className="carousel">
            {/* 왼쪽 네비게이션 버튼 */}
            {active > 0 && (
                <button className="navbar left" onClick={() => onSetActive(active - 1)}>
                    <TiChevronLeftOutline />
                </button>
            )}

            {/* 카드 맵핑 */}
            {React.Children.map(children, (child, i) => {
                const offset = i - active; // 중앙 카드를 기준으로 상대적인 위치 계산
                const absOffset = Math.abs(offset);

                // 중앙 카드: scale(1.3), translateZ(50px), zIndex 높게
                // 양옆 카드: scale(0.9), translateZ(-20px), rotateY(약간), zIndex 중간
                // 그 외 카드: scale(0.7), translateZ(-100px), opacity 0, pointerEvents none

                let transformValue = '';
                let zIndexValue = 1;
                let opacityValue = 0; // 기본적으로 안 보이게
                let pointerEventsValue = 'none'; // 기본적으로 클릭 불가

                if (absOffset <= MAX_VISIBILITY) { // 보이는 범위 내의 카드
                    if (offset === 0) { // 중앙 카드 (active 카드)
                        transformValue = 'scale(1.1) translateZ(50px)';
                        zIndexValue = 3;
                        opacityValue = 1;
                        pointerEventsValue = 'auto';
                    } else if (offset === -1) { // 왼쪽 옆 카드
                        transformValue = 'translateX(-80%) scale(0.9) translateZ(-20px) rotateY(3deg)'; // 왼쪽으로 이동, 겹침, 회전
                        zIndexValue = 2;
                        opacityValue = 0.8;
                        pointerEventsValue = 'auto';
                    } else if (offset === 1) { // 오른쪽 옆 카드
                        transformValue = 'translateX(80%) scale(0.9) translateZ(-20px) rotateY(-3deg)'; // 오른쪽으로 이동, 겹침, 회전
                        zIndexValue = 2;
                        opacityValue = 0.8;
                        pointerEventsValue = 'auto';
                    } else { // MAX_VISIBILITY 범위 내의 더 멀리 있는 카드 (예: offset이 2, -2 등)
                        // 여기서는 MAX_VISIBILITY가 1이므로 이 else문은 실행되지 않음
                        // 필요하다면 더 멀리 있는 카드들에 대한 스타일을 정의할 수 있습니다.
                        transformValue = `translateX(${offset * 100}%) scale(${1 - 0.1 * absOffset}) translateZ(${absOffset * -20}px)`;
                        zIndexValue = 1;
                        opacityValue = 0.5;
                        pointerEventsValue = 'none';
                    }
                } else { // MAX_VISIBILITY 밖의 카드들은 완전히 숨김
                    transformValue = `translateX(${offset > 0 ? '200%' : '-200%'}) scale(0.7) translateZ(-100px)`; // 화면 밖으로 보내기
                    zIndexValue = 0;
                    opacityValue = 0;
                    pointerEventsValue = 'none';
                }

                return (
                    <div
                        key={i}
                        className={`card-container ${offset === 0 ? 'active' : ''}`}
                        style={{
                            '--offset': offset,
                            '--abs-offset': absOffset,
                            transform: transformValue,
                            zIndex: zIndexValue,
                            opacity: opacityValue,
                            pointerEvents: pointerEventsValue,
                            display: absOffset > MAX_VISIBILITY + 1 ? 'none' : 'block' // MAX_VISIBILITY보다 +1 더 넓게 설정하여 부드러운 전환
                        }}
                    >
                        {child}
                    </div>
                );
            })}

            {/* 오른쪽 네비게이션 버튼 */}
            {active < count - 1 && (
                <button className="navbar right" onClick={() => onSetActive(active + 1)}>
                    <TiChevronRightOutline />
                </button>
            )}
        </div>
    );
}