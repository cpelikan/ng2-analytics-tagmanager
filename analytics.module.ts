import { NgModule } from '@angular/core';
import { AnalyticsBridge } from 'commons/services/analytics/analytics.bridge';
import { AnalyticsBuilder } from 'commons/services/analytics/analytics.builder';
import { AnalyticsPublisher } from 'commons/services/analytics/analytics.publisher';
import { AnalyticsHelper } from 'commons/services/analytics/analytics.helper';

import { BaseCommunicator }               from "commons/services/common/base-communicator.service";
import { LocalStorageLayer }              from "commons/services/common/localStorageLayer.service";
import { EncryptionService }              from "commons/services/common/encryption.service";
import { UserInfoService }                from "commons/services/user-info/user-info.service";
import { TelematicsService }              from 'commons/services/telematics/telematics.service';
import { CRMService }                     from "commons/services/crm/crm.service";
import { HttpModule }                     from '@angular/http';
import { MockService }                    from "commons/services/common/mock.service";
import { MD5Class }                       from 'commons/md5';
import { SelfRegistrationService }        from "commons/services/self-registration/self-registration.service";
import { ComportamentaleService }        from "commons/services/comportamentale/comportamentale.service";
import { TPDErrorsService }               from "commons/components/errors.component";

@NgModule({
    imports   : [HttpModule],
    providers : [ AnalyticsBridge, AnalyticsBuilder, AnalyticsPublisher,AnalyticsHelper,
                BaseCommunicator,
                LocalStorageLayer,
                EncryptionService,
                UserInfoService,
                TelematicsService,
                CRMService,
                MockService,
                MD5Class,
                SelfRegistrationService,
                ComportamentaleService,
                TPDErrorsService ],
    exports   : []
})

export class AnalyticsModule { }
