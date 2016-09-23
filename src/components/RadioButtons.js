/**
 * Created by vlad on 19/09/16.
 */

import Surface                          from 'famous/core/Surface.js';
import {layout, event}                  from 'arva-js/layout/Decorators.js';
import {combineOptions}                 from 'arva-js/utils/CombineOptions.js';
import {Clickable}                      from './Clickable.js';
import {RadioButton}                    from './RadioButton.js';
import {Colors}                         from '../defaults/DefaultColors.js';

export class RadioButtons extends Clickable {

    @layout.size(2, (width, height) => height - 64)
    @layout.origin(0.5, 0.5)
    @layout.align(0, 0.5)
    @layout.translate(24, 0, 30)
    line = new Surface({
        properties: {
            backgroundColor: this.options.activeColor
        }
    });

    /**
     * Radio buttons used for selecting mutually exclusive options
     *
     * @example
     * radioButtons = new RadioButtons({
     *     buttons: [{icon: CloudIcon, text: 'Turn on the AC', selected: true},
     *         {icon: HomeIcon, text: 'Pick up the mail'},
     *         {icon: Trash2Icon, text: 'Take a hike'},
     *         {icon: BadgeIcon, text: 'Jump high enough'}]
     * });
     *
     * @param {Object} options Construction options
     * @param {Array} [options.buttons] Array containing settings for each radio button that will be included
     *        in the RadioButton instance created. These settings include:
     *             -icon: the class of the icon to be used in the radio button (the class in which
     *                  the RadioButtons instance is created needs to import the icon class selected here)
     *             -text: the text which will appear in the radio button
     *             -selected: boolean used to determine which radio button will be selected initially
     *                  (only the first occurrence of selected: true is taken into consideration;
     *                  subsequent occurrences are ignored)
     */
    constructor(options = {}) {
        super(combineOptions({
            activeColor: Colors.PrimaryUIColor
        }, options));

        let {buttons} = this.options;
        this.selectedIndex = -1;

        for (let [i, settings] of buttons.entries()) {
            this.selectedIndex = this.selectedIndex === -1 && settings.selected ? i : this.selectedIndex;

            this.addRenderable(new RadioButton({
                    icon: settings.icon,
                    text: settings.text,
                    selected: settings.selected
                }), 'radioButton' + i,
                layout.dock.top(),
                layout.size(undefined, 64),
                layout.translate(0, 0, 0),
                event.on('tapEnd', function () {
                    this._updateSelectedButton(i);
                })
            );
        }
    }

    _updateSelectedButton(newSelectedIndex) {
        if (this.selectedIndex !== newSelectedIndex) {
            this['radioButton' + newSelectedIndex].select();
            this['radioButton' + this.selectedIndex].deselect();
            this.selectedIndex = newSelectedIndex;
        }
    }

    /**
     * Select the radio button by index.
     * @param index
     */
    setSelected(index) {
        this._updateSelectedButton(index);
    }

    /**
     * Get the index of the currently selected radio button.
     * @returns {*}
     */
    getSelected() {
        return this.selectedIndex;
    }

}