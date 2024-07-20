import React from 'react'


type PostdeatilProp = {
    params:{
        id:string
    }
}

const Postdetail:React.FC<PostdeatilProp> = async ({params}) =>  {
  return (
    <div>
         {params.id}
    </div>
  )
}


export default Postdetail;
