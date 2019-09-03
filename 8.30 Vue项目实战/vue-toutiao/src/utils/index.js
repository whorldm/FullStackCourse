/**
 * @file 工具函数的集合
 * @author caoyaqin
 */
import echarts from 'echarts';

const createThrottle = (delay = 1000) => {
    let timmer = null;
    return function throttle(fn) {
        if (!timmer) {
            timmer = setTimeout(() => {
                fn && fn();
                clearTimeout(timmer);
            }, delay)
        }
    }
}

const createDebounce = (delay = 1000) => {
    let timmer = null;
    return function debounce(fn) {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            fn && fn();
        }, delay)
    }
}

export const reachBottomNotify = {

    install: (Vue, options) => {

        Vue.mixin({

            data() {
                const data = {
                    scrollQueue: []
                } 
                return this.onReachBottom ? data : {};
            },

            created() {
                if(typeof this.onReachBottom === 'function') {
                    this.scrollQueue.forEach(() => {
                        this.onReachBottom();
                    });
                    this._listenScroll();
                }
            },

            methods: {

                _listenScroll() {

                    const THRESHOLD = 50;
                    const throttle = createThrottle(() => {
                        this.scrollQueue.forEach(fn => fn());
                    });
                    window.addEventListener('scroll', () => {
                        const offsetHeight = document.documentElement.offsetHeight;
                        const screenHeight = window.screenHeight;
                        const scrollY = window.scrollY;
                        const gap = offsetHeight - screenHeight - scrollY;
                        if(gap < THRESHOLD) {
                            throttle();
                        }
                    });
                    
                }

            }
        })
    }
}

export const functionalTool = {

    install: (Vue, options) => {

        Vue.mixin({
            methods: {
                createDebounce,
                createThrottle
            }
        });

        Vue.component('echarts', {

            props: {
                area: '',
                width: {
                    type: Number,
                    default: -1
                },
                height: {
                    type: Number,
                    default: -1
                },
                options: {
                    type: Object,
                    default: () => {}
                }
            },

            render(createElement) {
                return createElement(
                    'div',
                    {
                        attrs: {
                            id: this.randomId
                        },
                        style: this.canvasStyle,
                        directives: [
                            {
                                name: 'echarts'
                            }
                        ]
                    }
                );
            },

            mounted() {
                this.draw();
                this.$watch('options', function () {
                    this.draw();
                });
            },

            computed: {

                randomId() {
                    return 'echarts-' + Math.floor(Math.random() * 10);
                },

                canvasStyle() {
                    return {
                        height: this.height === -1 ? '100%' : this.height + 'px',
                        width: this.width === -1 ? '100%' : this.width + 'px'
                    }
                },

                drawOptions() {
                    const coloredData = this.options.series.data.map(item => {
                        if (item._area === this.area) {
                            return {
                                ...item,
                                itemStyle: {
                                    color: '#0f0'
                                }
                            };
                        }
                        return item;
                    });

                    return {
                        ...this.options,
                        series: {
                            ...this.options.series,
                            data: coloredData
                        }
                    };
                }
            },

            methods: {

                recieveEchartsContext(context) {
                    this.echartsContext = context;
                },

                draw() {
                    if(this.options) {
                        const options = this.drawOptions;
                        this.echartsContext.setOption(options);
                    }
                }

            }
        });

        Vue.directive('echarts', {
            inserted: (el, binding, vnode) => {
                const charts = echarts.init(el);
                vnode.context.recieveEchartsContext && vnode.context.recieveEchartsContext(charts);
            }
        });
    }

}