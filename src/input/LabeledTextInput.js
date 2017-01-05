/**
 * Created by tom on 23/09/16.
 */

import {View}                   from 'arva-js/core/View.js';
import {layout}                 from 'arva-js/layout/Decorators.js';
import {combineOptions}         from 'arva-js/utils/CombineOptions.js';
import {UISmallGray}            from '../text/UISmallGray.js';
import {SingleLineTextInput}    from './SingleLineTextInput.js';

export class LabeledTextInput extends View {

    @layout.dock.top(~20)
    label = new UISmallGray({
        content: this.options.label, properties: {
            /* Prevent line-breaks from happening */
            whiteSpace: 'nowrap'
        }
    });

    @layout.dock.top(~48)
    @layout.dockSpace(4)
    input = new this.options.inputType(
        this.options
    );

    /**
     * Renders a SingleLineTextInput or MultiLineInput, with a text label docked above it.
     *
     * @param {Object} [options] Construction options
     * @param {String} [options.label] Label to show above input field
     * @param {Boolean} [options.usesFeedback] Set to true to enable required/correct/incorrect feedback bubbles. Disabled by default.
     * @param {String} [options.value] Value to initialise text input field with
     * @param {String} [options.placeholder] Placeholder to show when no input is present in the text field
     */
    constructor(options = {}) {
        super(combineOptions({
            value: '',
            label: 'Label',
            placeholder: '',
            clearOnEnter: false,
            usesFeedback: false,
            password: false,
            inputType: SingleLineTextInput
        }, options));
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value) {
        this.input.setValue(value);
    }
    
}    