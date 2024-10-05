import React from 'react'

export const Pagination = ({ prev, next, onPrevious, onNext }) => {

    const handlePrevious = () => {
        onPrevious();
    }
    const handleNext = () => {
        onNext();
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                {
                    prev ?
                        <li className='page-item'>
                            <button  style={{ background: "black" }} className='page-link rickFont' onClick={handlePrevious}>previous</button>
                        </li> : null
                }
                {
                    next ?
                        <li className='page-item'>
                            <button style={{ background: "black" }} className='page-link rickFont' onClick={handleNext}>next</button>
                        </li> : null

                }
            </ul>

        </nav>
    )
}
export default Pagination
