/**
 * Created by lundfall on 13/07/16.
 */
import FamousInputSurface           from 'famous/surfaces/InputSurface';

import {combineOptions}             from 'arva-js/utils/CombineOptions.js';

export class InputSurface extends FamousInputSurface {
    constructor(options) {
        super(combineOptions(
            {
                properties: {
                    outline: 'none',
                    borderBottom: '1px solid gray',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    boxShadow: '0px 2px 4px 0px rgba(50, 50, 50, 0.08)',
                    padding: '0 16px 0 16px'
                }
            }, options));
        this.on('paste', this._onFieldChange);
        this.on('input', this._onFieldChange);
        this.on('propertychange', this._onFieldChange);
    }

    /**
     * Bugfix 1: Placeholder is wrongly assigned
     * Bugfix 2: value is assigned before type, which can have constraints that causes the browser to reject the change
     * @param target
     */
    deploy(target) {
        target.placeholder = this._placeholder || '';
        target.type = this._type;
        target.value = this._value;
        target.name = this._name;
    }

    setValue(value) {
        this._setBorderBottomColor(value);
        return super.setValue(...arguments);
    }

    _setBorderBottomColor(textInput) {
        this.setProperties({borderBottom: `1px solid ${!textInput.length ? 'gray' : 'black'}`})

    }

    _onFieldChange() {
        let currentValue = this.getValue();
        if (currentValue != this._value) {
            this._value = currentValue;
            this._setBorderBottomColor(currentValue);
            this.emit('valueChange', currentValue);
        }
    }
}