import React from 'react';
import GitHubMark from './GitHub-Mark-32px.png';

const FooterComponent = () => (
    <footer className="footer-copyright">
        <div className="container">
            TicketMaster
            <a className="right" target="_blank" href="https://github.com/ph-dom/ticket-master" rel="noreferrer">
                <img src={GitHubMark} height="25" width="25" alt="GitHub Mark"/>
            </a>
        </div>
    </footer>
);

export default FooterComponent;