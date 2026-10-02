import https from 'https';

https.get('https://postimg.cc/XrW93Sdm', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/i\.postimg\.cc\/[^"']+/g);
    console.log(matches ? [...new Set(matches)] : 'No matches found');
  });
}).on('error', (err) => {
  console.error(err);
});
