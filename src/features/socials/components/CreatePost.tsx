'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Users, Heart } from 'lucide-react'


// Define enum before component
enum Visibility {
    Public = "PUBLIC",     // Store value in UPPERCASE (backend convention)
    Mates = "MATES",
    Favourite = "FAVOURITE"
  }

const CreatePost = () => {
    const router = useRouter()
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [content, setContent] = useState('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Public)
    const [isLoading, setIsLoading] = useState(false)

    const tagCategories = {
        Topics: ['Study', 'Career', 'Technology', 'Gaming', 'Sports', "Crypto","Forex"],
        Mood: ['Motivation', 'Success', 'Challenge', 'Help'],
        Academic: ['Mathematics', 'Programming', 'Science', 'Literature']
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    tags: selectedTags,
                    content,
                    visibility: `#${visibility}` 
                }),
            })

            if (response.ok) {
                router.push('/home/socials')
                router.refresh()
            }
        } catch (error) {
            console.error('Error creating post:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen mb-[4rem]  sm:ml-56 mx-auto bg-background">
            <div className="h-16" />
            <div className="px-6 py-6 max-w-[1000px] mx-auto">
                <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

                {/* Tag Selection Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Select Tags</h2>
                    {Object.entries(tagCategories).map(([category, tags]) => (
                        <div key={category} className="mb-4">
                            <h3 className="text-sm text-gray-500 mb-2">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className={selectedTags.includes(tag) ? "bg-blue-600" : ""}
                                        onClick={() => {
                                            if (selectedTags.includes(tag)) {
                                                setSelectedTags(selectedTags.filter(t => t !== tag))
                                            } else {
                                                setSelectedTags([...selectedTags, tag])
                                            }
                                        }}
                                    >
                                        #{tag}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Post Creation Section */}
                <Tabs defaultValue={Visibility.Public} onValueChange={(value) => setVisibility(value as Visibility)}>
                    <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value={Visibility.Public} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public
                        </TabsTrigger>
                        <TabsTrigger value={Visibility.Mates} className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Mates
                        </TabsTrigger>
                        <TabsTrigger value={Visibility.Favourite} className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Close Friends
                        </TabsTrigger>
                    </TabsList>

                    {Object.values(Visibility).map((visibilityValue) => (
                        <TabsContent key={visibilityValue} value={visibilityValue}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {visibilityValue.charAt(0) + visibilityValue.slice(1).toLowerCase()} Post
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit}>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="w-full  p-4 border rounded-md min-h-[200px] lg:mb-4 bg-background resize-none"
                                            placeholder={`What's on your mind? This will be visible to ${visibilityValue.toLowerCase()} only`}
                                            required
                                        />
                                        <Button 
                                            type="submit"
                                            disabled={isLoading || selectedTags.length === 0}
                                            className="w-full h-[50px] bg-blue-600 text-white hover:bg-blue-600 hover:opacity-85"
                                        >
                                            {isLoading ? 'Creating...' : 'Create Post'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default CreatePost