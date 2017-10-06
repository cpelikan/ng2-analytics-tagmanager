import { Injectable } from "@angular/core";

@Injectable()
export class AnalyticsPublisher{
        /*
        constructor(){
                        
                //polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher
                if ( typeof window["CustomEvent"] !== "function" ) {
                        
                        function CustomEvent ( event, params ) {
                        params = params || { bubbles: false, cancelable: false, detail: undefined };
                        var evt = document.createEvent( 'CustomEvent' );
                        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                        return evt;
                        }

                        CustomEvent.prototype = window["Event"].prototype;

                        window["CustomEvent"] = CustomEvent;
                }
        }  */       

        private publishEvent (name:string, data:Object) :void{
                let event = new CustomEvent(name, {detail: data});
                document.dispatchEvent(event);
                //console.log("DATA PUBLISHED @@@@@@@@", Object.keys(event.detail)[0].substring(0, Object.keys(event.detail)[0].indexOf('_')).toUpperCase(), event);
        };    
        

        public	pageView (data:Object) :void {
                this.publishEvent('tm_pageview', data);
        };

        public  pageViewPart (data:Object) :void {
                this.publishEvent('tm_pageview_part', data);
        };

        public  pageViewPartError (data:Object) :void {
                this.publishEvent('tm_pageview_part_error', data);
        };

        public  track (data:Object) :void {
                this.publishEvent('tm_track', data);
        };

        public	link (data:Object) :void {
                this.publishEvent('tm_link', data);
        };

        public	error (data:Object) :void {
                this.publishEvent('tm_error', data);
        };

}
