import React, { useState } from 'react';
import { Delete } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className = '', span = false }) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl font-semibold text-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
        span ? 'col-span-2' : ''
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Calculator */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-6 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
             Simple-Calculator
          </h1>

          {/* Display */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="text-right">
              {operation && (
                <div className="text-purple-300 text-sm mb-1">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-white text-4xl font-bold break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              onClick={handleClear}
              className="bg-red-500/80 hover:bg-red-500 text-white"
            >
              AC
            </Button>
            <Button
              onClick={handleBackspace}
              className="bg-orange-500/80 hover:bg-orange-500 text-white"
            >
              <Delete className="w-5 h-5 mx-auto" />
            </Button>
            <Button
              onClick={() => handleOperation('÷')}
              className="bg-blue-500/80 hover:bg-blue-500 text-white col-span-2"
            >
              ÷
            </Button>

            {/* Row 2 */}
            <Button
              onClick={() => handleNumber(7)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              7
            </Button>
            <Button
              onClick={() => handleNumber(8)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              8
            </Button>
            <Button
              onClick={() => handleNumber(9)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              9
            </Button>
            <Button
              onClick={() => handleOperation('×')}
              className="bg-blue-500/80 hover:bg-blue-500 text-white"
            >
              ×
            </Button>

            {/* Row 3 */}
            <Button
              onClick={() => handleNumber(4)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              4
            </Button>
            <Button
              onClick={() => handleNumber(5)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              5
            </Button>
            <Button
              onClick={() => handleNumber(6)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              6
            </Button>
            <Button
              onClick={() => handleOperation('-')}
              className="bg-blue-500/80 hover:bg-blue-500 text-white"
            >
              -
            </Button>

            {/* Row 4 */}
            <Button
              onClick={() => handleNumber(1)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              1
            </Button>
            <Button
              onClick={() => handleNumber(2)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              2
            </Button>
            <Button
              onClick={() => handleNumber(3)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              3
            </Button>
            <Button
              onClick={() => handleOperation('+')}
              className="bg-blue-500/80 hover:bg-blue-500 text-white"
            >
              +
            </Button>

            {/* Row 5 */}
            <Button
              onClick={() => handleNumber(0)}
              className="bg-white/20 hover:bg-white/30 text-white"
              span
            >
              0
            </Button>
            <Button
              onClick={handleDecimal}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              .
            </Button>
            <Button
              onClick={handleEquals}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              =
            </Button>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-white/60 text-sm mt-4">
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}