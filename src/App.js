import { useState } from 'react';

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');
    const [num, setNum] = useState(''); // Mine, added 2022-08-09, Tue

    const ops = ['/', '*', '+', '-'];
    const dec = '.';

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
    // todo Rewrite param
    const decUse = (value) => {
        if (num.toString().includes(dec)) {
            return; // Do nothing
        }
        if (calc === '') {
            setCalc(0 + value);
        }
        if (num === '') {
            setNum(0 + value);
            setCalc(calc + 0 + value); // ?
        } else {
            setNum(num + value);
            setCalc(calc + value);
            setResult(evaluate(calc + value).toString());
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

        if (!ops.includes(op)) { // ?
            setResult(evaluate(calc + op).toString());
        }
    };

    const equals = () => {
        setNum(calc);
        setCalc(round(evaluate(calc)).toString());
        setResult('');
    };

    const deleteAll = () => {
        if (calc === '') {
            return;
        }
        // setCalc(calc.slice(0, -1)); // For CE
        setCalc(calc.slice(0, 0)); // Clears all
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

    return (
        <div className="App">
            {/* <p>num = {num};</p>
            <p>calc = {calc};</p>
            <p>result = {result};</p> */}
            <div className="calculator">
                <div className="display">
                    {result ? <span>({result})</span> : ''} {calc || '0'}
                </div>
                <div className="operators">
                    <button onClick={() => updateOper('/')}>/</button>
                    <button onClick={() => updateOper('*')}>*</button>
                    <button onClick={() => updateOper('+')}>+</button>
                    <button onClick={() => updateOper('-')}>-</button>

                    <button onClick={deleteAll}>C</button>
                </div>
                <div className="numbers">
                    {createDigits()}
                    <button onClick={() => decUse('.')}>.</button>
                    <button className="equals" onClick={equals}>
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
