import React from 'react';

// import ReactDOM from 'react-dom';
// ReactDOM.render(
//     <div>
//        <span>创建</span>
//     </div>,
//     document.getElementById('app')
// )

const createElement = context => {
    const position = {
        x: 0,
        y: 0,
        height: 100,
        width: 100
    };
    return {
        position,

        getContext() {
            return context;
        },

        appendChild(vnode) {
            vnode.draw(context);
        },

        draw(currentContext) {
            currentContext.strokeRect(
                this.position.x,
                this.position.y,
                this.position.width,
                this.position.height
            )
        }
    }
}

const render = (vnode, container) => {
    const context = container.getContext('2d');
    const dom = createElement(context);
    console.log('vnode::::', vnode); 
    if (typeof vnode === 'string') {
        return context.fillText(vnode, 10, 20);
    }
    if (vnode.props && vnode.props.children) {
        const children = [].concat(vnode.props.children);
        children.forEach(child => render(child, dom));
    }
    return dom.draw(context);
}

render(
    <div>
        <span>优秀</span>
        <span>优秀</span>
    </div>,
    document.getElementById('app')
)