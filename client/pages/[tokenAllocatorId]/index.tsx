import { CommonLayout } from '@/layouts/CommonLayout'
import { NextPageWithLayout } from '@/pages/_app'
import React, { ReactElement } from 'react'
import { ViewTokenAllocations } from '@/component/ViewTokenAllocations'
import { GetServerSideProps } from 'next'
import { fetchData } from '../api/allocations'
// import { getSession } from 'next-auth/react'
import { Allocation, TokenAllocator } from '@prisma/client'

interface Props {
  data: string
}
const HOME: NextPageWithLayout<Props> = (props) => {
  const tokenAllocator = JSON.parse(props.data) as
    | TokenAllocator & {
        allocations: Allocation[]
      }
  return <ViewTokenAllocations tokenAllocator={tokenAllocator} />
}

HOME.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await getSession(context)
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  const tid = context.params?.tokenAllocatorId as string
  const data = await fetchData(tid)

  if (data) {
    return {
      props: { data: JSON.stringify(data) },
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {} as never,
    }
  }
}

export default HOME
