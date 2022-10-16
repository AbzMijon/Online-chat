export const filterMessages = (messsagesToFilter:any, searchValue: string) => messsagesToFilter.filter(mess => {
    let isPassed = true;
    if(mess.event === 'message' && searchValue && !mess.message.toLowerCase().includes(searchValue.toLowerCase())) {
        isPassed = false;
    }
    return isPassed;
})