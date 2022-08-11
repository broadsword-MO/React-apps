import { useState } from 'react';

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');
    const [num, setNum] = useState(''); // Mine, added 2022-08-09, Tue

    const ops = ['/', '*', '+', '-'];
    // const dec = '.';

    // Mine, added 2022-07-26, Tue
    function evaluate(string) {
        return new Function('return ' + string)();
    }
    // added 6:24PM Aug 10, 2022
    // Round to 6 decimal places
    function round(num) {
        return +(Math.round(num + 'e+6') + 'e-6');
    }

    // Mine, added 2022-08-09, Tue
    const decUse = (dec) => {
        if (num.toString().includes(dec)) {
            return; // Do nothing
        }
        if (calc === '') {
            setCalc(0 + dec); // Add a zero before decimal
        }
        if (num === '') {
            setNum(0 + dec); // Add a zero before decimal
            setCalc(calc + 0 + dec); // Ditto
        } else {
            setNum(num + dec);
            setCalc(calc + dec);
            setResult(evaluate(calc + dec).toString());
        }
    };

    // Mine, added 2022-08-09, Tue
    const updateNum = (value) => {
        if (num === '' && value === '0') {
            // todo Edge case for max digits needed
            return;
        }
        setNum(num + value);
        setCalc(calc + value);
        setResult(evaluate(calc + value).toString());
    };

    const updateOper = (op) => {
        if (
            calc === '' || // Display is empty
            (calc.slice(-1) === '-' && op === '-')
        ) {
            // Already have one minus operator
            return; // Do nothing
        }
        if (ops.includes(calc.slice(-1)) && op !== '-') {
            // Just used another operator, replace
            return setCalc(calc.slice(0, -1) + op);
        }

        setCalc(calc + op);
        setNum(''); // Mine
    };

    const equals = () => {
        if (result.includes('e') || calc.includes('e')) {
            setCalc(evaluate(calc).toString());
        } else {
            setCalc(round(evaluate(calc)).toString());
        }
        setNum(calc);
        setResult('');
    };

    const allClear = () => {
        if (calc === '') {
            return;
        }
        // setCalc(calc.slice(0, -1)); // For CE
        setCalc(''); // Clears all
        setResult('');
        setNum('');
    };

    const createDigits = () => {
        const digits = [];
        for (let i = 9; i >= 0; i--)
            digits.push(
                <button onClick={() => updateNum(i.toString())} key={i}>
                    {i}
                </button>
            );
        return digits;
    };

    // var eve = "";
    // const keyHandler = (event) => {
    //     eve = event.toString();
    //     return eve;
    // }

    return (
        <div className="App">
            <div>
                num = {num}; calc = {calc}; result = {result};
            </div>
            {/* <div onKeyDown={keyHandler}>event = {eve}</div> */}
            <div className="calculator">
                <div className="display">
                    {result ? <div className="preview">({result})</div> : ''}{' '}
                    {calc || '0'}
                </div>
                <div className="operators">
                    <button onClick={() => updateOper('/')}>/</button>
                    <button onClick={() => updateOper('*')}>x</button>
                    <button onClick={() => updateOper('+')}>+</button>
                    <button onClick={() => updateOper('-')}>-</button>

                    <button onClick={allClear}>AC</button>
                </div>
                <div className="numbers">
                    {createDigits()}
                    <button onClick={() => decUse('.')}>.</button>
                    <button
                        className="equals"
                        // onKeyDown={keyHandler}
                        onClick={equals}
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
