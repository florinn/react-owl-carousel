'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import '../src/owl.carousel.css';

const owlCarouselOptions = {
	core: [
		'items',
		'loop',
		'center',
		'rewind',

		'mouseDrag',
		'touchDrag',
		'pullDrag',
		'freeDrag',

		'margin',
		'stagePadding',

		'merge',
		'mergeFit',
		'autoWidth',

		'startPosition',
		'rtl',

		'smartSpeed',
		'fluidSpeed',
		'dragEndSpeed',

		'responsive',
		'responsiveRefreshRate',
		'responsiveBaseElement',

		'fallbackEasing',

		'info',

		'nestedItemSelector',
		'itemElement',
		'stageElement',

		'refreshClass',
		'loadedClass',
		'loadingClass',
		'rtlClass',
		'responsiveClass',
		'dragClass',
		'itemClass',
		'stageClass',
		'stageOuterClass',
		'grabClass'
	],
	autorefresh: [
		'autoRefresh',
		'autoRefreshInterval'
	],
	lazy: [
		'lazyLoad'
	],
	autoHeight: [
		'autoHeight',
		'autoHeightClass'
	],
	video: [
		'video',
		'videoHeight',
		'videoWidth'
	],
	animate: [
		'animateOut',
		'animateIn'
	],
	autoplay: [
		'autoplay',
		'autoplayTimeout',
		'autoplayHoverPause',
		'autoplaySpeed'
	],
	navigation: [
		'nav',
		'navText',
		'navSpeed',
		'navElement',
		'navContainer',
		'navContainerClass',
		'navClass',
		'slideBy',
		'dotClass',
		'dotsClass',
		'dots',
		'dotsEach',
		'dotsData',
		'dotsSpeed',
		'dotsContainer'
	],
	hash: [
		'URLhashListener'
	]
};

const owlCarouselEvents = {
	core: [
		'onInitialize',
		'onInitialized',
		'onResize',
		'onResized',
		'onRefresh',
		'onRefreshed',
		'onDrag',
		'onDragged',
		'onTranslate',
		'onTranslated',
		'onChange',
		'onChanged'
	],
	lazy: [
		'onLoadLazy',
		'onLoadedLazy'
	],
	video: [
		'onStopVideo',
		'onPlayVideo'
	]
};

class OwlCarousel extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.next = () => this.$car.next();
		this.prev = () => this.$car.prev();
		this.goTo = (x) => this.$car.to(x);

		this.currentPosition = 0;
		this.onTranslate = this.onTranslate.bind(this);
	}

	componentDidMount() {
		require('../src/owl.carousel');
		let options = this.getOptions();
		this.init(options);
	}

	componentWillReceiveProps(nextProps) {
		this.destroy();
	}

	componentDidUpdate(prevProps, prevState) {
		let options = this.getOptions();
		options.startPosition = this.currentPosition;
		this.init(options);
	}

	componentWillUnmount() {
		this.destroy();
	}

	init(options) {
		let next = options.onTranslate;
		options.onTranslate = this.onTranslate(next);
		this.$node.owlCarousel(options);
		this.$car = this.$node.data('owl.carousel');
	}

	destroy() {
		this.$car.destroy();
	}

	getOptions() {
		const options = {};

		let carOptions = Object.values(owlCarouselOptions)
			.reduce((a, v) => a.concat(v), []);

		carOptions.forEach(val => {
			if (val in this.props.options)
				options[val] = this.props.options[val];
		});

		let carEvents = Object.values(owlCarouselEvents)
			.reduce((a, v) => a.concat(v), []);

		carEvents.forEach(val => {
			if (val in this.props.events)
				options[val] = this.props.events[val];
		});

		return options;
	}

	onTranslate = next => event => {
		this.currentPosition = event.item.index;
		if (next)
			next(event);
	}

	render() {
		const {
			options,
			events,
			children,
			...props,
		} = this.props;

		return (
			<div ref={(item) => this.$node = $(findDOMNode(item))} className='owl-carousel owl-theme' {...props}>
				{children}
			</div>
		);
	}
}

OwlCarousel.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element.isRequired),
	]).isRequired,

	style: PropTypes.object,
	id: PropTypes.string,

	options: PropTypes.shape({
		// core
		items: PropTypes.number,
		loop: PropTypes.bool,
		center: PropTypes.bool,
		rewind: PropTypes.bool,

		mouseDrag: PropTypes.bool,
		touchDrag: PropTypes.bool,
		pullDrag: PropTypes.bool,
		freeDrag: PropTypes.bool,

		margin: PropTypes.number,
		stagePadding: PropTypes.number,

		merge: PropTypes.bool,
		mergeFit: PropTypes.bool,
		autoWidth: PropTypes.bool,

		startPosition: PropTypes.number,
		rtl: PropTypes.bool,

		smartSpeed: PropTypes.number,
		fluidSpeed: PropTypes.bool,
		dragEndSpeed: PropTypes.bool,

		responsive: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.object,
		]),
		responsiveRefreshRate: PropTypes.number,
		responsiveBaseElement: PropTypes.object,

		fallbackEasing: PropTypes.string,

		info: PropTypes.bool,

		nestedItemSelector: PropTypes.bool,
		itemElement: PropTypes.string,
		stageElement: PropTypes.string,

		refreshClass: PropTypes.string,
		loadedClass: PropTypes.string,
		loadingClass: PropTypes.string,
		rtlClass: PropTypes.string,
		responsiveClass: PropTypes.string,
		dragClass: PropTypes.string,
		itemClass: PropTypes.string,
		stageClass: PropTypes.string,
		stageOuterClass: PropTypes.string,
		grabClass: PropTypes.string,

		// autoRefresh
		autoRefresh: PropTypes.bool,
		autoRefreshInterval: PropTypes.number,

		// lazy
		lazyLoad: PropTypes.bool,

		// autoHeight
		autoHeight: PropTypes.bool,
		autoHeightClass: PropTypes.string,

		// video
		video: PropTypes.bool,
		videoHeight: PropTypes.bool,
		videoWidth: PropTypes.bool,

		// animate
		animateOut: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.string,
		]),
		animateIn: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.string,
		]),

		// autoplay
		autoplay: PropTypes.bool,
		autoplayTimeout: PropTypes.number,
		autoplayHoverPause: PropTypes.bool,
		autoplaySpeed: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.number,
		]),

		// navigation
		nav: PropTypes.bool,
		navText: PropTypes.array,
		navSpeed: PropTypes.bool,
		navElement: PropTypes.string,
		navContainer: PropTypes.bool,
		navContainerClass: PropTypes.string,
		navClass: PropTypes.array,
		slideBy: PropTypes.number,
		dotClass: PropTypes.string,
		dotsClass: PropTypes.string,
		dots: PropTypes.bool,
		dotsEach: PropTypes.bool,
		dotsData: PropTypes.bool,
		dotsSpeed: PropTypes.bool,
		dotsContainer: PropTypes.bool,

		// hash
		URLhashListener: PropTypes.bool
	}),

	events: PropTypes.shape({
		// core
		onInitialize: PropTypes.func,
		onInitialized: PropTypes.func,
		onResize: PropTypes.func,
		onResized: PropTypes.func,
		onRefresh: PropTypes.func,
		onRefreshed: PropTypes.func,
		onDrag: PropTypes.func,
		onDragged: PropTypes.func,
		onTranslate: PropTypes.func,
		onTranslated: PropTypes.func,
		onChange: PropTypes.func,
		onChanged: PropTypes.func,

		// lazy
		onLoadLazy: PropTypes.func,
		onLoadedLazy: PropTypes.func,

		// video
		onStopVideo: PropTypes.func,
		onPlayVideo: PropTypes.func
	})
};

OwlCarousel.defaultProps = {
	options: {},
	events: {}
};

export default OwlCarousel;
