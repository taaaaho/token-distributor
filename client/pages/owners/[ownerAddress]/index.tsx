import { CommonLayout } from '@/layouts/CommonLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { NewTokenAllocators } from '@/component/NewTokenAllocators'

const User: NextPageWithLayout = () => {
  const router = useRouter()
  return <NewTokenAllocators />
}

User.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}
export default User
