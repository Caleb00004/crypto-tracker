import './table.css'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';


/* function Table ({coins, dataLoaded, currentItems}) {
    const {mode} = useContext(coinContext)
    dataLoaded && console.log(coins)

} */

const Items = ({ currentItems, mode }) => {
    
    const navigateTo = useNavigate()

    function sign(number) {
        if (number > 0) {
            return {color: 'green'}
        } else if (number < 0){
            return {color: 'red'}
        }
    }

    const coinElements = currentItems && currentItems.map(({image, symbol, current_price, price_change_percentage_24h, market_cap, market_cap_rank, id}) => (
        <tbody className={`${mode}-table-body`} key={id}>
            <tr onClick={() => navigateTo('/coin')}>
                <td className='img-row'><span className='number'>{market_cap_rank}</span> <img className='coin-icon' width={'25px'} src={image}/> <span className='coin-acronym'>{symbol.toUpperCase()}</span></td>
                <td>${current_price.toLocaleString("en-US")}</td>
                <td style={sign(price_change_percentage_24h)}>
                    {price_change_percentage_24h > 0 ? `+${price_change_percentage_24h.toFixed(2)}% ` : `${price_change_percentage_24h.toFixed(2)}%`} 
                </td>
                <td>${market_cap.toLocaleString('en-US')}</td>
            </tr> 
        </tbody>
    ))
    
    return (
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
    )
}          


export default function PaginatedItems({ itemsPerPage }) {
    const {mode, coinData} = useContext(coinContext)
    
        // We start with an empty list of items.
        console.log(itemsPerPage)
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
//            console.log('useEffect ran')
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(coinData.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(coinData.length / itemsPerPage));
            console.log(currentItems)
        }, [itemOffset, itemsPerPage]);

        console.log(coinData)

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % coinData.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
        };

        return (
        <>
            <Items currentItems={currentItems} mode={mode} />
            <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="< previous"
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
            renderOnZeroPageCount={null}
            />
        </>
        );

}
    
