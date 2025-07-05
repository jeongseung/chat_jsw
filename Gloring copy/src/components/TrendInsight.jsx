import React from 'react'

const TrendInsight = () => {
  return (
    <>
        <div>트렌드 인사이트</div>
        <div className='search-filter'>
            <form>
                <select name='period'>
                    <option>일간</option>
                    <option>주간</option>
                    <option>월간</option>
                </select>
            </form>
        </div> 
    </>
    )
    
}

export default TrendInsight