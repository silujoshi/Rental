import type { NextPage } from 'next'
import LoadingScreen from '../components/PopUps/loadingScreen';
import CustomUploadZone from '../components/customUploadZone';
import { Icon } from '@iconify/react';
import PropertyRegisteredPopUp from '../components/PopUps/propertyRegisteredPopUp'
// import {spinner-border,sr-only} from 'bootstrap'


const test: NextPage = () => {
  return (
    <>
      {/* <Icon icon="icon-park-outline:building-two" width="16" height="18" inline={true} /> */}
      {/* <SelectPackagePop /> */}
      {/* <PropertyRegisteredPopUp/> */}
      {/* <CustomUploadZone /> */}
      <LoadingScreen/>
      {/* <PaymentStatusPop /> */}

    </>

  )
}

export default test