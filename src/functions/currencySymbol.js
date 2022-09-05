// function to determine currency symbol based on current currency.
export function currencySymbol(currency) {
    if (currency == 'USD') {
        return '$'
    } else if (currency == 'EUR') {
        return '€'
    } else {
        return  '₦' 
    }
}