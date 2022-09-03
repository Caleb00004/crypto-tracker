export function currencySymbol(currency) {
    if (currency == 'USD') {
        return '$'
    } else if (currency == 'EUR') {
        return '€'
    } else {
        return  '₦' 
    }
}