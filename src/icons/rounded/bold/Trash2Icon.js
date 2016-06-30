import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/trash2_rounded_bold.svg';
        
        export class Trash2Icon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }