import { CommonLayout } from '@/layouts/CommonLayout'
import { NextPageWithLayout } from '@/pages/_app'
import React, { ReactElement } from 'react'
import { NewTokenAllocators } from '@/component/NewTokenAllocators'
// import { GetServerSideProps } from 'next'
// import { getSession } from 'next-auth/react'

const New: NextPageWithLayout = () => {
  return <NewTokenAllocators />
}

New.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//       props: {} as never,
//     }
//   }
//   return {
//     props: {} as never,
//   }
// }

export default New
