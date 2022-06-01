import axios from 'axios';
import { Md5 } from "ts-md5/dist/md5";

export function random(len: 10) {
  const randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomArray = new Array(len)
    .fill(1)
    .map(() => randomString[Math.floor(Math.random() * 62)]);
  return randomArray.join('');
}
export async function baiduTranslate(word: string) {
  const appId = '***************';
  const appSecret = '****************';
  const salt = random(10);

  console.log();

  const signature = Md5.hashStr(`${appId}${word}${salt}${appSecret}`).toString();
  const res = await axios.get(
    `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${word}&from=en&to=zh&appid=${appId}&salt=${salt}&sign=${signature}`
  );
  console.log('axios data', res.data);
  return res.data;
}