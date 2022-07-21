import { useState } from 'react';

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');

    const ops = ['/', '*', '+', '-', '.'];

    const updateCalc = (value) => {
        if (
            (ops.includes(value) && calc === '') ||
            (ops.includes(value) && ops.includes(calc.slice(-1)))
        ) {
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    };

    const equals = () => {
        setCalc(eval(calc).toString());
        setResult('');
    };

    const deleteAll = () => {
        if (calc == '') {
            return;
        }
        // setCalc(calc.slice(0, -1)); // For CE
        setCalc(calc.slice(0, 0)); // Clears all
        setResult('');
    };

    const createDigits = () => {
        const digits = [];
        for (let i = 9; i >= 0; i--)
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>
                    {i}
                </button>
            );
        return digits;
    };

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    {result ? <span>({result})</span> : ''} {calc || '0'}
                </div>
                <div className="operators">
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>

                    <button onClick={deleteAll}>C</button>
                </div>
                <div className="numbers">
                    {createDigits()}
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button className="equals" onClick={equals}>
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
