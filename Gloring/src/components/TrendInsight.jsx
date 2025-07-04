import React from 'react'

const TrendInsight = () => {
  return (
    <>
        <div>트렌드 인사이트</div>
        <div className='search-filter'>
            <form>
                <select name='category'>
                    <option>패션의류</option>
                    <option>패션잡화</option>
                    <option>화장품/미용</option>
                    <option>디지털/가전</option>
                    <option>가구/인테리어</option>
                    <option>출산/육아</option>
                    <option>식품</option>
                    <option>스포츠/레저</option>
                    <option>생활/건강</option>
                </select>
                <select name='period'>
                    <option>일간</option> 
                    <option>주간</option>
                    <option>월간</option>
                </select>
            </form>
        </div> 
        <div className='card-section'>
            <div className='slider'>
                <div className='card'>
                </div>
            </div>
        </div>
    </>
    )
    
}

export default TrendInsight