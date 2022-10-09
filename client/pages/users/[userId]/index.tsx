import { CommonLayout } from '@/layouts/CommonLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Projects } from '@/component/Projects'

const User: NextPageWithLayout = () => {
  const router = useRouter()
  return <Projects />
}

User.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}
export default User
