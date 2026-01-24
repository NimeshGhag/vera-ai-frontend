import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/chat/ChatLayout.css";
import "./Home.css";

const Home = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="chat-layout minimal home-page">
      <header className="site-nav">
        <div className="nav-left">
          <button type="button" className="brand" onClick={() => navigate('/')}>
            Vera‑AI
          </button>
          <div className="brand-meaning">
            — A truthful
            assistant
          </div>
        </div>

        <div className="nav-right">
          <nav className="nav-links" >
            <button type="button" className="link" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </nav>
       
        </div>

        
      </header>

      <main className="chat-main home-hero" role="main">
        <div className="hero-content">
          <div className="chip">Early Preview</div>
          <h1>Vera‑AI</h1>
          <p className="hero-lead">
            Ask anything. Paste text, brainstorm ideas, or get quick
            explanations — conversations persist so you can pick up where you
            left off.
          </p>
          <div className="hero-ctas">
            <button type="button" className="primary-btn" onClick={() => navigate('/register')}>
              Get Started
            </button>
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
