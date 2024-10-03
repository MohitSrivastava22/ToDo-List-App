import React from 'react'
function Navbar(){
    return(
        <>
        <div className=' bg-slate-600 flex justify-between p-2 text-white '>
        <h1 className='font-bold text-xl'>iTask</h1>
        <nav className='cursor-pointer'>
            <ul className='flex gap-5'>
                <li className='hover:font-bold transition-all'>Home</li>
                <li className='hover:font-bold transition-all'>About</li>
                <li className='hover:font-bold transition-all'>Contact Us</li>
            </ul>
        </nav>
        </div>
        </>
    )
}
export default Navbar
