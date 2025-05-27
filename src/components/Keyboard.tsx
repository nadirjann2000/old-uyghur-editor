import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const KeyboardButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const KeyboardContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 30px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 999;
  transition: all 0.3s ease;
  max-width: 400px;
  width: 90vw;
`;

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 10px;
  margin-top: 15px;
`;

const KeyButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-family: 'NotoSerifOldUyghur', serif;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: #3498db;
  }

  &:active {
    background-color: #e3f2fd;
    transform: scale(0.95);
  }
`;

const KeyboardTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  text-align: center;
`;

interface KeyboardProps {
  onKeyPress: (char: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyClick = (char: string, e: React.MouseEvent) => {
    e.preventDefault();
    onKeyPress(char);
  };

  return (
    <>
      <KeyboardButton onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}>
        ⌨️
      </KeyboardButton>
      <KeyboardContainer isOpen={isOpen}>
        <KeyboardTitle>回鹘文软键盘</KeyboardTitle>
        <KeyboardGrid>
          {Array.from({ length: 26 }, (_, i) => 
            String.fromCodePoint(0x10F70 + i)
          ).map((char, index) => (
            <KeyButton
              key={index}
              onClick={(e) => handleKeyClick(char, e)}
            >
              {char}
            </KeyButton>
          ))}
        </KeyboardGrid>
      </KeyboardContainer>
    </>
  );
};

export default Keyboard; 