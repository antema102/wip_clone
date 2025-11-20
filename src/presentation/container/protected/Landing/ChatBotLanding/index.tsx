import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './Bot/config';
import MessageParser from './Bot/MessageParser';
import ActionProvider from './Bot/ActionProvider';
import './styles.scss';
import { useState, useRef, useEffect } from 'react';
import { icons, images } from '../../../../../resources/constants';

const ChatBotLanding = () => {
  const [openChatBot, setOpenChatBot] = useState(false);
  const message = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        content.current != null &&
        !content.current.contains(e.target as Node) &&
        message.current != null &&
        !message.current.contains(e.target as Node)
      ) {
        setOpenChatBot(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const toggleChatBot = () => {
    setOpenChatBot((prev) => !prev);
  };

  return (
    <div className="chatBot">
      {openChatBot && (
        <div className="chatBot__content" ref={content}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText={
              <>
                <img src={images.wipWorkRadius} height={28} width={28} />
                <span>Wipwork</span>
              </>
            }
          />
        </div>
      )}
      <div className="chatBot__message" ref={message} onClick={toggleChatBot}>
        <img
          src={openChatBot ? `${icons.closeWhite}` : `${icons.message}`}
          alt=""
          width={30}
          height={25}
        />
      </div>
    </div>
  );
};

export default ChatBotLanding;
