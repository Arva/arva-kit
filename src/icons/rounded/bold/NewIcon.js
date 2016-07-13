import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/new_rounded_bold.svg.txt!text';
        
        export class NewIcon extends BaseIcon {
            constructor(options){
                super({...options, icon: iconImage});
            }
        }