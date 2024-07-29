import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import { WaterResult } from './types/WaterResult';
import { fetchWaterDataByCityAndLimit } from './utils/waterDataUtils';

function App() {
  const [waterResults, setWaterResults] = useState<WaterResult[]>([]);
  console.log('🚀 ~ App ~ waterResults:', waterResults);

  const selectedCity = 'cozzano';
  const selectedLimit = '5';

  useEffect(() => {
    async function getWaterResultsByCityWithLimit(city: string, limit: string) {
      try {
        const dataResult: Array<WaterResult> =
          await fetchWaterDataByCityAndLimit(city, limit);
        setWaterResults(dataResult);
      } catch (error) {
        console.error('Erreur :', error);
      }
    }
    getWaterResultsByCityWithLimit(selectedCity, selectedLimit);
  }, [selectedCity, selectedLimit]);

  function formatDate(dateString: string) {
    const frenchFormattedDate: string = new Date(dateString).toLocaleDateString(
      'fr'
    );

    return <p>{frenchFormattedDate}</p>;
  }

  return (
    <div>
      <h1>Water Results</h1>
      {waterResults.length !== 0 && (
        <ul>
          <div className='water-results'>
            <h3>
              Commune de {waterResults[0].nom_commune} -{' '}
              {waterResults[0].nom_departement}
            </h3>
            <div>
              <strong>Conclusion des prélèvements : </strong>
              <i>{waterResults[0].conclusion_conformite_prelevement}</i>
            </div>
            <div>
              <strong>Date de prélèvement : </strong>
              <i>{formatDate(waterResults[0].date_prelevement)}</i>
            </div>
            <div>
              <strong>libellé paramètres: </strong>
              <i>{waterResults[0].libelle_parametre}</i>
            </div>
          </div>
        </ul>
      )}
      <Map />
    </div>
  );
}

export default App;
