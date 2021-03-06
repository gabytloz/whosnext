// @flow

import React from 'react';
import Dismissable from 'components/Dismissable';
import Alert from 'main/components/Alert';
import styles from 'main/css/messages.css';
import type { Color, Message } from 'main/constants/types';

type Props = {
  dismiss: (messageId: string) => void,
  messages: Array<Message>,
};

class Messages extends React.PureComponent<Props> {
  buildMessage = (message: Message) => {
    const color: Color = { [message.type]: true };
    const { dismiss } = this.props;

    const Flash = (
      <Alert color={color} key={message.id} message={message} onDismiss={dismiss} />
    );

    // Only dismiss automatically if successful
    if (message.type !== 'success') return Flash;

    return (
      <Dismissable key={message.id} dismiss={dismiss} dismissArgs={message.id}>
        {Flash}
      </Dismissable>
    );
  }

  render() {
    const { messages } = this.props;
    const MessageList = messages.map(message => this.buildMessage(message));

    return (
      <div className={styles.messages}>
        {MessageList}
      </div>
    );
  }
}

export default Messages;
