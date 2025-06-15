'use client'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserContext } from '@/contexts/userContext'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Bell, Key, User } from 'lucide-react'
import { useContext } from 'react'

const SettingsPage = () => {
  const user = useContext(UserContext)

  return (
    <div className="min-h-screen sm:ml-56  mx-auto  bg-background">

      {/* Top spacing for navbar */}
      <div className="h-16" />

      {/* Main content container */}
      <div className="px-6 py-6 max-w-[1500px flex-1  mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profilePicture} alt={`${user?.firstName} ${user?.lastName}`} className="h-full w-full object-cover rounded-full" />
                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  <Button className="bg-blue-600 text-white hover:bg-blue-600 hover:opacity-85 " >Change Photo</Button>
                </div>

                <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                  <div className='w-full'>
                    <div className={"flex items-center gap-3 w-full"}  >
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className=" w-full " defaultValue={user?.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user?.lastName} />
                      </div>
                    </div>
                    <div >
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user?.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="Enter phone number" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2  flex flex-col  ">
                    <Label htmlFor="firstName">Bio</Label>
                    <textarea id="firstName" className=" h-[200px] bg-white dark:bg-[#0A0A0A] border resize-none p-3 " defaultValue={user?.bio || "nothing here"} />
                  </div>



                </div>
                <Button className="mt-4 bg-blue-600 text-white  hover:bg-blue-600 hover:opacity-85  ">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="bg-blue-600 text-white  hover:bg-blue-600 hover:opacity-85 " >Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'Email notifications',
                    'Push notifications',
                    'Newsletter subscription',
                    'Product updates',
                    'Security alerts'
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Label htmlFor={item}>{item}</Label>
                      <Switch id={item} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div >
  )
}

export default SettingsPage
