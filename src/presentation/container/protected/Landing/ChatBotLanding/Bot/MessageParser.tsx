import React, { ReactNode, ReactElement } from 'react';

interface MessageParserProps {
  children: ReactNode;
  actions: any;
}

interface ChildProps {
  parse: (message: string) => void;
  actions: any;
}

const MessageParser: React.FC<MessageParserProps> = (props) => {
  const { children, actions } = props;
  const candidatQuestion = children.props.state.candidatQuestion || []

  const parse = (message: string) => {
    if (message.includes('wipwork')) {
      const filteredQuestions = candidatQuestion.filter(question =>
        question.toLowerCase().includes('wipwork')
      );
      actions.questionFiltre(filteredQuestions);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ChildProps>(child)) {
          return React.cloneElement<ChildProps>(child, {
            parse: parse,
            actions: actions,
          });
        }
        return child;
      })}
    </div>
  );
};

export default MessageParser;
