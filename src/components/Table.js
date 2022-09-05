import './table.css'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { currencySymbol } from '../functions/currencySymbol'
import { fontColor } from '../functions/fontColor';

// function component that generates and returns a table.
// This component is called in th Paginated Items component

export default function PaginatedItems({ itemsPerPage, mode, coinData , currency }) {
//const Items = ({ currentItems, mode, currency }) => {

    const [itemList, setitemList] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [formValue, setFormValue] = useState()

    // Used to navigate to a different Route. Passed to each Table element.
    const navigateTo = useNavigate()
    
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setitemList(coinData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(coinData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, currency, coinData]);

    // Invoke when user click to request another page. 
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % coinData.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);

    }; 

    function sign(number) {
        if (number > 0) {
            return {color: 'green'}
        } else if (number < 0){
            return {color: 'red'}
        }
    }

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
                    <td className='img-row'><span className='number'>{market_cap_rank}</span> <img className='coin-icon' width={'25px'} src={image}/> <span className='coin-acronym'>{symbol.toUpperCase()}</span></td>
                    <td >{currencySymbol(currency)}{current_price.toLocaleString("en-US")}</td>
                    <td style={sign(price_change_percentage_24h)}>
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
        'width': '100%',
        'paddingTop': '5px',
        'paddingBottom' : '5px',
        'marginBottom': '20px',
        'backgroundColor': `${background}`,
        'border': '1px solid black',
        'color': `${fontColor(mode)}`
    }   
    
    function handleChange(event) {
        console.log('handlechage')
        setFormValue(event)
        console.log(event)

        let test = coinData.filter(dataItem => (
//            dataItem.id.some(value => value.includes(event))
            dataItem.id.includes(event)
        ))
        
        if (event) {
            console.log(test.length)
            setitemList(test)
        }

        else {
            console.log('ran')
            const endOffset = itemOffset + itemsPerPage;
            setitemList(coinData.slice(itemOffset, endOffset));
        }

        console.log(test)

    }  
//    console.log(coinData)
//        console.log(formValue)
    return (
        <>
            <div className='table-component'>
                <input 
                    onChange={(e) => handleChange(e.target.value)}
                    value={formValue}
                    style={inputStyle}
                    placeholder='Search for a Coin...'>    
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

/* 

// Uses the Paginate library to generate paginated table of the Items function.
export default function PaginatedItems({ itemsPerPage, mode, coinData, currency }) {
//    const {mode, coinData} = useContext(coinContext)
        // We start with an empty list of items.
        console.log(`Page currency - ${currency}`)
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            console.log('useEffect ran')
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(coinData.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(coinData.length / itemsPerPage));
            console.log(currentItems)
        }, [itemOffset, itemsPerPage]);

        console.log('ran')

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % coinData.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
            setItemOffset(newOffset);

        }; 

        return (
        <>
            <Items currentItems={currentItems} mode={mode} currency={currency}/>
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
        );

}
    
*/