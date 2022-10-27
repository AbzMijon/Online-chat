export const userlvlColor = (lvl: number | string) => {
    if(lvl >= 250) {
        return '#b54a4a';
    }
    if(lvl >= 200) {
        return '#b075bd';
    }
    if(lvl >= 150) {
        return '#75bdaa';
    }
    if(lvl >= 100) {
        return '#b4bd75';
    }
    if(lvl >= 50) {
        return '#bda175';
    }
    if(lvl >= 0) {
        return 'rgb(102 102 102)';
    }
}