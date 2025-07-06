import { useEffect } from 'react';

const useCalculatorLogic = ({
  exRate, purchase, transport, subCost, tariff,
  vat, sales, transportCost, adCost, platForm,
  subFee, cost, onResultChange
}) => {
  useEffect(() => {
    const exchangeRate = parseFloat(exRate) || 0;
    const buy = parseFloat(purchase) || 0;
    const delivery = parseFloat(transport) || 0;
    const etcCost = parseFloat(subCost) || 0;
    const tariffRate = (parseFloat(tariff) || 0) / 100;
    const vatRate = (parseFloat(vat) || 0) / 100;

    const sale = parseFloat(sales) || 0;
    const shipping = parseFloat(transportCost) || 0;
    const marketing = parseFloat(adCost) || 0;
    const platformFeeRate = (parseFloat(platForm?.toString().replace('%', '')) || 0) / 100;
    const otherFee = parseFloat(subFee) || 0;
    const otherCost = parseFloat(cost) || 0;

    const baseKRW = buy + delivery;
    const tariffAmount = baseKRW * tariffRate;
    const baseCost = baseKRW + tariffAmount;
    const vatAmount = baseCost * vatRate;
    const totalPurchaseCost = baseCost + vatAmount + etcCost;
    const platformFeeAmount = sale * platformFeeRate;
    const fee = platformFeeAmount + otherFee;
    const totalSales = sale - shipping - marketing - fee - otherCost;
    const benefit = totalSales - totalPurchaseCost;
    const margin = totalPurchaseCost > 0 ? (benefit / totalPurchaseCost) * 100 : 0;

    onResultChange({
      buy: Math.round(buy),
      tariffAmount,
      baseCost,
      vatAmount,
      totalPurchaseCost,
      totalSales,
      fee,
      benefit: Math.round(benefit),
      margin: Math.round(margin * 100) / 100
    });
  }, [
    exRate, purchase, transport, subCost, tariff, vat,
    sales, transportCost, adCost, platForm, subFee,
    cost, onResultChange
  ]);
};

export default useCalculatorLogic;