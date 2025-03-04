import data from './data.json';

export async function fetchSavingsData() {
  try {
    return {
      overview: data.overview,
      savingsTrends: data.savingsTrends,
      savingsByCategory: data.savingsByCategory,
      detailedSavings: data.detailedSavings
    };
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}