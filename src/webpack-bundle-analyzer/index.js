import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';
import LodashCom from './components/LodashCom';
import EchartsCom from './components/EchartsCom';

// 引入自己发布到npm的包
import lyz from 'lyz-react-npm-demo';

const { ReactDemo, CodeEditor } = lyz;
class APP extends React.PureComponent {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="app">
                <ReactDemo />
                <CodeEditor />
                <Example />
                <LodashCom />
                <EchartsCom />
            </div>
        );
    }
}

ReactDOM.render(<APP />, document.querySelector('#app'));