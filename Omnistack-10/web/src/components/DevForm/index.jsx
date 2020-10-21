import React, { useState, useEffect } from 'react';

const DevForm = ({ onSubmit }) => {
    const [github_username, setGithubUserName] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);


  const addUsuario = async (e) => {
    e.preventDefault();

    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
      });

      setGithubUserName('');
      setTechs('');;
}

  return (
        <form onSubmit={addUsuario}>
            <div className="input-block">
                <label htmlFor="">Usuário do Github</label>
                <input 
                type="text"
                name="github_username" 
                id="username_github" 
                value={github_username}
                onChange={e => setGithubUserName(e.target.value)}
                required
                />
            </div>

            <div className="input-block">
                <label htmlFor="">Tecnologias</label>
                <input 
                type="text" 
                name="techs" 
                id="techs" 
                value={techs}
                onChange={e => setTechs(e.target.value)}
                required
                />
            </div>

            <div className="input-group"> 
                <div className="input-block">
                <label htmlFor="">Latitude</label>
                <input 
                    type="number" 
                    name="latitude" 
                    id="latitude" 
                    value={latitude} 
                    onChange={e => setLatitude(e.target.value)}
                    required
                />       
                </div>

                <div className="input-block">
                <label htmlFor="">Longitude</label>
                <input 
                    type="number" 
                    name="longitude" 
                    id="longitude"
                    value={longitude} 
                    onChange={e => setLongitude(e.target.value)}
                    required
                />       
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );

}

export default DevForm;
