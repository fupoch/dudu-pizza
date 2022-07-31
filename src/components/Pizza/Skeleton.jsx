import React from 'react';

import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="124" r="123" /> 
    <rect x="3" y="268" rx="10" ry="10" width="280" height="27" /> 
    <rect x="3" y="311" rx="10" ry="10" width="280" height="88" /> 
    <rect x="10" y="430" rx="10" ry="10" width="93" height="27" /> 
    <rect x="113" y="419" rx="15" ry="15" width="163" height="44" />
  </ContentLoader>
)

export default Skeleton

