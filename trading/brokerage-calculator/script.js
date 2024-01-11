function calculateBrokerage() {
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const totalLots = parseInt(document.getElementById('totalLots').value);
    const lotSize = parseInt(document.getElementById('lotSize').value);

    const totalQuantity = totalLots * lotSize;

    const platformChargePerLot = 40;
    const sttRate = 0.0625 / 100;
    const exchangeTransactionRate = 0.05 / 100;
    const gstRate = 18 / 100;
    const sebiFeeRate = 10 / 10000000;
    const stampDutyRate = 0.003 / 100;

    const platformCharge = platformChargePerLot * totalLots;
    const turnover = (sellPrice * totalQuantity) + (buyPrice * totalQuantity);
    const sttCharge = totalQuantity * sttRate * sellPrice;
    const exchangeTransactionCharges = turnover * exchangeTransactionRate;
    const totalBrokerage = platformCharge + exchangeTransactionCharges;
    const gst = totalBrokerage * gstRate;
    const sebiFees = turnover * sebiFeeRate;
    const stampDuty = buyPrice * totalQuantity * stampDutyRate;
    const totalCharges = platformCharge + sttCharge + exchangeTransactionCharges + gst + sebiFees + stampDuty;

    document.getElementById('result').innerText = `Total charges for ${totalQuantity} units: ${totalCharges.toFixed(2)}`;
}