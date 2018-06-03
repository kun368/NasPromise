import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button } from '@icedesign/base';

const { Item: StepItem } = Step;
const { Group: ButtonGroup } = Button;

export default class SimpleStep extends Component {
  static displayName = 'SimpleStep';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  next = () => {
    const s = this.state.currentStep + 1;

    this.setState({
      currentStep: s > 5 ? 5 : s,
    });
  };

  prev = () => {
    const s = this.state.currentStep - 1;

    this.setState({
      currentStep: s < 0 ? 0 : s,
    });
  };

  onClick = (currentStep) => {
    console.log(currentStep);

    this.setState({
      currentStep,
    });
  };

  render() {
    const { currentStep } = this.state;

    return (
      <IceContainer title="星云承诺链使用步骤">
        <Step current={currentStep}>
          <StepItem title="创建承诺" onClick={this.onClick} />
          <StepItem title="电脑/手机提交上链" onClick={this.onClick} />
          <StepItem title="二维码分享诺言" onClick={this.onClick} />
          <StepItem title="扫码查看诺言详情" onClick={this.onClick} />
          <StepItem title="个人中心查看所有诺言" onClick={this.onClick} />
        </Step>
        <div style={styles.buttonGroup}>
          <ButtonGroup>
            <Button
              onClick={this.prev}
              type="primary"
              disabled={currentStep === 0}
            >
              上一步
            </Button>
            <Button
              onClick={this.next}
              type="primary"
              disabled={currentStep === 4}
            >
              下一步
            </Button>
          </ButtonGroup>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0 20px',
  },
};
