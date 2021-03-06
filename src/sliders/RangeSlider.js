/**
 * Created by vlad on 01/09/16.
 */

import {layout, event, flow}                from 'arva-js/layout/Decorators.js';
import {combineOptions}                     from 'arva-js/utils/CombineOptions.js';
import {Slider}                             from './Slider.js';
import {knobSideLength}                     from './Slider.js';
import {transition}                         from './Slider.js';
import {Knob}                               from './Knob.js';
import {UISmall, UISmallGray}               from '../defaults/DefaultTypefaces.js';


const knobPadding = 1;

@flow.viewStates({})
export class RangeSlider extends Slider {

    _dualKnobOffset = knobSideLength + knobPadding;

    @layout.size(knobSideLength, knobSideLength)
    @layout.origin(0.5, 0.5)
    @layout.align(0, 0.5)
    @layout.translate(knobSideLength / 2, 0, 50)
    @event.on('touchstart', function () {
        this.secondKnob.text.setOptions(UISmall);
        if (this._contentProvided && this.options._onMobile) {
            this._expandTooltip('secondKnob');
        }
    })
    @event.on('mousedown', function () {
        this.secondKnob.text.setOptions(UISmall);
    })
    @event.on('touchend', function () {
        if (this._contentProvided && this.options._onMobile) {
            this._retractTooltip('secondKnob');
        }
        this.secondKnob.text.setOptions(UISmallGray);
    })
    @event.on('mouseup', function(){this._onMouseUpSecondKnob(...arguments)})
    @flow.stateStep('expanded', transition, layout.size(knobSideLength, knobSideLength * 2), layout.origin(0.5, 0.75))
    @flow.stateStep('retracted', transition, layout.size(knobSideLength, knobSideLength), layout.origin(0.5, 0.5))
    secondKnob = new Knob({
        makeRipple: !this.options.enableTooltip || !this.options._onMobile,
        enableBorder: this.options.knobBorder,
        enableSoftShadow: true,
        borderRadius: '4px',
        useThrottler: true,
        typeface: UISmallGray
    });

    /**
     * Range Slider that is used for fine-grained selection of a range of values
     *
     * @example
     * rangeSlider = new RangeSlider({
     *     knobBorder: true,
     *     amountSnapPoints: 5,
     *     shadowType: 'noShadow',
     *     knobPosition: 0.3,
     *     secondKnobPosition: 0.9,
     *     enableActiveTrail: true,
     *     percent: true,
     *     enableTooltip: true,
     *     showDecimal: false,
     *     range: [50, 150]
     *     textOnlyInTooltip: false
     * });
     *
     * @param {Object} options Construction options
     * @param {Number} [options.knobPosition] Set the initial position of the left knob as a percentage of the slider width
     * @param {Number} [options.secondKnobPosition] Set the initial position of the right knob as a percentage of the slider width
     * @param {Boolean} [options.knobBorder] Enable border around both knobs for visibility on white backgrounds
     * @param {String} [options.shadowType] The type of shadow to use ('noShadow' [default], 'softShadow', 'hardShadow')
     * @param {Boolean} [options.enableActiveTrail] Enable the active trail
     * @param {Boolean} [options.percent] Enabling will show the percentage value on the knobs, and exclude all other content set
     * @param {Array} [options.range] The min max value range for the slider values
     * @param {Boolean} [options.range] Choose whether to show one decimal point when a value range is enabled
     * @param {Number} [options.amountSnapPoints] The number of snap points the slider should contain
     * @param {Boolean} [options.enableTooltip] Enables the tooltip in mobile environments when one of the knobs is pressed
     * @param {Boolean} [options.textOnlyInTooltip] When enabled, the text content is shown only in the tooltip
     * @param {Array} [options.icons] Add icons to the left and right of the slider
     */
    constructor(options = {}) {
        super(combineOptions({
            knobBorder: false,
            secondKnobPosition: 1.0,
            shadowType: 'noShadow',
            enableTooltip: true,
            textOnlyInTooltip: true,
            enableActiveTrail: true,
        }, options));
    }

    _setupListeners() {
        this.onceNewSize().then(([width]) => {
            this._sliderWidth = width - knobSideLength;
            this._knobPosition = Math.round(this.options.knobPosition * this._sliderWidth);
            this._secondKnobPosition = Math.round(this.options.secondKnobPosition * this._sliderWidth);

            this._dualKnobDraggableSetup();

            if (this._snapPointsEnabled) {
                this._addSnapPoints();
            }

            if (this.options.enableActiveTrail) {
                this._enableActiveTrail();
            }

            if (this._snapPointsEnabled) {
                this._snapKnobToPoint();
                this._snapSecondKnobToPoint();
                this._updateDraggablesRanges();
            }

            this._initializeKnob();
            this._initializeSecondKnob();

            this.onNewSize(this._onResize);
        });
    }

    _onResize([width]) {
        let oldSliderWidth = this._sliderWidth;
        this._sliderWidth = width - knobSideLength;

        let newKnobPosition = this._knobPosition * this._sliderWidth / oldSliderWidth;
        let newSecondKnobPosition = this._secondKnobPosition * this._sliderWidth / oldSliderWidth;
        this._moveKnobTo(newKnobPosition);
        this._updateKnobPositionTo('knob', newKnobPosition);
        this._moveSecondKnobTo(newSecondKnobPosition);
        this._updateKnobPositionTo('secondKnob', newSecondKnobPosition);

        this._updateDraggablesRanges();

        this._updateActiveTrail();
    }

    _updateDraggablesRanges() {
        this._updateFirstKnobRange();
        this._updateSecondKnobRange();
    }

    _snapKnobToPoint() {
        this._moveKnobTo(this._closestPointPositionToFirstKnob(this._knobPosition));
    }

    _snapSecondKnobToPoint() {
        this._moveSecondKnobTo(this._closestPointPositionToSecondKnob(this._secondKnobPosition));
    }

    _onLineTapEnd(event) {
        let tapPosition;
        if (event instanceof MouseEvent) {
            tapPosition = event.offsetX;
        } else {
            tapPosition = this._elementRelativeLocation(event, this.touchArea).elementX;
        }

        if (this._firstKnobCloser(tapPosition)) {
            this._moveKnobTo(
                this._snapPointsEnabled ? this._closestPointPositionToFirstKnob(tapPosition) : this._closestPositionToFirstKnob(tapPosition)
            );
            this._updateSecondKnobRange();
        } else {
            this._moveSecondKnobTo(
                this._snapPointsEnabled ? this._closestPointPositionToSecondKnob(tapPosition) : this._closestPositionToSecondKnob(tapPosition)
            );
            this._updateFirstKnobRange();
        }
    }

    _firstKnobCloser(position) {
        let distanceFromFirstKnob = Math.abs(this._knobPosition - position);
        let distanceFromSecondKnob = Math.abs(this._secondKnobPosition - position);
        return distanceFromFirstKnob <= distanceFromSecondKnob;
    }

    _moveSecondKnobTo(position) {
        let range = this.secondKnob.draggable.options.xRange;
        if (Slider._positionInRange(position, range)) {
            this._updateKnobPositionTo('secondKnob', position);
            this.secondKnob.draggable.setPosition([position, 0], transition);

            if (this._contentProvided) {
                this._setKnobContent('secondKnob');
            }

            if (this.options.enableActiveTrail) {
                this._updateActiveTrail();
            }
        }
    }

    _closestPointPositionToFirstKnob(tapPosition) {
        let closestPoint = this._closestPoint(tapPosition);
        let range = this.knob.draggable.options.xRange;

        for (let i = closestPoint; i >= 0; i--) {
            let position = this._snapPointPosition(i);
            if (Slider._positionInRange(position, range)) {
                return position;
            }
        }
    }

    _closestPointPositionToSecondKnob(tapPosition) {
        let closestPoint = this._closestPoint(tapPosition);
        let range = this.secondKnob.draggable.options.xRange;

        for (let i = closestPoint; i <= this.amountSnapPoints - 1; i++) {
            let position = this._snapPointPosition(i);
            if (Slider._positionInRange(position, range)) {
                return position;
            }
        }
    }

    _closestPositionToFirstKnob(tapPosition) {
        let maxRightPosition = this.knob.draggable.options.xRange[1];
        return tapPosition > maxRightPosition ? maxRightPosition : tapPosition;
    }

    _closestPositionToSecondKnob(tapPosition) {
        let maxLeftPosition = this.secondKnob.draggable.options.xRange[0];
        return tapPosition < maxLeftPosition ? maxLeftPosition : tapPosition;
    }

    _enableActiveTrail() {
        this._addActiveTrailLine();

        this._updateActiveTrail();

        /*Update the active trail size when the first knob is moved.*/
        this.knob.draggable.on('update', () => {
            this._updateActiveTrail();
        });

        /*Update the active trail size when the second knob is moved.*/
        this.secondKnob.draggable.on('update', () => {
            this._updateActiveTrail();
        });
    }

    _updateActiveTrail() {
        if (this.options.enableActiveTrail) {
            this._updateActiveTrailLine();
            if (this._snapPointsEnabled) {
                this._updateActiveTrailSnapPoints();
            }
        }
    }

    _updateActiveTrailLine() {
        this.decorateRenderable('activeTrailLine',
            layout.size(this._secondKnobPosition - this._knobPosition, 2),
            layout.align(this._knobPosition / this._sliderWidth, 0.5)
        );
    }

    _inActivePosition(position) {
        return position >= this._knobPosition && position <= this._secondKnobPosition;
    }

    _initializeSecondKnob() {
        this.secondKnob.draggable.setPosition([this._secondKnobPosition, 0]);

        if(this._snapPointsEnabled){
            this.secondKnob.draggable.on('end', () => {
                this._snapSecondKnobToPoint();
                this._updateFirstKnobRange();
            });
            this.knob.draggable.on('end', () => {
                this._updateSecondKnobRange();
            });
        }

        if (this._contentProvided) {
            this._setKnobContent('secondKnob');
            this.secondKnob.decorateRenderable('text',
                layout.opacity(this.options.textOnlyInTooltip ? 0 : 1)
            );
        }
    }

    _dualKnobDraggableSetup() {
        /*Set first knob range.*/
        this.decorateRenderable('knob',
            layout.draggable({
                xRange: [0, this._secondKnobPosition - this._dualKnobOffset],
                outsideTouches: false,
                projection: 'x'
            })
        );

        /*Set second knob range.*/
        this.decorateRenderable('secondKnob',
            layout.draggable({
                xRange: [this._knobPosition + this._dualKnobOffset, this._sliderWidth],
                outsideTouches: false,
                projection: 'x'
            })
        );

        this._updateKnobsOnMovement();
    }

    _updateKnobsOnMovement() {
        /*Update the second knob range when the first knob is moved.*/
        this.knob.draggable.on('update', (event) => {

            this._updateKnobPositionTo('knob', event.position[0]);

            if (this._contentProvided) {
                this._setKnobContent('knob');
            }

            this._updateSecondKnobRange();

        });

        /*Update the first knob range when the second knob is moved.*/
        this.secondKnob.draggable.on('update', (event) => {

            this._updateKnobPositionTo('secondKnob', event.position[0]);

            if (this._contentProvided) {
                this._setKnobContent('secondKnob');
            }

            this._updateFirstKnobRange();

        });
    }

    _updateFirstKnobRange() {
        this.knob.draggable.setOptions({xRange: [0, this._secondKnobPosition - this._dualKnobOffset]});
    }

    _updateSecondKnobRange() {
        this.secondKnob.draggable.setOptions({xRange: [this._knobPosition + this._dualKnobOffset, this._sliderWidth]});
    }

    _onMouseUpSecondKnob() {
        this.secondKnob.text.setOptions(UISmallGray);
    }

    _emitMoveEvent() {
        this._eventOutput.emit('valueChange', [this.getKnobContent('knob'), this.getKnobContent('secondKnob')]);
    }

    /**
     * Get the current position of the left knob.
     * @returns {number|*}
     */
    getLeftKnobPosition() {
        return this._knobPosition;
    }

    /**
     * Set a new position for the left knob as a percentage of the width.
     * @param percent
     */
    setLeftKnobPosition(percent) {
        this._moveKnobTo(Math.round(percent * this._sliderWidth));
    }

    /**
     * Get the current position of the right knob.
     * @returns {number|*}
     */
    getRightKnobPosition() {
        return this._secondKnobPosition;
    }

    /**
     * Set a new position for the right knob as a percentage of the width.
     * @param percent
     */
    setRightKnobPosition(percent) {
        this._moveSecondKnobTo(Math.round(percent * this._sliderWidth));
    }

}