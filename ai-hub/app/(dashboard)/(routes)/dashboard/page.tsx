import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'

const DashboardPage = () => {
  return (
    <>
    <p>Dashboard Page (Protected)</p>
    <UserButton afterSignOutUrl='/'/>
    </>
  )
}

export default DashboardPage;
