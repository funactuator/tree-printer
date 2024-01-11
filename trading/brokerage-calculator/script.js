let darkMode = false;

function toggleMode() {
    darkMode = !darkMode;
    applyMode();
}

function applyMode() {
    const body = document.body;
    const calculatorContainer = document.getElementById('calculator-container');
    const rightSection = document.getElementsByClassName('right-section')[0];
    const elementsWithLabelClass = document.getElementsByClassName('label');
    const elementsWithProfitClass = document.getElementsByClassName('profit');
    const elementsWithLossClass = document.getElementsByClassName('loss');

    if (darkMode) {
        body.style.backgroundColor = '#333';
        calculatorContainer.style.backgroundColor = '#444';
        rightSection.style.backgroundColor = '#030e0f66';
        rightSection.style.color = 'white';
        [...elementsWithLabelClass].forEach((elt) => elt.style.color = '#f9f9f9');
        [...elementsWithProfitClass].forEach((elt) => elt.style.color = '#52da52');
        [...elementsWithLossClass].forEach((elt) => elt.style.color = '#e94964');

    } else {
        body.style.backgroundColor = '#f9f9f9';
        calculatorContainer.style.backgroundColor = '#f1f1f1';
        rightSection.classList.remove('dark-mode');
        rightSection.style.backgroundColor = '#f1f1f1';
        rightSection.style.color = 'black';

        [...elementsWithLabelClass].forEach((elt) => elt.style.color = '#333');
        [...elementsWithProfitClass].forEach((elt) => elt.style.color = 'green');
        [...elementsWithLossClass].forEach((elt) => elt.style.color = 'red');

    }



}


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
    // applyMode();
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
    isProfitValueElt.classList.add(netProfitLoss >= 0 ? 'profit' : 'loss');


    // row 2 (to show Profit or Loss Row Without charges)
    profitLossLabelElt.innerText = profitLossWithoutCharges >= 0 ? 'Profit Without Charges' : 'Loss Without Charges';
    profitLossValueElt.innerText = profitLossWithoutCharges.toFixed(2);
    profitLossValueElt.classList.add(profitLossWithoutCharges >= 0 ? 'profit' : 'loss');

    // row 3 (Total Charges)
    totalChargesValueElt.innerText = totalCharges.toFixed(2);

    //row 4
    netProfitLossLabelElt.innerText = netProfitLoss ? 'Net Profit' : "Net Loss";
    netProfitLossvalueElt.innerText = netProfitLoss.toFixed(2);
    netProfitLossvalueElt.classList.add(netProfitLoss >= 0 ? 'profit' : 'loss');

    document.getElementsByClassName('right-section')[0].style.display = 'block';

}