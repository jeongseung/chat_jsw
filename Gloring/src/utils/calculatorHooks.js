  export const useCalculatorUtils = () => {
      const formatNumber = (num) => {
        if (num === undefined || num === null || num === '') return '';
        const number = typeof num === 'string' ? parseInt(num.replace(/,/g, ''), 10) : num;
        if (isNaN(number)) return '';
        return number.toLocaleString();
      };
      
      const formatWon = (num) => {
        const formatted = formatNumber(num);
        return formatted ? `${formatted}원` : '';
      }
    
      const parseNumber = (value) => {
      if (!value) return 0;
      return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
      };
    
      const formatPercent = (num) => {
        const number = parseFloat(num);
          if (isNaN(number)) return '';
          return `${Math.round(number)}%`;
      };  

      return {
        formatNumber,
        formatWon,
        parseNumber,
        formatPercent,
      }
  }
