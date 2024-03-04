export function formatDateTime(date:Date | string) {
    if(typeof date === 'string') {
        date = new Date(date);
    }
    const dString = new Intl.DateTimeFormat("en-In", {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    }).format(date);
    return dString.replace("IST", "");
}

export function capitalizeFirstLetter(str:string) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}
