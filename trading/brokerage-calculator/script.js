function calculateBrokerage() {
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const totalLots = parseInt(document.getElementById('totalLots').value);
    const lotSize = parseInt(document.getElementById('lotSize').value);
    const platformChargePerLot = parseFloat(document.getElementById('platformChargePerLot').value);

    const totalQuantity = totalLots * lotSize;
    
    const sttRate = 0.0625 / 100;
    const exchangeTransactionRate = 0.05 / 100;
    const gstRate = 18 / 100;
    const sebiFeeRate = 10 / 10000000;
    const stampDutyRate = 0.003 / 100;

    const platformCharge = platformChargePerLot * totalLots;
    const sellValue = sellPrice * totalQuantity;
    const buyValue = buyPrice * totalQuantity;
    const turnover = sellValue + buyValue;
    const sttCharge = totalQuantity * sttRate * sellPrice;
    const exchangeTransactionCharges = turnover * exchangeTransactionRate;
    const totalBrokerage = platformCharge + exchangeTransactionCharges;
    const gst = totalBrokerage * gstRate;
    const sebiFees = turnover * sebiFeeRate;
    const stampDuty = buyPrice * totalQuantity * stampDutyRate;
    const totalCharges = platformCharge + sttCharge + exchangeTransactionCharges + gst + sebiFees + stampDuty;

    const netProfitLoss = sellValue - buyValue - totalCharges;
    const profitLossWithoutCharges = sellValue - buyValue;

    const profitLossLabel = document.getElementById('profitLossLabel');
    const totalChargesLabel = document.getElementById('totalChargesLabel');
    const netProfitLossLabel = document.getElementById('netProfitLossLabel');
    const profitLossValueElt = document.getElementById('profitLossValue');

    profitLossLabel.innerText = `${profitLossWithoutCharges >= 0 ? 'Profit Without Charges' : 'Loss Without Charges'}: ${profitLossWithoutCharges.toFixed(2)}`;
    profitLossLabel.className = profitLossWithoutCharges >= 0 ? 'profit' : 'loss';

    profitLossValueElt.innerText = `Profit or Loss: ${netProfitLoss >= 0 ? 'Profit' : 'Loss'}`;
    profitLossLabel.className = netProfitLoss >= 0 ? 'profit' : 'loss';

    totalChargesLabel.innerText = `Total Charges: ${totalCharges.toFixed(2)}`;

    netProfitLossLabel.innerText = `Net Profit or Loss: ${netProfitLoss.toFixed(2)}`;
    netProfitLossLabel.className = netProfitLoss >= 0 ? 'profit' : 'loss';

    document.getElementById('right-section').style.display = 'block';
}