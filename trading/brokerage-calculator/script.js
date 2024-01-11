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

    //row 1
    const isProfitValueElt = document.getElementById('isProfitValue');

    // row 2
    const profitLossLabelElt = document.getElementById('profitLossLabel');
    const profitLossValueElt = document.getElementById('profitLossValue');

    // row 3
    const totalChargesValueElt = document.getElementById('totalChargesValue');

    // row 4
    const netProfitLossLabelElt = document.getElementById('netProfitLossLabel');
    const netProfitLossvalueElt = document.getElementById('netProfitLossValue');

    // row 1 (To show is it profit or loss)
    isProfitValueElt.innerText = netProfitLoss >= 0 ? 'Profit' : 'Loss';
    isProfitValueElt.className = netProfitLoss >= 0 ? 'profit' : 'loss';


    // row 2 (to show Profit or Loss Row Without charges)
    profitLossLabelElt.innerText = profitLossWithoutCharges >= 0 ? 'Profit Without Charges' : 'Loss Without Charges';
    profitLossValueElt.innerText = profitLossWithoutCharges.toFixed(2);
    profitLossValueElt.className = profitLossWithoutCharges >= 0 ? 'profit' : 'loss';

    // row 3 (Total Charges)
    totalChargesValueElt.innerText = totalCharges.toFixed(2);

    //row 4
    netProfitLossLabelElt.innerText = netProfitLoss ? 'Net Profit' : "Net Loss";
    netProfitLossvalueElt.innerText = netProfitLoss.toFixed(2);
    netProfitLossvalueElt.className = netProfitLoss >= 0 ? 'profit' : 'loss';

    document.getElementById('right-section').style.display = 'block';

}