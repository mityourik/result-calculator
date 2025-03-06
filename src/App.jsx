import React, { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['1','2','3','4','5','6','7','8','9', '0'];
const BUTTONS = ['+', '-', 'C', '='];

function App() {
  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState('');
  const [operand2, setOperand2] = useState('');
  const [resultDisplayed, setResultDisplayed] = useState(false);

  const handleDigit = (digit) => {
    if (resultDisplayed) {
      setOperand1(digit);
      setOperator('');
      setOperand2('');
      setResultDisplayed(false);
    } else {
      !operator
        ? setOperand1(operand1 + digit)
        : setOperand2(operand2 + digit);
    }
  };

  const handleOperation = (op) => {
    if (op === 'C') {
      setOperand1('');
      setOperator('');
      setOperand2('');
      setResultDisplayed(false);
    } else if (op === '=') {
      if (operand1 && operator && operand2) {
        const num1 = parseInt(operand1, 10);
        const num2 = parseInt(operand2, 10);
        const result = operator === '+' ? num1 + num2 : num1 - num2;
        setOperand1(result.toString());
        setOperator('');
        setOperand2('');
        setResultDisplayed(true);
      }
    } else {
      if (operand1 && !operator) {
        setOperator(op);
        setResultDisplayed(false);
      } else if (resultDisplayed) {
        setOperator(op);
        setResultDisplayed(false);
      }
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${resultDisplayed ? styles.result : ''}`}>
        {operand1}{operator}{operand2}
      </div>
      <div className={styles.buttons}>
        <div className={styles.digits}>
          {NUMS.map((num) => (
            <button key={num} onClick={() => handleDigit(num)}>{num}</button>
          ))}
        </div>
        <div className={styles.operations}>
          {BUTTONS.map((op) => (
            <button key={op} onClick={() => handleOperation(op)}>{op}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;