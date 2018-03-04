/**
 * Our Vue.js application.
 *
 * This manages the entire front-end website.
 */

// The API we're using for grabbing metadata about each cryptocurrency
// (including logo images). The service can be found at:
// https://www.cryptocompare.com/api/
let CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
let CRYPTOCOMPARE_URI = "https://www.cryptocompare.com";

// The API we're using for grabbing cryptocurrency prices.  The service can be
// found at: https://coinmarketcap.com/api/
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

let CHECK_MARK = "https://thetinylife.com/wp-content/uploads/2017/08/checked-checkbox-512.png";
let WRONG_MARK = "https://cdn-images-1.medium.com/max/1600/1*-ioz6cNvcD9roazfd6TzGg.png";

let LOCAL_API = "http://localhost:8000/coins?from=1&to=20";
let PARSED_DATA = "http://coinchk.com/parsedData.json";

// The amount of milliseconds (ms) after which we should update our currency
// charts.
let UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {},
    parseData: {"1": {"is_forked": 0, "num_stars": 28639, "is_open_sourced": 1, "name": "bitcoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 28639, "is_open_issues_small": 1, "num_forks": 17002, "is_contributor_active": 1 }, "2": {"is_forked": 0, "num_stars": 14741, "is_open_sourced": 1, "name": "ethereum", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 14741, "is_open_issues_small": 1, "num_forks": 4489, "is_contributor_active": 1 }, "3": {"is_forked": 0, "num_stars": 2550, "is_open_sourced": 1, "name": "ripple", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2550, "is_open_issues_small": 1, "num_forks": 724, "is_contributor_active": 1 }, "4": {"is_forked": 0, "num_stars": 106, "is_open_sourced": 1, "name": "bitcoin-cash", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 106, "is_open_issues_small": 1, "num_forks": 56, "is_contributor_active": 0 }, "5": {"is_forked": 1, "num_stars": 2887, "is_open_sourced": 1, "name": "litecoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2887, "is_open_issues_small": 1, "num_forks": 1797, "is_contributor_active": 1 }, "6": {"is_forked": 0, "num_stars": 2072, "is_open_sourced": 1, "name": "neo", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2072, "is_open_issues_small": 1, "num_forks": 627, "is_contributor_active": 0 }, "7": {"is_forked": 0, "num_stars": 2145, "is_open_sourced": 1, "name": "cardano", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 2145, "is_open_issues_small": 1, "num_forks": 304, "is_contributor_active": 1 }, "8": {"is_forked": 0, "num_stars": 1337, "is_open_sourced": 1, "name": "stellar", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 1337, "is_open_issues_small": 1, "num_forks": 339, "is_contributor_active": 1 }, "9": {"is_forked": 0, "num_stars": 2591, "is_open_sourced": 1, "name": "monero", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2591, "is_open_issues_small": 1, "num_forks": 1176, "is_contributor_active": 1 }, "10": {"is_forked": 0, "num_stars": 4941, "is_open_sourced": 1, "name": "eos", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 4941, "is_open_issues_small": 1, "num_forks": 1008, "is_contributor_active": 1 }, "11": {"is_forked": 0, "num_stars": 2031, "is_open_sourced": 1, "name": "iota", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2031, "is_open_issues_small": 1, "num_forks": 384, "is_contributor_active": 0 }, "12": {"is_forked": 1, "num_stars": 935, "is_open_sourced": 1, "name": "dash", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 935, "is_open_issues_small": 1, "num_forks": 653, "is_contributor_active": 1 }, "13": {"is_forked": 0, "num_stars": 240, "is_open_sourced": 1, "name": "nem", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 240, "is_open_issues_small": 1, "num_forks": 75, "is_contributor_active": 0 }, "14": {"is_forked": 0, "num_stars": 1081, "is_open_sourced": 1, "name": "tron", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 1081, "is_open_issues_small": 1, "num_forks": 241, "is_contributor_active": 1 }, "15": {"is_forked": 0, "num_stars": 268, "is_open_sourced": 1, "name": "ethereum-classic", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 268, "is_open_issues_small": 1, "num_forks": 116, "is_contributor_active": 1 }, "16": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "tether", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "17": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "vechain", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "18": {"is_forked": 0, "num_stars": 1821, "is_open_sourced": 1, "name": "nano", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 1821, "is_open_issues_small": 1, "num_forks": 335, "is_contributor_active": 1 }, "19": {"is_forked": 0, "num_stars": 2051, "is_open_sourced": 1, "name": "lisk", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2051, "is_open_issues_small": 1, "num_forks": 296, "is_contributor_active": 1 }, "20": {"is_forked": 0, "num_stars": 758, "is_open_sourced": 1, "name": "qtum", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 758, "is_open_issues_small": 1, "num_forks": 167, "is_contributor_active": 1 }, "21": {"is_forked": 0, "num_stars": 509, "is_open_sourced": 1, "name": "bitcoin-gold", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 509, "is_open_issues_small": 1, "num_forks": 277, "is_contributor_active": 1 }, "22": {"is_forked": 0, "num_stars": 116, "is_open_sourced": 1, "name": "omisego", "is_development_recent": 0, "is_readme_good": 1, "num_watchers": 116, "is_open_issues_small": 1, "num_forks": 32, "is_contributor_active": 0 }, "23": {"is_forked": 0, "num_stars": 152, "is_open_sourced": 1, "name": "icon", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 152, "is_open_issues_small": 1, "num_forks": 54, "is_contributor_active": 0 }, "24": {"is_forked": 0, "num_stars": 3539, "is_open_sourced": 1, "name": "zcash", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 3539, "is_open_issues_small": 1, "num_forks": 1071, "is_contributor_active": 1 }, "25": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "binance-coin", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "26": {"is_forked": 0, "num_stars": 165, "is_open_sourced": 1, "name": "digixdao", "is_development_recent": 0, "is_readme_good": 1, "num_watchers": 165, "is_open_issues_small": 1, "num_forks": 39, "is_contributor_active": 0 }, "27": {"is_forked": 0, "num_stars": 1117, "is_open_sourced": 1, "name": "steem", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 1117, "is_open_issues_small": 1, "num_forks": 433, "is_contributor_active": 1 }, "28": {"is_forked": 0, "num_stars": 1248, "is_open_sourced": 1, "name": "verge", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 1248, "is_open_issues_small": 1, "num_forks": 367, "is_contributor_active": 1 }, "29": {"is_forked": 0, "num_stars": 386, "is_open_sourced": 1, "name": "stratis", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 386, "is_open_issues_small": 1, "num_forks": 157, "is_contributor_active": 1 }, "30": {"is_forked": 0, "num_stars": 36, "is_open_sourced": 1, "name": "bytecoin-bcn", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 36, "is_open_issues_small": 1, "num_forks": 18, "is_contributor_active": 0 }, "31": {"is_forked": 0, "num_stars": 6, "is_open_sourced": 1, "name": "populous", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 6, "is_open_issues_small": 1, "num_forks": 5, "is_contributor_active": 0 }, "32": {"is_forked": 0, "num_stars": 2457, "is_open_sourced": 1, "name": "siacoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2457, "is_open_issues_small": 1, "num_forks": 356, "is_contributor_active": 1 }, "33": {"is_forked": 0, "num_stars": 495, "is_open_sourced": 1, "name": "waves", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 495, "is_open_issues_small": 1, "num_forks": 151, "is_contributor_active": 1 }, "34": {"is_forked": 0, "num_stars": 179, "is_open_sourced": 1, "name": "rchain", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 179, "is_open_issues_small": 1, "num_forks": 49, "is_contributor_active": 0 }, "35": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "maker", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "36": {"is_forked": 0, "num_stars": 1820, "is_open_sourced": 1, "name": "dogecoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 1820, "is_open_issues_small": 1, "num_forks": 739, "is_contributor_active": 1 }, "37": {"is_forked": 1, "num_stars": 682, "is_open_sourced": 1, "name": "bitshares", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 682, "is_open_issues_small": 1, "num_forks": 272, "is_contributor_active": 1 }, "38": {"is_forked": 1, "num_stars": 304, "is_open_sourced": 1, "name": "decred", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 304, "is_open_issues_small": 1, "num_forks": 104, "is_contributor_active": 1 }, "39": {"is_forked": 0, "num_stars": 345, "is_open_sourced": 1, "name": "aeternity", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 345, "is_open_issues_small": 1, "num_forks": 53, "is_contributor_active": 0 }, "40": {"is_forked": 0, "num_stars": 2024, "is_open_sourced": 1, "name": "status", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2024, "is_open_issues_small": 1, "num_forks": 485, "is_contributor_active": 1 }, "41": {"is_forked": 0, "num_stars": 368, "is_open_sourced": 1, "name": "augur", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 368, "is_open_issues_small": 1, "num_forks": 72, "is_contributor_active": 0 }, "42": {"is_forked": 0, "num_stars": 426, "is_open_sourced": 1, "name": "0x", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 426, "is_open_issues_small": 1, "num_forks": 99, "is_contributor_active": 0 }, "43": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "waltonchain", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "44": {"is_forked": 1, "num_stars": 5, "is_open_sourced": 1, "name": "veritaseum", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 5, "is_open_issues_small": 1, "num_forks": 2, "is_contributor_active": 0 }, "45": {"is_forked": 1, "num_stars": 103, "is_open_sourced": 1, "name": "komodo", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 103, "is_open_issues_small": 1, "num_forks": 51, "is_contributor_active": 0 }, "46": {"is_forked": 1, "num_stars": 256, "is_open_sourced": 1, "name": "electroneum", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 256, "is_open_issues_small": 1, "num_forks": 112, "is_contributor_active": 1 }, "47": {"is_forked": 0, "num_stars": 194, "is_open_sourced": 1, "name": "ark", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 194, "is_open_issues_small": 1, "num_forks": 124, "is_contributor_active": 1 }, "48": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "ardor", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "49": {"is_forked": 0, "num_stars": 91, "is_open_sourced": 1, "name": "hshare", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 91, "is_open_issues_small": 1, "num_forks": 32, "is_contributor_active": 0 }, "50": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "basic-attention-token", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "51": {"is_forked": 1, "num_stars": 52, "is_open_sourced": 1, "name": "syscoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 52, "is_open_issues_small": 1, "num_forks": 14, "is_contributor_active": 1 }, "52": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "gas", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "53": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "kucoin-shares", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "54": {"is_forked": 0, "num_stars": 419, "is_open_sourced": 1, "name": "bytom", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 419, "is_open_issues_small": 1, "num_forks": 120, "is_contributor_active": 0 }, "55": {"is_forked": 0, "num_stars": 9, "is_open_sourced": 1, "name": "cryptonex", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 9, "is_open_issues_small": 1, "num_forks": 2, "is_contributor_active": 0 }, "56": {"is_forked": 0, "num_stars": 2262, "is_open_sourced": 1, "name": "golem-network-tokens", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 2262, "is_open_issues_small": 1, "num_forks": 228, "is_contributor_active": 1 }, "57": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "ethos", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "58": {"is_forked": 0, "num_stars": 537, "is_open_sourced": 1, "name": "dragonchain", "is_development_recent": 0, "is_readme_good": 1, "num_watchers": 537, "is_open_issues_small": 1, "num_forks": 126, "is_contributor_active": 0 }, "59": {"is_forked": 0, "num_stars": 213, "is_open_sourced": 1, "name": "digibyte", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 213, "is_open_issues_small": 1, "num_forks": 99, "is_contributor_active": 1 }, "60": {"is_forked": 1, "num_stars": 242, "is_open_sourced": 1, "name": "pivx", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 242, "is_open_issues_small": 1, "num_forks": 193, "is_contributor_active": 1 }, "61": {"is_forked": 0, "num_stars": 8, "is_open_sourced": 1, "name": "revain", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 8, "is_open_issues_small": 1, "num_forks": 14, "is_contributor_active": 0 }, "62": {"is_forked": 0, "num_stars": 199, "is_open_sourced": 1, "name": "factom", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 199, "is_open_issues_small": 1, "num_forks": 49, "is_contributor_active": 0 }, "63": {"is_forked": 0, "num_stars": 224, "is_open_sourced": 1, "name": "monacoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 224, "is_open_issues_small": 1, "num_forks": 67, "is_contributor_active": 1 }, "64": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "funfair", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "65": {"is_forked": 0, "num_stars": 205, "is_open_sourced": 1, "name": "zilliqa", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 205, "is_open_issues_small": 1, "num_forks": 40, "is_contributor_active": 0 }, "66": {"is_forked": 0, "num_stars": 142, "is_open_sourced": 1, "name": "loopring", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 142, "is_open_issues_small": 1, "num_forks": 38, "is_contributor_active": 0 }, "67": {"is_forked": 0, "num_stars": 282, "is_open_sourced": 1, "name": "aelf", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 282, "is_open_issues_small": 1, "num_forks": 66, "is_contributor_active": 0 }, "68": {"is_forked": 0, "num_stars": 41, "is_open_sourced": 1, "name": "aion", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 41, "is_open_issues_small": 1, "num_forks": 13, "is_contributor_active": 0 }, "69": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "qash", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "70": {"is_forked": 0, "num_stars": 331, "is_open_sourced": 1, "name": "nebulas-token", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 331, "is_open_issues_small": 1, "num_forks": 75, "is_contributor_active": 0 }, "71": {"is_forked": 0, "num_stars": 338, "is_open_sourced": 1, "name": "byteball", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 338, "is_open_issues_small": 1, "num_forks": 111, "is_contributor_active": 0 }, "72": {"is_forked": 1, "num_stars": 245, "is_open_sourced": 1, "name": "reddcoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 245, "is_open_issues_small": 1, "num_forks": 99, "is_contributor_active": 1 }, "73": {"is_forked": 0, "num_stars": 258, "is_open_sourced": 1, "name": "zcoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 258, "is_open_issues_small": 1, "num_forks": 187, "is_contributor_active": 0 }, "74": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "iconomi", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "75": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "salt", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "76": {"is_forked": 1, "num_stars": 61, "is_open_sourced": 1, "name": "particl", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 61, "is_open_issues_small": 1, "num_forks": 18, "is_contributor_active": 1 }, "77": {"is_forked": 0, "num_stars": 95, "is_open_sourced": 1, "name": "gxshares", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 95, "is_open_issues_small": 1, "num_forks": 27, "is_contributor_active": 0 }, "78": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "dent", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "79": {"is_forked": 0, "num_stars": 116, "is_open_sourced": 1, "name": "kyber-network", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 116, "is_open_issues_small": 1, "num_forks": 35, "is_contributor_active": 0 }, "80": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "iostoken", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "81": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "chainlink", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "82": {"is_forked": 0, "num_stars": 59, "is_open_sourced": 1, "name": "polymath-network", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 59, "is_open_issues_small": 1, "num_forks": 11, "is_contributor_active": 0 }, "83": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "cindicator", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "84": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "kin", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "85": {"is_forked": 0, "num_stars": 9, "is_open_sourced": 1, "name": "dentacoin", "is_development_recent": 0, "is_readme_good": 1, "num_watchers": 9, "is_open_issues_small": 1, "num_forks": 8, "is_contributor_active": 0 }, "86": {"is_forked": 0, "num_stars": 633, "is_open_sourced": 1, "name": "enigma-project", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 633, "is_open_issues_small": 1, "num_forks": 177, "is_contributor_active": 1 }, "87": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "power-ledger", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "88": {"is_forked": 0, "num_stars": 46, "is_open_sourced": 1, "name": "bitcore", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 46, "is_open_issues_small": 1, "num_forks": 48, "is_contributor_active": 0 }, "89": {"is_forked": 0, "num_stars": 58, "is_open_sourced": 1, "name": "neblio", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 58, "is_open_issues_small": 1, "num_forks": 28, "is_contributor_active": 0 }, "90": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "nxt", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "91": {"is_forked": 0, "num_stars": 363, "is_open_sourced": 1, "name": "bancor", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 363, "is_open_issues_small": 1, "num_forks": 110, "is_contributor_active": 0 }, "92": {"is_forked": 0, "num_stars": 232, "is_open_sourced": 1, "name": "request-network", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 232, "is_open_issues_small": 1, "num_forks": 22, "is_contributor_active": 0 }, "93": {"is_forked": 1, "num_stars": 39, "is_open_sourced": 1, "name": "smartcash", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 39, "is_open_issues_small": 1, "num_forks": 28, "is_contributor_active": 0 }, "94": {"is_forked": 0, "num_stars": 574, "is_open_sourced": 1, "name": "maidsafecoin", "is_development_recent": 1, "is_readme_good": 0, "num_watchers": 574, "is_open_issues_small": 1, "num_forks": 79, "is_contributor_active": 0 }, "95": {"is_forked": 1, "num_stars": 47, "is_open_sourced": 1, "name": "blocknet", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 47, "is_open_issues_small": 1, "num_forks": 22, "is_contributor_active": 1 }, "96": {"is_forked": 0, "num_stars": 69, "is_open_sourced": 1, "name": "nexus", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 69, "is_open_issues_small": 1, "num_forks": 41, "is_contributor_active": 0 }, "97": {"is_forked": 0, "num_stars": 199, "is_open_sourced": 1, "name": "singularitynet", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 199, "is_open_issues_small": 1, "num_forks": 72, "is_contributor_active": 0 }, "98": {"is_forked": 1, "num_stars": 1, "is_open_sourced": 1, "name": "pillar", "is_development_recent": 0, "is_readme_good": 1, "num_watchers": 1, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "99": {"is_forked": 0, "num_stars": 0, "is_open_sourced": 0, "name": "tenx", "is_development_recent": 0, "is_readme_good": 0, "num_watchers": 0, "is_open_issues_small": 1, "num_forks": 0, "is_contributor_active": 0 }, "100": {"is_forked": 1, "num_stars": 270, "is_open_sourced": 1, "name": "vertcoin", "is_development_recent": 1, "is_readme_good": 1, "num_watchers": 270, "is_open_issues_small": 1, "num_forks": 92, "is_contributor_active": 1 } }
  },
  methods: {

    /**
     * Load up all cryptocurrency data.  This data is used to find what logos
     * each currency has, so we can display things in a friendly way.
     */
    getCoinData: function() {
      let self = this;

      axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },

    /**
     * Get the top 10 cryptocurrencies by value.  This data is refreshed each 5
     * minutes by the backing API service.
     */
    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=16")
        .then((resp) => {
          this.coins = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /**
     * Given a cryptocurrency ticket symbol, return the currency's logo
     * image.
     */
    getCoinImage: function(symbol) {

      // These two symbols don't match up across API services. I'm manually
      // replacing these here so I can find the correct image for the currency.
      //
      // In the future, it would be nice to find a more generic way of searching
      // for currency images
      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      return CRYPTOCOMPARE_URI + this.coinData[symbol].ImageUrl;
    },

    // DEV METHODS
    // getParseData: function() {
    //   let self = this;
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   const url = "http://coinchk.com/parsedData.json"; // site that doesn’t send Access-Control-*
    //   fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    //   .then(response => response.text())
    //   // .then(contents => console.log(contents))
    //   .then((resp) => {
    //       this.parseData = resp.data;
    //     })
    //   .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

      // axios.get(LOCAL_API)
      //   .then((resp) => {
      //     this.parseData = resp.data;
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
      
    },
    getOpenSource: function(rank) {
      return rank > 1.00 ? CHECK_MARK : WRONG_MARK;
      
    },
    
    getForked: function(num) {
      return num > 1.00 ? CHECK_MARK : WRONG_MARK;
    },
    getReadme: function(num) {
      return num > 500 ? CHECK_MARK : WRONG_MARK;
    },
    getContributions: function(num) {
      return num > 15 ? CHECK_MARK : WRONG_MARK;
    },
    getRecentCommits: function(num) {
      return num < 2 ? CHECK_MARK : WRONG_MARK;
    },
    getIssues: function(num) {
      return num < 50 ? CHECK_MARK : WRONG_MARK;
    },
    getStars: function(num) {
      return num;
    },

    // END DEV METHODS

    /**
     * Return a CSS color (either red or green) depending on whether or
     * not the value passed in is negative or positive.
     */
    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    },
  },

  /**
   * Using this lifecycle hook, we'll populate all of the cryptocurrency data as
   * soon as the page is loaded a single time.
   */
  created: function () {
    this.getCoinData();
    // this.getParseData();
  }
});

/**
 * Once the page has been loaded and all of our app stuff is working, we'll
 * start polling for new cryptocurrency data every minute.
 *
 * This is sufficiently dynamic because the API's we're relying on are updating
 * their prices every 5 minutes, so checking every minute is sufficient.
 */
setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);




