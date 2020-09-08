import React, { useState } from 'react';
import _ from 'lodash';


export default function LodashCom () {
    let tarArr = [{
        id: '123',
        value: 'demo1'
    }, {
        id: '145',
        value: 'demo2'
    }, {
        id: '542',
        value: 'demo3'
    }]
    let arr = _.concat(tarArr, {
        id: '754',
        value: 'demo777'
    }, {
        id: '693',
        value: 'demo888'
    });

    const [list, setList] = useState(arr);

    return (
        <ul className="LodashCom">
            <h3>Lodash 使用示例</h3>
            {
                list.map((item, index) => {
                    return <li key={ item.id }>{ item.value }</li>
                })
            }
        </ul>
    );
}