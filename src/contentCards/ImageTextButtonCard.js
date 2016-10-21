/**
 * Created by lundfall on 21/10/2016.
 */

import Surface              from 'famous/core/Surface.js';
import ImageSurface         from 'famous/Surfaces/ImageSurface.js';
import BkImageSurface       from 'famous-bkimagesurface';

import {View}               from 'arva-js/core/View.js';
import {layout}             from 'arva-js/layout/Decorators.js';
import {combineOptions}     from 'arva-js/utils/CombineOptions.js';

import {ContentCard}        from '../components/ContentCard.js';
import {UITitle}            from '../text/UITitle.js';
import {UIRegular}          from '../text/UIRegular.js';
import {SolidTextButton}    from '../buttons/SolidTextButton.js';
import {Colors}             from '../defaults/DefaultColors.js';

/**
 * Emits the event 'buttonClicked', along with the options, when pressed. If passed two buttons, then the
 * second argument passed in the emitter is the index of the button (0 or 1).
 */

@layout.dockPadding(0, 0, 32, 0)
@layout.dockSpace(32)
export class ImageTextButtonCard extends ContentCard {

    /**
     *
     * @example:
     * 
     * new ImageTextButtonCard({image: myImage, 
     *  centerTitle: true, 
     *  decorationalText: "This is some really decorated magical text. Look at it. LOOK!.", 
     *  title: "Centered title", subtitle: "This is a cool subtitle", 
     *  body: "Lorem ispum muchos gracias per favore vamos a la playa por favor, zeg maar heel goed.", 
     *  buttons: ['Go back', 'Cancel']})
     * 
     * @param {Image} [options.image] The image on the top
     * @param {String} [options.title] The title
     * @param {Boolean} [options.centerTitle] Whether to center the title or not
     * @param {String} [options.subtitle] The subtitle
     * @param {String} [options.body] The body
     * @param {String} [options.decorationalText] The decorational text with borders around it
     * @param {String} [options.button] The text of a button. Will emit the event 'buttonClicked', along with the options, when pressed
     * @param {Array|String} [options.buttons] Instead of passing one button, can instead pass two buttons. Must be two buttons
     * If passed two buttons, then the second argument passed in the emitter is the index of the button (0 or 1).
     * @param options
     */
    constructor(options = {}) {
        super(combineOptions({
            centerTitle: false
        }, options));

        if (this.options.image) {
            let imageRenderable;
            if (this.options.imageHeight) {
                imageRenderable = new BkImageSurface({
                    sizeMode: BkImageSurface.SizeMode.ASPECTFILL,
                    positionMode: BkImageSurface.PositionMode.CENTER,
                    content: this.options.image
                });
            } else {
                imageRenderable = new ImageSurface({
                    content: this.options.image
                });
            }
            this.addRenderable(imageRenderable, 'image', layout.dock.top(this.options.imageHeight || ~300));
        } else {
            this.decorations.viewMargins[0] = this.decorations.viewMargins[2] = 32;
        }
        if (this.options.title) {
            this.addRenderable(new UITitle({content: this.options.title}), 'title', layout.dock.top(~50));
            if (this.options.centerTitle) {
                this.title.setProperties({textAlign: 'center'});
            } else {
                /* Interpreting the spec as wanting a 32px on the right side as well although it only says on the left */
                this.title.setProperties({padding: '0px 32px'});
            }
        }
        if (this.options.subtitle) {
            this.addRenderable(new UIRegular({content: this.options.subtitle}),
                'subtitle',
                layout.dock.top(),
                layout.stick.center(),
                layout.size((width)=>Math.max(width - 64, 64), ~50));
        }

        if (this.options.body) {
            this.addRenderable(new UIRegular({content: this.options.body}),
                'body',
                layout.dock.top(),
                layout.stick.center(),
                layout.size((width)=>Math.max(width - 64, 64), ~50));
        }

        if (this.options.decorationalText) {
            this.addRenderable(new UIRegular({
                    content: this.options.decorationalText,
                    properties: {
                        color: Colors.Gray,
                        padding: '16px 0',
                        borderTop: '1px rgba(0, 0, 0, 0.1) solid',
                        borderBottom: '1px rgba(0, 0, 0, 0.1) solid'
                    }
                }),
                'decorationalText',
                layout.dock.top(),
                layout.stick.center(),
                layout.size((width)=>Math.max(width - 64, 64), ~50));
        }

        if (this.options.button) {
            this.addRenderable(new SolidTextButton({
                content: this.options.button,
                clickEventName: 'buttonClicked',
                clickEventData: [this.options]
            }), 'button',
                layout.size(~50, true),
                layout.dock.top(),
                layout.stick.center());

        } else if (this.options.buttons) {
            if (this.options.buttons.length !== 2) {
                console.log("Wrong number of buttons passed to ImageTextButtonCard");
            } else {
                let buttons = new View();
                for(let i of [0, 1]){
                    buttons.addRenderable(new SolidTextButton({
                        content: this.options.buttons[i],
                        clickEventName: `buttonClicked`,
                        clickEventData: [this.options, i]
                    }),
                        `button${i}`,
                        layout.dock.left(),
                        layout.size(~50, true),
                        layout.dockSpace(16)
                    )
                }
                this.addRenderable(buttons, 'buttons', layout.dockSpace(32), layout.dock.top(), layout.stick.center(), layout.size(~200, true));
            }
        }

    }
}