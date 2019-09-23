/**
 * @file echarts in argriculture file
 * @author caoyaqin
 */

import React, { useState, useEffect } from 'react';

export default () => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
		console.log('我被调用了：：!', price);
		return () => {
			console.log('componentWillUnmount!');
		};
	});

    return (
        <div onClick={() => setPrice(50)}>
            echarts{price}
        </div>
    );
}
