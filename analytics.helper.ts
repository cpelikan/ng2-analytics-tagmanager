import { Injectable } from "@angular/core";
import { MD5Class } from 'commons/md5';
import { SelfRegistrationService } from "commons/services/self-registration/self-registration.service";
import { ComportamentaleService } from "commons/services/comportamentale/comportamentale.service";
import { UserModuleAnalytics, PolicyModuleAnalytics, /*ProductModuleAnalytics, ComponentsModuleAnalytics,*/
         VehicleModuleAnalytics, TelematicsModuleAnalytics, GuaranteesModuleAnalytics, 
         ErrorsModuleAnalytics} from 'commons/services/analytics/analytics.interfaces';


@Injectable()
export class AnalyticsHelper{
    
    private userAnalyticsPart       : UserModuleAnalytics; 
    private policyAnalyticsPart     : PolicyModuleAnalytics | Array<PolicyModuleAnalytics>;
    //private componentsAnalyticsPart : ComponentsModuleAnalytics;
    //private productAnalyticsPart    : ProductModuleAnalytics;
    private vehicleAnalyticsPart    : VehicleModuleAnalytics;
    private telematicsAnalyticsPart : TelematicsModuleAnalytics;
    private guaranteesAnalyticsPart : GuaranteesModuleAnalytics;   
    private errorsAnalyticsPart     : ErrorsModuleAnalytics;


    constructor(private md5 : MD5Class,  
                private selfRegistrationService: SelfRegistrationService,
                private comportamentaleService: ComportamentaleService ){}

   /* private getUserLever(){
         return new Promise((resolve, reject) => {
           this.selfRegistrationService.getServiceLevel("username").then((userType) => {

               console.log(userType.level)
            });
         });   
    }*/

    public userDataMap(part:any) :Promise<UserModuleAnalytics>{
       //  console.log("mapUserData", dataSet);
        return new Promise((resolve, reject) => {
            
            let dataSet = part;

                
            let email = (dataSet.username) ? this.md5.MD5(dataSet.username) : null;
            
            let userAnalyticsPart = {
                user_username        : (dataSet.registry.surname) ? dataSet.registry.surname : null,
                user_email           : email,
                user_type            : (dataSet.registry.type) ? dataSet.registry.type : null,
                user_segment         : null, 
                user_category1       : null,
                user_category2       : null,
                user_service_level   : null,
                user_privacy_level   : (dataSet.registry.commercialPrivacy) ? dataSet.registry.commercialPrivacy : null ,
                user_loyalty_program : null,
                user_loyalty_score   : null
            };

            this.userAnalyticsPart = userAnalyticsPart; 

                    
            this.selfRegistrationService.getServiceLevel(dataSet.username).then((userType) => {
                //console.log("getServiceLevel", userType);

                if(userType)
                this.userAnalyticsPart.user_service_level = userType.level;   

                this.comportamentaleService.mieiCoins().then((loyalty) => { 
                    
                    //console.log("mieiCoins", loyalty);

                    if(loyalty.saldo)
                    this.userAnalyticsPart.user_loyalty_score = loyalty.saldo.saldoCoinsCalcolati.toString();

                    //maybe here to be call loyalty service


                    return resolve(this.userAnalyticsPart);
                })
                .catch((Error) => {console.error(Error.errors_messages)
                    //console.error("mieiCoins", Error);
                });
                     
            })
            .catch((Error) => {
                //console.error("getServiceLevel", Error);
            });
    });
        
        
    }


      public policyMap (part:any):PolicyModuleAnalytics | Array<PolicyModuleAnalytics>{
        //console.log("buildPolicy +++++ ", part);
        //let dataPart = (part) ? part : {};
        //console.log("POLICY dataset is ", part);
        
        let isNotDetail = (part instanceof Array);
        let dataSet =  (isNotDetail) ? part : [part]; 

        let policy_id = Array<string>();
        let policy_product_description = Array<string>(); 
        let policy_exp_date  = Array<string>();      
        let policy_asset = Array<string>();               
        let policy_sector = Array<string>();               
        let policy_branch  = Array<string>();              
        let policy_product_category1 = Array<string>();
        let policy_product_category2 = Array<string>();

        dataSet.forEach(item => {
            
            let data = item; 

            /*@@@ FALLBACK PATTERN @@@           
            let carPolicyDescription =  (data.policyCarDetail) ? data.policyCarDetail.productDescription : null;
            let lifePolicyDetail =  (data.policyLifeDetail) ? data.policyLifeDetail.productDescription : null; 
            let rePolicyDetail = (data.rePolicyDetail) ? data.rePolicyDetail.productDescription : null;
            
            let policyDescription = (carPolicyDescription) ? carPolicyDescription :
                                    ((lifePolicyDetail) ? lifePolicyDetail : 
                                    ((rePolicyDetail) ? rePolicyDetail : 
                                    ((data.description) ? data.description: null ))) ;  

            let numberPlate = (data.policyCarDetail) ? data.policyCarDetail.vehicle.vehicleIdentificationNumber : 
                               ((data.numberPlate) ? data.numberPlate : null);
            */                   
            policy_id.push((data.policy) ? data.policy : null);
            //@@@ FALLBACK PATTERN @@@ policy_product_description.push(policyDescription);
            policy_product_description.push((data.description) ? data.description: null );
            policy_exp_date.push((data.expirationDate) ? data.expirationDate : null);   
            //@@@ FALLBACK PATTERN @@@ policy_asset.push((numberPlate) ? numberPlate : null);
            policy_asset.push((data.numberPlate) ? data.numberPlate : null);               
            policy_sector.push((data.division) ? data.division : null);   
            policy_branch.push((data.branch) ? data.branch : null);
            policy_product_category1.push((data.familyId) ? data.familyId : null);
            policy_product_category2.push((data.subFamilyId) ? data.subFamilyId : null);
          
        });
        
        let policyAnalyticsPart = {
                policy_id                   : (isNotDetail) ? policy_id : policy_id[0],
                policy_product_description  : (isNotDetail) ? policy_product_description : policy_product_description[0],
                policy_exp_date             : (isNotDetail) ? policy_exp_date : policy_exp_date[0],
                policy_asset                : (isNotDetail) ? policy_asset : policy_asset[0],
                policy_sector               : (isNotDetail) ? policy_sector : policy_sector[0],
                policy_branch               : (isNotDetail) ? policy_branch : policy_branch[0],
                policy_product_category1    : (isNotDetail) ? policy_product_category1 : policy_product_category1[0],
                policy_product_category2    : (isNotDetail) ? policy_product_category2 : policy_product_category2[0]
            }

        this.policyAnalyticsPart = policyAnalyticsPart ;
        
        return this.policyAnalyticsPart;
    };

   public vehicleMap (part:any): VehicleModuleAnalytics{

        //console.log("Vheicle mapping +++++ ", part);
        
        let dataSet = part;
        //console.log("dataset is ", dataSet);
        
        this.vehicleAnalyticsPart = {
            vehicle_type    : dataSet.category,
            vehicle_plate   : dataSet.vehicleIdentificationNumber,
            vehicle_model   : dataSet.model,
            vehicle_brand   : dataSet.category,
            vehicle_mode    : dataSet.use
        }

        return this.vehicleAnalyticsPart;

    }

    public telematicsMap (part:any):TelematicsModuleAnalytics{
        
        let dataSet = part;
        //console.log("Telematics dataset is ", dataSet);
        
        this.telematicsAnalyticsPart = {
             telematics_recharged_credits    : dataSet.telematics_recharged_credits.toString()
        }

        return this.telematicsAnalyticsPart;
    };

   	
	 public guaranteesMap (part:any):GuaranteesModuleAnalytics{
        
        let dataSet =  part;
        //console.log("GARANTIES dataset is ", dataSet);

        let descriptions = [];
        let values = [];

        dataSet.forEach(guarantees => {
            descriptions.push((guarantees.description) ? guarantees.description : null);
            values.push((guarantees.value) ? guarantees.value : null);
        });
        
        this.guaranteesAnalyticsPart =  {
                guarantees_desctiption    : (descriptions.length > 0) ? descriptions : null,
                guarantees_value          : (values.length > 0) ? values : null
        }

        return this.guaranteesAnalyticsPart;
    };


     public erroraMap (part:any):ErrorsModuleAnalytics{
        
        let dataSet = part;
        //console.log("Telematics dataset is ", dataSet);
        
        this.errorsAnalyticsPart = {
            errors_type     : [],
            errors_id       : [],
            errors_messages : [],
            errors_elements : []        
        }

        return this.errorsAnalyticsPart;
    };


    
}
