import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/cloudup_rounded_thin.svg.txt!text';
        
        export class CloudupIcon extends BaseIcon {
            constructor(options){
                super({...options, icon: iconImage});
            }
        }