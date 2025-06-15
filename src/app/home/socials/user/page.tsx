'use client'
import { useState, useEffect, useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, MapPin, Mail } from 'lucide-react'
import { UserContext } from '@/contexts/userContext'
import Loading from '@/components/Loader'
import { userPostStore } from '@/features/socials/store/useBlogStore'
import { Post } from '@/features/socials/types/post'
import Image from "next/image"
import avatar from "../../../../../public/assets/avatar.png"


interface Connection {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string
  username: string
}

const UserProfile = () => {
  const user = useContext(UserContext)
  const [posts, setPosts] = useState<Post[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const { getPersonalPost } = userPostStore()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get connections data
        const connectionsRes = await fetch('/api/connections')
        if (!connectionsRes.ok) {
          throw new Error('Failed to fetch connections')
        }
        const connectionsData = await connectionsRes.json()

        // Get posts using Zustand store
        const postsData = await getPersonalPost()
        console.log(postsData)

        // Update state
        setPosts(postsData)
        setConnections(connectionsData)
      } catch (error) {
        console.log('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [getPersonalPost]) // Add getPersonalPost to dependency array

  if (loading || !user) return <Loading />

  return (
    <div className="min-h-screen sm:ml-56 mx-auto bg-background">
      <div className="h-20 sm:h-20" />
      
      {/* Profile Info */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32">
            <AvatarImage
              className="h-full w-full object-cover rounded-full"
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback className="flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32  font-bold text-xs shadow-lg ">
              <div className="h-full w-full rounded-full overflow-hidden relative bg-gray-200">
                <Image
                  src={avatar}
                  alt='user'
                  fill
                  className="object-cover"
                  sizes="32px"
                  priority
                />
               </div>
                        </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.country || 'Location'}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {connections.length} connections
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="space-y-4 sm:space-y-6">
          <TabsList className="w-full grid grid-cols-3 p-1 ">
            <TabsTrigger value="posts" className="text-sm sm:text-base">Posts</TabsTrigger>
            <TabsTrigger value="about" className="text-sm sm:text-base">About</TabsTrigger>
            <TabsTrigger value="connections" className="text-sm sm:text-base">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post._id} className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={post.profilePicture} />
                      <AvatarFallback>{post.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base">{post.fullName}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                      <p className="mt-2 text-sm sm:text-base break-words">{post.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-2">
                      <p>Bio: {user.bio || 'No bio added yet'}</p>
                      <p>Location: {user.country}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {connections.map((connection) => (
                <Card key={connection._id} className="p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={connection.profilePicture} />
                      <AvatarFallback>{connection.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">
                        {connection.firstName} {connection.lastName}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">@{connection.username}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserProfile