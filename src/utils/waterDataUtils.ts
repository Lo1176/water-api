import axios from 'axios';

export async function fetchWaterDataByCityAndLimit(
  city: string = 'paris',
  limit: string = '5'
) {
  try {
    const response = await axios.get(
      `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?nom_commune=${city}&size=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}
