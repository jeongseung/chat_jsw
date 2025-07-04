import React from 'react'
import { useEffect } from 'react'

const CalculatorLogic = ({
    exRate, purchase, transport, subCost, tariff,
    vat, sales, transportCost, adCost, platForm,
    subFee, cost, onResultChange
}) => {
    useEffect(()=> {
        // 숫자로 변환
        // const exchange = parseFloat(exRate) || 0;
        const buy = parseFloat(purchase) || 0;
        const delivery = parseFloat(transport) || 0;
        const etcCost = parseFloat(subCost) || 0; // 매입 기타 비용
        const tariffRate = (parseFloat(tariff) || 0) / 100;
        const vatRate = (parseFloat(vat)|| 0) / 100;

        const sale = parseFloat(sales) || 0;
        const shipping = parseFloat(transportCost) || 0;
        const marketing = parseFloat(adCost) || 0;
        const platformFeeRate = (parseFloat(platForm?.toString().replace('%', '')) || 0) / 100;
        const otherFee = parseFloat(subFee) || 0;
        const otherCost = parseFloat(cost) || 0; // 매출 기타 비용

        // 계산식
        // 관세
        // const tariffAmount = (exchange * buy) * tariffRate;
        const tariffAmount = buy * tariffRate;
        // 관세 포함 원가 + 기타 비용 (운송비 등)
        // const baseCost = (exchange * buy) + tariffAmount + delivery + etcCost;
        const baseCost = buy + tariffAmount + delivery + etcCost;
        // 부가세
        const vatAmount = baseCost * vatRate;
        // 매입 시 발생한 비용
        const totalPurchaseCost = baseCost + vatAmount;
        // 판매 플랫폼 수수료
        const platformFeeAmount = sales * platformFeeRate;
        // 총 수수료
        const fee = platformFeeAmount + otherFee;
        // 매출 시 발생할 수익
        const totalSales = 
        sale - shipping - marketing - fee - otherCost;
        // 순이익
        const benefit = totalSales - totalPurchaseCost;
        // 마진율
        const margin = totalPurchaseCost > 0 ? (benefit / totalPurchaseCost) * 100 : 0;

        // 결과 전달
        onResultChange({
            tariffAmount,
            baseCost,
            vatAmount,
            totalPurchaseCost,
            totalSales,
            fee,
            benefit: Math.round(benefit),
            margin: Math.round(margin * 100) / 100 // 소수점 두자리
        }); 
    }, [
        exRate, purchase, transport, subCost, tariff, vat,
        sales, transportCost, adCost, platForm, subFee, 
        cost, onResultChange
    ]);

    // 렌더링 안함
    return null;

};

export default CalculatorLogic