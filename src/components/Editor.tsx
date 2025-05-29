import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import MobileKeyboard from './MobileKeyboard';

const EditorContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 5px;
    width: 100%;
    max-width: none;
  }
`;

const Title = styled.h1`
  font-family: 'NotoSerifOldUyghur', sans-serif;
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }
`;

const EditorArea = styled.div<{ fontSize: number }>`
  min-height: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-family: 'NotoSerifOldUyghur', serif;
  font-size: ${props => props.fontSize}px;
  line-height: 1.5;
  outline: none;
  overflow-y: auto;
  direction: rtl;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-sizing: border-box;
  position: relative;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 15px;
  }
`;

const MobileDisplayArea = styled.div<{ fontSize: number }>`
  min-height: 300px;
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f8f9fa;
  font-family: 'NotoSerifOldUyghur', serif;
  font-size: ${props => props.fontSize}px;
  line-height: 1.5;
  overflow-y: auto;
  direction: rtl;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-sizing: border-box;
  position: relative;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-right: auto;

  &:hover {
    background-color: #27ae60;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FontSizeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-left: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    border-left: none;
    border-top: 2px solid #e0e0e0;
    padding-top: 12px;
  }
`;

const FontSizeButton = styled.button`
  padding: 8px 12px;
  background-color: #ecf0f1;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #bdc3c7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FontSizeDisplay = styled.span`
  font-size: 16px;
  color: #2c3e50;
  min-width: 40px;
  text-align: center;
`;

const Status = styled.div`
  margin-top: 16px;
  padding: 12px;
  color: #2c3e50;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileKeyboardButton = styled.button`
  display: none;
  margin-top: 16px;
  padding: 12px;
  width: 100%;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

interface EditorProps {
  onModeChange: (isVertical: boolean) => void;
  content: string;
  onContentChange: (content: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const Editor: React.FC<EditorProps> = ({
  onModeChange,
  content,
  onContentChange,
  fontSize,
  onFontSizeChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>('正在加载字体...');
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [editorContent, setEditorContent] = useState(content);
  const [mobileContent, setMobileContent] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setStatus('字体加载完成，可以开始编辑');
      setIsFontLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent;
    }
  }, [editorContent]);

  // 初始化移动端内容
  useEffect(() => {
    if (isMobile && content) {
      setMobileContent(content);
    }
  }, [isMobile, content]);

  useEffect(() => {
    const handleKeyboardToggle = () => {
      // 键盘切换事件处理
    };

    document.addEventListener('keyboard-toggle', handleKeyboardToggle);
    return () => {
      document.removeEventListener('keyboard-toggle', handleKeyboardToggle);
    };
  }, []);

  const handleKeyPress = (char: string) => {
    if (isMobile) {
      // 移动端：使用函数式更新确保使用最新的状态
      setMobileContent(prevContent => {
        let newContent = prevContent;
        
        if (char === 'backspace') {
          // 处理退格键
          if (prevContent.length > 0) {
            // 检查最后一个字符是否是空格
            const lastChar = prevContent[prevContent.length - 1];
            if (lastChar === ' ') {
              // 如果是空格，只删除一个字符
              newContent = prevContent.slice(0, -1);
            } else {
              // 如果是回鹘文字符，删除两个单位
              newContent = prevContent.slice(0, -2);
            }
          }
        } else {
          // 处理普通字符
          newContent = prevContent + char;
        }
        
        onContentChange(newContent);
        return newContent;
      });
    } else {
      // 桌面端：使用selection API
      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (char === 'backspace') {
            if (range.startOffset > 0) {
              // 在横排模式下，直接删除一个字符
              range.setStart(range.startContainer, range.startOffset - 1);
              range.deleteContents();
            }
          } else {
            const textNode = document.createTextNode(char);
            range.deleteContents();
            range.insertNode(textNode);
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
          }
          selection.removeAllRanges();
          selection.addRange(range);
          
          // 触发输入事件以更新内容
          const inputEvent = new Event('input', { bubbles: true });
          editorRef.current.dispatchEvent(inputEvent);
        }
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        const lastChild = editorRef.current.lastChild;
        
        if (lastChild) {
          range.setStartAfter(lastChild);
          range.setEndAfter(lastChild);
        } else {
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
        }
        
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const createImageFromText = async (): Promise<HTMLCanvasElement | null> => {
    if (!editorRef.current) {
      setStatus('编辑器未初始化');
      return null;
    }

    const text = editorRef.current.innerText;
    if (!text) {
      setStatus('请先输入要转换的文本');
      return null;
    }

    // 创建临时容器来测量文本
    const tempDiv = document.createElement('div');
    tempDiv.style.fontFamily = 'NotoSerifOldUyghur';
    tempDiv.style.fontSize = `${fontSize}px`;
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.whiteSpace = 'pre';
    tempDiv.style.direction = 'rtl';
    tempDiv.textContent = text;
    document.body.appendChild(tempDiv);

    // 获取文本尺寸
    const textWidth = tempDiv.offsetWidth;
    const textHeight = tempDiv.offsetHeight;
    document.body.removeChild(tempDiv);

    // 创建 canvas，添加内边距
    const canvas = document.createElement('canvas');
    const scale = window.devicePixelRatio || 1;
    const padding = 0; // 添加内边距
    
    canvas.width = (textWidth + padding * 2) * scale;
    canvas.height = (textHeight + padding * 2) * scale;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setStatus('创建画布失败');
      return null;
    }

    // 设置 canvas 缩放
    ctx.scale(scale, scale);

    // 设置背景和文本样式
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px NotoSerifOldUyghur`;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.direction = 'rtl';

    // 绘制文本，添加内边距
    ctx.fillText(text, canvas.width / scale - padding, padding);

    return canvas;
  };

  const copyToClipboard = async (canvas: HTMLCanvasElement) => {
    try {
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!), 'image/png'));
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      setStatus('已成功复制到剪贴板');
    } catch (err) {
      setStatus('复制失败，请尝试下载图片');
      console.error('复制失败:', err);
    }
  };

  const downloadImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = '回鹘文图片.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatus('图片已下载');
  };

  const handleCopyAsImage = async () => {
    const canvas = await createImageFromText();
    if (canvas) {
      await copyToClipboard(canvas);
    }
  };

  const handleDownloadImage = async () => {
    const canvas = await createImageFromText();
    if (canvas) {
      downloadImage(canvas);
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 72);
    onFontSizeChange(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 16);
    onFontSizeChange(newSize);
  };

  return (
    <EditorContainer>
      <Title>回鹘文编辑工具</Title>
      <ControlsContainer>
        <ToggleButton onClick={() => onModeChange(true)}>
          切换到竖排模式
        </ToggleButton>
        <ButtonContainer>
          <Button
            onClick={handleCopyAsImage}
            disabled={!isFontLoaded}
          >
            复制为图片
          </Button>
          <Button
            onClick={handleDownloadImage}
            disabled={!isFontLoaded}
          >
            下载图片
          </Button>
        </ButtonContainer>
        <FontSizeControl>
          <FontSizeButton
            onClick={decreaseFontSize}
            disabled={fontSize <= 16}
          >
            A-
          </FontSizeButton>
          <FontSizeDisplay>{fontSize}px</FontSizeDisplay>
          <FontSizeButton
            onClick={increaseFontSize}
            disabled={fontSize >= 72}
          >
            A+
          </FontSizeButton>
        </FontSizeControl>
      </ControlsContainer>
      {isMobile ? (
        <MobileDisplayArea
          ref={editorRef}
          fontSize={fontSize}
          style={{ 
            fontFamily: isFontLoaded ? 'NotoSerifOldUyghur, serif' : 'serif'
          }}
        >
          {mobileContent}
        </MobileDisplayArea>
      ) : (
        <EditorArea
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          fontSize={fontSize}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleFocus}
          style={{ 
            fontFamily: isFontLoaded ? 'NotoSerifOldUyghur, serif' : 'serif',
            fontSize: '20px',
            lineHeight: '1.6',
            padding: '20px'
          }}
        />
      )}
      <Status>{status}</Status>
      {isMobile && (
        <MobileKeyboardButton onClick={() => {
          const event = new Event('keyboard-toggle', { bubbles: true });
          document.dispatchEvent(event);
        }}>
          显示软键盘
        </MobileKeyboardButton>
      )}
      {isMobile ? (
        <MobileKeyboard onKeyPress={handleKeyPress} />
      ) : (
        <Keyboard onKeyPress={handleKeyPress} />
      )}
    </EditorContainer>
  );
};

export default Editor; 