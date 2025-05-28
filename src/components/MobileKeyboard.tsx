import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const KeyboardContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  border-radius: 12px 12px 0 0;
  padding: 10px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 999;
`;

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  margin-top: 10px;
  padding: 0 5px;
`;

const KeyButton = styled.button`
  width: 100%;
  height: 35px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-family: 'NotoSerifOldUyghur', serif;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background-color: #f8f9fa;
    border-color: #3498db;
  }

  &:active {
    background-color: #e3f2fd;
    transform: scale(0.95);
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 20px;
  width: 32px;
  height: 32px;
  border: none;
  background-color: #2c3e50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1a252f;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

interface MobileKeyboardProps {
  onKeyPress: (char: string) => void;
}

const MobileKeyboard: React.FC<MobileKeyboardProps> = ({ onKeyPress }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyboardToggle = () => {
      setIsOpen(true);
    };

    document.addEventListener('keyboard-toggle', handleKeyboardToggle);
    return () => {
      document.removeEventListener('keyboard-toggle', handleKeyboardToggle);
    };
  }, []);

  const handleKeyClick = (char: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onKeyPress(char);
  };

  const handleBackspace = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onKeyPress('backspace');
  };

  const handleSpace = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onKeyPress(' ');
  };

  return (
    <KeyboardContainer $isOpen={isOpen}>
      <CollapseButton onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }}>
        ↓
      </CollapseButton>
      <KeyboardGrid>
        {Array.from({ length: 26 }, (_, i) => 
          String.fromCodePoint(0x10F70 + i)
        ).map((char, index) => (
          <KeyButton
            key={index}
            onClick={(e) => handleKeyClick(char, e)}
            type="button"
          >
            {char}
          </KeyButton>
        ))}
        <KeyButton
          onClick={handleSpace}
          type="button"
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            gridColumn: 'span 2'
          }}
        >
          ␣
        </KeyButton>
        <KeyButton
          onClick={handleBackspace}
          type="button"
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            gridColumn: 'span 2'
          }}
        >
          ←
        </KeyButton>
      </KeyboardGrid>
    </KeyboardContainer>
  );
};

export default MobileKeyboard; 