
export function handleSeenClick(record: any) {
    let seenItems = JSON.parse(localStorage.getItem('moviesSeenList') as string) || [];
    seenItems.push(record);
    localStorage.setItem('moviesSeenList', JSON.stringify(seenItems));
  }

export function handleWatchClick(record: any) {
    let watchItems = JSON.parse(localStorage.getItem('moviesWatchList') as string) || [];
    watchItems.push(record);
    localStorage.setItem('moviesWatchList', JSON.stringify(watchItems));   
  }

export function removeWatchlistItem(record: any) {
    let watchItems = JSON.parse(localStorage.getItem('moviesWatchList') as string) || [];
    watchItems.splice(Number(record.key), 1);
    localStorage.setItem('moviesWatchList', JSON.stringify(watchItems));
    
}