import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import VerticalEditor from './components/VerticalEditor';
import About from './components/About';
import Disclaimer from './components/Disclaimer';
import Keyboard from './components/Keyboard';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NotoSerifOldUyghur';
    src: url('/fonts/NotoSerifOldUyghur-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 20px;
    background-color: #f0f2f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  background-color: #fff;
  padding: 15px 0;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  text-decoration: none;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #3498db;
  }
`;

function App() {
  const [isVertical, setIsVertical] = useState(false);
  const [sharedContent, setSharedContent] = useState('');
  const [sharedFontSize, setSharedFontSize] = useState(24);
  const [currentPage, setCurrentPage] = useState<'editor' | 'about' | 'disclaimer'>('editor');

  const handleContentChange = (content: string) => {
    setSharedContent(content);
  };

  const handleFontSizeChange = (size: number) => {
    setSharedFontSize(size);
  };

  const handleKeyPress = (char: string) => {
    console.log('handleKeyPress called with char:', char);
    if (currentPage === 'editor') {
      const selection = window.getSelection();
      console.log('Selection:', selection);
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // 获取实际的编辑器元素，考虑 Shadow DOM
        const editorElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
          ? range.commonAncestorContainer.parentElement
          : range.commonAncestorContainer;
        
        console.log('Editor element:', editorElement);
        
        if (editorElement instanceof HTMLElement && editorElement.getAttribute('contenteditable') === 'true') {
          console.log('Attempting to insert text:', char);
          try {
            // 使用 insertText 方法插入文本
            const textNode = document.createTextNode(char);
            range.deleteContents();
            range.insertNode(textNode);
            
            // 移动光标到插入的文本后面
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);
            
            // 触发输入事件以更新内容
            const inputEvent = new Event('input', { bubbles: true });
            editorElement.dispatchEvent(inputEvent);
            console.log('Text insertion completed');
          } catch (error) {
            console.error('Error inserting text:', error);
          }
        } else {
          console.log('Editor element not found or not contenteditable');
        }
      } else {
        console.log('No valid selection found');
      }
    } else {
      console.log('Not in editor page');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav>
        <NavContainer>
          <Logo>回鹘文编辑器</Logo>
          <NavLinks>
            <NavLink
              href="#"
              active={currentPage === 'editor'}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('editor');
              }}
            >
              编辑器
            </NavLink>
            <NavLink
              href="#"
              active={currentPage === 'about'}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('about');
              }}
            >
              关于
            </NavLink>
            <NavLink
              href="#"
              active={currentPage === 'disclaimer'}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('disclaimer');
              }}
            >
              警告
            </NavLink>
          </NavLinks>
        </NavContainer>
      </Nav>
      <AppContainer>
        {currentPage === 'editor' ? (
          isVertical ? (
            <VerticalEditor
              onModeChange={setIsVertical}
              content={sharedContent}
              onContentChange={handleContentChange}
              fontSize={sharedFontSize}
              onFontSizeChange={handleFontSizeChange}
            />
          ) : (
            <Editor
              onModeChange={setIsVertical}
              content={sharedContent}
              onContentChange={handleContentChange}
              fontSize={sharedFontSize}
              onFontSizeChange={handleFontSizeChange}
            />
          )
        ) : currentPage === 'about' ? (
          <About />
        ) : (
          <Disclaimer />
        )}
      </AppContainer>
      <Keyboard onKeyPress={handleKeyPress} />
    </>
  );
}

export default App;
