import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: 'NotoSerifOldUyghur', sans-serif;
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;
`;

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  margin-bottom: 24px;
`;

const EditorContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
  writing-mode: vertical-rl;
  text-orientation: upright;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
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
`;

interface VerticalEditorProps {
  onModeChange: (isVertical: boolean) => void;
  content: string;
  onContentChange: (content: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const VerticalEditor: React.FC<VerticalEditorProps> = ({
  onModeChange,
  content,
  onContentChange,
  fontSize,
  onFontSizeChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>('正在加载字体...');
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setStatus('字体加载完成，可以开始编辑');
      setIsFontLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleFocus = () => {
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

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 72);
    onFontSizeChange(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 16);
    onFontSizeChange(newSize);
  };

  const createImageFromText = async (): Promise<HTMLCanvasElement | null> => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      setStatus('请先选择要转换的文本');
      return null;
    }

    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (!text) {
      setStatus('请先选择要转换的文本');
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

    // 创建 canvas，为竖排文本调整尺寸
    const canvas = document.createElement('canvas');
    const scale = window.devicePixelRatio || 1;
    
    canvas.width = textHeight * scale;  // 交换宽高并添加内边距
    canvas.height = textWidth * scale;  // 交换宽高并添加内边距
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

    // 旋转画布并绘制文本
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(text, 0, 0);

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

  return (
    <EditorContainer>
      <Title>回鹘文编辑工具 - 竖排模式</Title>
      <ControlsContainer>
        <ToggleButton onClick={() => onModeChange(false)}>
          切换到横排模式
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
      <EditorArea
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        fontSize={fontSize}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <Status>{status}</Status>
    </EditorContainer>
  );
};

export default VerticalEditor; 