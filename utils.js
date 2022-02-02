export function dateConvert(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date(date);
    return months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
}