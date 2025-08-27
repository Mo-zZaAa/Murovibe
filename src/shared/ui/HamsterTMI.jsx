import React, { useState, useEffect } from 'react';
import './HamsterTMI.css';

const hamsterTMIs = [
  "오늘 따릉이 잠금 비번 까먹어서 안장에 앉아 헴-헴-헴-헴 리듬으로 숫자 추리했어요!!!!!",
  "편의점 알바하다가 진열을 컬러그레이딩처럼 맞춰놓고 브랜드 아이덴티티 회복 완!!!!!",
  "알뜰교통카드로 환승 성공해서 조직 재무에 +1 포인트!!!!!",
  "회식에서 술 한 잔만 마시고 내 몸은 무기다!!!!! 근데 내 간이 먼저 항복했네...",
  "비 오는 날 역까지 우산 쓰고 따릉이 끌바로 이동!!!!! 지각은 있어도 조직에 대한 결석은 없다 헴!!!!!",
  "네이버지도 즐겨찾기에 편의점, 프린트 가게, 문서철 집게 파는 문구점까지 완벽 북마크!!!!!",
  "오늘도 조직을 위해 1만보 뛰었습니다!!!!! (사실 지하철 환승하다 찍힌 거)",
  "카카오페이 송금 메모에 조직 발전기금!!!!! (커피값 보내면서도ㅋㅋ)",
  "싸움 나면 말은 센데 정작 야 잠깐만, 나 안경 벗고 해야 돼 → 안경 벗자 앞이 안 보여서 벽에 부딪힘ㅋㅋ",
  "따릉이 차크라 킥 시전하려다가 페달에서 발 미끄러져서 실패!!!!!"
];

const HamsterTMI = ({ isVisible = false }) => {
  const [currentTMI, setCurrentTMI] = useState('');

  useEffect(() => {
    if (isVisible) {
      const randomTMI = hamsterTMIs[Math.floor(Math.random() * hamsterTMIs.length)];
      setCurrentTMI(randomTMI);
    }
  }, [isVisible]);

  if (!isVisible || !currentTMI) return null;

  return (
    <div className="hamster-tmi">
      <div className="hamster-tmi__content">
        <span className="hamster-tmi__icon">🐹</span>
        <span className="hamster-tmi__text">{currentTMI}</span>
      </div>
    </div>
  );
};

export default HamsterTMI;
