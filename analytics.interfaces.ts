
interface Analytics{};

export interface UserModuleAnalytics extends Analytics {
    user_username        : string,
    user_email           : string,
    user_type            : string,
    user_segment         : string,
    user_category1       : string,
    user_category2       : string,
    user_service_level   : string,
    user_privacy_level   : string,
    user_loyalty_program : string,
    user_loyalty_score   : string
}

export interface ComponentsModuleAnalytics extends Analytics {
    components_id           : string[],
    components_type         : string[],
    components_name         : string[],
    components_description  : string[],
    components_category1    : string[],
    components_category2    : string[]
}

export interface ProductModuleAnalytics extends Analytics {
    product_id          : string,
    product_name        : string,
    product_description : string,
    product_image       : string,
    product_category1   : string,
    product_category2   : string
}

export interface ResearchModuleAnalytics extends Analytics {
    research_keyword  : string,
    research_scope    : string,
    research_results  : string
}

export interface ProposalModuleAnalytics extends Analytics {
    proposal_category               : string,
    proposal_flow                   : string,
    proposal_id                     : string,
    proposal_total                  : string,
    proposal_agency_id              : string,      
    proposal_guarantees             : string[],
    proposal_guarantees_prices      : string[],
    proposal_profile_info           : string,
    proposal_payment_profile        : string,
    proposal_driving_profile        : string,
    proposal_repairing_profile      : string,
    proposal_box                    : string,
    proposal_original_total         : string,
    proposal_original_guarantees    : string[],
    proposal_relateds               : string[],
    proposal_relateds_prices        : string[]
}

export interface TransactionModuleAnalytics extends Analytics {
    transaction_id      : string,
    transaction_fees    : string,
    transaction_total   : string
}

export interface ErrorsModuleAnalytics extends Analytics {
    errors_type     : string[],
    errors_id       : string[],
    errors_messages : string[],
    errors_elements : string[]
}

export interface PolicyModuleAnalytics extends Analytics {
    policy_id                   : string | string[],
    policy_product_description  : string | string[],
    policy_exp_date             : string | string[],
    policy_asset                : string | string[],
    policy_sector               : string | string[],
    policy_branch               : string | string[],
    policy_product_category1    : string | string[],
    policy_product_category2    : string | string[]
}

export interface VehicleModuleAnalytics extends Analytics {
    vehicle_type    : string,
    vehicle_plate   : string,
    vehicle_model   : string,
    vehicle_brand   : string,
    vehicle_mode    : string
}

export interface AgreementModuleAnalytics extends Analytics {
    agreement_id    : string,
    agreement_description   : string
}

export interface CoMkgtModuleAnalytics extends Analytics {
    "co-mkgt_id"           : string,
    "co-mkgt_description"  : string
}


export interface PoiModuleAnalytics extends Analytics {
    poi_id    : string,
    poi_type  : string
}

export interface DocumentModuleAnalytics extends Analytics {
    document_id    : string,
    document_type  : string
}

export interface WelfareModuleAnalytics extends Analytics {
    welfare_medical_prescription    : string,
    welfare_facility_id             : string,
    welfare_dissatisfaction_reason  : string,
    welfare_feedback                : string
}   

export interface TelematicsModuleAnalytics extends Analytics {
    telematics_recharged_credits    : string
}

export interface SensorModuleAnalytics extends Analytics {
    sensor_type                 : string,
    sensor_status               : string,
    alarm_settings              : string,
    alarm_registration_type     : string
}   

export interface GuaranteesModuleAnalytics extends Analytics {
    guarantees_desctiption    : Array<string>,
    guarantees_value          : Array<string>
}