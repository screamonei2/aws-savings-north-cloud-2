import { writable } from 'svelte/store';

// Store para o período selecionado
export const selectedPeriod = writable(30);

// Store para os dados filtrados
export const filteredData = writable({
  overview: {
    totalSavings: 0,
    currentMonthSavings: 0,
    percentageChange: 0
  },
  savingsTrends: [] as { month: string; savings: number }[],
  savingsByCategory: [] as { service: string; savings: number }[],
  detailedSavings: [] as { date: string; service: string; amount: number }[]
});