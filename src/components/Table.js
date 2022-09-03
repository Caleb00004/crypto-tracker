import './table.css'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { currencySymbol } from '../functions/currencySymbol'

// function component that generates and returns a table.
// This component is called in th Paginated Items component

export default function PaginatedItems({ itemsPerPage, mode, currentItems , currency }) {
//const Items = ({ currentItems, mode, currency }) => {

    const [itemList, setitemList] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const navigateTo = useNavigate()
    
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setitemList(currentItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(currentItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, currency, currentItems]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % currentItems.length;
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

    const coinElements = itemList && itemList.map(({image, symbol, current_price, price_change_percentage_24h, market_cap, market_cap_rank, id}) => (
        <tbody className={`${mode}-table-body`} key={id}>
            <tr onClick={() => navigateTo(`/coin/${id}`)}>
                <td className='img-row'><span className='number'>{market_cap_rank}</span> <img className='coin-icon' width={'25px'} src={image}/> <span className='coin-acronym'>{symbol.toUpperCase()}</span></td>
                <td>{currencySymbol(currency)}{current_price.toLocaleString("en-US")}</td>
                <td style={sign(price_change_percentage_24h)}>
                    {price_change_percentage_24h > 0 ? `+${price_change_percentage_24h.toFixed(2)}% ` : `${price_change_percentage_24h.toFixed(2)}%`} 
                </td>
                <td>{currencySymbol(currency)}{market_cap.toLocaleString('en-US')}</td>
            </tr> 
        </tbody>
    ))
    
    return (
        <>
            <div className='table-component'>

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