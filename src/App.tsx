import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// to be removed
interface WaterResult {
  code_departement: string;
  conclusion_conformite_prelevement: string;
  date_prelevement: string;
  libelle_parametre: string;
  nom_commune: string;
  nom_departement: string;
}

function App() {
  const [waterResults, setWaterResults] = useState<User[]>([]);
  console.log('🚀 ~ App ~ waterResults:', waterResults);

  // from hubeau API
  useEffect(() => {
    axios
      .get(
        'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?nom_commune=cozzano&size=20'
      )
      .then((res) => setWaterResults(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  function formatDate(dateString: string) {
    let formattedDate = {};
    const dateObject = new Date(dateString);

    // Obtention des composants de la date
    const day: number = dateObject.getDate();
    const month: number = dateObject.getMonth();
    const year: number = dateObject.getFullYear();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formattedDate = { day, month: month, year };
    return (
      <p>
        {day}/{month}/{year}
      </p>
    );
  }

  return (
    <div>
      {/** to be removed */}
      <h1>Water Results</h1>
      <ul>
        {waterResults.length > 4 &&
          waterResults.slice(0, 3).map((waterResult: WaterResult, id) => (
            <div key={id} style={{ marginBottom: '44px' }}>
              <h3>
                Commune de {waterResult.nom_commune} -{' '}
                {waterResult.nom_departement}
              </h3>
              <p>
                <strong>Conclusion des prélèvements : </strong>
                <i>{waterResult.conclusion_conformite_prelevement}</i>
              </p>
              <p>
                <strong>Date de prélèvement : </strong>
                <i>{formatDate(waterResult.date_prelevement)}</i>
              </p>
              <p>
                {' '}
                <strong>libellé paramètres: </strong>
              </p>
              <i>{waterResult.libelle_parametre}</i>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default App;
