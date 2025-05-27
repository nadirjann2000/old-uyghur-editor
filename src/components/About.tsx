import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: "•";
    color: #3498db;
    position: absolute;
    left: 0;
  }
`;

const TeamMember = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MemberName = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const MemberRole = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const MemberDescription = styled.p`
  font-size: 1rem;
  color: #34495e;
  line-height: 1.5;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>关于回鹘文编辑器</Title>

      <Section>
        <SubTitle>使用指南</SubTitle>
        <Text>
          回鹘文编辑器是一个专门用于编辑和转换回鹘文的在线工具。它提供了直观的界面和强大的功能，让您能够轻松地编辑和转换回鹘文文本。
        </Text>
        <List>
          <ListItem>
            <strong>编辑模式切换：</strong> 在横排和竖排模式之间自由切换，满足不同的编辑需求。
          </ListItem>
          <ListItem>
            <strong>字体大小调整：</strong> 使用 A+ 和 A- 按钮调整字体大小，范围从 16px 到 72px。
          </ListItem>
          <ListItem>
            <strong>图片导出：</strong> 选择文本后，可以将其转换为图片并复制到剪贴板或下载到本地。
          </ListItem>
          <ListItem>
            <strong>实时预览：</strong> 所有编辑操作都会实时显示，方便您随时查看效果。
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>使用技巧</SubTitle>
        <List>
          <ListItem>
            在开始编辑前，请确保您的系统已安装 Noto Serif Old Uyghur 字体。
          </ListItem>
          <ListItem>
            使用现代浏览器（如 Chrome、Firefox、Edge）可以获得最佳体验。
          </ListItem>
          <ListItem>
            图片导出功能需要先选择文本，请确保在点击导出按钮前已选择要转换的文本。
          </ListItem>
          <ListItem>
            竖排模式下，文本会自动旋转，您可以通过滚动来查看完整内容。
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>开发团队</SubTitle>
        <TeamMember>
          <MemberName>张三</MemberName>
          <MemberRole>项目负责人 / 前端开发</MemberRole>
          <MemberDescription>
            负责项目的整体规划和前端开发工作，专注于用户体验和界面设计。
          </MemberDescription>
        </TeamMember>
        <TeamMember>
          <MemberName>李四</MemberName>
          <MemberRole>后端开发</MemberRole>
          <MemberDescription>
            负责后端API开发和数据处理，确保系统的稳定性和性能。
          </MemberDescription>
        </TeamMember>
        <TeamMember>
          <MemberName>王五</MemberName>
          <MemberRole>UI/UX 设计师</MemberRole>
          <MemberDescription>
            负责用户界面设计和交互体验优化，致力于提供直观易用的操作界面。
          </MemberDescription>
        </TeamMember>
      </Section>

      <Section>
        <SubTitle>联系我们</SubTitle>
        <Text>
          如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们：
        </Text>
        <List>
          <ListItem>邮箱：contact@example.com</ListItem>
          <ListItem>GitHub：github.com/old-uyghur-editor</ListItem>
          <ListItem>问题反馈：github.com/old-uyghur-editor/issues</ListItem>
        </List>
      </Section>
    </AboutContainer>
  );
};

export default About; 