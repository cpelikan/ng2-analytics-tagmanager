import { Injectable } from "@angular/core";
import { AnalyticsBuilder } from 'commons/services/analytics/analytics.builder';
import { AnalyticsPublisher } from 'commons/services/analytics/analytics.publisher';
import { LocalStorageLayer } from "commons/services/common/localStorageLayer.service";   

@Injectable()
export class AnalyticsBridge {
    
   constructor( private analyticsBuilder : AnalyticsBuilder, 
                private analyticsPublisher: AnalyticsPublisher,
                protected localStorageLayer     : LocalStorageLayer ) {};


    public sendAnalyticsPart(modules:Object){
        
        let scope = this;

        Object.keys(modules).forEach(moduleItem => {
            
            let module = modules[moduleItem];
            let moduleName = Object.keys(module)[0];
            let moduleData = module[moduleName];  
            
           //console.log("CALL " + moduleName, " with data ", moduleData);
            
            let part = (moduleData) ? moduleData : null;
            
            this.analyticsBuilder[moduleName+"Builder"](part).then((response) => {
                this.analyticsPublisher.pageViewPart(response);
            });
      });

    };

}