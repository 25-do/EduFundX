export async function getTokenPerformanceHistory(days: number) {
  // Mock data for token performance history
  const history = []
  const initialPrice = 0.1
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const token_price = initialPrice + ((Math.random() * 0.05 - 0.025) * (days - i)) / days // Price fluctuates slightly
    history.push({
      date: date.toISOString(),
      token_price: Math.max(0.01, token_price), // Ensure price doesn't go below 0.01
    })
  }
  return history
}

