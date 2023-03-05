import './App.css';
import './normal.css';
import OpenAISVGLogo from './OpenAISVGLogo'
// set state
import { useState, useEffect } from 'react';


const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {/* {message.user === "gpt" ? <OpenAISVGLogo /> : <div>You</div>} */}
          {message.user === "gpt" && <OpenAISVGLogo />}
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  )
}

function App() {

  useEffect(()=>{
    getEngines();
  },[])

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setcurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: "How can i help you today?"
    },
    {
      user: 'me',
      message: "I want use ChatGpt today"
    }
  ]);

  function getEngines(){
    fetch("https://localhost:3080/models")
    .then(res => res.json())
    .then(data => setModels(data.models.data))
  }

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log('submit')
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    await setInput("");
    await setChatLog(chatLogNew);
    // fetch response
    const messages = chatLog.map((message) => message.message).join("\n")
    const response = await fetch("https://express-demo-gamma.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel
      }),
    });
    const data = await response.json();
    await setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
    var scrollToTheBottomChatLog =
      document.getElementsByClassName("chat-log")[0];
    scrollToTheBottomChatLog.scrollTop = scrollToTheBottomChatLog.scrollHeight;
  }
  return (
    <div className="App">

      {/* Menu bar */}
      <aside className="sidemenu">
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className='models'>
            <select onChange={(e)=>{
              setcurrentModel(e.target.value)
            }}>
              {models.map((model,index)=>{
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              })}
            </select>
        </div>
      </aside>

      {/* chat box */}
      <section className="chatbox">
        {/* chat log */}
        <div className='chat-log'>

          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

        </div>

        {/* Input box */}
        <div className='chat-input-holder'>
          <form className="form" onSubmit={handleSubmit}>
            <input className='chat-input-textarea' rows='1' value={input} onChange={(e) => setInput(e.target.value)}></input>
            <button className="submit" type="submit">Submit</button>
          </form>


        </div>

      </section >

    </div >
  );
}



export default App;
