import React from 'react';

import IconHeart from "../../../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";
import Add from '../../../../shared/AddCard/Add';
const RelatedAdds = ({relatedAdds}) => {
    return (
        <div id='related-adds-section'>
            
            {/* top header */}
            <div id="topHeader">
                <h2 className='text-24 text-[#222222] font-semibold'>Related Ads</h2>
            </div>
            
            <div id="adds" className='flex flex-wrap gap-3'>
                {relatedAdds?.map( (add) => (<Add add={add} key={add?._id}/>))}
            </div>
        </div>
    );
}

export default RelatedAdds;
