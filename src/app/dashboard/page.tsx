import { DashboardLayout } from '@/components/navigation/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout
      logo="/images/ad-logo-white.png"
      title="Dashboard"
    >
      {/* Your dashboard content goes here */}
      <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
        <h3 className="text-sm font-semibold text-gray-900">Dashboard Content</h3>
      </div>
    </DashboardLayout>
  )
} 