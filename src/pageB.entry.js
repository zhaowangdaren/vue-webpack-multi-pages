import fetchJsonp from 'fetch-jsonp'
fetchJsonp('https://dl.app.gtja.com/operation/config/niurenniugu/share1/2017/10/11/8224472/201710111047/share.game-details.json', {
  jsonpCallbackFunction: 'niurenshare'
}).then(resp => {
  console.info(resp)
})
console.info('pageBAasdfe')
