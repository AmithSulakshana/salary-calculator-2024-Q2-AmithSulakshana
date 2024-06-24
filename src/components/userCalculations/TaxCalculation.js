
const TaxCalculation = (monthlyIncome) =>{
    if (monthlyIncome <= 100000) {
        return 0;
    } else if (monthlyIncome <= 141667) {
        return (monthlyIncome * 0.06) - 6000;
    } else if (monthlyIncome <= 183333) {
        return (monthlyIncome * 0.12) - 14500;
    } else if (monthlyIncome <= 225000) {
        return (monthlyIncome * 0.18) - 25500;
    } else if (monthlyIncome <= 266667) {
        return (monthlyIncome * 0.24) - 39000;
    } else if (monthlyIncome <= 308333) {
        return (monthlyIncome * 0.30) - 55000;
    } else {
        return (monthlyIncome * 0.36) - 73500;
    }

}

export default TaxCalculation;