import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetcPro = await fetch(url);
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // Web api'den çekilen datayla timeout request arasında yarış yapılıyor. 10 saniyede fetch edemeze hata vermesini sağlıyor
    const data = await res.json(); // promise tüketilip parse ediliyor

    if (!res.ok) throw new Error(`${data.message} (${data.status}) `); // hata varsa özel bir hata mesajı üretiliyor
    return data; // resolved valu from a promise getJSON fonksiyonun getirdiği değer
  } catch (err) {
    throw err;
  }
};
