
export const formatMoney = (money: number) => money.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
export function truncate(str:string, n:number){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};
