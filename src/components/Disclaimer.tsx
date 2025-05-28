import React from 'react';
import styled from 'styled-components';

const DisclaimerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #e74c3c;
  margin-bottom: 30px;
  text-align: center;
`;

const WarningBox = styled.div`
  background-color: #fff5f5;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
`;

const WarningText = styled.p`
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const RuleList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const RuleItem = styled.li`
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 15px;
  padding-left: 25px;
  position: relative;

  &:before {
    content: "⚠";
    color: #e74c3c;
    position: absolute;
    left: 0;
  }
`;

const Disclaimer: React.FC = () => {
  return (
    <DisclaimerContainer>
      <Title>⚠ 警告 ⚠</Title>
      
      <WarningBox>
        <WarningText>
          本工具仅供学术研究和教育目的使用，严禁用于任何非法用途。用户在使用本工具时必须严格遵守以下规定：
        </WarningText>
        
        <RuleList>
          <RuleItem>坚决拥护中国共产党的领导，维护国家统一和民族团结，筑牢中华民族共同体意识</RuleItem>
          <RuleItem>严禁使用本工具制作、传播任何涉及恐怖主义、分裂主义、极端主义的内容</RuleItem>
          <RuleItem>严禁使用本工具从事任何危害国家安全、破坏民族团结的活动</RuleItem>
          <RuleItem>用户应当遵守相关法律法规，尊重知识产权</RuleItem>
          <RuleItem>本工具仅提供技术平台，用户发布的内容由用户自行负责</RuleItem>
        </RuleList>

        <WarningText>
          如发现任何违反上述规定的行为，我们将立即采取必要措施，并保留追究相关法律责任的权利。
        </WarningText>
      </WarningBox>
    </DisclaimerContainer>
  );
};

export default Disclaimer; 