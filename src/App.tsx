import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RefreshCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const result = eval(fullEquation.replace('×', '*').replace('÷', '/'));
      setDisplay(Number(result.toFixed(8)).toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-lg font-medium rounded-xl transition-all duration-200 
      active:scale-95 hover:bg-opacity-90 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-100 p-6 rounded-2xl shadow-2xl w-full max-w-xs">
        <div className="mb-4">
          <div className="text-gray-500 text-right h-6 text-sm">{equation}</div>
          <div className="text-3xl font-bold text-right h-10 overflow-hidden">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="bg-red-400 text-white">
            <RefreshCcw className="w-5 h-5 mx-auto" />
          </Button>
          <Button onClick={backspace} className="bg-gray-300">
            <Delete className="w-5 h-5 mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('÷')} className="bg-gray-300">
            <Divide className="w-5 h-5 mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('×')} className="bg-gray-300">
            <X className="w-5 h-5 mx-auto" />
          </Button>

          {[7, 8, 9].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('-')} className="bg-gray-300">
            <Minus className="w-5 h-5 mx-auto" />
          </Button>

          {[4, 5, 6].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('+')} className="bg-gray-300">
            <Plus className="w-5 h-5 mx-auto" />
          </Button>

          {[1, 2, 3].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white">
              {num}
            </Button>
          ))}
          <Button onClick={calculate} className="bg-blue-500 text-white row-span-2">
            <Equal className="w-5 h-5 mx-auto" />
          </Button>

          <Button onClick={() => handleNumber('0')} className="bg-white col-span-2">
            0
          </Button>
          <Button onClick={() => handleNumber('.')} className="bg-white">
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;