import { CommonLayout } from '@/layouts/CommonLayout'
import { NextPageWithLayout } from '@/pages/_app'
import React, { ReactElement } from 'react'
import { NewTokenAllocators } from '@/component/NewTokenAllocators'

const New: NextPageWithLayout = () => {
  return <NewTokenAllocators />
}

New.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default New
