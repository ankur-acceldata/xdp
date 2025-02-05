import { DashboardLayout } from '@/components/navigation/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout
      logo="/images/ad-logo-white.png"
    >
      {/* Your dashboard content goes here */}
      <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Welcome to xDP</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by exploring the available features.</p>
      </div>
    </DashboardLayout>
  )
} 