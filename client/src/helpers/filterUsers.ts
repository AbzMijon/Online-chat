export const filterUsers = (usersToFilter: any, sortingValue: string, searchValue: string) => {
    const filterBysearchValue = usersToFilter.filter(user => {
        if(searchValue.length) {
            return user.name.toLowerCase().includes(searchValue.toLowerCase());
        }
        else {
            return usersToFilter;
        }
    })
    switch(sortingValue) {
        case '0':
            return filterBysearchValue.sort((prev: { level: number; }, next: { level: number; }) => next.level - prev.level);
        case '1':
            const sortByLevel = filterBysearchValue.sort((prev: { name: number; }, next: { name: number; }) => {
                if ( prev.name < next.name ) return -1;
                if ( prev.name < next.name ) return 1;
            });                
            return sortByLevel;
        case '2':
            return filterBysearchValue.sort((prev: { id: number; }, next: { id: number; }) => next.id - prev.id)
        default:
            return filterBysearchValue.sort((prev: { level: number; }, next: { level: number; }) => next.level - prev.level);
    }
}