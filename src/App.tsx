import { useEffect, useState } from 'react';
import './App.css';

type caracteres = {
  id: number;
  name: string;
  image: string;
  race: string;
  description: string;
  ki: number;
}

function App(){

  const [caracteres, setCaracteres] = useState<caracteres[]>([]);
  const [filtro, setFiltro] = useState('');

  const filtrados = caracteres.filter(caracter =>
    caracter.name.toLowerCase().includes(filtro.toLowerCase())
  );

  useEffect(() =>{
    obtenerPersonajes();
  },[])

  const obtenerPersonajes = async() => {
      const response = await fetch('https://dragonball-api.com/api/characters');
      const resultado = await response.json()
      console.log(resultado)
      setCaracteres(resultado.items)
  }


  return (
    <div className="contenedor">
      <input type="text" placeholder='buscar personaje' value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <h1>Resultados</h1>
      <div className="grid">
        {filtrados.map((caracter) => (
          <div className="card" key={caracter.id}>
            <img src={caracter.image} alt={caracter.name} />
            <h2>Nombre:</h2>
            <p>{caracter.name}</p>
            <h2>Raza:</h2>
            <p>{caracter.race}</p>
            <h2>Descripción:</h2>
            <p>{caracter.description}</p>
            <h2>Ki:</h2>
            <p>{caracter.ki}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default App;
