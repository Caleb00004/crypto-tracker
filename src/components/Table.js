import './table.css'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { currencySymbol } from '../functions/currencySymbol'
import { fontColor } from '../functions/fontColor';
import { changeColor } from '../functions/changeColor';

export default function Table({ itemsPerPage, mode, coinData , currency }) {

    const [itemList, setitemList] = useState(null); // store current list of coins depending on current page
    const [pageCount, setPageCount] = useState(0); 
    const [itemOffset, setItemOffset] = useState(0); // store index of starting coin on a new page.
    const [formValue, setFormValue] = useState("") // stores inputed value in search form

    // Used to navigate to a different Route. Passed to each Table element.
    const navigateTo = useNavigate()
    
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage; // store index of last coin on a page.

        setitemList(coinData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(coinData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, currency, coinData]);


    // Invoke when user click to request another page. 
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % coinData.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);

    }; 

    // Mapping through the coinData State
    const coinElements = itemList && itemList.map(({image, symbol, current_price, price_change_percentage_24h, market_cap, market_cap_rank, id}) => {
        let marketCap = market_cap.toLocaleString('en-US')
        let sliceMarketCap = marketCap.slice(0, marketCap.indexOf(',')) 
        let numberOfComma = (marketCap.match(/,/g) || []).length // count of number of comma in market cap
        let M_B_T; // varible to store M[million], B[billion] or T[trillon] depending on number of comma's.

        function MBT() {
            if (numberOfComma == '2') {
                return M_B_T = 'M'
            } else if (numberOfComma == '3') {
                return M_B_T = 'B'
            } else if (numberOfComma == '4' ) {
                return M_B_T = 'T'
            }
        }

        return (
            <tbody className={`${mode}-table-body`} key={id}>
                <tr onClick={() => navigateTo(`/coin/${id}`)}>
                    <td className='img-row'><span className='number'>{market_cap_rank}</span> <img alt='coin Icon' className='coin-icon' width={'25px'} src={image}/> <span className='coin-acronym'>{symbol.toUpperCase()}</span></td>
                    <td >{currencySymbol(currency)}{current_price.toLocaleString("en-US")}</td>
                    <td style={changeColor(price_change_percentage_24h)}>
                        {price_change_percentage_24h > 0 ? `+${price_change_percentage_24h.toFixed(2)}% ` : `${price_change_percentage_24h.toFixed(2)}%`} 
                    </td>
                    <td>{currencySymbol(currency)}{sliceMarketCap}{MBT()}</td>
                </tr> 
            </tbody>
        )
    })

    // Styling the Input tag
    const background = (mode == 'light') ? 'white' : 'black'
    const inputStyle = {
        'width': '98%',
        'paddingTop': '7px',
        'paddingBottom' : '7px',
        'paddingLeft' : '8px',
        'marginBottom': '20px',
        'backgroundColor': `${background}`,
        'border': '1px solid black',
        'color': `${fontColor(mode)}`
    }   
    
    function handleFilter(event) {
        setFormValue(event)

        let filteredCoin = coinData.filter(dataItem => (
            dataItem.id.includes(event.toLowerCase())
        ))
        
        if (event) {
            setitemList(filteredCoin)
        } else { // if input box is empty, set itemList back to normal.
            const endOffset = itemOffset + itemsPerPage;
            setitemList(coinData.slice(itemOffset, endOffset));
        }
    }  

    return (
        <>
            <div className='table-component'>
                <input 
                    onChange={(e) => handleFilter(e.target.value)}
                    value={formValue}
                    style={inputStyle}
                    placeholder='Search for Coin By Name...'>    
                </input>
                <table className={`${mode}-table`}>
                    <tbody>
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </tbody>
                        {coinElements}
                </table>
            </div>
            <ReactPaginate
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="previous-link"
                nextClassName="page-item"
                nextLinkClassName="next-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
        
    )
}          
