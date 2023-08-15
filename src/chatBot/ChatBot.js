import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatWinOpen, setChatWinOpen] = useState(false)
  // scroll
  const divRef = useRef(null);

  useEffect(() => {
    const scrollDiv = divRef.current;
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }, [messages]);
  useEffect (() => {
    if (chatWinOpen === true && messages.length === 0) {
        setDefaultMsgs()
    }
  }, [chatWinOpen])
  //
  const questionsAndAnswers = [
    {
        question: 'Hi hi hello greetings hi!! hi !! hello!! hello !! ',
        answer: 'Hello!'
    },
    {
        question: 'good morning good evening good afternoon good day',
        answer: '_REFLECT'
    },
    {
      question: 'What is your name?',
      answer: 'I am a chat bot. My name is Buzz Lightyear.',
    },
    {
      question: 'How are you?',
      answer: `I am doing well, thank you.
                How are you?
                `,
    },
    {
      question: 'What can you do? what do you do ',
      answer: 'I can help answer your questions on behalf of Vachaspathi',
    },
    {
        question: "What is your background and area of expertise? , expertise projects ui ux",
        answer: "I have a strong background in design and development of applications. My expertise lies in building quality management systems, document management systems, and service ticket management systems. I also specialize in integrating service ticket management systems with CRM platforms and customizing software products to meet client-specific requirements."
    },
    {
        question: "Which technologies are you proficient in? skills technology skill set frameworks programming",
        answer: "I am proficient in Vue.js, ExtJS, and jQuery. I have successfully delivered projects using these technologies and have leveraged their capabilities to create robust and user-friendly applications. Additionally, I have knowledge of React.js, Vue.js, and have gained a solid foundation in PHP, Python, Java, postgresSQL, MongoDB, and Firebase."
    },
    {
        question: "What is your approach to delivering high-quality solutions? project",
        answer: "I am dedicated to understanding client needs and translating them into efficient and innovative software solutions. I have a passion for delivering high-quality solutions that meet client expectations. I pay attention to detail, adhere to industry best practices, and stay up-to-date with the latest advancements in technology. I believe in collaboration and working with cross-functional teams to achieve project goals."
    },
    {
        question: "How do you stay updated with the latest advancements in the tech industry? stay update new tech",
        answer: "I have a keen interest in staying up-to-date with the latest advancements in the tech industry. I actively seek out learning opportunities, participate in online communities, follow industry blogs, and attend relevant conferences or webinars. I believe in continuous learning to expand my skill set and keep pace with emerging technologies and trends."
    },
    {
        question: "What drives you in your career as a software developer?",
        answer: "I am driven by a strong work ethic, attention to detail, and a commitment to delivering excellence. I find fulfillment in solving complex problems and creating solutions that make a positive impact. I am excited to leverage my skills and experience to contribute to challenging projects and make a difference in the field of software development."
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    }
    // Add more questions and answers as needed
  ];

  //
  function playDingSound() {
    const dingSoundElement = document.getElementById('dingSound');
    dingSoundElement.currentTime = 0;
    dingSoundElement.play();
  }
  //
  function setDefaultMsgs () {
    const newMessage = {
        text: 'Greetings!',
        isUserMessage: false,
    };
    const newMessage2 = {
        text: 'I am Chat assistant Buzz Light year',
        isUserMessage: false,
    };
    const newMessage3 = {
        text: 'I can provide info about Vachaspathi',
        isUserMessage: false,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, newMessage2, newMessage3]);
  }
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (input.trim() === '') {
      return;
    }
  
    const newMessage = {
      text: input,
      isUserMessage: true,
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message to the existing message array
  
    const matchingQuestion = questionsAndAnswers.find(
      (item) => item.question.toLowerCase().includes(input.toLowerCase()) === true
    );
  
    if (matchingQuestion) {
        let reptxt = ''
        if (matchingQuestion.answer === '_REFLECT') {
            reptxt = input
        } else {
            reptxt = matchingQuestion.answer
        }
      const botReply = {
        text: reptxt,
        isUserMessage: false,
      };
  
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botReply]); // Append bot reply to the existing message array
        playDingSound()
      }, 500);
    } else {
        const botReply = {
            text: "Apologies! I couldn't find proper information regarding this.",
            isUserMessage: false,
          };
      
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botReply]); // Append bot reply to the existing message array
            playDingSound()
          }, 500);
    }
  
    setInput('');
  };
  

  return (
    <>
    <button className="open-button"
    style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} onClick={() => {
        setChatWinOpen(true)
    }}><i className="fa fa-weixin fa-2x"></i><span>Chat Assistant</span></button>
    <div className="chat-popup chatbot-popup" style={{ 'display': chatWinOpen ? 'block' : 'none' }}>
    <div className="chat-popup__toolbar">
        <div className='title'><i className="fa fa-weixin fa"></i>Chat Assistant</div>
        <button className="toolbar-close-btn hand"onClick={() => {
            setChatWinOpen(false)
        }}><i className="fa fa-close"></i></button>
    </div>
      <div className="chatbot__messages form-container" ref={divRef}>
        {messages.map((message, index) => (
            <div key={`message-${index}`} className='message-row'>
                <div
                    key={index}
                    className={`message ${message.isUserMessage ? 'user' : 'bot'}`}
                >
                    {message.text}
                </div>
            </div>
        ))}
      </div>
      <audio id="dingSound">
            <source src="ding-idea-40142.mp3" type="audio/mpeg" />
        </audio>
      <form className="chatbot__input" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit" className="send-btn hand"><i className="fa fa-send"></i></button>
      </form>
    </div>
    </>
  );
};

export default ChatBot;
