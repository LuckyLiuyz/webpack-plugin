import React, { useState } from 'react';
import './index.less';


export default function Example () {
    const [count, setCount] = useState(0);

    return (
        <div className="hooksOne">
            <p>You clicked { count } times</p>
            <button onClick={ () => setCount(count + 1) }>
                Click me
        </button>
        </div>
    );
}