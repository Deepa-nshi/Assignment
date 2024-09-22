// Fetch ticker data and populate the table
function fetchCryptoData() {
    // Fetch data from your backend API
    fetch('http://localhost:3001/api/tickers')
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
            console.log('API Data:', data);

            if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
                console.error('No valid ticker data found:', data);
                document.getElementById('crypto-data').innerHTML = '<tr><td colspan="5">No data available</td></tr>';
                return;
            }

            const tableBody = document.getElementById('crypto-data'); // Get the table body element
             
            // Clear any existing rows
            tableBody.innerHTML = '';

            // Get the top 10 entries from the object (limit to first 10 pairs)
            const top10Data = Object.keys(data).slice(0, 10);

            // Iterate over the top 10 trading pairs and add rows to the table
            top10Data.forEach((key, index) => {
                const ticker = data[key];

                // Get the required data for each trading pair
                const lastPrice = parseFloat(ticker.last).toFixed(2);
                const buyPrice = parseFloat(ticker.buy).toFixed(2);
                const sellPrice = parseFloat(ticker.sell).toFixed(2);
                const difference = ((buyPrice - lastPrice) / lastPrice * 100).toFixed(2);
                const savings = (sellPrice - lastPrice).toFixed(2);

                // Create a new row
                const row = document.createElement('tr');

                // Add trading pair name
                const platformCell = document.createElement('td');
                platformCell.textContent = ticker.name || `Pair ${index + 1}`;
                row.appendChild(platformCell);

                // Last Traded Price
                const lastPriceCell = document.createElement('td');
                lastPriceCell.textContent = `₹${lastPrice}`;
                row.appendChild(lastPriceCell);

                // Buy / Sell Price
                const buySellCell = document.createElement('td');
                buySellCell.textContent = `₹${buyPrice} / ₹${sellPrice}`;
                row.appendChild(buySellCell);

                // Difference (Buy Price vs Last Price)
                const differenceCell = document.createElement('td');
                differenceCell.textContent = `${difference}%`;
                row.appendChild(differenceCell);

                // Savings (Sell Price vs Last Price)
                const savingsCell = document.createElement('td');
                savingsCell.textContent = `₹${savings}`;
                row.appendChild(savingsCell);

                // Append the row to the table
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('crypto-data').innerHTML = '<tr><td colspan="5">Error loading data</td></tr>';
        });
}

// Call the fetchCryptoData function when the page loads
document.addEventListener('DOMContentLoaded', fetchCryptoData);
