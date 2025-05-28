import React, { useState, useRef, useEffect } from 'react';
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const KeyboardContainer = styled.div<{ $isOpen: boolean; $isMobile: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 30px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 999;
  transition: all 0.3s ease;
  max-width: 400px;
  width: 90vw;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: none;
    border-radius: 12px 12px 0 0;
    padding: 10px;
    display: ${props => props.$isMobile && props.$isOpen ? 'block' : 'none'};
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
`;

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 10px;
  margin-top: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
    gap: 5px;
    margin-top: 10px;
    padding: 0 5px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: 35px;
    font-size: 18px;
    padding: 0;
  }
`;

const KeyboardTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CollapseButton = styled.button`
  display: none;
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

  @media (max-width: 768px) {
    display: flex;
  }
`;

interface KeyboardProps {
  onKeyPress: (char: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleKeyboardToggle = () => {
      setIsOpen(true);
    };

    // 阻止系统键盘弹出
    const preventSystemKeyboard = (e: Event) => {
      if (isMobile) {
        e.preventDefault();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keyboard-toggle', handleKeyboardToggle);
    document.addEventListener('focusin', preventSystemKeyboard, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keyboard-toggle', handleKeyboardToggle);
      document.removeEventListener('focusin', preventSystemKeyboard, true);
    };
  }, [isMobile]);

  const handleKeyClick = (char: string, e: React.MouseEvent) => {
    e.preventDefault();
    onKeyPress(char);
  };

  const handleBackspace = (e: React.MouseEvent) => {
    e.preventDefault();
    onKeyPress('backspace');
  };

  const handleSpace = (e: React.MouseEvent) => {
    e.preventDefault();
    onKeyPress(' ');
  };

  return (
    <>
      <KeyboardButton onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}>
        ⌨️
      </KeyboardButton>
      <KeyboardContainer $isOpen={isOpen} $isMobile={isMobile}>
        <KeyboardTitle>回鹘文软键盘</KeyboardTitle>
        <CollapseButton onClick={(e) => {
          e.preventDefault();
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
            >
              {char}
            </KeyButton>
          ))}
          <KeyButton
            onClick={handleSpace}
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
    </>
  );
};

export default Keyboard; 