import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Beehive Care Solutions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Total Clients</h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-xs text-gray-500">+5% from last month</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Reports Due</h3>
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-gray-500">Due in the next 7 days</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Compliance Alerts</h3>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-500">Requires immediate attention</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Staff Availability</h3>
            <CheckCircle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">92%</p>
            <p className="text-xs text-gray-500">Current staff availability rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Recent Client Activity</h3>
          <ul className="space-y-2">
            <li>John Doe - Care plan updated</li>
            <li>Jane Smith - New assessment scheduled</li>
            <li>Mike Johnson - Medication review completed</li>
            <li>Sarah Williams - Support goals achieved</li>
            <li>Robert Brown - New client onboarded</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Upcoming Tasks</h3>
          <ul className="space-y-2">
            <li>Complete quarterly report for Department of Health</li>
            <li>Review and update emergency response procedures</li>
            <li>Conduct staff training on new assistive technologies</li>
            <li>Prepare for annual compliance audit</li>
            <li>Update client database with new privacy guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

