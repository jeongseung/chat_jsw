import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCalculatorUtils } from '../utils/calculatorHooks'

const {
    formatNumber,
    formatWon,
    parseNumber,
    formatPercent
} = useCalculatorUtils()

const CalculatorHistory = ({ onSelectHistory }) => {
    
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchHistory = async () => {

            
            try {
                const token = localStorage.getItem('token')
                setLoading(true);
                setError(null)

                const response = await axios.get('http://localhost:8090/gloring/cal', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setHistory(response.data)
            
            } catch(err) {
                setError('계산 이력을 불러오는 중 오류가 발생했습니다.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    if (loading) return <div>불러오는 중...</div>
    if (error) return <div>{error}</div>


  return (
    <>
    <h2>계산 내역</h2>
    <hr/>
    <table className="result-table">
    <thead>
        <tr>
        <th>계산 일자</th>
        <th>상품명</th>
        <th>매입액</th>
        <th>매출액</th>
        <th>순이익</th>
        <th>이익률</th>
        </tr>
    </thead>
    <tbody>
    {history.map((item,idx)=>(
    <tr key={idx} onClick={() => onSelectHistory(item)}>
        <td>{item.saveDate}</td>
        <td>{item.productName}</td>
        <td>{formatWon(item.purchaseAmount)}</td>
        <td>{formatWon(item.netSales)}</td>
        <td>{formatWon(item.profit)}</td>
        <td>{formatPercent(item.revenueRate)}</td>
    </tr>
    ))}
    </tbody>
    </table>
    </>
  )
}

export default CalculatorHistory