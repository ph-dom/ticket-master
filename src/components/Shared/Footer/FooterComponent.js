import React from 'react';
import GitHubMark from './GitHub-Mark-32px.png';
import './FooterStyles.css';

const FooterComponent = () => (
    <footer>
        <p>TicketMaster</p>
        <a target="_blank" href="https://github.com/ph-dom/ticket-master" rel="noreferrer">
            <img src={GitHubMark} height="25" width="25" alt="GitHub Mark"/>
        </a>
    </footer>
);

export default FooterComponent;