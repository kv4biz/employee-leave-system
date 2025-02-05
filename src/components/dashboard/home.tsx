"use client";

import { useUserActions } from "@/hooks/user/action-user";
import { useRequestActions } from "@/hooks/request/action-request";
import { Loader } from "@/components/loader";
import { PieChart, Pie, Label, Tooltip, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Home = () => {
  const { users, isUsersLoading } = useUserActions();
  const { leaveRequests, isLoading } = useRequestActions();

  const totalEmployees = users.filter(
    (user) => user.role === "EMPLOYEE"
  ).length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(
    (req) => req.status === "PENDING"
  ).length;
  const approvedRequests = leaveRequests.filter(
    (req) => req.status === "APPROVED"
  ).length;
  const rejectedRequests = leaveRequests.filter(
    (req) => req.status === "REJECTED"
  ).length;

  const userPieData = [
    { name: "Admins", value: totalAdmins },
    { name: "Employees", value: totalEmployees },
  ];

  const requestPieData = [
    { name: "Pending", value: pendingRequests },
    { name: "Approved", value: approvedRequests },
    { name: "Rejected", value: rejectedRequests },
  ];

  return (
    <Loader loading={isLoading || isUsersLoading}>
      <div className="flex flex-col w-full py-5 px-4 gap-8">
        {/* User Summary */}
        <div className="flex w-full gap-5">
          <Card className="lg:w-1/3">
            <CardHeader>
              <CardTitle>User Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between py-4 px-10">
              <div>
                <h2 className="text-4xl font-bold">{totalAdmins}</h2>
                <p className="text-xl text-primary/65">Total Admins</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">{totalEmployees}</h2>
                <p className="text-xl text-primary/65">Total Employees</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:w-2/3">
            <CardHeader>
              <CardTitle>Requests Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between py-4 px-10">
              <div>
                <h2 className="text-4xl font-bold">{totalRequests}</h2>
                <p className="text-xl text-primary/65">Total Requests</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">{pendingRequests}</h2>
                <p className="text-xl text-yellow-500">Pending</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">{approvedRequests}</h2>
                <p className="text-xl text-green-500">Approved</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">{rejectedRequests}</h2>
                <p className="text-xl text-red-500">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <PieChart width={320} height={320}>
                <Pie
                  data={userPieData}
                  dataKey="value"
                  outerRadius={158}
                  innerRadius={100}
                >
                  {userPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    value={`${users.length} Users`}
                    position="center"
                    className="text-xl font-bold"
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requests Status</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <PieChart width={320} height={320}>
                <Pie
                  data={requestPieData}
                  dataKey="value"
                  outerRadius={158}
                  innerRadius={100}
                >
                  {requestPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    value={`${totalRequests} Requests`}
                    position="center"
                    className="text-xl font-bold"
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </div>
      </div>
    </Loader>
  );
};

export default Home;
