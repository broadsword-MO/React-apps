import { useState } from 'react';
import { useEffect } from 'react'; // For keyboard use

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');
    const [num, setNum] = useState(''); // Mine, added 2022-08-09, Tue
    // const [key, setKey] = useState(''); // Mine, added 2022-08-11, Thu

    const ops = ['/', '*', '+', '-'];
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    // const nums = /[0-9]/;

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
        if (calc.toString() === 'NaN' || (calc === '' && value === '0')) {
            // todo Edge case for max digits needed
            return;
        }
        setNum(num + value);
        setCalc(calc + value);
        setResult(evaluate(calc + value).toString());
    };

    const updateOper = (op) => {
        if (
            calc === '' || // calc display is empty
            calc.toString() === 'NaN' ||
            (calc.slice(-1) === '-' && op === '-')
        ) {
            // Or already have one minus operator
            return; // Do nothing
        }
        if (ops.includes(calc.slice(-1)) && op !== '-') {
            // Just used another operator, so replace
            return setCalc(calc.slice(0, -1) + op);
        }

        setCalc(calc + op);
        setNum(''); // Mine
    };

    const equals = () => {
        if (calc === '') {
            return;
        } else if (ops.includes(calc.slice(-1))) {
            setCalc(calc.slice(0, -1));
        } else if (
            !num.includes('.') ||
            !calc.includes('.') ||
            result.includes('e+') ||
            calc.includes('e+')
        ) {
            // No decimal rounding of numbers without decimals
            setCalc(evaluate(calc).toString());
        } else {
            // Only round numbers with decimals (bc rounding with 16 or more digits before decimal returns NaN)
            setCalc(round(evaluate(calc)).toString());
        }
        setNum(calc);
        setResult('');
    };

    const allClear = () => {
        if (calc === '') {
            return;
        }
        setCalc(''); // Clears all
        setResult('');
        setNum('');
    };

    const createDigits = () => {
        const digits = [];
        for (let i = 9; i >= 0; i--)
            digits.push(
                <button
                    className="numButton"
                    onClick={() => updateNum(i.toString())}
                    key={i}
                >
                    {i}
                </button>
            );
        return digits;
    };

    // For using the keyboard
    // useEffect(() => {
    //     document.addEventListener('keydown', keyHandler, true);
    // });

    useEffect(() => {
        // initiate the event handler
        window.addEventListener('keydown', keyHandler, false);

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            window.removeEventListener('keydown', keyHandler);
        };
    });

    const keyHandler = (event) => {
        // setKey(event.key);
        if (event.key === '.') {
            decUse(event.key);
        }
        if (ops.includes(event.key)) {
            updateOper(event.key);
        }
        if (nums.includes(event.key)) {
            updateNum(event.key);
        }
        if (event.key === 'Enter' || event.key === '=') {
            equals();
        }
        if (event.key === 'Delete') {
            allClear();
        }
        if (event.key === 'Backspace') {
            setCalc(calc.slice(0, -1)); // CE, return all but the last
            setResult(calc.slice(0, -1));
        }
        return;
    };

    return (
        <div className="App">
            {/* <div>
                num = {num}; calc = {calc}; result = {result};
            </div> */}
            {/* <div>onKeyDown event = '{key}'</div> */}
            <div className="calculator">
                <div className="display">
                    <div className="preview">
                        {result ? `(${result})` : '( )'}
                    </div>
                    {calc || '0'}
                </div>
                <div className="numPad">
                    <div className="operators">
                        <button
                            className="opButton"
                            onClick={() => updateOper('/')}
                        >
                            /
                        </button>
                        <button
                            className="opButton"
                            onClick={() => updateOper('*')}
                        >
                            x
                        </button>
                        <button
                            className="opButton"
                            onClick={() => updateOper('+')}
                        >
                            +
                        </button>
                        <button
                            className="opButton"
                            onClick={() => updateOper('-')}
                        >
                            -
                        </button>

                        <button className="opButton clear" onClick={allClear}>
                            AC
                        </button>
                    </div>
                    <div className="numbers">
                        {createDigits()}
                        <button
                            className="numButton"
                            onClick={() => decUse('.')}
                        >
                            .
                        </button>
                        <button className="equalButton" onClick={equals}>
                            =
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
// ReactDOM.render(<App />, document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById("root"));
