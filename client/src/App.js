import './App.css';
import './normal.css';

function App() {
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className='side-menu-button'>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className='chat-log'>

          <div className='chat-message'>
            <div className='chat-message-center'>

              <div className='avatar'>

              </div>
              <div className='message'>
                Hello
              </div>

            </div>

          </div>
          <div className='chat-message chatgpt'>
            <div className='chat-message-center'>

              <div className='avatar chatgpt'>

              </div>
              <div className='message'>
                I am TARS
              </div>

            </div>

          </div>

        </div>

        <div className='chat-input-holder'>
          <textarea className='chat-input-textarea' rows='1' >

          </textarea>

        </div>

      </section>
    </div>
  );
}

export default App;
