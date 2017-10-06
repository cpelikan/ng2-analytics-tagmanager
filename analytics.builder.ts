import { Injectable } from "@angular/core";
import { LocalStorageLayer } from "commons/services/common/localStorageLayer.service";        
import { AnalyticsHelper } from "commons/services/analytics/analytics.helper";

@Injectable()
export class AnalyticsBuilder {
    
    constructor( protected localStorageLayer     : LocalStorageLayer,
                 private analyticsHelper : AnalyticsHelper  ){};  

    public userBuilder (part?:Object) :Promise<any> {
         
        //console.log("buildUser +++++ PART IS", part);
         
         return new Promise((resolve, reject) => {
                
                let dataSet = (part && Object.keys(part).length > 0) ? part : undefined;
                //console.log("dataSet IS", dataSet);
                
                function getUserMap(dataSet, scope){
                    scope.analyticsHelper.userDataMap(dataSet).then((userAnalytics) => {
                        
                        if(userAnalytics)
                        return resolve(userAnalytics);
                        
                    });
                }

                if(dataSet)
                return getUserMap(dataSet,  this);
                 
                this.localStorageLayer.getData1().then((response) => {
                    //console.log("USER RESPONSE FROM DL", response)
                    if(response && response.customer)
                    return getUserMap(response, this);
                });
                 
         });
    };

    public policyBuilder (part?:Object):Promise<any>{
       //console.log("BUILDER POLICY", part);
       
       return new Promise((resolve, reject) => {
            
            let dataSet = (part) ? part : {};   
            
            let isPolicieList = (dataSet instanceof Array);
            
            if (isPolicieList)
            return resolve(this.analyticsHelper.policyMap(dataSet));

            this.localStorageLayer.getData1().then((response) => {
                //console.log("policies ------> ", response.policies);
                
                if(response && response.policies){
                    //console.log( response.policies, part);
                    response.policies.forEach(policy => {
                       
                        if (policy.agreementKey == part['agreementKey'])
                        return resolve(this.analyticsHelper.policyMap(policy));
                    });  
                }
            });

         });

    };

    public vehicleBuilder (part?:Object):Promise<any>{
        return new Promise((resolve, reject) => {         
            let dataSet = (part) ? part : {};
            return resolve(this.analyticsHelper.vehicleMap(dataSet));
        });
    };   


    public telematicsBuilder (part?:Object):Promise<any>{
        return new Promise((resolve, reject) => {
            //console.log("TELEMATICS BUILDER", part);
            let dataSet = (part) ? part : {};
            return resolve(this.analyticsHelper.telematicsMap(dataSet));
        });
    };    

    
    public guaranteesBuilder (part?:Object):Promise<any>{
        return new Promise((resolve, reject) => {
            //console.log("Guarantees BUILDER", part);
            let dataSet = (part) ? part : {};
            return resolve(this.analyticsHelper.guaranteesMap(dataSet));
        });
    };  


    /*@@@ Note: is mandatory to call all method "module name to map + Bulder" ex mymoduleBuilder  @@@*/  

}