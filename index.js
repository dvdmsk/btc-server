const http = require("http");
const url = require("url");

function generateQuotes(startTimestamp, interval, count) {
  const quotes = [];
  const minPrice = 1000;
  const maxPrice = 10000;

  function calculateInterval (interval_) {
    const time = interval_.match(/(\d+)(\w+)/);

    switch(time[2]) {
      case 'm':
        return +time[1] * 60 * 1000;
      case 'h':
        return +time[1] * 60 * 60 * 1000;
      case 'd':
        return +time[1] * 24 * 60 * 60 * 1000;
    }
  };

  for (let i = 0; i < count; i++) {
    const time = new Date(startTimestamp + i * calculateInterval(interval));
    const percent = i / count;
    const price = Math.random() * 10000 + 1000;

    quotes.push({
      timestamp: time.toISOString(),
      quote: {
        USD: {
          percent_change_1h: Math.random() * 0.2 - 0.1,
          percent_change_24h: Math.random() * 2 - 1,
          percent_change_7d: Math.random() * 5 - 2.5,
          percent_change_30d: Math.random() * 10 - 5,
          price: +price.toFixed(2),
          volume_24h: 30000000000 + Math.random() * 1e9,
          market_cap: 2000000000000 + Math.random() * 1e10,
          total_supply: 19876184,
          circulating_supply: 19876184,
          timestamp: time.toISOString(),
        },
      },
    });
  }

  return quotes;
}

function generateFullJSON(startTimestamp, interval, count) {
  const now = new Date().toISOString();
  const quotes = generateQuotes(startTimestamp, interval, count);

  return {
    code: "000000",
    message: null,
    messageDetail: null,
    data: {
      body: {
        status: {
          timestamp: now,
          error_code: 0,
          error_message: null,
          elapsed: 74,
          credit_count: 3,
          notice: null,
        },
        data: {
          quotes,
          id: 1,
          name: "Bitcoin",
          symbol: "BTC",
          is_active: 1,
          is_fiat: 0,
        },
      },
      success: true,
    },
    success: true,
  };
}

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  //
  if (parsedUrl.pathname === "/price/btc") {
    const { time_start, interval = '5m', count = 288 } = parsedUrl.query;

    const start = time_start
      ? parseInt(time_start, 10) * 1000
      : Date.now();

    const response = generateFullJSON(start, interval, parseInt(count, 10));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(3000, () => console.log("Server: http://localhost:3000/price/btc"));
