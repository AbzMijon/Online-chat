export const filterUsers = (usersToFilter: any, sortingValue: string) => {
    switch(sortingValue) {
        case '0':
            return usersToFilter.sort((prev: { level: number; }, next: { level: number; }) => next.level - prev.level);
        case '1':
            const sortByLevel = usersToFilter.sort((prev: { name: number; }, next: { name: number; }) => {
                if ( prev.name < next.name ) return -1;
                if ( prev.name < next.name ) return 1;
            });                
            return sortByLevel;
        case '2':
            return usersToFilter.sort((prev: { id: number; }, next: { id: number; }) => next.id - prev.id)
        default:
            return usersToFilter.sort((prev: { level: number; }, next: { level: number; }) => next.level - prev.level);
    }
}