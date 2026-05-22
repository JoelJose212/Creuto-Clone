const http = require('http');

const routes = [
  '/how-smes-can-leverage-ai',
  '/how-creuto-help-businesses-scale-smartly',
  '/why-every-business-owner-should-invest-in-custom-software',
  '/the-beginning-of-something-real',
  '/your-customers-are-on-mobile',
  '/custom-crm',
  '/software-partner',
  '/custom-software-development',
  '/customsoftware-roi',
  '/startup'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: route,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      resolve({ route, status: res.statusCode });
    });

    req.on('error', (e) => {
      resolve({ route, status: 'ERROR: ' + e.message });
    });

    req.end();
  });
}

async function run() {
  console.log('Testing 10 blog routes...');
  const results = [];
  for (const route of routes) {
    const res = await checkRoute(route);
    results.push(res);
  }
  console.table(results);
  const failed = results.filter(r => r.status !== 200);
  if (failed.length > 0) {
    console.error(`FAIL: ${failed.length} route(s) failed!`);
    process.exit(1);
  } else {
    console.log('SUCCESS: All routes returned 200 OK!');
    process.exit(0);
  }
}

run();
