import React from 'react';
import './styles.css';


const DevItem = ({ 
    github_username,
    avatar_url, 
    name, 
    techs, 
    bio,
}) => (
    <li className="dev-item">
      <header>
        <img src={avatar_url} alt={name} />
        <div className="user-info">
          <strong>{name}</strong>
          <span>{techs.join(', ')}</span>
        </div>
      </header>
      <p>{bio}</p>
      <a href={`https://github.com/${github_username}`}>Acessar perfil no Github</a>
    </li>    
);

export default DevItem;
