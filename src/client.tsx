import axios from "axios";

/*
*
      $a1000 = $member["properties"]["Aktien 1000"];
      $a500 = $member["properties"]["Aktien 500"];
      $a100 = $member["properties"]["Aktien 100"];
      $kredit = $member["properties"]["Bierkredit"];

*/

export type Article ={
  id: number
  title: string
  desctription: string
  price: number
  quantity: number
}

// type EntryGroup ={
//   title: string
//   date: string
//   children: number[]
//   links: AcccountLink[]
// }

// type AcccountLink = {
//   id: number
// }

export default axios.create({
  baseURL: 'https://brauereiimberg.webling.ch/api/1/',
  // baseURL: 'http://localhost:5000/index.php',
  // baseURL: 'https://www.brauereiimberg.ch/bierkasse/new/index.php',
  headers: {
    "Content-type": "application/json",
    'apikey': 'xxx'
  },
});