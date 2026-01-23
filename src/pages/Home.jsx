import React, { useState } from "react";
import "../components/chat/ChatLayout.css";
import "./Home.css";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-layout minimal home-page">
      <header className="site-nav">
        <div className="nav-left">
          <a className="brand" href="/">
            Vera‑AI
          </a>
          <div className="brand-meaning">
            — A truthful
            assistant
          </div>
        </div>

        <div className="nav-right">
          <nav className="nav-links" aria-hidden={open ? "false" : "true"}>
            <a className="link" href="/login">
              Sign In
            </a>
          </nav>
          <a className="primary-btn cta-btn" href="/register">
            Get Started
          </a>

          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="mobile-menu">
            <a className="mobile-link" href="/login">
              Sign In
            </a>

            <a className="primary-btn mobile-cta" href="/register">
              Get Started
            </a>
          </div>
        )}
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
            <a className="primary-btn" href="/register">
              Get Started
            </a>
            <a className="link" href="/login">
              Sign In
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
