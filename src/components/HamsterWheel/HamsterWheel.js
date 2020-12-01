/*
 * Import React dependencies
 */
import React from 'react';

/*
 * Import internal dependencies
 */
import Component from '../Component';

class HamsterWheel extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);

    this.elementRef = React.createRef();

    this.state = {
        height: null,
        maxHeight: null
    };
  }

  componentDidMount() {
      if (!this.props.height) {
          this.setState({ height: this.elementRef.current.children[0].clientHeight });
      } else {
          this.setState({ height: this.props.height });
      }

      if (this.props.autoscroll) this.scrollDown();
  }

  componentWillUnmount() {
      clearTimeout(this.state.scrollTimer);
  }

  render() {
      const {
          props: { className, clones, children, autoscroll, scrollBar, scrollSpeed, scrollDelta },
          state: { height, maxHeight }
      } = this;

      return (
          <div className={`hamsterWheel ${className}`} ref={this.elementRef}
              style={ !height ? null : {
                  overflowY: 'scroll',
                  scrollbarWidth: scrollBar ? 'none' : '', // Firefox
                  maxHeight: maxHeight ? maxHeight : '100vh',
              }}
              onScroll={ () => this.handleScroll() }
          >
              {[...Array(clones)].map((e, i) => <React.Fragment key={i}>{ children }</React.Fragment>)}
              { scrollBar ? '' :
                  <style>.hamsterWheel::-webkit-scrollbar
                      {'{ display: none; }'}
                  </style>
              }
          </div>
      )
  }

  handleScroll() {
      if( Math.abs(this.state.lastScrollTop - this.elementRef.current.scrollTop) >= this.props.scrollDelta &&  Math.abs(this.state.lastScrollTop - this.elementRef.current.scrollTop) < 200 && this.props.autoscroll === true ) {
          if ( this.elementRef.current.scrollTop > this.state.lastScrollTop ) {
              //scrolling down
              clearTimeout(this.state.scrollTimer);
              this.scrollDown();
          } else if ( this.elementRef.current.scrollTop < this.state.lastScrollTop ) {
              //scrolling up
              clearTimeout(this.state.scrollTimer);
              this.scrollUp();
          }
      }
      this.setState({ lastScrollTop: this.elementRef.current.scrollTop});

      // When scroll to extremities jump to opposite position
      if (this.props.infinite) {
          if ( Math.ceil(this.elementRef.current.scrollTop) >= this.elementRef.current.scrollHeight - this.state.height ) {
              this.elementRef.current.scrollTop = 0;
          } else if (this.elementRef.current.scrollTop == 0) {
              this.elementRef.current.scrollTop = this.elementRef.current.scrollHeight - this.state.height
          }
      }
  }

  scrollDown() {
      this.elementRef.current.scrollTop = this.elementRef.current.scrollTop + 1;
      this.setState({ scrollTimer: setTimeout(this.scrollDown, this.props.scrollSpeed)} );
  }

  scrollUp() {
      this.elementRef.current.scrollTop = this.elementRef.current.scrollTop - 1;
      this.setState({ scrollTimer: setTimeout(this.scrollUp, this.props.scrollSpeed)} );
  }
}

HamsterWheel.defaultProps = {
          clones: 2,
          autoscroll: true,
          scrollBar: false,
          scrollSpeed: 40,
          scrollDelta: 5,
          infinite: true
      };

export default HamsterWheel;
