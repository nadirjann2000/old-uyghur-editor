# 回鹘文编辑器

这是一个专门用于编辑和转换回鹘文的在线工具。支持横排和竖排两种编辑模式，可以将编辑的内容导出为图片。

## 功能特点

- 支持横排和竖排两种编辑模式
- 实时编辑和预览
- 字体大小调整（16px - 72px）
- 支持将选中的文本转换为图片
- 支持复制图片到剪贴板
- 支持下载图片到本地
- 使用 Noto Serif Old Uyghur 字体，确保回鹘文显示正确

## 技术栈

- React
- TypeScript
- Styled Components
- HTML5 Canvas API

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/nadirjann2000/old-uyghur-editor.git
cd old-uyghur-editor
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 编辑模式切换
   - 点击"切换到竖排模式"按钮可以切换到竖排编辑
   - 点击"切换到横排模式"按钮可以切换到横排编辑

2. 字体大小调整
   - 点击 "A+" 按钮增加字体大小
   - 点击 "A-" 按钮减小字体大小
   - 字体大小范围：16px - 72px

3. 图片导出
   - 选择要转换的文本
   - 点击"复制为图片"按钮将选中文本转换为图片并复制到剪贴板
   - 点击"下载图片"按钮将选中文本转换为图片并下载到本地

## 注意事项

- 请确保系统已安装 Noto Serif Old Uyghur 字体
- 图片导出功能需要先选择文本
- 建议使用现代浏览器（Chrome、Firefox、Edge 等）以获得最佳体验

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License

## 字体许可声明

本编辑器使用了以下开源字体：
- **Noto Serif Old Uyghur**  
  Copyright 2022 The Noto Project Authors (https://github.com/notofonts/old-uyghur)  
  保留字体名称（Reserved Font Name）："Noto Serif Old Uyghur".

此字体根据 [SIL Open Font License 1.1](https://openfontlicense.org) 授权。  
**完整的许可证文本请查看：[OFL.txt](./LICENSES/OFL.txt)**。