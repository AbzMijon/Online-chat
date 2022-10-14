export const userlvlColor = (lvl: number | string) => {
    if(lvl >= 50) {
        return '#b54a4a';
    }
    if(lvl >= 40) {
        return '#b075bd';
    }
    if(lvl >= 30) {
        return '#75bdaa';
    }
    if(lvl >= 20) {
        return '#b4bd75';
    }
    if(lvl >= 10) {
        return '#bda175';
    }
    if(lvl >= 0) {
        return 'rgb(102 102 102)';
    }
}