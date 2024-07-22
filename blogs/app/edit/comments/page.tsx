import React from 'react'
import Commentlist from './Commentlist';

const CommentPage:React.FC = () => {

  return (
    <div>
        <h1 className='mt-5 text-center font-bold font-serif text-xl'>CommentPage:React.FC</h1>


        <section >
        <Commentlist/>
        </section>
  
    </div>
  )

}

export default CommentPage;