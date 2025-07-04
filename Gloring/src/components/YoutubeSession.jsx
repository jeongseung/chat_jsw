// src/YoutubeSession.jsx
import React from "react";
import YouTube from "react-youtube";

const videos = [
  {
    title: "사업자등록, 처음부터 완벽하게",
    description: "해외 사입과 판매를 위한 사업자등록 절차와 필수 준비서류, 실전 노하우까지 체계적으로 안내합니다.",
    videoId: "AX3_E_te0uI",
  },
  {
    title: "수입신고서 작성, 실전 마스터 클래스",
    description: "수입신고서 작성 시 반드시 알아야 할 핵심 항목과 실수 없는 작성 요령을 전문가의 시선으로 정리했습니다.",
    videoId: "sQWjlcfbchw",
  },
  {
    title: "성공적인 판매플랫폼 세팅 전략",
    description: "쿠팡, 스마트스토어 등 주요 이커머스 플랫폼에 상품을 효과적으로 등록하고 운영하는 노하우를 단계별로 소개합니다.",
    videoId: "H-vCk2TJvqo",
  },
];

const youtubeWrapperStyle = {
  position: "relative",
  width: "100%",
  paddingTop: "56.25%",
  marginBottom: 16,
};

function YoutubeSession() {
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: 28,
        fontWeight: 800,
        marginBottom: 32,
        letterSpacing: "-1px"
      }}>
        예비 창업자를 위한 프리미엄 가이드 영상
      </h2>
      <div style={{
        display: 'flex',
        gap: '2%',
        justifyContent: 'center',
        padding: '40px 0'
      }}>
        {videos.map((item, idx) => (
          <div key={idx} style={{
            flex: 1,
            maxWidth: 480,
            background: '#f8fafc',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 260,
          }}>
            <h3 style={{fontSize: 22, fontWeight: 700, marginBottom: 12}}>{item.title}</h3>
            <p style={{fontSize: 17, marginBottom: 16, textAlign: 'center'}}>{item.description}</p>
            <div style={youtubeWrapperStyle}>
              <YouTube
                videoId={item.videoId}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { rel: 0 }
                }}
                iframeClassName="responsive-iframe"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubeSession;
